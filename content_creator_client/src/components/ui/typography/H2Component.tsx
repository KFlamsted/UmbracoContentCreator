import React from 'react'

interface H2ComponentProps {
  id: string
  children: React.ReactNode
  variant?: 'hero' | 'page' | 'section' | 'card'
  align?: 'left' | 'center' | 'right'
  className?: string
}

export const H2Component: React.FC<H2ComponentProps> = ({ 
  id, 
  children, 
  className = '', 
  variant = 'section',
  align = 'left'
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'hero':
        return 'text-4xl md:text-6xl font-bold text-white drop-shadow-2xl'
      case 'page':
        return 'text-2xl font-bold text-gray-900'
      case 'section':
        return 'text-xl font-bold text-gray-900'
      case 'card':
        return 'text-lg font-bold text-gray-900'
      default:
        return 'text-xl font-bold text-gray-900'
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
    <h2 
      id={id} 
      className={`${getVariantClasses()} ${getAlignClasses()} ${className}`}
    >
      {children}
    </h2>
  )
}
