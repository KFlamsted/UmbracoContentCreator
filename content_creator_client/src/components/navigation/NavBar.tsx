import type { ReactNode } from 'react'

interface NavBarButtonProps {
  children?: ReactNode
  isHomePageButton?: boolean
  isSelected?: boolean
  onClick?: () => void
}

const NavBarButton: React.FC<NavBarButtonProps> = ({ 
  children, 
  isHomePageButton = false, 
  isSelected = false, 
  onClick 
}) => {
  const baseClasses = 'px-6 py-3 rounded-lg font-medium transition-colors cursor-pointer focus:outline-none focus:ring-0 focus:border-none active:outline-none active:ring-0 active:border-none'
  const selectedClasses = isSelected 
    ? 'bg-blue-600 text-gray-500 hover:bg-blue-700' 
    : 'bg-white text-gray-800 hover:bg-blue-50 hover:text-gray-900'
    
  return (
    <button 
      className={`${baseClasses} ${selectedClasses}`}
      onClick={onClick}
      style={{ outline: 'none', border: 'none' }}
    >
      {isHomePageButton ? (
        <div className="flex items-center justify-center w-8 h-8">
          <svg 
            className="w-6 h-6" 
            fill="currentColor" 
            viewBox="0 0 20 20"
          >
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
          </svg>
        </div>
      ) : (
        children
      )}
    </button>
  )
}

interface NavBarProps {
  children: ReactNode
}

const NavBar: React.FC<NavBarProps> = ({ children }) => {
  return (
    <nav className="w-full bg-blue-200 py-4">
      <div className="w-full max-w-6xl mx-auto">
        <div className="flex gap-4">
          {children}
        </div>
      </div>
    </nav>
  )
}

export default NavBar
export { NavBarButton }
