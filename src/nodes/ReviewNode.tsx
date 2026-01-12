import { memo } from 'react'
import { Handle, Position, type NodeProps } from '@xyflow/react'
import { Edit3, RefreshCw, Save, CheckCircle } from 'lucide-react'

interface ReviewNodeData {
  content: string
  originalContent: string
  wordCount: number
  emojiCount: number
  paragraphCount: number
  onEdit: (content: string) => void
  onRegenerate: () => void
  onSave: () => void
  onApprove: () => void
  isApproved: boolean
}

function ReviewNodeComponent({ data }: NodeProps<ReviewNodeData>) {
  const hasContent = !!data.content
  const isModified = data.content !== data.originalContent

  return (
    <div className="custom-node min-w-[400px]">
      <Handle
        type="target"
        position={Position.Left}
        id="generated"
        className="!bg-amber-500"
      />

      <div className="custom-node-header">
        <Edit3 className="custom-node-icon text-teal-500" />
        <span className="custom-node-title">Review & Edit</span>
        {data.isApproved && (
          <span className="ml-auto inline-flex items-center gap-1 px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full">
            <CheckCircle className="w-3 h-3" />
            Approved
          </span>
        )}
      </div>

      <div className="space-y-3">
        <textarea
          value={data.content || ''}
          onChange={(e) => data.onEdit?.(e.target.value)}
          placeholder="Der generierte Post erscheint hier..."
          disabled={!hasContent}
          className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-400"
          rows={8}
        />

        {/* Statistics */}
        {hasContent && (
          <div className="flex items-center justify-between px-2 py-1.5 bg-gray-50 rounded-lg text-xs text-gray-500">
            <span>{data.wordCount} Wörter</span>
            <span>{data.emojiCount} Emojis</span>
            <span>{data.paragraphCount} Absätze</span>
            {isModified && (
              <span className="text-amber-600 font-medium">Bearbeitet</span>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => data.onRegenerate?.()}
            disabled={!hasContent}
            className="flex-1 px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1.5"
          >
            <RefreshCw className="w-4 h-4" />
            Neu generieren
          </button>

          <button
            onClick={() => data.onSave?.()}
            disabled={!hasContent || !isModified}
            className="flex-1 px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1.5"
          >
            <Save className="w-4 h-4" />
            Speichern
          </button>

          <button
            onClick={() => data.onApprove?.()}
            disabled={!hasContent || data.isApproved}
            className="flex-1 px-3 py-2 text-sm font-medium text-white bg-green-500 rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1.5"
          >
            <CheckCircle className="w-4 h-4" />
            Approve
          </button>
        </div>
      </div>

      <Handle
        type="source"
        position={Position.Right}
        id="approved"
        className="!bg-teal-500"
      />
    </div>
  )
}

export const ReviewNode = memo(ReviewNodeComponent)
