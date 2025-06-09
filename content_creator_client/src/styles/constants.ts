// Card styling constants
export const CARD_WIDTH = 'w-full'
export const CARD_MAX_WIDTH = 'max-w-6xl'
export const CARD_BACKGROUND = 'bg-white'
export const CARD_BORDER_RADIUS = 'rounded-lg'
export const CARD_SHADOW = 'shadow-md'
export const CARD_PADDING = 'p-6'
export const CARD_MARGIN_BOTTOM = 'mb-6'

// Combined card classes
export const CARD_CLASSES = `${CARD_WIDTH} ${CARD_MAX_WIDTH} ${CARD_BACKGROUND} ${CARD_BORDER_RADIUS} ${CARD_SHADOW} ${CARD_PADDING}`
export const TITLE_CARD_CLASSES = `${CARD_CLASSES} ${CARD_MARGIN_BOTTOM}`

// Text styling constants
export const TEXT_SIZE_LARGE = 'text-lg'
export const TEXT_COLOR_GRAY = 'text-gray-700'
export const PROSE_CLASSES = 'prose prose-lg max-w-none [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6'

// Combined text classes
export const BODY_TEXT_CLASSES = `${TEXT_SIZE_LARGE} ${TEXT_COLOR_GRAY} ${PROSE_CLASSES}`

// Title styling constants
export const TITLE_TEXT_SIZE = 'text-3xl'
export const TITLE_FONT_WEIGHT = 'font-bold'
export const TITLE_TEXT_ALIGN = 'text-center'
export const TITLE_TEXT_COLOR = 'text-gray-900'

// Combined title classes
export const TITLE_CLASSES = `${TITLE_TEXT_SIZE} ${TITLE_FONT_WEIGHT} ${TITLE_TEXT_ALIGN} ${TITLE_TEXT_COLOR}`

// Layout styling constants
export const MIN_HEIGHT_SCREEN = 'min-h-screen'
export const BACKGROUND_BLUE = 'bg-blue-200'
export const FLEX = 'flex'
export const FLEX_COL = 'flex-col'
export const ITEMS_CENTER = 'items-center'
export const JUSTIFY_START = 'justify-start'
export const PADDING_X_4 = 'px-4'
export const PADDING_Y_8 = 'py-8'

// State message styling constants  
export const TEXT_GRAY_600 = 'text-gray-600'
export const TEXT_RED_600 = 'text-red-600'

// Combined layout classes
export const APP_SHELL_CONTAINER_CLASSES = `${MIN_HEIGHT_SCREEN} ${BACKGROUND_BLUE} ${FLEX} ${FLEX_COL} ${ITEMS_CENTER} ${JUSTIFY_START} ${PADDING_X_4} ${PADDING_Y_8}`
export const CONTENT_CONTAINER_CLASSES = `${BACKGROUND_BLUE} ${FLEX} ${FLEX_COL} ${ITEMS_CENTER} ${PADDING_X_4} ${PADDING_Y_8}`
export const LOADING_MESSAGE_CLASSES = `${TEXT_SIZE_LARGE} ${TEXT_GRAY_600}`
export const ERROR_MESSAGE_CLASSES = `${TEXT_SIZE_LARGE} ${TEXT_RED_600}`

// Button styling constants
export const BUTTON_PADDING = 'px-6 py-3'
export const BUTTON_WIDTH = 'w-32'
export const BUTTON_FONT_WEIGHT = 'font-medium'
export const BUTTON_TRANSITION = 'transition-colors'
export const BUTTON_CURSOR = 'cursor-pointer'
export const BUTTON_FOCUS_RESET = 'focus:outline-none focus:ring-0 focus:border-none active:outline-none active:ring-0 active:border-none'

// Button state styling constants
export const BUTTON_SELECTED_BG = 'bg-blue-600'
export const BUTTON_SELECTED_TEXT = 'text-gray-500'
export const BUTTON_SELECTED_HOVER = 'hover:bg-blue-700'
export const BUTTON_DEFAULT_BG = 'bg-white'
export const BUTTON_DEFAULT_TEXT = 'text-gray-800'
export const BUTTON_DEFAULT_HOVER = 'hover:bg-blue-50 hover:text-gray-900'

// Icon container styling constants
export const ICON_CONTAINER = 'flex items-center justify-center w-full h-full'
export const ICON_SIZE = 'w-6 h-6'

// Navigation styling constants
export const NAV_WIDTH = 'w-full'
export const NAV_BACKGROUND = 'bg-blue-200'
export const NAV_PADDING = 'py-4'
export const NAV_CONTAINER_MAX_WIDTH = 'max-w-6xl'
export const NAV_CONTAINER_MARGIN = 'mx-auto'
export const NAV_FLEX_GAP = 'gap-4'

// Combined button classes
export const NAVBAR_BUTTON_BASE_CLASSES = `${BUTTON_PADDING} ${BUTTON_WIDTH} ${CARD_BORDER_RADIUS} ${BUTTON_FONT_WEIGHT} ${BUTTON_TRANSITION} ${BUTTON_CURSOR} ${BUTTON_FOCUS_RESET}`
export const NAVBAR_BUTTON_SELECTED_CLASSES = `${BUTTON_SELECTED_BG} ${BUTTON_SELECTED_TEXT} ${BUTTON_SELECTED_HOVER}`
export const NAVBAR_BUTTON_DEFAULT_CLASSES = `${BUTTON_DEFAULT_BG} ${BUTTON_DEFAULT_TEXT} ${BUTTON_DEFAULT_HOVER}`

// Combined navigation classes
export const NAVBAR_CLASSES = `${NAV_WIDTH} ${NAV_BACKGROUND} ${NAV_PADDING}`
export const NAVBAR_CONTAINER_CLASSES = `${NAV_WIDTH} ${NAV_CONTAINER_MAX_WIDTH} ${NAV_CONTAINER_MARGIN}`
export const NAVBAR_FLEX_CLASSES = `${FLEX} ${NAV_FLEX_GAP}`
