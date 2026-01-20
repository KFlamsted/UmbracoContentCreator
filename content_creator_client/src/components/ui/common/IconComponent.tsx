import React from 'react'

interface IconComponentProps {
  id: string
  size?: 'small' | 'default' | 'large' | 'xl'
  className?: string
  imageUrl?: string
}

export const HomeIconComponent: React.FC<IconComponentProps> = ({ 
  id, 
  size = 'default',
  className = '',
  imageUrl
}) => {
  const getSizeClass = () => {
    switch (size) {
      case 'small':
        return 'w-4 h-4'
      case 'large':
        return 'w-8 h-8'
      case 'xl':
        return 'w-12 h-12'
      case 'default':
      default:
        return 'w-6 h-6'
    }
  }

  // If an image URL is provided, render it instead of the SVG
  if (imageUrl) {
    return (
      <div id={`${id}-icon`} className="flex items-center justify-center w-full h-full">
        <img 
          id={`${id}-img`}
          src={imageUrl}
          alt="Home"
          className={`${getSizeClass()} ${className} object-contain`}
        />
      </div>
    )
  }

  // Default SVG icon
  return (
    <div id={`${id}-icon`} className="flex items-center justify-center w-full h-full">
      <svg 
        id={`${id}-svg`}
        className={`${getSizeClass()} ${className}`}
        fill="currentColor" 
        viewBox="0 0 20 20"
      >
        <path 
          id={`${id}-path`} 
          d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" 
        />
      </svg>
    </div>
  )
}
