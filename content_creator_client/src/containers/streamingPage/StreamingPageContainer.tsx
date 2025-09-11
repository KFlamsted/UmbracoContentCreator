import { useEffect } from 'react'
import { useStreamingPage } from '../../hooks/PageLoadHooks'
import ContentCard from '../../components/content/ContentCard'
import PageTitleSection from '../../components/content/PageTitleSection'
import { ContainerComponent, TextComponent } from '../../components/ui'
import { SectionComponent } from '../../components/ui/layout/LayoutComponents'
import TwitchStreamingPlayer from '../../components/streaming/TwitchStreamingPlayer'

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

        {/* Twitch embed */}
        {content.twitchUsername && (
          <SectionComponent
            id="streaming-twitch-section"
            variant="card-section"
            spacing="default"
          >
            <TwitchStreamingPlayer channel={content.twitchUsername} />
          </SectionComponent>
        )}
      </ContentCard>
    </ContainerComponent>
  )
}

export default StreamingPageContainer
