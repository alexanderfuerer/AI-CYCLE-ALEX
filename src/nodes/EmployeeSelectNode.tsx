import { memo } from 'react'
import { Handle, Position, type NodeProps } from '@xyflow/react'
import { User, CheckCircle, AlertCircle } from 'lucide-react'
import type { Employee, StyleProfile } from '../types'

interface EmployeeSelectNodeData {
  selectedEmployeeId: string | null
  employees: Employee[]
  styleProfile: StyleProfile | null
  onSelect: (employeeId: string) => void
}

function EmployeeSelectNodeComponent({ data }: NodeProps<EmployeeSelectNodeData>) {
  const selectedEmployee = data.employees?.find(e => e.id === data.selectedEmployeeId)

  return (
    <div className="custom-node min-w-[320px]">
      <Handle
        type="target"
        position={Position.Left}
        id="content"
        className="!bg-blue-500"
      />

      <div className="custom-node-header">
        <User className="custom-node-icon text-purple-500" />
        <span className="custom-node-title">Mitarbeiter wählen</span>
      </div>

      <div className="space-y-3">
        <select
          value={data.selectedEmployeeId || ''}
          onChange={(e) => data.onSelect?.(e.target.value)}
          className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
        >
          <option value="">Mitarbeiter wählen...</option>
          {(data.employees || []).map((employee) => (
            <option key={employee.id} value={employee.id}>
              {employee.name}
            </option>
          ))}
        </select>

        {selectedEmployee && (
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-900">
                {selectedEmployee.name}
              </span>
              {data.styleProfile ? (
                <span className="inline-flex items-center gap-1 text-xs text-green-600">
                  <CheckCircle className="w-3 h-3" />
                  Stilprofil
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-xs text-yellow-600">
                  <AlertCircle className="w-3 h-3" />
                  Kein Profil
                </span>
              )}
            </div>

            {selectedEmployee.toneDescription && (
              <p className="text-xs text-gray-500 line-clamp-2">
                {selectedEmployee.toneDescription}
              </p>
            )}

            {data.styleProfile && (
              <div className="mt-2 pt-2 border-t border-gray-200 grid grid-cols-2 gap-2 text-xs">
                <div className="text-gray-500">
                  Wörter/Post: <span className="font-medium text-gray-700">{data.styleProfile.quantitative.avgWordsPerPost}</span>
                </div>
                <div className="text-gray-500">
                  Emojis: <span className="font-medium text-gray-700">{data.styleProfile.quantitative.avgEmojisPerPost}</span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <Handle
        type="source"
        position={Position.Right}
        id="employee"
        className="!bg-purple-500"
      />
    </div>
  )
}

export const EmployeeSelectNode = memo(EmployeeSelectNodeComponent)
