import parse from 'html-react-parser'
import { BODY_TEXT_CLASSES, SECTION_SPACING } from '../../constants/styles'

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
  return (
    <div id={id} className={SECTION_SPACING}>
      <div id={`${id}-content`} className={BODY_TEXT_CLASSES}>
        {bodyText ? parse(bodyText) : ''}
      </div>
    </div>
  )
}

export default BodyTextSection 