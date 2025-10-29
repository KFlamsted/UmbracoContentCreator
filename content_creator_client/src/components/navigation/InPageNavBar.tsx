import { FlexComponent, InPageNavBarComponent } from '../ui'
import InPageNavButton from './InPageNavButton'
import { useScrollDirection } from '../../hooks/useScrollDirection'

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
  const isVisible = useScrollDirection()

  const navbar = (
    <InPageNavBarComponent id={id} isVisible={isVisible} floating={floating}>
      <FlexComponent 
        id={`${id}-flex`} 
        justify="center" 
        gap="small" 
        wrap
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

  return navbar
}

export default InPageNavBar 