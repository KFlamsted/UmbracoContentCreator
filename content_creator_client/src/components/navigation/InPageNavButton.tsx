import type { ReactNode } from 'react'
import { ButtonComponent } from '../ui'

interface InPageNavButtonProps {
  children: ReactNode
  isSelected?: boolean
  onClick: () => void
}

const InPageNavButton: React.FC<InPageNavButtonProps> = ({
  children,
  isSelected = false,
  onClick,
}) => {
  const prefixId = children?.toString().toLowerCase().replace(/\s+/g, '-')
  
  return (
    <ButtonComponent
      id={`in-page-nav-button-${prefixId ?? 'button'}`}
      variant={isSelected ? 'secondary' : 'muted'}
      size="small"
      onClick={onClick}
    >
      {children}
    </ButtonComponent>
  )
}

export default InPageNavButton 