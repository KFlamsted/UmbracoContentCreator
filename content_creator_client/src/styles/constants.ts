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
export const JUSTIFY_CENTER = 'justify-center'
export const PADDING_X_4 = 'px-4'
export const PADDING_Y_8 = 'py-8'

// State message styling constants  
export const TEXT_GRAY_600 = 'text-gray-600'
export const TEXT_RED_600 = 'text-red-600'

// Combined layout classes
export const APP_SHELL_CONTAINER_CLASSES = `${MIN_HEIGHT_SCREEN} ${BACKGROUND_BLUE} ${FLEX} ${FLEX_COL} ${ITEMS_CENTER} ${JUSTIFY_CENTER} ${PADDING_X_4} ${PADDING_Y_8}`
export const LOADING_MESSAGE_CLASSES = `${TEXT_SIZE_LARGE} ${TEXT_GRAY_600}`
export const ERROR_MESSAGE_CLASSES = `${TEXT_SIZE_LARGE} ${TEXT_RED_600}`
