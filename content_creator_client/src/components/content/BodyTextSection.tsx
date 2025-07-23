import parse from 'html-react-parser'
import { SectionComponent } from '../ui'
import { DESIGN_TOKENS } from '../../constants/styles'

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

  const richTextClasses = `${DESIGN_TOKENS.BODY_SIZE} ${DESIGN_TOKENS.TEXT_BODY} prose prose-lg max-w-none [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6`

  return (
    <SectionComponent id={id} variant="card-section" spacing="default">
      <div 
        id={`${id}-content`} 
        className={richTextClasses}
      >
        {parse(bodyText)}
      </div>
    </SectionComponent>
  )
}

export default BodyTextSection 