import React from 'react'
import { DESIGN_TOKENS } from '../../../constants/styles'

// Base Layout Props
interface BaseLayoutProps {
  id: string
  children: React.ReactNode
  className?: string
}

// Container Components
interface ContainerProps extends BaseLayoutProps {
  variant?: 'default' | 'homepage' | 'constrained'
  padding?: 'none' | 'small' | 'default' | 'large'
}

export const ContainerComponent: React.FC<ContainerProps> = ({ 
  id, 
  children, 
  className = '', 
  variant = 'default',
  padding = 'default'
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'homepage':
        return `w-full ${DESIGN_TOKENS.HOMEPAGE_MAX_WIDTH}`
      case 'constrained':
        return `w-full ${DESIGN_TOKENS.CONTAINER_MAX_WIDTH}`
      case 'default':
      default:
        return 'w-full'
    }
  }

  const getPaddingClasses = () => {
    switch (padding) {
      case 'none':
        return ''
      case 'small':
        return 'p-2'
      case 'large':
        return 'p-8'
      case 'default':
      default:
        return DESIGN_TOKENS.CARD_PADDING
    }
  }

  return (
    <div 
      id={id} 
      className={`${getVariantClasses()} ${getPaddingClasses()} ${className}`}
    >
      {children}
    </div>
  )
}

// Section Components
interface SectionProps extends BaseLayoutProps {
  variant?: 'default' | 'hero' | 'content' | 'card-section'
  spacing?: 'none' | 'small' | 'default' | 'large'
}

export const SectionComponent: React.FC<SectionProps> = ({ 
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

// Flex Layout Components
interface FlexProps extends BaseLayoutProps {
  direction?: 'row' | 'col'
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'
  align?: 'start' | 'center' | 'end' | 'stretch'
  wrap?: boolean
  gap?: 'none' | 'small' | 'default' | 'large'
}

export const FlexComponent: React.FC<FlexProps> = ({ 
  id, 
  children, 
  className = '', 
  direction = 'row',
  justify = 'start',
  align = 'start',
  wrap = false,
  gap = 'default'
}) => {
  const getDirectionClass = () => {
    return direction === 'col' ? 'flex-col' : 'flex-row'
  }

  const getJustifyClass = () => {
    switch (justify) {
      case 'center':
        return 'justify-center'
      case 'end':
        return 'justify-end'
      case 'between':
        return 'justify-between'
      case 'around':
        return 'justify-around'
      case 'evenly':
        return 'justify-evenly'
      case 'start':
      default:
        return 'justify-start'
    }
  }

  const getAlignClass = () => {
    switch (align) {
      case 'center':
        return 'items-center'
      case 'end':
        return 'items-end'
      case 'stretch':
        return 'items-stretch'
      case 'start':
      default:
        return 'items-start'
    }
  }

  const getGapClass = () => {
    switch (gap) {
      case 'none':
        return ''
      case 'small':
        return 'gap-2'
      case 'large':
        return 'gap-6'
      case 'default':
      default:
        return 'gap-4'
    }
  }

  const wrapClass = wrap ? 'flex-wrap' : ''

  return (
    <div 
      id={id} 
      className={`flex ${getDirectionClass()} ${getJustifyClass()} ${getAlignClass()} ${getGapClass()} ${wrapClass} ${className}`}
    >
      {children}
    </div>
  )
}

// Grid Layout Component
interface GridProps extends BaseLayoutProps {
  columns?: 2 | 3 | 4 | '1-md-2' | '1-md-2-lg-3'
  gap?: 'none' | 'small' | 'default' | 'large'
  equalHeight?: boolean
}

export const GridComponent: React.FC<GridProps> = ({ 
  id, 
  children, 
  className = '', 
  columns = 3,
  gap = 'default',
  equalHeight = false
}) => {
  const getColumnsClass = () => {
    switch (columns) {
      case '1-md-2':
        return DESIGN_TOKENS.GRID_COLS_1_MD_2
      case '1-md-2-lg-3':
        return DESIGN_TOKENS.GRID_COLS_1_MD_2_LG_3
      case 2:
        return DESIGN_TOKENS.GRID_COLS_2
      case 3:
        return DESIGN_TOKENS.GRID_COLS_3
      case 4:
        return DESIGN_TOKENS.GRID_COLS_4
      default:
        return DESIGN_TOKENS.GRID_COLS_3
    }
  }

  const getGapClass = () => {
    switch (gap) {
      case 'none':
        return 'gap-0'
      case 'small':
        return 'gap-2'
      case 'large':
        return 'gap-6'
      case 'default':
      default:
        return 'gap-4'
    }
  }

  const heightClass = equalHeight ? 'items-stretch' : ''

  return (
    <div 
      id={id} 
      className={`grid ${getColumnsClass()} ${getGapClass()} ${heightClass} ${className}`}
    >
      {children}
    </div>
  )
}

// Spacer Component for consistent spacing
interface SpacerProps {
  id: string
  size?: 'small' | 'default' | 'large' | 'xl'
  className?: string
}

export const SpacerComponent: React.FC<SpacerProps> = ({ 
  id, 
  size = 'default', 
  className = '' 
}) => {
  const getSizeClass = () => {
    switch (size) {
      case 'small':
        return 'h-2'
      case 'large':
        return 'h-8'
      case 'xl':
        return 'h-12'
      case 'default':
      default:
        return 'h-4'
    }
  }

  return (
    <div 
      id={id} 
      className={`w-full ${getSizeClass()} ${className}`} 
    />
  )
}
