/**
 * Utility functions for date formatting and manipulation
 */

/**
 * Formats a date string to Danish locale format
 * @param dateString - The date string to format
 * @returns Formatted date string in Danish locale or the original string if formatting fails
 */
export const formatDate = (dateString?: string, locale: string = 'da-DK'): string | undefined => {
  if (!dateString) return undefined
  
  try {
    const date = new Date(dateString)
    return date.toLocaleDateString(locale, { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  } catch {
    return dateString
  }
}
