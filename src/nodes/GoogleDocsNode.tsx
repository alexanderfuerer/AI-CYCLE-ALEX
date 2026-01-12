import { memo } from 'react'
import { Handle, Position, type NodeProps } from '@xyflow/react'
import { FileText, Loader2, ExternalLink, AlertCircle } from 'lucide-react'

interface GoogleDocsNodeData {
  isCreating: boolean
  docUrl: string | null
  error: string | null
}

function GoogleDocsNodeComponent({ data }: NodeProps<GoogleDocsNodeData>) {
  return (
    <div className="custom-node min-w-[280px]">
      <Handle
        type="target"
        position={Position.Left}
        id="approved"
        className="!bg-teal-500"
      />

      <div className="custom-node-header">
        <FileText className="custom-node-icon text-blue-600" />
        <span className="custom-node-title">Google Docs</span>
      </div>

      <div className="space-y-3">
        <p className="text-xs text-gray-500">
          Erstellt ein Google Doc im Mitarbeiter-Ordner
        </p>

        {/* Status */}
        <div className="p-3 rounded-lg bg-gray-50">
          {data.isCreating ? (
            <div className="flex items-center gap-2 text-blue-600">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span className="text-sm">Erstelle Dokument...</span>
            </div>
          ) : data.error ? (
            <div className="flex items-start gap-2 text-red-600">
              <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span className="text-sm">{data.error}</span>
            </div>
          ) : data.docUrl ? (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-green-600">
                <FileText className="w-4 h-4" />
                <span className="text-sm font-medium">Dokument erstellt</span>
              </div>
              <a
                href={data.docUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-blue-600 hover:underline"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Dokument öffnen
              </a>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-gray-400">
              <FileText className="w-4 h-4" />
              <span className="text-sm">Warte auf Approval...</span>
            </div>
          )}
        </div>
      </div>

      <Handle
        type="source"
        position={Position.Right}
        id="doc"
        className="!bg-blue-600"
      />
    </div>
  )
}

export const GoogleDocsNode = memo(GoogleDocsNodeComponent)
