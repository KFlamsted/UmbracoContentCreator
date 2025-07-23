import { H1Component, SectionComponent } from '../ui'

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
  if (!title) return null

  return (
    <SectionComponent id={id} variant="card-section" spacing="default">
      <H1Component 
        id={`${id}-title`} 
        variant="page"
        align="center"
      >
        {title}
      </H1Component>
    </SectionComponent>
  )
}

export default PageTitleSection 