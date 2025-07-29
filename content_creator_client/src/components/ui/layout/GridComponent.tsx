import React from 'react'
import { DESIGN_TOKENS } from '../../../constants/styles'

interface GridComponentProps {
  id: string
  children: React.ReactNode
  columns?: 2 | 3 | 4 | '1-md-2' | '1-md-2-lg-3'
  gap?: 'none' | 'small' | 'default' | 'large'
  equalHeight?: boolean
  className?: string
}

export const GridComponent: React.FC<GridComponentProps> = ({ 
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
