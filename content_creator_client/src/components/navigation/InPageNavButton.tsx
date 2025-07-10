import type { ReactNode } from 'react'
import { DESIGN_TOKENS } from '../../constants/styles'

interface InPageNavButtonProps {
  children: ReactNode
  isSelected?: boolean
  onClick: () => void
}

// Smaller button styling for in-page navigation
const IN_PAGE_BUTTON_BASE_CLASSES = `px-4 py-2 ${DESIGN_TOKENS.BORDER_RADIUS} font-medium transition-colors cursor-pointer focus:outline-none focus:ring-0 focus:border-none active:outline-none active:ring-0 active:border-none text-sm`
const IN_PAGE_BUTTON_SELECTED_CLASSES = `${DESIGN_TOKENS.PRIMARY_BG} text-white hover:${DESIGN_TOKENS.PRIMARY_BG_HOVER}`
const IN_PAGE_BUTTON_DEFAULT_CLASSES = `${DESIGN_TOKENS.SURFACE_BG} ${DESIGN_TOKENS.TEXT_BUTTON_DEFAULT} hover:${DESIGN_TOKENS.MUTED_BG_HOVER} hover:text-gray-900`

const InPageNavButton: React.FC<InPageNavButtonProps> = ({
  children,
  isSelected = false,
  onClick,
}) => {
  const buttonClasses = `${IN_PAGE_BUTTON_BASE_CLASSES} ${
    isSelected ? IN_PAGE_BUTTON_SELECTED_CLASSES : IN_PAGE_BUTTON_DEFAULT_CLASSES
  }`
  const prefixId = children?.toString().toLowerCase().replace(/\s+/g, '-')
  return (
    <button 
      id={`in-page-nav-button-${prefixId ?? 'button'}`}
      className={buttonClasses} 
      onClick={onClick}
    >
      <span id={`in-page-nav-text-${prefixId ?? 'text'}`}>
        {children}
      </span>
    </button>
  )
}

export default InPageNavButton 