import { Routes, Route, Link, useLocation } from 'react-router-dom'
import { Workflow, Users, Settings } from 'lucide-react'
import { EmployeesPage, EmployeeSetupPage, WorkflowPage } from './pages'

function Navigation() {
  const location = useLocation()

  const navItems = [
    { path: '/', icon: Workflow, label: 'Workflow' },
    { path: '/employees', icon: Users, label: 'Mitarbeiter' },
  ]

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
              <Workflow className="w-5 h-5 text-white" />
            </div>
            <span className="font-semibold text-gray-900">FIVE LI Content Flow</span>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center gap-1">
            {navItems.map(({ path, icon: Icon, label }) => {
              const isActive = path === '/'
                ? location.pathname === '/'
                : location.pathname.startsWith(path)

              return (
                <Link
                  key={path}
                  to={path}
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium
                    transition-colors duration-200
                    ${isActive
                      ? 'bg-primary-50 text-primary-700'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }
                  `}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </Link>
              )
            })}
          </nav>

          {/* Settings (placeholder) */}
          <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  )
}

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main>
        <Routes>
          <Route path="/" element={<WorkflowPage />} />
          <Route path="/employees" element={<EmployeesPage />} />
          <Route path="/employees/:id" element={<EmployeeSetupPage />} />
        </Routes>
      </main>
    </div>
  )
}
