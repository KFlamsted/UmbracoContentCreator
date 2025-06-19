import parse from 'html-react-parser'
import { CARD_CLASSES, BACKDROP_BLUR_CARD_CLASSES, BODY_TEXT_CLASSES } from '../../constants/styles'

interface BodyTextCardProps {
  bodyText?: string
  /**
   * Whether this card is displayed on a page with a background image (enables backdrop blur)
   */
  hasBackgroundImage?: boolean
}

const BodyTextCard: React.FC<BodyTextCardProps> = ({ 
  bodyText, 
  hasBackgroundImage,
}) => {
  // Use new prop if provided, otherwise fall back to legacy props
  const shouldUseBackdropBlur = hasBackgroundImage
  const cardClasses = shouldUseBackdropBlur ? BACKDROP_BLUR_CARD_CLASSES : CARD_CLASSES

  return (
    <div className={cardClasses}>
      <div className={BODY_TEXT_CLASSES}>
        {bodyText ? parse(bodyText) : ''}
      </div>
    </div>
  )
}

export default BodyTextCard
