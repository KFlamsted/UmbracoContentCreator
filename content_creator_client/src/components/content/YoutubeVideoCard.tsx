import { DESIGN_TOKENS } from '../../constants/styles'
import type { YouTubeVideo } from '../../services/googleApiClient'

interface YoutubeVideoCardProps {
  video: YouTubeVideo
  isHomePage?: boolean
  isNewsPage?: boolean
}

/**
 * YoutubeVideoCard - Displays a YouTube video in a card format
 * @param props - Component props containing video data and context flags
 * @returns JSX element representing a YouTube video card
 */
const YoutubeVideoCard: React.FC<YoutubeVideoCardProps> = ({ 
  video, 
  isHomePage = false, 
  isNewsPage = false 
}) => {
  const cardClasses = `${DESIGN_TOKENS.SURFACE_BG} bg-opacity-95 ${DESIGN_TOKENS.BORDER_RADIUS} backdrop-blur-sm p-6 border border-white/20 hover:border-white/30 transition-all duration-300 hover:shadow-lg`
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const truncateDescription = (description: string, maxLength: number = 150) => {
    if (description.length <= maxLength) return description
    return description.substring(0, maxLength) + '...'
  }

  const getVideoUrl = () => {
    return `https://www.youtube.com/watch?v=${video.id}`
  }

  return (
    <div className={cardClasses}>
      {/* Video Thumbnail */}
      <div className="relative mb-4 group">
        <img
          src={video.snippet.thumbnails.medium.url}
          alt={video.snippet.title}
          className="w-full h-48 object-cover rounded-lg"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300 rounded-lg flex items-center justify-center">
          <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center shadow-lg">
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

      {/* Video Content */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-white line-clamp-2">
          {video.snippet.title}
        </h3>
        
        <p className="text-gray-300 text-sm leading-relaxed">
          {truncateDescription(video.snippet.description)}
        </p>

        <div className="flex items-center justify-between text-xs text-gray-400">
          <span>{video.snippet.channelTitle}</span>
          <span>{formatDate(video.snippet.publishedAt)}</span>
        </div>

        <a
          href={getVideoUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-300 text-sm font-medium"
        >
          Watch on YouTube
          <svg
            className="w-4 h-4 ml-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        </a>
      </div>
    </div>
  )
}

export default YoutubeVideoCard 