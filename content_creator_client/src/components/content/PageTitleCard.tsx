import { TITLE_CARD_CLASSES, TITLE_CLASSES } from '../../constants/styles'

interface PageTitleCardProps {
  title?: string
}

const PageTitleCard: React.FC<PageTitleCardProps> = ({ title }) => {
  return (
    <div className={TITLE_CARD_CLASSES}>
      <h1 className={TITLE_CLASSES}>
        {title}
      </h1>
    </div>
  )
}

export default PageTitleCard
