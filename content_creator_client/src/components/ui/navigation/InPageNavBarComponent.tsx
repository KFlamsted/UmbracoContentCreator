import React, { useState, useEffect } from 'react'
import { DESIGN_TOKENS } from '../../../constants/styles'

interface InPageNavBarComponentProps {
  id: string
  children: React.ReactNode
  isVisible?: boolean
}

export const InPageNavBarComponent: React.FC<InPageNavBarComponentProps> = ({
  id,
  children,
  isVisible = true,
}) => {
  const [isAnimating, setIsAnimating] = useState(false)
  const [shouldRender, setShouldRender] = useState(isVisible)

  useEffect(() => {
    if (isVisible) {
      // Show the component and start animation
      setShouldRender(true)
      setTimeout(() => setIsAnimating(true), 10) // Small delay for initial render
    } else {
      // Start hide animation
      setIsAnimating(false)
      // Remove from DOM after animation completes
      setTimeout(() => setShouldRender(false), 300)
    }
  }, [isVisible])

  // Match the main navbar styling from NAVBAR_CLASSES but without positioning - full width, no rounded edges
  const navbarCardClasses = `
    w-full 
    ${DESIGN_TOKENS.MUTED_BG} 
    ${DESIGN_TOKENS.CARD_SHADOW} 
    py-2 
    px-4
    transform
    transition-all
    duration-300
    ease-in-out
    animate-in
    slide-in-from-top
    fade-in
    ${isAnimating ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}
  `

  if (!shouldRender) return null

  return (
    <div id={id} className={navbarCardClasses}>
      {children}
    </div>
  )
}
