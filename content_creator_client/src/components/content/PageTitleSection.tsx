import { TITLE_CLASSES, SECTION_SPACING } from '../../constants/styles'

interface PageTitleSectionProps {
  /**
   * Unique identifier for the page title section
   */
  id: string
  title?: string
}

const PageTitleSection: React.FC<PageTitleSectionProps> = ({ 
  id,
  title
}) => {
  return (
    <div id={id} className={SECTION_SPACING}>
      <h1 id={`${id}-title`} className={TITLE_CLASSES}>
        {title}
      </h1>
    </div>
  )
}

export default PageTitleSection 