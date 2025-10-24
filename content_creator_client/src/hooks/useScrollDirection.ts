import { useState, useEffect } from 'react'

/**
 * Custom hook to detect scroll direction and control navbar visibility
 * 
 * @returns isVisible - boolean indicating whether the navbar should be visible
 * 
 * Behavior:
 * - Always visible when scrollY <= 50px (at top of page)
 * - Hides when scrolling down by at least 10px
 * - Shows when scrolling up by at least 10px
 * - Uses requestAnimationFrame for optimal performance
 */
export const useScrollDirection = () => {
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    let ticking = false

    const updateScrollDirection = () => {
      const scrollY = window.scrollY

      // Always show navbar at the top of the page
      if (scrollY <= 50) {
        setIsVisible(true)
        setLastScrollY(scrollY)
        ticking = false
        return
      }

      // Calculate scroll difference
      const scrollDifference = scrollY - lastScrollY

      // Only update if scrolled at least 10px (prevents jitter)
      if (Math.abs(scrollDifference) >= 10) {
        if (scrollDifference > 0) {
          // Scrolling down - hide navbar
          setIsVisible(false)
        } else {
          // Scrolling up - show navbar
          setIsVisible(true)
        }
        setLastScrollY(scrollY)
      }

      ticking = false
    }

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollDirection)
        ticking = true
      }
    }

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll, { passive: true })

    // Cleanup on unmount
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [lastScrollY])

  return isVisible
}
