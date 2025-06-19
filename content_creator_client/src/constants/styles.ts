// Design System Tokens (these provide real value)
export const DESIGN_TOKENS = {
  // Layout & Spacing
  CONTAINER_MAX_WIDTH: 'max-w-6xl',
  CARD_PADDING: 'p-6',
  SECTION_PADDING_Y: 'py-8',
  SECTION_PADDING_X: 'px-4',
  BUTTON_PADDING: 'px-6 py-3',
  BUTTON_WIDTH: 'w-32',

  // Visual Design
  BORDER_RADIUS: 'rounded-lg',
  CARD_SHADOW: 'shadow-md',

  // Colors (brand/theme colors that might change)
  PRIMARY_BG: 'bg-blue-600',
  PRIMARY_BG_HOVER: 'bg-blue-700',
  SURFACE_BG: 'bg-white',
  MUTED_BG: 'bg-blue-200',
  MUTED_BG_HOVER: 'bg-blue-50',

  // Typography Scale
  HEADING_SIZE: 'text-3xl',
  BODY_SIZE: 'text-lg',
  // State Colors
  TEXT_MUTED: 'text-gray-600',
  TEXT_ERROR: 'text-red-600',
  TEXT_BODY: 'text-gray-700',
  TEXT_HEADING: 'text-gray-900',
  TEXT_BUTTON_DEFAULT: 'text-gray-800',
  TEXT_BUTTON_MUTED: 'text-gray-500',  // Grid & Layout
  GRID_COLS_2: 'grid-cols-2',
  GRID_COLS_3: 'grid-cols-3',
  GRID_COLS_4: 'grid-cols-4',

  // Background & Overlay
  BACKGROUND_OVERLAY_DARK: 'bg-black bg-opacity-40',
  BACKGROUND_OVERLAY_LIGHT: 'bg-black bg-opacity-20',
} as const

// Semantic Component Classes (meaningful combinations)
export const CARD_CLASSES = `w-full ${DESIGN_TOKENS.CONTAINER_MAX_WIDTH} ${DESIGN_TOKENS.SURFACE_BG} ${DESIGN_TOKENS.BORDER_RADIUS} ${DESIGN_TOKENS.CARD_SHADOW} ${DESIGN_TOKENS.CARD_PADDING} mb-2`

// Card classes with backdrop blur (used on pages with background images)
export const BACKDROP_BLUR_CARD_CLASSES = `w-full ${DESIGN_TOKENS.CONTAINER_MAX_WIDTH} bg-white bg-opacity-95 ${DESIGN_TOKENS.BORDER_RADIUS} ${DESIGN_TOKENS.CARD_SHADOW} ${DESIGN_TOKENS.CARD_PADDING} mb-2 backdrop-blur-sm`

export const TITLE_CARD_CLASSES = `${CARD_CLASSES} mb-6`

export const TITLE_CLASSES = `${DESIGN_TOKENS.HEADING_SIZE} font-bold text-center ${DESIGN_TOKENS.TEXT_HEADING}`

export const BODY_TEXT_CLASSES = `${DESIGN_TOKENS.BODY_SIZE} ${DESIGN_TOKENS.TEXT_BODY} prose prose-lg max-w-none [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6`

export const APP_SHELL_CONTAINER_CLASSES = `min-h-screen flex flex-col items-center justify-start ${DESIGN_TOKENS.SECTION_PADDING_X} ${DESIGN_TOKENS.SECTION_PADDING_Y}`

// Dynamic container classes - use these instead of the static ones above
export const getAppShellContainerClasses = (hasBackgroundImage: boolean) => 
  `min-h-screen ${hasBackgroundImage ? '' : DESIGN_TOKENS.MUTED_BG} flex flex-col items-center justify-start ${DESIGN_TOKENS.SECTION_PADDING_X} ${DESIGN_TOKENS.SECTION_PADDING_Y} pt-30`

// Background System
export const BACKGROUND_IMAGE_CLASSES = 'fixed inset-0 w-full h-full bg-cover bg-center bg-no-repeat z-0'
export const BACKGROUND_IMAGE_BLURRED_CLASSES = 'fixed inset-0 w-full h-full bg-cover bg-center bg-no-repeat z-0 blur-sm'
export const BACKGROUND_OVERLAY_CLASSES = 'fixed inset-0 w-full h-full z-10'
export const CONTENT_LAYER_CLASSES = 'relative z-20 w-full'

// Homepage Full-Screen Layout
export const HOMEPAGE_CONTAINER_CLASSES = 'w-full'
export const HOMEPAGE_SECTION_CLASSES = 'min-h-screen flex flex-col justify-center items-center px-4 py-8'
export const HOMEPAGE_HERO_SECTION_CLASSES = `${HOMEPAGE_SECTION_CLASSES} text-center`
export const HOMEPAGE_CONTENT_SECTION_CLASSES = `${HOMEPAGE_SECTION_CLASSES} homepage-content-overlay`
export const HOMEPAGE_TITLE_CLASSES = 'text-5xl md:text-7xl font-bold text-white drop-shadow-2xl mb-8'
export const HOMEPAGE_SCROLL_INDICATOR_CLASSES = 'absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce'

// News Page Layout
export const NEWS_PAGE_CONTAINER_CLASSES = `min-h-screen flex flex-col items-center justify-start ${DESIGN_TOKENS.SECTION_PADDING_X} ${DESIGN_TOKENS.SECTION_PADDING_Y} bg-white bg-opacity-20`

// Button Components (these have real state logic)
export const NAVBAR_BUTTON_BASE_CLASSES = `${DESIGN_TOKENS.BUTTON_PADDING} ${DESIGN_TOKENS.BUTTON_WIDTH} ${DESIGN_TOKENS.BORDER_RADIUS} font-medium transition-colors cursor-pointer focus:outline-none focus:ring-0 focus:border-none active:outline-none active:ring-0 active:border-none`
export const NAVBAR_BUTTON_SELECTED_CLASSES = `${DESIGN_TOKENS.PRIMARY_BG} ${DESIGN_TOKENS.TEXT_BUTTON_MUTED} hover:${DESIGN_TOKENS.PRIMARY_BG_HOVER}`
export const NAVBAR_BUTTON_DEFAULT_CLASSES = `${DESIGN_TOKENS.SURFACE_BG} ${DESIGN_TOKENS.TEXT_BUTTON_DEFAULT} hover:${DESIGN_TOKENS.MUTED_BG_HOVER} hover:text-gray-900`

// Navigation - Fixed floating navbar with centered rounded design
export const NAVBAR_CLASSES = `fixed top-4 left-1/2 transform -translate-x-1/2 w-full ${DESIGN_TOKENS.CONTAINER_MAX_WIDTH} ${DESIGN_TOKENS.MUTED_BG} ${DESIGN_TOKENS.BORDER_RADIUS} ${DESIGN_TOKENS.CARD_SHADOW} py-3 px-4 z-30`
export const NAVBAR_CONTAINER_CLASSES = `w-full`
export const NAVBAR_FLEX_CLASSES = `flex gap-4 justify-center`

// State Messages
export const LOADING_MESSAGE_CLASSES = `${DESIGN_TOKENS.BODY_SIZE} ${DESIGN_TOKENS.TEXT_MUTED}`
export const ERROR_MESSAGE_CLASSES = `${DESIGN_TOKENS.BODY_SIZE} ${DESIGN_TOKENS.TEXT_ERROR}`

// Icon System
export const ICON_CONTAINER = 'flex items-center justify-center w-full h-full'
export const ICON_SIZE = 'w-6 h-6'