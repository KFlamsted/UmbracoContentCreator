import { useContext } from 'react'
import { GlobalDataContext } from '../context/GlobalDataContext'

export const useGlobalData = () => {
  const context = useContext(GlobalDataContext)
  if (!context) {
    throw new Error('useGlobalData must be used within a GlobalDataProvider')
  }
  return context
}
