import { useCallback, useMemo, useState, useEffect } from 'react'
import {
  ReactFlow,
  Controls,
  Background,
  BackgroundVariant,
  useNodesState,
  useEdgesState,
  addEdge,
  type Connection,
  type Edge,
  type Node,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'

import { useEmployees, useWorkflow } from '../hooks'
import { useStyleProfile } from '../hooks/useStyleProfile'
import {
  ContentInputNode,
  EmployeeSelectNode,
  GeneratorNode,
  ReviewNode,
  GoogleDocsNode,
  NotificationNode,
} from '../nodes'

const nodeTypes = {
  contentInput: ContentInputNode,
  employeeSelect: EmployeeSelectNode,
  generator: GeneratorNode,
  review: ReviewNode,
  googleDocs: GoogleDocsNode,
  notification: NotificationNode,
}

const initialNodes: Node[] = [
  {
    id: 'content',
    type: 'contentInput',
    position: { x: 50, y: 150 },
    data: { content: '', onChange: () => {} },
  },
  {
    id: 'employee',
    type: 'employeeSelect',
    position: { x: 420, y: 50 },
    data: { selectedEmployeeId: null, employees: [], styleProfile: null, onSelect: () => {} },
  },
  {
    id: 'generator',
    type: 'generator',
    position: { x: 800, y: 150 },
    data: { isGenerating: false, generatedContent: null, canGenerate: false, onGenerate: () => {} },
  },
  {
    id: 'review',
    type: 'review',
    position: { x: 1150, y: 100 },
    data: {
      content: '',
      originalContent: '',
      wordCount: 0,
      emojiCount: 0,
      paragraphCount: 0,
      onEdit: () => {},
      onRegenerate: () => {},
      onSave: () => {},
      onApprove: () => {},
      isApproved: false,
    },
  },
  {
    id: 'docs',
    type: 'googleDocs',
    position: { x: 1600, y: 50 },
    data: { isCreating: false, docUrl: null, error: null },
  },
  {
    id: 'notification',
    type: 'notification',
    position: { x: 1600, y: 280 },
    data: { isSending: false, sent: false, error: null },
  },
]

const initialEdges: Edge[] = [
  { id: 'e1', source: 'content', target: 'generator', sourceHandle: 'content', targetHandle: 'input', animated: true },
  { id: 'e2', source: 'employee', target: 'generator', sourceHandle: 'employee', targetHandle: 'employee', animated: true },
  { id: 'e3', source: 'generator', target: 'review', sourceHandle: 'generated', targetHandle: 'generated', animated: true },
  { id: 'e4', source: 'review', target: 'docs', sourceHandle: 'approved', targetHandle: 'approved', animated: true },
  { id: 'e5', source: 'docs', target: 'notification', sourceHandle: 'doc', targetHandle: 'doc', animated: true },
]

function countEmojis(text: string): number {
  const emojiRegex = /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu
  return (text.match(emojiRegex) || []).length
}

function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length
}

function countParagraphs(text: string): number {
  return text.split(/\n\n+/).filter(Boolean).length
}

export function WorkflowPage() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

  const { employees } = useEmployees()
  const workflow = useWorkflow()
  const { styleProfile, refetch: refetchProfile } = useStyleProfile(workflow.selectedEmployeeId || undefined)

  const selectedEmployee = useMemo(
    () => employees.find(e => e.id === workflow.selectedEmployeeId),
    [employees, workflow.selectedEmployeeId]
  )

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  )

  // Update nodes with current state
  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        switch (node.id) {
          case 'content':
            return {
              ...node,
              data: {
                ...node.data,
                content: workflow.inputContent,
                onChange: workflow.setInputContent,
              },
            }
          case 'employee':
            return {
              ...node,
              data: {
                ...node.data,
                selectedEmployeeId: workflow.selectedEmployeeId,
                employees,
                styleProfile,
                onSelect: (id: string) => {
                  workflow.setSelectedEmployee(id)
                },
              },
            }
          case 'generator':
            return {
              ...node,
              data: {
                ...node.data,
                isGenerating: workflow.generating,
                generatedContent: workflow.generatedContent,
                canGenerate: !!selectedEmployee && !!styleProfile && !!workflow.inputContent.trim(),
                onGenerate: () => {
                  if (selectedEmployee && styleProfile) {
                    workflow.generate(selectedEmployee, styleProfile)
                  }
                },
              },
            }
          case 'review':
            return {
              ...node,
              data: {
                ...node.data,
                content: workflow.editedContent,
                originalContent: workflow.generatedContent,
                wordCount: countWords(workflow.editedContent),
                emojiCount: countEmojis(workflow.editedContent),
                paragraphCount: countParagraphs(workflow.editedContent),
                onEdit: workflow.setEditedContent,
                onRegenerate: () => {
                  if (selectedEmployee && styleProfile) {
                    workflow.generate(selectedEmployee, styleProfile)
                  }
                },
                onSave: workflow.saveProgress,
                onApprove: () => {
                  if (selectedEmployee) {
                    workflow.approve(selectedEmployee)
                  }
                },
                isApproved: workflow.status === 'APPROVED' || workflow.status === 'NOTIFIED',
              },
            }
          case 'docs':
            return {
              ...node,
              data: {
                ...node.data,
                isCreating: workflow.creatingDoc,
                docUrl: workflow.googleDocUrl,
                error: workflow.status === 'APPROVED' && !workflow.googleDocUrl && workflow.error ? workflow.error : null,
              },
            }
          case 'notification':
            return {
              ...node,
              data: {
                ...node.data,
                isSending: workflow.sendingNotification,
                sent: workflow.status === 'NOTIFIED',
                error: null,
                employeeEmail: selectedEmployee?.email,
              },
            }
          default:
            return node
        }
      })
    )
  }, [
    setNodes,
    employees,
    workflow,
    selectedEmployee,
    styleProfile,
  ])

  // Refetch profile when employee changes
  useEffect(() => {
    if (workflow.selectedEmployeeId) {
      refetchProfile()
    }
  }, [workflow.selectedEmployeeId, refetchProfile])

  return (
    <div className="h-[calc(100vh-64px)] w-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        className="node-editor-bg"
      >
        <Controls className="!bg-white !rounded-lg !border !border-gray-200 !shadow-sm" />
        <Background variant={BackgroundVariant.Dots} gap={20} size={1} color="#0f3460" />
      </ReactFlow>

      {/* Error Toast */}
      {workflow.error && (
        <div className="fixed bottom-4 right-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg shadow-lg max-w-md">
          <p className="text-sm">{workflow.error}</p>
        </div>
      )}

      {/* Status Bar */}
      <div className="fixed bottom-4 left-4 bg-white border border-gray-200 rounded-lg shadow-sm px-4 py-2 flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500">Status:</span>
          <span className={`
            inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full
            ${workflow.status === 'DRAFT' ? 'bg-gray-100 text-gray-700' : ''}
            ${workflow.status === 'GENERATING' ? 'bg-blue-100 text-blue-700' : ''}
            ${workflow.status === 'REVIEW' ? 'bg-yellow-100 text-yellow-700' : ''}
            ${workflow.status === 'APPROVED' ? 'bg-green-100 text-green-700' : ''}
            ${workflow.status === 'NOTIFIED' ? 'bg-purple-100 text-purple-700' : ''}
          `}>
            {workflow.status}
          </span>
        </div>
        {selectedEmployee && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">Mitarbeiter:</span>
            <span className="text-xs font-medium text-gray-700">{selectedEmployee.name}</span>
          </div>
        )}
      </div>
    </div>
  )
}
