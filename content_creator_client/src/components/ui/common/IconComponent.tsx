import React from 'react'

interface IconComponentProps {
  id: string
  size?: 'small' | 'default' | 'large'
  className?: string
}

export const HomeIconComponent: React.FC<IconComponentProps> = ({ 
  id, 
  size = 'default',
  className = '' 
}) => {
  const getSizeClass = () => {
    switch (size) {
      case 'small':
        return 'w-4 h-4'
      case 'large':
        return 'w-8 h-8'
      case 'default':
      default:
        return 'w-6 h-6'
    }
  }

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
