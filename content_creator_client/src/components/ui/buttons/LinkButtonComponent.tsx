import React from 'react'
import { DESIGN_TOKENS } from '../../../constants/styles'

interface LinkButtonComponentProps {
  id: string
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'muted' | 'danger'
  size?: 'small' | 'default' | 'large'
  fullWidth?: boolean
  disabled?: boolean
  ariaLabel?: string
  href?: string
  target?: '_blank' | '_self' | '_parent' | '_top'
  rel?: string
  className?: string
  onClick?: () => void
}

export const LinkButtonComponent: React.FC<LinkButtonComponentProps> = ({ 
  id, 
  children, 
  className = '', 
  variant = 'primary',
  size = 'default',
  fullWidth = false,
  disabled = false,
  ariaLabel,
  href,
  target,
  rel,
  onClick
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'primary':
        return `${DESIGN_TOKENS.PRIMARY_BG} text-white hover:${DESIGN_TOKENS.PRIMARY_BG_HOVER} focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`
      case 'secondary':
        return `${DESIGN_TOKENS.SURFACE_BG} ${DESIGN_TOKENS.TEXT_BUTTON_DEFAULT} border border-gray-300 hover:${DESIGN_TOKENS.MUTED_BG_HOVER} hover:text-gray-900`
      case 'muted':
        return `${DESIGN_TOKENS.MUTED_BG} ${DESIGN_TOKENS.TEXT_BUTTON_DEFAULT} hover:${DESIGN_TOKENS.MUTED_BG_HOVER} hover:text-gray-900`
      case 'danger':
        return 'bg-red-600 text-white hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-opacity-50'
      default:
        return `${DESIGN_TOKENS.PRIMARY_BG} text-white hover:${DESIGN_TOKENS.PRIMARY_BG_HOVER}`
    }
  }

  const getSizeClasses = () => {
    switch (size) {
      case 'small':
        return 'px-3 py-2 text-sm'
      case 'large':
        return 'px-8 py-4 text-lg'
      case 'default':
      default:
        return DESIGN_TOKENS.BUTTON_PADDING
    }
  }

  const getWidthClass = () => {
    return fullWidth ? 'w-full' : ''
  }

  const getDisabledClasses = () => {
    return disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : 'cursor-pointer'
  }

  const linkProps = {
    ...(href && { href }),
    ...(target && { target }),
    ...(rel && { rel })
  }

  return (
    <a 
      id={id}
      className={`
        inline-flex 
        items-center 
        justify-center 
        text-center 
        no-underline 
        ${getSizeClasses()} 
        ${DESIGN_TOKENS.BORDER_RADIUS} 
        font-medium 
        transition-colors 
        focus:outline-none 
        ${getVariantClasses()} 
        ${getWidthClass()} 
        ${getDisabledClasses()} 
        ${className}
      `}
      onClick={onClick}
      aria-label={ariaLabel}
      {...linkProps}
    >
      {children}
    </a>
  )
}
