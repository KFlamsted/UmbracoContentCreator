import { FlexComponent, InPageNavBarComponent, CenteredPositionedComponent } from '../ui'
import InPageNavButton from './InPageNavButton'

interface InPageNavBarProps<T> {
  /** Unique identifier for the in-page navbar */
  id: string
  items: T[]
  activeItem: T | null
  onItemChange: (item: T) => void
  getDisplayText: (item: T) => string
  getId: (item: T) => string
  floating?: boolean
}

const InPageNavBar = <T,>({
  id,
  items,
  activeItem,
  onItemChange,
  getDisplayText,
  getId,
  floating = false,
}: InPageNavBarProps<T>) => {
  const navbar = (
    <InPageNavBarComponent id={id}>
      <FlexComponent 
        id={`${id}-flex`} 
        justify="center" 
        gap="small" 
        wrap={true}
      >
        {items.map((item) => (
          <InPageNavButton
            key={getId(item)}
            isSelected={activeItem ? getId(activeItem) === getId(item) : false}
            onClick={() => onItemChange(item)}
          >
            {getDisplayText(item)}
          </InPageNavButton>
        ))}
      </FlexComponent>
    </InPageNavBarComponent>
  )

  if (floating) {
    return (
      <CenteredPositionedComponent
        id={`${id}-floating-wrapper`}
        position="fixed"
        top="top-22"
        zIndex="z-40"
        width="w-full"
        maxWidth="max-w-6xl"
      >
        {navbar}
      </CenteredPositionedComponent>
    )
  }

  return navbar
}

export default InPageNavBar 