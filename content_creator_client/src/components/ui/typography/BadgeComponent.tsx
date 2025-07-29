import React from 'react'
import { DESIGN_TOKENS } from '../../../constants/styles'

interface BadgeComponentProps {
  id: string
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info'
  size?: 'small' | 'default' | 'large'
  className?: string
}

export const BadgeComponent: React.FC<BadgeComponentProps> = ({
  id,
  children,
  variant = 'primary',
  size = 'default',
  className = ''
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'primary':
        return `${DESIGN_TOKENS.PRIMARY_BG} text-white`
      case 'secondary':
        return 'bg-gray-500 text-white'
      case 'success':
        return 'bg-green-600 text-white'
      case 'warning':
        return 'bg-yellow-600 text-white'
      case 'danger':
        return 'bg-red-600 text-white'
      case 'info':
        return 'bg-blue-500 text-white'
      default:
        return `${DESIGN_TOKENS.PRIMARY_BG} text-white`
    }
  }

  const getSizeClasses = () => {
    switch (size) {
      case 'small':
        return 'px-1.5 py-0.5 text-xs'
      case 'large':
        return 'px-3 py-1.5 text-sm'
      case 'default':
      default:
        return `${DESIGN_TOKENS.BADGE_PADDING} ${DESIGN_TOKENS.BADGE_TEXT_SIZE}`
    }
  }

  return (
    <span
      id={id}
      className={`
        inline-flex 
        items-center 
        ${getSizeClasses()} 
        ${DESIGN_TOKENS.BADGE_RADIUS} 
        font-medium 
        ${getVariantClasses()} 
        ${className}
      `}
    >
      {children}
    </span>
  )
}
