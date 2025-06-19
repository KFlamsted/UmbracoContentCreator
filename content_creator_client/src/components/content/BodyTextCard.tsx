import parse from 'html-react-parser'
import { CARD_CLASSES, HOMEPAGE_CARD_CLASSES, NEWS_PAGE_CARD_CLASSES, BODY_TEXT_CLASSES } from '../../constants/styles'

interface BodyTextCardProps {
  bodyText?: string
  isHomePage?: boolean
  isNewsPage?: boolean
}

const BodyTextCard: React.FC<BodyTextCardProps> = ({ bodyText, isHomePage = false, isNewsPage = false }) => {
  const cardClasses = isHomePage ? HOMEPAGE_CARD_CLASSES : 
                      isNewsPage ? NEWS_PAGE_CARD_CLASSES : 
                      CARD_CLASSES

  return (
    <div className={cardClasses}>
      <div className={BODY_TEXT_CLASSES}>
        {bodyText ? parse(bodyText) : ''}
      </div>
    </div>
  )
}

export default BodyTextCard
