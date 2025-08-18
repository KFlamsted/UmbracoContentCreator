import { useEffect } from 'react'
import { useStreamingPage } from '../../hooks/PageLoadHooks'
import ContentCard from '../../components/content/ContentCard'
import PageTitleSection from '../../components/content/PageTitleSection'
import { ContainerComponent, TextComponent } from '../../components/ui'
import { SectionComponent } from '../../components/ui/layout/LayoutComponents'

interface StreamingPageContainerProps {
  onStateChange?: (loading: boolean, error: string | null) => void
}

const StreamingPageContainer: React.FC<StreamingPageContainerProps> = ({
  onStateChange,
}) => {
  const { content, loading, error } = useStreamingPage()

  useEffect(() => {
    onStateChange?.(loading, error)
  }, [loading, error, onStateChange])

  return (
    <ContainerComponent
      id="streaming-page-container"
      variant="page"
      padding="default"
    >
      <ContentCard id="streaming-page-content-card" hasBackgroundImage={true}>
        <PageTitleSection
          id="streaming-page-title-section"
          title={content.pageTitle}
        />

        {content.description && (
          <SectionComponent
            id="streaming-description-section"
            variant="card-section"
            spacing="default"
          >
            <TextComponent id="streaming-description-text" variant="body">
              {content.description}
            </TextComponent>
          </SectionComponent>
        )}

        {/* Placeholder for future Twitch embed */}
        {content.twitchUsername && (
          <TextComponent id="streaming-twitch-placeholder" variant="muted">
            Twitch stream for {content.twitchUsername} will be embedded here
          </TextComponent>
        )}
      </ContentCard>
    </ContainerComponent>
  )
}

export default StreamingPageContainer
