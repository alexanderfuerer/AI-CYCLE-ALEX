import { useState, useCallback } from 'react'
import type { Employee, StyleProfile, WorkflowStatus } from '../types'
import { generatePost } from '../services/claudeService'
import { createLinkedInDoc } from '../services/googleService'
import { notifyEmployee } from '../services/notificationService'
import { createWorkflow, updateWorkflow } from '../services/firestoreService'

interface WorkflowState {
  inputContent: string
  selectedEmployeeId: string | null
  generatedContent: string
  editedContent: string
  status: WorkflowStatus
  googleDocUrl: string | null
  workflowId: string | null
}

const initialState: WorkflowState = {
  inputContent: '',
  selectedEmployeeId: null,
  generatedContent: '',
  editedContent: '',
  status: 'DRAFT',
  googleDocUrl: null,
  workflowId: null,
}

export function useWorkflow() {
  const [state, setState] = useState<WorkflowState>(initialState)
  const [generating, setGenerating] = useState(false)
  const [creatingDoc, setCreatingDoc] = useState(false)
  const [sendingNotification, setSendingNotification] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const setInputContent = useCallback((content: string) => {
    setState(prev => ({ ...prev, inputContent: content }))
  }, [])

  const setSelectedEmployee = useCallback((employeeId: string | null) => {
    setState(prev => ({ ...prev, selectedEmployeeId: employeeId }))
  }, [])

  const setEditedContent = useCallback((content: string) => {
    setState(prev => ({ ...prev, editedContent: content }))
  }, [])

  const generate = useCallback(async (
    employee: Employee,
    styleProfile: StyleProfile
  ): Promise<boolean> => {
    if (!state.inputContent.trim()) {
      setError('Bitte gib zuerst Inhalt ein')
      return false
    }

    try {
      setGenerating(true)
      setError(null)
      setState(prev => ({ ...prev, status: 'GENERATING' }))

      const content = await generatePost(
        state.inputContent,
        employee,
        styleProfile
      )

      setState(prev => ({
        ...prev,
        generatedContent: content,
        editedContent: content,
        status: 'REVIEW',
      }))

      // Create workflow in Firestore
      if (!state.workflowId) {
        const workflowId = await createWorkflow({
          employeeId: employee.id,
          inputContent: state.inputContent,
        })
        setState(prev => ({ ...prev, workflowId }))

        await updateWorkflow(workflowId, {
          generatedContent: content,
          editedContent: content,
          status: 'REVIEW',
        })
      } else {
        await updateWorkflow(state.workflowId, {
          generatedContent: content,
          editedContent: content,
          status: 'REVIEW',
        })
      }

      return true
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Generierung fehlgeschlagen')
      setState(prev => ({ ...prev, status: 'DRAFT' }))
      return false
    } finally {
      setGenerating(false)
    }
  }, [state.inputContent, state.workflowId])

  const saveProgress = useCallback(async (): Promise<boolean> => {
    if (!state.workflowId) return false

    try {
      await updateWorkflow(state.workflowId, {
        editedContent: state.editedContent,
      })
      return true
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Speichern fehlgeschlagen')
      return false
    }
  }, [state.workflowId, state.editedContent])

  const approve = useCallback(async (employee: Employee): Promise<boolean> => {
    try {
      setCreatingDoc(true)
      setError(null)

      // Create Google Doc
      const { docUrl, docId } = await createLinkedInDoc(
        state.editedContent,
        employee.name,
        employee.googleDriveFolderId
      )

      setState(prev => ({
        ...prev,
        status: 'APPROVED',
        googleDocUrl: docUrl,
      }))

      // Update workflow
      if (state.workflowId) {
        await updateWorkflow(state.workflowId, {
          editedContent: state.editedContent,
          status: 'APPROVED',
          googleDocUrl: docUrl,
          googleDocId: docId,
        })
      }

      // Send notification
      setSendingNotification(true)
      setCreatingDoc(false)

      const notified = await notifyEmployee(employee, docUrl)

      if (notified) {
        setState(prev => ({ ...prev, status: 'NOTIFIED' }))
        if (state.workflowId) {
          await updateWorkflow(state.workflowId, { status: 'NOTIFIED' })
        }
      }

      return true
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Genehmigung fehlgeschlagen')
      return false
    } finally {
      setCreatingDoc(false)
      setSendingNotification(false)
    }
  }, [state.editedContent, state.workflowId])

  const reset = useCallback(() => {
    setState(initialState)
    setError(null)
  }, [])

  return {
    ...state,
    generating,
    creatingDoc,
    sendingNotification,
    error,
    setInputContent,
    setSelectedEmployee,
    setEditedContent,
    generate,
    saveProgress,
    approve,
    reset,
  }
}
