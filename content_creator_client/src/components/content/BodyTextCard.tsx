import parse from 'html-react-parser'
import { CARD_CLASSES, BACKDROP_BLUR_CARD_CLASSES, BODY_TEXT_CLASSES } from '../../constants/styles'

interface BodyTextCardProps {
  /**
   * Unique identifier for the body text card
   */
  id?: string
  bodyText?: string
  /**
   * Whether this card is displayed on a page with a background image (enables backdrop blur)
   */
  hasBackgroundImage?: boolean
}

const BodyTextCard: React.FC<BodyTextCardProps> = ({ 
  id = 'body-text-card',
  bodyText, 
  hasBackgroundImage,
}) => {
  // Use new prop if provided, otherwise fall back to legacy props
  const shouldUseBackdropBlur = hasBackgroundImage
  const cardClasses = shouldUseBackdropBlur ? BACKDROP_BLUR_CARD_CLASSES : CARD_CLASSES

  return (
    <div id={id} className={cardClasses}>
      <div id={`${id}-content`} className={BODY_TEXT_CLASSES}>
        {bodyText ? parse(bodyText) : ''}
      </div>
    </div>
  )
}

export default BodyTextCard
