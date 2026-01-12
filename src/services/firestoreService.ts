import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  Timestamp,
} from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { db, storage } from './firebase'
import type {
  Employee,
  EmployeeFormData,
  StyleProfile,
  Workflow,
  WorkflowFormData,
  WorkflowStatus,
} from '../types'

// ============================================
// EMPLOYEES
// ============================================

export async function getEmployees(): Promise<Employee[]> {
  const employeesRef = collection(db, 'employees')
  const q = query(employeesRef, orderBy('name'))
  const snapshot = await getDocs(q)

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  })) as Employee[]
}

export async function getEmployee(id: string): Promise<Employee | null> {
  const docRef = doc(db, 'employees', id)
  const snapshot = await getDoc(docRef)

  if (!snapshot.exists()) {
    return null
  }

  return {
    id: snapshot.id,
    ...snapshot.data(),
  } as Employee
}

export async function createEmployee(data: EmployeeFormData): Promise<string> {
  const employeesRef = collection(db, 'employees')
  const now = Timestamp.now()

  const docRef = await addDoc(employeesRef, {
    ...data,
    sampleTextsUrl: '',
    createdAt: now,
    updatedAt: now,
  })

  return docRef.id
}

export async function updateEmployee(id: string, data: Partial<EmployeeFormData>): Promise<void> {
  const docRef = doc(db, 'employees', id)

  await updateDoc(docRef, {
    ...data,
    updatedAt: Timestamp.now(),
  })
}

export async function deleteEmployee(id: string): Promise<void> {
  const docRef = doc(db, 'employees', id)
  await deleteDoc(docRef)

  // Also delete associated style profile
  const styleProfilesRef = collection(db, 'styleProfiles')
  const q = query(styleProfilesRef, where('employeeId', '==', id))
  const snapshot = await getDocs(q)

  for (const doc of snapshot.docs) {
    await deleteDoc(doc.ref)
  }
}

export async function uploadSampleTexts(employeeId: string, file: File): Promise<string> {
  const storageRef = ref(storage, `sample-texts/${employeeId}/${file.name}`)
  await uploadBytes(storageRef, file)
  const url = await getDownloadURL(storageRef)

  // Update employee with sample texts URL
  const docRef = doc(db, 'employees', employeeId)
  await updateDoc(docRef, {
    sampleTextsUrl: url,
    updatedAt: Timestamp.now(),
  })

  return url
}

// ============================================
// STYLE PROFILES
// ============================================

export async function getStyleProfile(employeeId: string): Promise<StyleProfile | null> {
  const styleProfilesRef = collection(db, 'styleProfiles')
  const q = query(styleProfilesRef, where('employeeId', '==', employeeId))
  const snapshot = await getDocs(q)

  if (snapshot.empty) {
    return null
  }

  const doc = snapshot.docs[0]
  return {
    id: doc.id,
    ...doc.data(),
  } as StyleProfile
}

export async function saveStyleProfile(
  employeeId: string,
  quantitative: StyleProfile['quantitative'],
  qualitative: StyleProfile['qualitative']
): Promise<string> {
  // Check if profile already exists
  const existing = await getStyleProfile(employeeId)

  if (existing) {
    // Update existing profile
    const docRef = doc(db, 'styleProfiles', existing.id)
    await updateDoc(docRef, {
      quantitative,
      qualitative,
      analyzedAt: Timestamp.now(),
    })
    return existing.id
  }

  // Create new profile
  const styleProfilesRef = collection(db, 'styleProfiles')
  const docRef = await addDoc(styleProfilesRef, {
    employeeId,
    quantitative,
    qualitative,
    analyzedAt: Timestamp.now(),
  })

  return docRef.id
}

// ============================================
// WORKFLOWS
// ============================================

export async function getWorkflows(employeeId?: string): Promise<Workflow[]> {
  const workflowsRef = collection(db, 'workflows')
  let q = query(workflowsRef, orderBy('createdAt', 'desc'))

  if (employeeId) {
    q = query(workflowsRef, where('employeeId', '==', employeeId), orderBy('createdAt', 'desc'))
  }

  const snapshot = await getDocs(q)

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  })) as Workflow[]
}

export async function getWorkflow(id: string): Promise<Workflow | null> {
  const docRef = doc(db, 'workflows', id)
  const snapshot = await getDoc(docRef)

  if (!snapshot.exists()) {
    return null
  }

  return {
    id: snapshot.id,
    ...snapshot.data(),
  } as Workflow
}

export async function createWorkflow(data: WorkflowFormData): Promise<string> {
  const workflowsRef = collection(db, 'workflows')
  const now = Timestamp.now()

  const docRef = await addDoc(workflowsRef, {
    ...data,
    generatedContent: '',
    editedContent: '',
    status: 'DRAFT' as WorkflowStatus,
    googleDocUrl: null,
    googleDocId: null,
    createdAt: now,
    updatedAt: now,
  })

  return docRef.id
}

export async function updateWorkflow(
  id: string,
  data: Partial<{
    inputContent: string
    generatedContent: string
    editedContent: string
    status: WorkflowStatus
    googleDocUrl: string
    googleDocId: string
  }>
): Promise<void> {
  const docRef = doc(db, 'workflows', id)

  await updateDoc(docRef, {
    ...data,
    updatedAt: Timestamp.now(),
  })
}

export async function deleteWorkflow(id: string): Promise<void> {
  const docRef = doc(db, 'workflows', id)
  await deleteDoc(docRef)
}
