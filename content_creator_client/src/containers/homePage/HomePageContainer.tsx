import { useEffect } from 'react'
import { useHomePage } from '../../hooks/PageLoadHooks'
import ContentCard from '../../components/content/ContentCard'
import BodyTextSection from '../../components/content/BodyTextSection'
import ScrollIndicatorComponent from '../../components/common/ScrollIndicatorComponent'
import { ContainerComponent, SectionComponent, H1Component } from '../../components/ui'

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
    <ContainerComponent id="homepage-container" variant="default" padding="none" className="homepage-scroll-container">
      {/* Hero Section - Full Screen */}
      <SectionComponent
        id="homepage-hero-section"
        variant="hero"
        className="homepage-scroll-section"
      >
        <H1Component 
          id="homepage-title" 
          variant="hero" 
          align="center"
        >
          {content.pageTitle}
        </H1Component>
        {/* Scroll Indicator */}
        <ScrollIndicatorComponent id="homepage-scroll-indicator" />
      </SectionComponent>
      
      {/* Content Section - Full Screen */}
      <SectionComponent
        id="homepage-content-section"
        variant="content"
        className="homepage-scroll-section homepage-content-overlay"
      >
        <ContainerComponent id="homepage-content-wrapper" variant="constrained">
          <ContentCard
            id="homepage-content-card"
            hasBackgroundImage={true}
          >
            <BodyTextSection 
              id="homepage-body-text-section"
              bodyText={content.bodyText} 
            />
          </ContentCard>
        </ContainerComponent>
      </SectionComponent>
    </ContainerComponent>
  )
}

export default HomePageContainer
