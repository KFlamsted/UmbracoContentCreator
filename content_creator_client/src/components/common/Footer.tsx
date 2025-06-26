import React from 'react'
import { useGlobalData } from '../../hooks/useGlobalData'

const Footer: React.FC = () => {
  const { globalData } = useGlobalData()

  if (!globalData.footerText) {
    return null
  }

  return (
    <footer className="mt-auto py-4 px-6 text-center text-sm text-gray-600 bg-white/80 backdrop-blur-sm border-t border-gray-200">
      {globalData.footerText}
    </footer>
  )
}

export default Footer
