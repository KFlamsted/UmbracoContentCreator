import { SectionComponent, RichTextComponent } from '../ui'

interface BodyTextSectionProps {
  /**
   * Unique identifier for the body text section
   */
  id: string
  bodyText?: string
}

const BodyTextSection: React.FC<BodyTextSectionProps> = ({ 
  id,
  bodyText
}) => {
  if (!bodyText) return null

  return (
    <SectionComponent id={id} variant="card-section" spacing="default">
      <RichTextComponent 
        id={`${id}-content`}
        content={bodyText}
      />
    </SectionComponent>
  )
}

export default BodyTextSection 