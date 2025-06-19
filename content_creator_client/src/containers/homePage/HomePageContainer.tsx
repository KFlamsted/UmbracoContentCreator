import { useEffect } from 'react'
import { useHomePage } from '../../hooks/PageLoadHooks'
import BodyTextCard from '../../components/content/BodyTextCard'
import {
  HOMEPAGE_CONTAINER_CLASSES,
  HOMEPAGE_HERO_SECTION_CLASSES,
  HOMEPAGE_CONTENT_SECTION_CLASSES,
  HOMEPAGE_TITLE_CLASSES,
  HOMEPAGE_SCROLL_INDICATOR_CLASSES,
} from '../../constants/styles'

interface HomePageContainerProps {
  onStateChange?: (loading: boolean, error: string | null) => void
}

const HomePageContainer: React.FC<HomePageContainerProps> = ({ onStateChange }) => {
  const { content, loading, error } = useHomePage()

  useEffect(() => {
    onStateChange?.(loading, error)
  }, [loading, error, onStateChange])
  return (
    <div className={`${HOMEPAGE_CONTAINER_CLASSES} homepage-scroll-container`}>
      {/* Hero Section - Full Screen */}
      <section className={`${HOMEPAGE_HERO_SECTION_CLASSES} homepage-scroll-section`}>
        <h1 className={HOMEPAGE_TITLE_CLASSES}>
          {content.pageTitle}
        </h1>
        
        {/* Scroll Indicator */}
        <div className={HOMEPAGE_SCROLL_INDICATOR_CLASSES}>
          <svg 
            className="w-6 h-6" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M19 14l-7 7m0 0l-7-7m7 7V3" 
            />
          </svg>
        </div>
      </section>      {/* Content Section - Full Screen */}
      <section className={`${HOMEPAGE_CONTENT_SECTION_CLASSES} homepage-scroll-section`}>
        <div className="w-full max-w-4xl">
          <BodyTextCard bodyText={content.bodyText} isHomePage={true} />
        </div>
      </section>
    </div>
  )
}

export default HomePageContainer
