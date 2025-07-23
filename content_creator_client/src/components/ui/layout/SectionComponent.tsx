import React from 'react'

interface SectionComponentProps {
  id: string
  children: React.ReactNode
  variant?: 'default' | 'hero' | 'content' | 'card-section'
  spacing?: 'none' | 'small' | 'default' | 'large'
  className?: string
}

export const SectionComponent: React.FC<SectionComponentProps> = ({ 
  id, 
  children, 
  className = '', 
  variant = 'default',
  spacing = 'default'
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'hero':
        return 'min-h-screen flex flex-col justify-center items-center px-4 py-8 text-center'
      case 'content':
        return 'min-h-screen flex flex-col justify-center items-center px-4 py-8'
      case 'card-section':
        return 'w-full'
      case 'default':
      default:
        return 'w-full'
    }
  }

  const getSpacingClasses = () => {
    switch (spacing) {
      case 'none':
        return ''
      case 'small':
        return 'mb-1'
      case 'large':
        return 'mb-4'
      case 'default':
      default:
        return 'mb-2'
    }
  }

  return (
    <section 
      id={id} 
      className={`${getVariantClasses()} ${getSpacingClasses()} ${className}`}
    >
      {children}
    </section>
  )
}
