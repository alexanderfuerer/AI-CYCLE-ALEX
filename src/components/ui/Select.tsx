import { ChevronDown } from 'lucide-react'

interface SelectOption {
  value: string
  label: string
}

interface SelectProps {
  label?: string
  value: string
  onChange: (value: string) => void
  options: SelectOption[]
  placeholder?: string
  disabled?: boolean
  required?: boolean
  error?: string
  className?: string
}

export function Select({
  label,
  value,
  onChange,
  options,
  placeholder = 'Bitte wählen...',
  disabled = false,
  required = false,
  error,
  className = '',
}: SelectProps) {
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          required={required}
          className={`
            w-full px-4 py-2 pr-10 text-sm rounded-lg border
            appearance-none bg-white
            transition-colors duration-200
            focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500
            disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed
            ${error ? 'border-red-500' : 'border-gray-300'}
          `}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  )
}
