import { useEffect } from 'react'
import 'bsky-embed/dist/bsky-embed.es.js'
import { useBlueskyPage } from '../../hooks/PageLoadHooks'
import ContentCard from '../../components/content/ContentCard'
import PageTitleSection from '../../components/content/PageTitleSection'
import { ContainerComponent, TextComponent } from '../../components/ui'
import { SectionComponent } from '../../components/ui/layout/LayoutComponents'

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

  const renderBlueskyEmbed = () => {
    if (!content.profile) {
      return (
        <TextComponent id="bluesky-no-profile" variant="muted">
          No Bluesky profile configured.
        </TextComponent>
      )
    }

    return (
      <bsky-embed
        username={content.profile}
        limit={content.amountOfPosts ?? 10}
        load-more={content.enableLoadMore ? 'true' : 'false'}
        custom-styles=".whitespace-pre-wrap{color: black;} .font-bold{color: black;} .border-slate-300{border-width: 1px; margin-bottom: 10px;}"
      />
    )
  }

  return (
    <ContainerComponent
      id="bluesky-page-container"
      variant="page"
      padding="default"
    >
      <ContentCard id="bluesky-page-content-card" hasBackgroundImage={true}>
        <PageTitleSection
          id="bluesky-page-title-section"
          title={content.pageTitle}
        />

        {content.description && (
          <SectionComponent
            id="bluesky-description-section"
            variant="card-section"
            spacing="default"
          >
            <TextComponent id="bluesky-description-text" variant="body">
              {content.description}
            </TextComponent>
          </SectionComponent>
        )}
        {renderBlueskyEmbed()}
      </ContentCard>
    </ContainerComponent>
  )
}

export default BlueskyPageContainer
