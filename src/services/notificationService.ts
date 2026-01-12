import type { Employee } from '../types'

// ============================================
// EMAIL NOTIFICATION
// ============================================

// Note: In production, this would be handled by a backend service
// (Firebase Cloud Functions + SendGrid or Firebase Extension "Trigger Email")
// For now, this is a placeholder that simulates the notification

interface NotificationPayload {
  to: string
  subject: string
  html: string
}

function buildEmailTemplate(employeeName: string, docUrl: string): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      line-height: 1.6;
      color: #1e293b;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .header {
      text-align: center;
      padding: 20px 0;
      border-bottom: 1px solid #e2e8f0;
    }
    .content {
      padding: 30px 0;
    }
    .button {
      display: inline-block;
      background-color: #3b82f6;
      color: white;
      padding: 12px 24px;
      text-decoration: none;
      border-radius: 8px;
      font-weight: 500;
      margin: 20px 0;
    }
    .button:hover {
      background-color: #2563eb;
    }
    .footer {
      text-align: center;
      padding-top: 20px;
      border-top: 1px solid #e2e8f0;
      color: #64748b;
      font-size: 14px;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>🚀 Dein LinkedIn-Post ist bereit</h1>
  </div>

  <div class="content">
    <p>Hallo ${employeeName},</p>

    <p>Ein neuer LinkedIn-Post wurde für dich vorbereitet und wartet auf deine Veröffentlichung.</p>

    <p>
      <a href="${docUrl}" class="button">📄 Dokument öffnen</a>
    </p>

    <p>Bitte prüfe den Text und poste ihn auf LinkedIn.</p>

    <p>Viele Grüsse<br>Dein Content-Team</p>
  </div>

  <div class="footer">
    <p>Diese E-Mail wurde automatisch von FIVE LI Content Flow generiert.</p>
  </div>
</body>
</html>
`
}

export async function notifyEmployee(
  employee: Employee,
  docUrl: string
): Promise<boolean> {
  const payload: NotificationPayload = {
    to: employee.email,
    subject: 'Dein LinkedIn-Post ist bereit 🚀',
    html: buildEmailTemplate(employee.name, docUrl),
  }

  // In production, this would call a Firebase Cloud Function
  // or use Firebase Extension "Trigger Email" by writing to a Firestore collection

  // For development/demo purposes, we'll log the email and simulate success
  console.log('📧 Sending notification email:', {
    to: payload.to,
    subject: payload.subject,
  })

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000))

  // In production, implement one of these options:

  // Option 1: Firebase Extension "Trigger Email"
  // await addDoc(collection(db, 'mail'), {
  //   to: employee.email,
  //   message: {
  //     subject: payload.subject,
  //     html: payload.html,
  //   },
  // })

  // Option 2: SendGrid via Cloud Function
  // const response = await fetch('https://your-cloud-function-url/sendEmail', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(payload),
  // })
  // return response.ok

  return true
}

// ============================================
// FIREBASE TRIGGER EMAIL SETUP
// ============================================

// To enable email notifications in production:
// 1. Install Firebase Extension "Trigger Email from Firestore"
// 2. Configure with SendGrid or another SMTP provider
// 3. The extension watches a 'mail' collection
// 4. Use the notifyEmployeeViaFirestore function below

/*
import { collection, addDoc } from 'firebase/firestore'
import { db } from './firebase'

export async function notifyEmployeeViaFirestore(
  employee: Employee,
  docUrl: string
): Promise<boolean> {
  try {
    await addDoc(collection(db, 'mail'), {
      to: employee.email,
      message: {
        subject: 'Dein LinkedIn-Post ist bereit 🚀',
        html: buildEmailTemplate(employee.name, docUrl),
      },
    })
    return true
  } catch (error) {
    console.error('Failed to queue email:', error)
    return false
  }
}
*/
