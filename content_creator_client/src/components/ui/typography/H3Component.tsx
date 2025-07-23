import React from 'react'

interface H3ComponentProps {
  id: string
  children: React.ReactNode
  variant?: 'hero' | 'page' | 'section' | 'card'
  align?: 'left' | 'center' | 'right'
  className?: string
}

export const H3Component: React.FC<H3ComponentProps> = ({ 
  id, 
  children, 
  className = '', 
  variant = 'card',
  align = 'left'
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'hero':
        return 'text-3xl md:text-5xl font-bold text-white drop-shadow-2xl'
      case 'page':
        return 'text-xl font-bold text-gray-900'
      case 'section':
        return 'text-lg font-bold text-gray-900'
      case 'card':
        return 'text-lg font-bold text-gray-900'
      default:
        return 'text-lg font-bold text-gray-900'
    }
  }

  const getAlignClasses = () => {
    switch (align) {
      case 'left':
        return 'text-left'
      case 'center':
        return 'text-center'
      case 'right':
        return 'text-right'
      default:
        return 'text-left'
    }
  }

  return (
    <h3 
      id={id} 
      className={`${getVariantClasses()} ${getAlignClasses()} ${className}`}
    >
      {children}
    </h3>
  )
}
