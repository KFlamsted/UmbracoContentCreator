import React from 'react'

interface LayerComponentProps {
  /**
   * Unique identifier for the layer component
   */
  id: string
  /**
   * Content to render in the layer
   */
  children: React.ReactNode
  /**
   * Layer type for z-index management
   */
  layer?: 'background' | 'overlay' | 'content'
  /**
   * Whether this layer should be relative positioned
   */
  relative?: boolean
  /**
   * Whether this layer should take full width
   */
  fullWidth?: boolean
  /**
   * Additional CSS classes
   */
  className?: string
}

/**
 * LayerComponent - Standardized layer management component
 * 
 * Handles z-index layering for complex layouts like AppShell.
 * Uses design tokens instead of inline Tailwind classes.
 */
export const LayerComponent: React.FC<LayerComponentProps> = ({
  id,
  children,
  layer = 'content',
  relative = false,
  fullWidth = true,
  className = ''
}) => {
  const getLayerClasses = () => {
    const positionClass = relative ? 'relative' : ''
    const widthClass = fullWidth ? 'w-full' : ''
    
    switch (layer) {
      case 'background':
        return `${positionClass} ${widthClass} z-0`
      case 'overlay':
        return `${positionClass} ${widthClass} z-10`
      case 'content':
        return `${positionClass} ${widthClass} z-20`
      default:
        return `${positionClass} ${widthClass} z-20`
    }
  }

  return (
    <div
      id={id}
      className={`${getLayerClasses()} ${className}`}
    >
      {children}
    </div>
  )
} 