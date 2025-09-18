import type { ReactNode } from 'react'
import { LinkButtonComponent } from '../ui'

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
    <LinkButtonComponent
      id={`in-page-nav-button-${prefixId ?? 'button'}`}
      isSelected={isSelected}
      size="x-small"
      onClick={onClick}
    >
      {children}
    </LinkButtonComponent>
  )
}

export default InPageNavButton 