import type { TextareaProps } from '../../types'

export function Textarea({
  label,
  placeholder,
  value,
  onChange,
  rows = 4,
  error,
  disabled = false,
  required = false,
  className = '',
}: TextareaProps) {
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        disabled={disabled}
        required={required}
        className={`
          w-full px-4 py-2 text-sm rounded-lg border
          transition-colors duration-200
          resize-none
          focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500
          disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed
          ${error ? 'border-red-500' : 'border-gray-300'}
        `}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  )
}
