import { memo } from 'react'
import { Handle, Position } from '@xyflow/react'
import { FileText } from 'lucide-react'

interface ContentInputNodeData {
  content: string
  onChange: (content: string) => void
}

interface ContentInputNodeProps {
  data: ContentInputNodeData
}

function ContentInputNodeComponent({ data }: ContentInputNodeProps) {
  return (
    <div className="custom-node min-w-[320px]">
      <div className="custom-node-header">
        <FileText className="custom-node-icon text-blue-500" />
        <span className="custom-node-title">Content Input</span>
      </div>

      <div className="space-y-3">
        <p className="text-xs text-gray-500">
          Gib das Thema oder den Inhalt für den LinkedIn-Post ein
        </p>
        <textarea
          value={data.content || ''}
          onChange={(e) => data.onChange?.(e.target.value)}
          placeholder="z.B. 'Wir haben gerade unser neues Produkt gelauncht...'"
          className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          rows={4}
        />
        <div className="text-xs text-gray-400 text-right">
          {(data.content || '').length} Zeichen
        </div>
      </div>

      <Handle
        type="source"
        position={Position.Right}
        id="content"
        className="!bg-blue-500"
      />
    </div>
  )
}

export const ContentInputNode = memo(ContentInputNodeComponent)
