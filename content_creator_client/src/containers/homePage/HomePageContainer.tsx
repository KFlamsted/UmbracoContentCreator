import { useEffect } from 'react'
import { useHomePage } from '../../hooks/PageLoadHooks'
import ContentCard from '../../components/content/ContentCard'
import BodyTextSection from '../../components/content/BodyTextSection'
import ScrollIndicatorComponent from '../../components/common/ScrollIndicatorComponent'
import {
  HOMEPAGE_CONTAINER_CLASSES,
  HOMEPAGE_HERO_SECTION_CLASSES,
  HOMEPAGE_CONTENT_SECTION_CLASSES,
  HOMEPAGE_TITLE_CLASSES,
  DESIGN_TOKENS,
} from '../../constants/styles'

interface HomePageContainerProps {
  onStateChange?: (loading: boolean, error: string | null) => void
}

const HomePageContainer: React.FC<HomePageContainerProps> = ({
  onStateChange,
}) => {
  const { content, loading, error } = useHomePage()

  useEffect(() => {
    onStateChange?.(loading, error)
  }, [loading, error, onStateChange])
  return (
    <div id="homepage-container" className={`${HOMEPAGE_CONTAINER_CLASSES} homepage-scroll-container`}>
      {/* Hero Section - Full Screen */}
      <section
        id="homepage-hero-section"
        className={`${HOMEPAGE_HERO_SECTION_CLASSES} homepage-scroll-section`}
      >
        <h1 id="homepage-title" className={HOMEPAGE_TITLE_CLASSES}>{content.pageTitle}</h1>
        {/* Scroll Indicator */}
        <ScrollIndicatorComponent id="homepage-scroll-indicator" />
      </section>
      {/* Content Section - Full Screen */}
      <section
        id="homepage-content-section"
        className={`${HOMEPAGE_CONTENT_SECTION_CLASSES} homepage-scroll-section`}
      >
        <div id="homepage-content-wrapper" className={`${DESIGN_TOKENS.HOMEPAGE_MAX_WIDTH} mx-auto`}>
          <ContentCard
            id="homepage-content-card"
            hasBackgroundImage={true}
          >
            <BodyTextSection 
              id="homepage-body-text-section"
              bodyText={content.bodyText} 
            />
          </ContentCard>
        </div>
      </section>
    </div>
  )
}

export default HomePageContainer
