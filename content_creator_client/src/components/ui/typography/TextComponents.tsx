import React from 'react'
import { DESIGN_TOKENS } from '../../../constants/styles'

// Base Typography Props
interface BaseTypographyProps {
  id: string
  children: React.ReactNode
  className?: string
}

// Text Components
interface TextProps extends BaseTypographyProps {
  variant?: 'body' | 'small' | 'caption' | 'meta' | 'muted'
  align?: 'left' | 'center' | 'right'
}

export const TextComponent: React.FC<TextProps> = ({ 
  id, 
  children, 
  className = '', 
  variant = 'body',
  align = 'left'
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'body':
        return `${DESIGN_TOKENS.BODY_SIZE} ${DESIGN_TOKENS.TEXT_BODY}`
      case 'small':
        return 'text-sm text-gray-600'
      case 'caption':
        return 'text-xs opacity-90'
      case 'meta':
        return 'text-xs opacity-80'
      case 'muted':
        return `${DESIGN_TOKENS.BODY_SIZE} ${DESIGN_TOKENS.TEXT_MUTED}`
      default:
        return `${DESIGN_TOKENS.BODY_SIZE} ${DESIGN_TOKENS.TEXT_BODY}`
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
    <p 
      id={id} 
      className={`${getVariantClasses()} ${getAlignClasses()} ${className}`}
    >
      {children}
    </p>
  )
}

// Span component for inline text
export const SpanComponent: React.FC<TextProps> = ({ 
  id, 
  children, 
  className = '', 
  variant = 'body',
  align = 'left'
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'body':
        return `${DESIGN_TOKENS.TEXT_BODY}`
      case 'small':
        return 'text-sm text-gray-600'
      case 'caption':
        return 'text-xs opacity-90'
      case 'meta':
        return 'text-xs opacity-80'
      case 'muted':
        return `${DESIGN_TOKENS.TEXT_MUTED}`
      default:
        return `${DESIGN_TOKENS.TEXT_BODY}`
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
    <span 
      id={id} 
      className={`${getVariantClasses()} ${getAlignClasses()} ${className}`}
    >
      {children}
    </span>
  )
}

// Rich Text Component for parsed HTML content
interface RichTextProps extends BaseTypographyProps {
  content: string
}

export const RichTextComponent: React.FC<RichTextProps> = ({ 
  id, 
  content, 
  className = '' 
}) => {
  const richTextClasses = `${DESIGN_TOKENS.BODY_SIZE} ${DESIGN_TOKENS.TEXT_BODY} prose prose-lg max-w-none [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6`
  
  return (
    <div 
      id={id} 
      className={`${richTextClasses} ${className}`}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  )
}
