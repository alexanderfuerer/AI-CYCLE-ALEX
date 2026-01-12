import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Edit2, Trash2, User, CheckCircle, AlertCircle } from 'lucide-react'
import { useEmployees, useEmployeeMutations } from '../hooks'
import { useStyleProfile } from '../hooks/useStyleProfile'
import { Button, Card, CardBody, Badge, Modal } from '../components/ui'

function EmployeeCard({ employee, onDelete }: { employee: any; onDelete: () => void }) {
  const { styleProfile } = useStyleProfile(employee.id)
  const hasStyleProfile = styleProfile !== null

  return (
    <Card hoverable className="relative">
      <CardBody>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-primary-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{employee.name}</h3>
              <p className="text-sm text-gray-500">{employee.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {hasStyleProfile ? (
              <Badge variant="success">
                <CheckCircle className="w-3 h-3 mr-1" />
                Stilprofil
              </Badge>
            ) : (
              <Badge variant="warning">
                <AlertCircle className="w-3 h-3 mr-1" />
                Kein Profil
              </Badge>
            )}
          </div>
        </div>

        {employee.toneDescription && (
          <p className="mt-3 text-sm text-gray-600 line-clamp-2">
            {employee.toneDescription}
          </p>
        )}

        <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
          <div className="text-xs text-gray-400">
            {employee.linkedinProfile && (
              <a
                href={employee.linkedinProfile}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 hover:underline"
              >
                LinkedIn Profil
              </a>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Link to={`/employees/${employee.id}`}>
              <Button variant="ghost" size="sm">
                <Edit2 className="w-4 h-4" />
              </Button>
            </Link>
            <Button variant="ghost" size="sm" onClick={onDelete}>
              <Trash2 className="w-4 h-4 text-red-500" />
            </Button>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}

export function EmployeesPage() {
  const { employees, loading, error, refetch } = useEmployees()
  const { remove, loading: mutating } = useEmployeeMutations()
  const [deleteModal, setDeleteModal] = useState<{ open: boolean; employeeId: string | null }>({
    open: false,
    employeeId: null,
  })

  const handleDelete = async () => {
    if (!deleteModal.employeeId) return

    const success = await remove(deleteModal.employeeId)
    if (success) {
      setDeleteModal({ open: false, employeeId: null })
      refetch()
    }
  }

  const employeeToDelete = employees.find(e => e.id === deleteModal.employeeId)

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Mitarbeiter</h1>
          <p className="text-gray-500 mt-1">
            Verwalte Mitarbeiter und deren Stilprofile
          </p>
        </div>
        <Link to="/employees/new">
          <Button>
            <Plus className="w-4 h-4" />
            Neu anlegen
          </Button>
        </Link>
      </div>

      {/* Error State */}
      {error && (
        <div className="bg-red-50 text-red-700 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      {/* Loading State */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-200 p-6 animate-pulse">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gray-200 rounded-full" />
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                  <div className="h-3 bg-gray-200 rounded w-1/2" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : employees.length === 0 ? (
        /* Empty State */
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Keine Mitarbeiter
          </h3>
          <p className="text-gray-500 mb-6">
            Lege deinen ersten Mitarbeiter an, um loszulegen.
          </p>
          <Link to="/employees/new">
            <Button>
              <Plus className="w-4 h-4" />
              Mitarbeiter anlegen
            </Button>
          </Link>
        </div>
      ) : (
        /* Employee Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {employees.map((employee) => (
            <EmployeeCard
              key={employee.id}
              employee={employee}
              onDelete={() => setDeleteModal({ open: true, employeeId: employee.id })}
            />
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={deleteModal.open}
        onClose={() => setDeleteModal({ open: false, employeeId: null })}
        title="Mitarbeiter löschen"
      >
        <div className="space-y-4">
          <p className="text-gray-600">
            Bist du sicher, dass du <strong>{employeeToDelete?.name}</strong> löschen möchtest?
            Dies löscht auch das zugehörige Stilprofil.
          </p>
          <div className="flex justify-end gap-3">
            <Button
              variant="secondary"
              onClick={() => setDeleteModal({ open: false, employeeId: null })}
            >
              Abbrechen
            </Button>
            <Button
              variant="danger"
              onClick={handleDelete}
              loading={mutating}
            >
              Löschen
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
