import parse from 'html-react-parser'
import { CARD_CLASSES, BODY_TEXT_CLASSES } from '../../constants/styles'

interface BodyTextCardProps {
  bodyText?: string
}

const BodyTextCard: React.FC<BodyTextCardProps> = ({ bodyText }) => {

  return (
    <div className={CARD_CLASSES}>
      <div className={BODY_TEXT_CLASSES}>
        {bodyText ? parse(bodyText) : ''}
      </div>
    </div>
  )
}

export default BodyTextCard
