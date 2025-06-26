import React from 'react'
import { useGlobalData } from '../../hooks/useGlobalData'
import { DESIGN_TOKENS } from '../../constants/styles'

const Footer: React.FC = () => {
  const { globalData } = useGlobalData()

  if (!globalData.footerText) {
    return null
  }

  return (
    <footer className={`mt-auto py-4 ${DESIGN_TOKENS.SECTION_PADDING_X} text-center text-sm ${DESIGN_TOKENS.TEXT_MUTED} ${DESIGN_TOKENS.SURFACE_BG} backdrop-blur-sm border-t border-gray-200 w-full ${DESIGN_TOKENS.CONTAINER_MAX_WIDTH} ${DESIGN_TOKENS.BORDER_RADIUS} mx-auto`}>
      {globalData.footerText}
    </footer>
  )
}

export default Footer
