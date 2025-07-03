import { DESIGN_TOKENS, YOUTUBE_THUMBNAIL_CARD_CLASSES, YOUTUBE_PLAY_BUTTON_CLASSES } from '../../constants/styles'
import { sanitizeAndTruncateText, sanitizeHtml } from '../../utility/textUtility'
import type { VideoSummary } from '../../model/VideoSummary'

interface YoutubeVideoThumbnailProps {
  video: VideoSummary
  onThumbnailClick: () => void
  maxTitleLength?: number
}

const YoutubeVideoThumbnail: React.FC<YoutubeVideoThumbnailProps> = ({
  video,
  onThumbnailClick,
  maxTitleLength = 60
}) => {
  return (
    <div className="group h-full">
      <div
        className={YOUTUBE_THUMBNAIL_CARD_CLASSES}
        onClick={onThumbnailClick}
      >
        {/* Video thumbnail section - fixed aspect ratio */}
        <div className="aspect-video relative flex-shrink-0">
          <img
            src={video.thumbnailUrl}
            alt={sanitizeHtml(video.title)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
          <div className={`absolute inset-0 ${DESIGN_TOKENS.YOUTUBE_THUMBNAIL_OVERLAY} transition-all duration-300 flex items-center justify-center`}>
            <div className={YOUTUBE_PLAY_BUTTON_CLASSES}>
              <svg
                className="w-6 h-6 text-white ml-1"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Content section - flexible height */}
        <div className={`p-4 ${DESIGN_TOKENS.YOUTUBE_CARD_OVERLAY} flex-grow flex flex-col justify-between`}>
          <h4 className={DESIGN_TOKENS.YOUTUBE_VIDEO_TITLE}>
            {sanitizeAndTruncateText(video.title, maxTitleLength)}
          </h4>
          <div className="text-xs text-gray-400 text-center mt-auto">
            <a
              href={video.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={DESIGN_TOKENS.YOUTUBE_VIDEO_LINK}
              onClick={(e) => e.stopPropagation()} // Prevent thumbnail click when clicking link
            >
              Watch on YouTube
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default YoutubeVideoThumbnail 