import { TITLE_CARD_CLASSES, TITLE_CLASSES } from '../../constants/styles'

// Create title card classes that include backdrop blur
const NEWS_PAGE_TITLE_CARD_CLASSES = `${TITLE_CARD_CLASSES} backdrop-blur-sm`

interface PageTitleCardProps {
  /**
   * Unique identifier for the page title card
   */
  id?: string
  title?: string
  isNewsPage?: boolean
}

const PageTitleCard: React.FC<PageTitleCardProps> = ({ 
  id = 'page-title-card',
  title, 
  isNewsPage = false 
}) => {
  const cardClasses = isNewsPage ? NEWS_PAGE_TITLE_CARD_CLASSES : TITLE_CARD_CLASSES
  
  return (
    <div id={id} className={cardClasses}>
      <h1 id={`${id}-title`} className={TITLE_CLASSES}>
        {title}
      </h1>
    </div>
  )
}

export default PageTitleCard
