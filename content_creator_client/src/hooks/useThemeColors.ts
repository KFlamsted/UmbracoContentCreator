import { useGlobalData } from './useGlobalData'

/**
 * Custom hook to access theme colors from global data
 * These colors are defined in the HomePage and are available globally
 */
export const useThemeColors = () => {
  const { globalData } = useGlobalData()

  return {
    color1: globalData.color1,
    color2: globalData.color2,
    color3: globalData.color3,
    /**
     * Returns CSS custom properties object for easy use in components
     */
    getCSSProperties: () => ({
      '--theme-color-1': globalData.color1 || '#000000',
      '--theme-color-2': globalData.color2 || '#333333',
      '--theme-color-3': globalData.color3 || '#666666',
    } as React.CSSProperties),
  }
}
