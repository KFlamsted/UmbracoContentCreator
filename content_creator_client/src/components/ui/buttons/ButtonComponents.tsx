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
  isSelected?: boolean
  size?: 'x-small' | 'small' | 'default' | 'large'
  fixedWidth?: boolean
}

export const ButtonComponent: React.FC<ButtonProps> = ({ 
  id, 
  children, 
  className = '', 
  isSelected = false,
  size = 'default',
  fixedWidth = true,
  disabled = false,
  type = 'button',
  ariaLabel,
  onClick
}) => {
  const getStateClasses = () => {
    return isSelected ? NAVBAR_BUTTON_SELECTED_CLASSES : NAVBAR_BUTTON_DEFAULT_CLASSES
  }

  const getSizeClasses = () => {
    switch (size) {
      case 'x-small':
        return 'px-1.5 py-0.5 text-xs'
      case 'small':
        return 'px-3 py-2 text-base'
      case 'large':
        return 'px-6 py-3 text-lg'
      case 'default':
      default:
        return DESIGN_TOKENS.BUTTON_PADDING
    }
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
      type={type}
      className={`
        ${NAVBAR_BUTTON_BASE_CLASSES}
        ${getSizeClasses()} 
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

// Navigation Button Component (uses LinkButtonComponent for consistency)
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
  return (
    <LinkButtonComponent
      id={id}
      isSelected={isSelected}
      size="default"
      disabled={disabled}
      ariaLabel={ariaLabel}
      onClick={onClick}
      className={`${fixedWidth ? DESIGN_TOKENS.BUTTON_WIDTH : ''} ${className}`}
    >
      {children}
    </LinkButtonComponent>
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

// Link Button Component (minimalistic design with vertical lines)
interface LinkButtonProps extends BaseButtonProps {
  href?: string
  target?: '_blank' | '_self' | '_parent' | '_top'
  rel?: string
  size?: 'x-small' | 'small' | 'default' | 'large'
  isSelected?: boolean
}

export const LinkButtonComponent: React.FC<LinkButtonProps> = ({ 
  id, 
  children, 
  className = '', 
  size = 'default',
  isSelected = false,
  disabled = false,
  ariaLabel,
  href,
  target,
  rel,
  onClick
}) => {
  const getStateClasses = () => {
    if (isSelected) {
      return `${DESIGN_TOKENS.PRIMARY_BG} text-white`
    }

    return `bg-transparent ${DESIGN_TOKENS.TEXT_BUTTON_DEFAULT} hover:${DESIGN_TOKENS.MUTED_BG_HOVER} hover:text-gray-900`
  }

  const getSizeClasses = () => {
    switch (size) {
      case 'x-small':
        return 'px-3 py-1 text-sm'
      case 'small':
        return 'px-4 py-2 text-base'
      case 'large':
        return 'px-6 py-3 text-xl'
      case 'default':
      default:
        return 'px-5 py-2 text-lg'
    }
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
        relative
        font-medium
        transition-all
        duration-200
        ease-in-out
        ${getSizeClasses()}
        ${getStateClasses()}
        ${getDisabledClasses()}
        ${className}
      `}
      onClick={onClick}
      aria-label={ariaLabel}
      aria-pressed={isSelected}
      {...linkProps}
    >
      {children}
    </a>
  )
}
