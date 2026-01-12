import { memo } from 'react'
import { Handle, Position, type NodeProps } from '@xyflow/react'
import { Sparkles, Loader2 } from 'lucide-react'

interface GeneratorNodeData {
  isGenerating: boolean
  generatedContent: string | null
  canGenerate: boolean
  onGenerate: () => void
}

function GeneratorNodeComponent({ data }: NodeProps<GeneratorNodeData>) {
  return (
    <div className="custom-node min-w-[280px]">
      <Handle
        type="target"
        position={Position.Left}
        id="input"
        className="!bg-purple-500"
        style={{ top: '30%' }}
      />
      <Handle
        type="target"
        position={Position.Left}
        id="employee"
        className="!bg-purple-500"
        style={{ top: '70%' }}
      />

      <div className="custom-node-header">
        <Sparkles className="custom-node-icon text-amber-500" />
        <span className="custom-node-title">Post Generator</span>
      </div>

      <div className="space-y-3">
        <p className="text-xs text-gray-500">
          Generiert einen LinkedIn-Post basierend auf dem Stilprofil
        </p>

        <button
          onClick={() => data.onGenerate?.()}
          disabled={data.isGenerating || !data.canGenerate}
          className={`
            w-full px-4 py-2.5 rounded-lg font-medium text-sm
            flex items-center justify-center gap-2
            transition-all duration-200
            ${data.isGenerating
              ? 'bg-amber-100 text-amber-700 cursor-wait'
              : data.canGenerate
                ? 'bg-amber-500 text-white hover:bg-amber-600'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }
          `}
        >
          {data.isGenerating ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Generiere...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              Post generieren
            </>
          )}
        </button>

        {!data.canGenerate && !data.isGenerating && (
          <p className="text-xs text-center text-gray-400">
            Wähle einen Mitarbeiter mit Stilprofil
          </p>
        )}

        {data.generatedContent && (
          <div className="flex items-center justify-center">
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
              Generiert
            </span>
          </div>
        )}
      </div>

      <Handle
        type="source"
        position={Position.Right}
        id="generated"
        className="!bg-amber-500"
      />
    </div>
  )
}

export const GeneratorNode = memo(GeneratorNodeComponent)
