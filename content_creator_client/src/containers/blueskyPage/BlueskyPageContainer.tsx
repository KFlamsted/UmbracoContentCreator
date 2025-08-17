import { useEffect } from 'react'
import { useBlueskyPage } from '../../hooks/PageLoadHooks'
import ContentCard from '../../components/content/ContentCard'
import PageTitleSection from '../../components/content/PageTitleSection'
import { ContainerComponent, TextComponent } from '../../components/ui'

interface BlueskyPageContainerProps {
  onStateChange?: (loading: boolean, error: string | null) => void
}

const BlueskyPageContainer: React.FC<BlueskyPageContainerProps> = ({
  onStateChange,
}) => {
  const { content, loading, error } = useBlueskyPage()

  useEffect(() => {
    onStateChange?.(loading, error)
  }, [loading, error, onStateChange])

  // Console log additional data for future NPM package integration
  useEffect(() => {
    if (content.amountOfPosts || content.enableLoadMore || content.profile) {
      console.log('Bluesky Page Data for NPM Package:', {
        amountOfPosts: content.amountOfPosts,
        enableLoadMore: content.enableLoadMore,
        profile: content.profile,
      })
    }
  }, [content.amountOfPosts, content.enableLoadMore, content.profile])

  return (
    <ContainerComponent id="bluesky-page-container" variant="page" padding="default">
      <ContentCard id="bluesky-page-content-card" hasBackgroundImage={true}>
        <PageTitleSection 
          id="bluesky-page-title-section"
          title={content.pageTitle}
        />
        
        {content.description && (
          <TextComponent id="bluesky-description-text" variant="body">
            {content.description}
          </TextComponent>
        )}

        {/* Placeholder section for future Bluesky posts integration */}
        <TextComponent id="bluesky-posts-placeholder" variant="muted">
          Bluesky posts will be displayed here once the NPM package is integrated.
        </TextComponent>
      </ContentCard>
    </ContainerComponent>
  )
}

export default BlueskyPageContainer
