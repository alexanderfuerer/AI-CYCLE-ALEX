import { useState, useEffect, useCallback } from 'react'
import type { Employee, EmployeeFormData } from '../types'
import {
  getEmployees,
  getEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  uploadSampleTexts,
} from '../services/firestoreService'

export function useEmployees() {
  const [employees, setEmployees] = useState<Employee[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchEmployees = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await getEmployees()
      setEmployees(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch employees')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchEmployees()
  }, [fetchEmployees])

  return {
    employees,
    loading,
    error,
    refetch: fetchEmployees,
  }
}

export function useEmployee(id: string | undefined) {
  const [employee, setEmployee] = useState<Employee | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchEmployee = useCallback(async () => {
    if (!id) {
      setEmployee(null)
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      setError(null)
      const data = await getEmployee(id)
      setEmployee(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch employee')
    } finally {
      setLoading(false)
    }
  }, [id])

  useEffect(() => {
    fetchEmployee()
  }, [fetchEmployee])

  return {
    employee,
    loading,
    error,
    refetch: fetchEmployee,
  }
}

export function useEmployeeMutations() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const create = async (data: EmployeeFormData): Promise<string | null> => {
    try {
      setLoading(true)
      setError(null)
      const id = await createEmployee(data)
      return id
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create employee')
      return null
    } finally {
      setLoading(false)
    }
  }

  const update = async (id: string, data: Partial<EmployeeFormData>): Promise<boolean> => {
    try {
      setLoading(true)
      setError(null)
      await updateEmployee(id, data)
      return true
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update employee')
      return false
    } finally {
      setLoading(false)
    }
  }

  const remove = async (id: string): Promise<boolean> => {
    try {
      setLoading(true)
      setError(null)
      await deleteEmployee(id)
      return true
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete employee')
      return false
    } finally {
      setLoading(false)
    }
  }

  const uploadSamples = async (employeeId: string, file: File): Promise<string | null> => {
    try {
      setLoading(true)
      setError(null)
      const url = await uploadSampleTexts(employeeId, file)
      return url
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to upload sample texts')
      return null
    } finally {
      setLoading(false)
    }
  }

  return {
    create,
    update,
    remove,
    uploadSamples,
    loading,
    error,
  }
}
