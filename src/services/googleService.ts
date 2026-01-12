import type { GoogleDocResponse } from '../types'

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID

// Token storage
let accessToken: string | null = null

// ============================================
// OAUTH FLOW
// ============================================

export function initGoogleAuth(): Promise<void> {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = 'https://accounts.google.com/gsi/client'
    script.async = true
    script.defer = true
    script.onload = () => resolve()
    script.onerror = () => reject(new Error('Failed to load Google Identity Services'))
    document.head.appendChild(script)
  })
}

export async function signInWithGoogle(): Promise<string> {
  return new Promise((resolve, reject) => {
    const client = google.accounts.oauth2.initTokenClient({
      client_id: GOOGLE_CLIENT_ID,
      scope: 'https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/documents',
      callback: (response: { access_token?: string; error?: string }) => {
        if (response.error) {
          reject(new Error(response.error))
        } else if (response.access_token) {
          accessToken = response.access_token
          resolve(response.access_token)
        }
      },
    })
    client.requestAccessToken()
  })
}

export function getAccessToken(): string | null {
  return accessToken
}

export function isSignedIn(): boolean {
  return accessToken !== null
}

// ============================================
// GOOGLE DOCS API
// ============================================

export async function createLinkedInDoc(
  content: string,
  employeeName: string,
  folderId: string
): Promise<GoogleDocResponse> {
  if (!accessToken) {
    throw new Error('Not authenticated with Google. Please sign in first.')
  }

  const today = new Date().toLocaleDateString('de-CH', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
  const title = `LinkedIn Post - ${employeeName} - ${today}`

  // Step 1: Create the document
  const createResponse = await fetch('https://docs.googleapis.com/v1/documents', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title,
    }),
  })

  if (!createResponse.ok) {
    const error = await createResponse.json()
    throw new Error(error.error?.message || 'Failed to create Google Doc')
  }

  const docData = await createResponse.json()
  const docId = docData.documentId

  // Step 2: Insert content into the document
  await fetch(`https://docs.googleapis.com/v1/documents/${docId}:batchUpdate`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      requests: [
        {
          insertText: {
            location: {
              index: 1,
            },
            text: content,
          },
        },
      ],
    }),
  })

  // Step 3: Move document to the specified folder
  if (folderId) {
    // Get current parents
    const fileResponse = await fetch(
      `https://www.googleapis.com/drive/v3/files/${docId}?fields=parents`,
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      }
    )

    if (fileResponse.ok) {
      const fileData = await fileResponse.json()
      const previousParents = fileData.parents?.join(',') || ''

      // Move to new folder
      await fetch(
        `https://www.googleapis.com/drive/v3/files/${docId}?addParents=${folderId}&removeParents=${previousParents}`,
        {
          method: 'PATCH',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        }
      )
    }
  }

  return {
    docUrl: `https://docs.google.com/document/d/${docId}/edit`,
    docId,
  }
}
