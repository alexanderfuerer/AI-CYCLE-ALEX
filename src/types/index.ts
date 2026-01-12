import { Timestamp } from 'firebase/firestore'

// ============================================
// EMPLOYEE TYPES
// ============================================

export interface Employee {
  id: string
  name: string
  email: string
  linkedinProfile: string
  googleDriveFolderId: string
  toneDescription: string
  sampleTextsUrl: string
  createdAt: Timestamp
  updatedAt: Timestamp
}

export interface EmployeeFormData {
  name: string
  email: string
  linkedinProfile: string
  googleDriveFolderId: string
  toneDescription: string
}

// ============================================
// STYLE PROFILE TYPES
// ============================================

export interface SentenceLengthDistribution {
  under3Words: number
  words4to8: number
  words9to15: number
  words16to25: number
  over25Words: number
}

export interface QuantitativeProfile {
  avgWordsPerPost: number
  avgWordsPerSentence: number
  avgSentencesPerParagraph: number
  avgLinesPerParagraph: number
  avgEmojisPerPost: number
  emojiToTextRatio: number
  topEmojis: string[]
  topWords: string[]
  avgLineBreaksPerPost: number
  avgParagraphBreaksPerPost: number
  sentenceLengthDistribution: SentenceLengthDistribution
}

export interface QualitativeProfile {
  tonality: string
  rhythm: string
  communicationStyle: string
  beliefs: string
}

export interface StyleProfile {
  id: string
  employeeId: string
  analyzedAt: Timestamp
  quantitative: QuantitativeProfile
  qualitative: QualitativeProfile
}

// ============================================
// WORKFLOW TYPES
// ============================================

export type WorkflowStatus = 'DRAFT' | 'GENERATING' | 'REVIEW' | 'APPROVED' | 'NOTIFIED'

export interface Workflow {
  id: string
  employeeId: string
  inputContent: string
  generatedContent: string
  editedContent: string
  status: WorkflowStatus
  googleDocUrl: string | null
  googleDocId: string | null
  createdAt: Timestamp
  updatedAt: Timestamp
}

export interface WorkflowFormData {
  employeeId: string
  inputContent: string
}

// ============================================
// NODE EDITOR TYPES
// ============================================

export interface ContentInputNodeData {
  content: string
  onChange: (content: string) => void
}

export interface EmployeeSelectNodeData {
  selectedEmployeeId: string | null
  employees: Employee[]
  styleProfile: StyleProfile | null
  onSelect: (employeeId: string) => void
}

export interface GeneratorNodeData {
  isGenerating: boolean
  generatedContent: string | null
  onGenerate: () => void
}

export interface ReviewNodeData {
  content: string
  originalContent: string
  wordCount: number
  emojiCount: number
  paragraphCount: number
  onEdit: (content: string) => void
  onRegenerate: () => void
  onSave: () => void
  onApprove: () => void
}

export interface GoogleDocsNodeData {
  isCreating: boolean
  docUrl: string | null
  error: string | null
}

export interface NotificationNodeData {
  isSending: boolean
  sent: boolean
  error: string | null
}

// ============================================
// API RESPONSE TYPES
// ============================================

export interface ClaudeAnalysisResponse {
  quantitative: QuantitativeProfile
  qualitative: QualitativeProfile
}

export interface GoogleDocResponse {
  docUrl: string
  docId: string
}

// ============================================
// UI COMPONENT TYPES
// ============================================

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost'
export type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps {
  children: React.ReactNode
  variant?: ButtonVariant
  size?: ButtonSize
  disabled?: boolean
  loading?: boolean
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  className?: string
}

export type InputSize = 'sm' | 'md' | 'lg'

export interface InputProps {
  label?: string
  placeholder?: string
  value: string
  onChange: (value: string) => void
  type?: 'text' | 'email' | 'password' | 'url'
  size?: InputSize
  error?: string
  disabled?: boolean
  required?: boolean
  className?: string
}

export interface TextareaProps {
  label?: string
  placeholder?: string
  value: string
  onChange: (value: string) => void
  rows?: number
  error?: string
  disabled?: boolean
  required?: boolean
  className?: string
}

export interface CardProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  hoverable?: boolean
}

export interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

export interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info'
  className?: string
}
