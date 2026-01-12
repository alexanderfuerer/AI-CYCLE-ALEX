import { memo } from 'react'
import { Handle, Position, type NodeProps } from '@xyflow/react'
import { Mail, Loader2, CheckCircle, AlertCircle } from 'lucide-react'

interface NotificationNodeData {
  isSending: boolean
  sent: boolean
  error: string | null
  employeeEmail?: string
}

function NotificationNodeComponent({ data }: NodeProps<NotificationNodeData>) {
  return (
    <div className="custom-node min-w-[280px]">
      <Handle
        type="target"
        position={Position.Left}
        id="doc"
        className="!bg-blue-600"
      />

      <div className="custom-node-header">
        <Mail className="custom-node-icon text-violet-500" />
        <span className="custom-node-title">Benachrichtigung</span>
      </div>

      <div className="space-y-3">
        <p className="text-xs text-gray-500">
          Sendet eine E-Mail an den Mitarbeiter
        </p>

        {/* Status */}
        <div className="p-3 rounded-lg bg-gray-50">
          {data.isSending ? (
            <div className="flex items-center gap-2 text-violet-600">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span className="text-sm">Sende E-Mail...</span>
            </div>
          ) : data.error ? (
            <div className="flex items-start gap-2 text-red-600">
              <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span className="text-sm">{data.error}</span>
            </div>
          ) : data.sent ? (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-green-600">
                <CheckCircle className="w-4 h-4" />
                <span className="text-sm font-medium">E-Mail gesendet</span>
              </div>
              {data.employeeEmail && (
                <p className="text-xs text-gray-500">
                  An: {data.employeeEmail}
                </p>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2 text-gray-400">
              <Mail className="w-4 h-4" />
              <span className="text-sm">Warte auf Dokument...</span>
            </div>
          )}
        </div>

        {/* Email Preview */}
        {!data.sent && !data.isSending && (
          <div className="text-xs text-gray-400 p-2 border border-dashed border-gray-200 rounded-lg">
            <p className="font-medium mb-1">E-Mail Inhalt:</p>
            <p>Dein LinkedIn-Post ist bereit...</p>
          </div>
        )}
      </div>
    </div>
  )
}

export const NotificationNode = memo(NotificationNodeComponent)
