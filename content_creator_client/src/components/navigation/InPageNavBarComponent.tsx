import { DESIGN_TOKENS } from '../../constants/styles'
import InPageNavButton from './InPageNavButton'

interface InPageNavBarComponentProps<T> {
  /** Unique identifier for the in-page navbar */
  id?: string
  items: T[]
  activeItem: T | null
  onItemChange: (item: T) => void
  getDisplayText: (item: T) => string
  getId: (item: T) => string
  floating?: boolean
}

// Smaller version of navbar for in-page navigation
const IN_PAGE_NAVBAR_CLASSES = `w-full ${DESIGN_TOKENS.HOMEPAGE_MAX_WIDTH} ${DESIGN_TOKENS.MUTED_BG} ${DESIGN_TOKENS.BORDER_RADIUS} ${DESIGN_TOKENS.CARD_SHADOW} py-2 px-3 mb-4`
const IN_PAGE_NAVBAR_FLEX_CLASSES = `flex gap-2 justify-center flex-wrap`

// Fixed positioning wrapper for floating navbar
const FLOATING_WRAPPER_CLASSES = `fixed top-24 left-1/2 transform -translate-x-1/2 w-full max-w-6xl z-25`

const InPageNavBarComponent = <T,>({
  id = 'in-page-navbar',
  items,
  activeItem,
  onItemChange,
  getDisplayText,
  getId,
  floating = false,
}: InPageNavBarComponentProps<T>) => {
  const navbar = (
    <nav id={id} className={IN_PAGE_NAVBAR_CLASSES}>
      <div id={`${id}-flex`} className={IN_PAGE_NAVBAR_FLEX_CLASSES}>
        {items.map((item) => (
          <InPageNavButton
            key={getId(item)}
            isSelected={activeItem ? getId(activeItem) === getId(item) : false}
            onClick={() => onItemChange(item)}
          >
            {getDisplayText(item)}
          </InPageNavButton>
        ))}
      </div>
    </nav>
  )

  if (floating) {
    return <div id={`${id}-floating-wrapper`} className={FLOATING_WRAPPER_CLASSES}>{navbar}</div>
  }

  return navbar
}

export default InPageNavBarComponent 