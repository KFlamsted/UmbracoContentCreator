import React from 'react'

interface PositionedComponentProps {
  id: string
  children: React.ReactNode
  position?: 'absolute' | 'relative' | 'fixed' | 'sticky'
  top?: 'auto' | 'top-0' | 'top-1' | 'top-2' | 'top-4' | 'top-8'
  right?: 'auto' | 'right-0' | 'right-1' | 'right-2' | 'right-4' | 'right-8'
  bottom?: 'auto' | 'bottom-0' | 'bottom-1' | 'bottom-2' | 'bottom-4' | 'bottom-8'
  left?: 'auto' | 'left-0' | 'left-1' | 'left-2' | 'left-4' | 'left-8'
  zIndex?: 'z-0' | 'z-10' | 'z-20' | 'z-30' | 'z-40' | 'z-50'
  className?: string
}

interface CenteredPositionedComponentProps {
  id: string
  children: React.ReactNode
  position?: 'absolute' | 'fixed'
  top?: 'auto' | 'top-0' | 'top-1' | 'top-2' | 'top-4' | 'top-8' | 'top-12' | 'top-16' | 'top-20' | 'top-24'
  bottom?: 'auto' | 'bottom-0' | 'bottom-1' | 'bottom-2' | 'bottom-4' | 'bottom-8'
  zIndex?: 'z-0' | 'z-10' | 'z-20' | 'z-30' | 'z-40' | 'z-50'
  width?: 'w-full' | 'w-auto' | 'w-1/2' | 'w-3/4' | 'w-4/5' | 'w-11/12'
  maxWidth?: 'max-w-none' | 'max-w-sm' | 'max-w-md' | 'max-w-lg' | 'max-w-xl' | 'max-w-2xl' | 'max-w-3xl' | 'max-w-4xl' | 'max-w-5xl' | 'max-w-6xl' | 'max-w-7xl'
}

export const PositionedComponent: React.FC<PositionedComponentProps> = ({
  id,
  children,
  position = 'absolute',
  top = 'auto',
  right = 'auto',
  bottom = 'auto',
  left = 'auto',
  zIndex,
  className = ''
}) => {
  const positionClasses = [
    position,
    top !== 'auto' ? top : '',
    right !== 'auto' ? right : '',
    bottom !== 'auto' ? bottom : '',
    left !== 'auto' ? left : '',
    zIndex || ''
  ].filter(Boolean).join(' ')

  return (
    <div
      id={id}
      className={`${positionClasses} ${className}`}
    >
      {children}
    </div>
  )
}

// Convenience components for common positioning patterns
export const AbsoluteTopRightComponent: React.FC<{
  id: string
  children: React.ReactNode
  spacing?: 'tight' | 'default' | 'loose'
  className?: string
}> = ({ id, children, spacing = 'default', className = '' }) => {
  const getSpacingClasses = () => {
    switch (spacing) {
      case 'tight':
        return 'top-1 right-1'
      case 'loose':
        return 'top-4 right-4'
      case 'default':
      default:
        return 'top-2 right-2'
    }
  }

  return (
    <div
      id={id}
      className={`absolute ${getSpacingClasses()} ${className}`}
    >
      {children}
    </div>
  )
}

export const AbsoluteBottomRightComponent: React.FC<{
  id: string
  children: React.ReactNode
  spacing?: 'tight' | 'default' | 'loose'
  className?: string
}> = ({ id, children, spacing = 'default', className = '' }) => {
  const getSpacingClasses = () => {
    switch (spacing) {
      case 'tight':
        return 'bottom-1 right-1'
      case 'loose':
        return 'bottom-4 right-4'
      case 'default':
      default:
        return 'bottom-2 right-2'
    }
  }

  return (
    <div
      id={id}
      className={`absolute ${getSpacingClasses()} ${className}`}
    >
      {children}
    </div>
  )
}

export const CenteredPositionedComponent: React.FC<CenteredPositionedComponentProps> = ({
  id,
  children,
  position = 'fixed',
  top = 'auto',
  bottom = 'auto',
  zIndex = 'z-0',
  width = 'w-full',
  maxWidth = 'max-w-6xl'
}) => {
  const baseClasses = [
    position,
    'left-1/2',
    'transform',
    '-translate-x-1/2',
    width,
    maxWidth,
    top,
    bottom,
    zIndex
  ].join(' ')
  
  return (
    <div id={id} className={baseClasses}>
      {children}
    </div>
  )
}
