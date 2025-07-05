/**
 * Utility functions for text processing and sanitization
 */

/**
 * Sanitizes HTML content by removing HTML tags and decoding HTML entities
 * This is useful for video titles that might contain HTML markup
 * @param text - The text that might contain HTML
 * @returns Plain text with HTML tags removed and entities decoded
 */
export const sanitizeHtml = (text: string): string => {
  if (!text) return ''
  
  // Create a temporary div element to leverage browser's HTML parsing
  const tempDiv = document.createElement('div')
  tempDiv.innerHTML = text
  
  // Get the text content (this automatically decodes HTML entities and removes tags)
  return tempDiv.textContent || tempDiv.innerText || ''
}

/**
 * Truncates text to a specified length and adds ellipsis if needed
 * @param text - The text to truncate
 * @param maxLength - Maximum length of the text
 * @returns Truncated text with ellipsis if needed
 */
export const truncateText = (text: string, maxLength: number = 60): string => {
  if (!text || text.length <= maxLength) return text
  return text.substring(0, maxLength).trim() + '...'
}

/**
 * Sanitizes and truncates text in one operation
 * Useful for video titles that might contain HTML and need length limiting
 * @param text - The text to sanitize and truncate
 * @param maxLength - Maximum length of the text
 * @returns Sanitized and truncated text
 */
export const sanitizeAndTruncateText = (text: string, maxLength: number = 60): string => {
  const sanitized = sanitizeHtml(text)
  return truncateText(sanitized, maxLength)
} 