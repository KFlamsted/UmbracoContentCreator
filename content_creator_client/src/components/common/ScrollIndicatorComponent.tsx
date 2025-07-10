import { HOMEPAGE_SCROLL_INDICATOR_CLASSES } from '../../constants/styles'

interface ScrollIndicatorComponentProps {
  /**
   * Unique identifier for the scroll indicator
   */
  id: string
  /**
   * Additional CSS classes to apply to the scroll indicator
   */
  className?: string
  /**
   * Custom aria-label for accessibility
   */
  ariaLabel?: string
}

/**
 * ScrollIndicatorComponent - Animated scroll indicator with down arrow
 * 
 * Displays an animated down arrow that indicates scrollable content below.
 * Uses Tailwind's animate-bounce class for the animation effect.
 */
const ScrollIndicatorComponent: React.FC<ScrollIndicatorComponentProps> = ({
  id,
  className = '',
  ariaLabel = 'Scroll down for more content'
}) => {
  return (
    <div 
      id={id}
      className={`${HOMEPAGE_SCROLL_INDICATOR_CLASSES} ${className}`}
      aria-label={ariaLabel}
      role="button"
      tabIndex={0}
    >
      <svg 
        id={`${id}-arrow`}
        className="w-6 h-6" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path 
          id={`${id}-path`}
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M19 14l-7 7m0 0l-7-7m7 7V3" 
        />
      </svg>
    </div>
  )
}

export default ScrollIndicatorComponent
