import React from 'react'
import { 
  DESIGN_TOKENS,
  NAVBAR_BUTTON_BASE_CLASSES,
  NAVBAR_BUTTON_SELECTED_CLASSES,
  NAVBAR_BUTTON_DEFAULT_CLASSES
} from '../../../constants/styles.ts'

// Base Button Props
interface BaseButtonProps {
  id: string
  children: React.ReactNode
  className?: string
  onClick?: () => void
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  ariaLabel?: string
}

// Standard Button Component
interface ButtonProps extends BaseButtonProps {
  variant?: 'primary' | 'secondary' | 'muted' | 'danger'
  size?: 'small' | 'default' | 'large'
  fullWidth?: boolean
}

export const ButtonComponent: React.FC<ButtonProps> = ({ 
  id, 
  children, 
  className = '', 
  variant = 'primary',
  size = 'default',
  fullWidth = false,
  disabled = false,
  type = 'button',
  ariaLabel,
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
    return disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
  }

  return (
    <button 
      id={id}
      type={type}
      className={`
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
      disabled={disabled}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  )
}

// Navigation Button Component (for navbar use)
interface NavButtonProps extends BaseButtonProps {
  isSelected?: boolean
  fixedWidth?: boolean
}

export const NavButtonComponent: React.FC<NavButtonProps> = ({ 
  id, 
  children, 
  className = '', 
  isSelected = false,
  fixedWidth = true,
  disabled = false,
  ariaLabel,
  onClick
}) => {
  const getStateClasses = () => {
    return isSelected ? NAVBAR_BUTTON_SELECTED_CLASSES : NAVBAR_BUTTON_DEFAULT_CLASSES
  }

  const getWidthClass = () => {
    return fixedWidth ? DESIGN_TOKENS.BUTTON_WIDTH : ''
  }

  const getDisabledClasses = () => {
    return disabled ? 'opacity-50 cursor-not-allowed' : ''
  }

  return (
    <button 
      id={id}
      type="button"
      className={`
        ${NAVBAR_BUTTON_BASE_CLASSES} 
        ${getStateClasses()} 
        ${getWidthClass()} 
        ${getDisabledClasses()} 
        ${className}
      `}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      aria-pressed={isSelected}
    >
      {children}
    </button>
  )
}

// Icon Button Component
interface IconButtonProps extends BaseButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'small' | 'default' | 'large'
  icon: React.ReactNode
  isRound?: boolean
}

export const IconButtonComponent: React.FC<IconButtonProps> = ({ 
  id, 
  children,
  icon,
  className = '', 
  variant = 'ghost',
  size = 'default',
  isRound = true,
  disabled = false,
  type = 'button',
  ariaLabel,
  onClick
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'primary':
        return `${DESIGN_TOKENS.PRIMARY_BG} text-white hover:${DESIGN_TOKENS.PRIMARY_BG_HOVER}`
      case 'secondary':
        return `${DESIGN_TOKENS.SURFACE_BG} ${DESIGN_TOKENS.TEXT_BUTTON_DEFAULT} border border-gray-300 hover:${DESIGN_TOKENS.MUTED_BG_HOVER}`
      case 'ghost':
      default:
        return 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
    }
  }

  const getSizeClasses = () => {
    switch (size) {
      case 'small':
        return 'w-8 h-8 p-1'
      case 'large':
        return 'w-12 h-12 p-3'
      case 'default':
      default:
        return 'w-10 h-10 p-2'
    }
  }

  const getShapeClass = () => {
    return isRound ? 'rounded-full' : DESIGN_TOKENS.BORDER_RADIUS
  }

  const getDisabledClasses = () => {
    return disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
  }

  return (
    <button 
      id={id}
      type={type}
      className={`
        inline-flex 
        items-center 
        justify-center 
        ${getSizeClasses()} 
        ${getShapeClass()} 
        transition-colors 
        focus:outline-none 
        focus:ring-2 
        focus:ring-opacity-50 
        ${getVariantClasses()} 
        ${getDisabledClasses()} 
        ${className}
      `}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      {icon}
      {children && <span className="sr-only">{children}</span>}
    </button>
  )
}

// Link Button Component (styled like button but behaves like link)
interface LinkButtonProps extends Omit<ButtonProps, 'type'> {
  href?: string
  target?: '_blank' | '_self' | '_parent' | '_top'
  rel?: string
}

export const LinkButtonComponent: React.FC<LinkButtonProps> = ({ 
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
