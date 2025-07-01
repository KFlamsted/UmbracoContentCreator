import { useState } from 'react'
import YouTube from 'react-youtube'
import { BACKDROP_BLUR_CARD_CLASSES, DESIGN_TOKENS, LOADING_MESSAGE_CLASSES, ERROR_MESSAGE_CLASSES } from '../../constants/styles'
import { useYouTubeData } from '../../hooks/useYouTubeData'
import type { YoutubePage } from '../../model/YoutubePage'

interface YoutubeVideoListCardProps {
  channel: YoutubePage
  hasBackgroundImage?: boolean
}

interface VideoPlayerState {
  [videoId: string]: {
    showPlayer: boolean
    isLoading: boolean
    hasError: boolean
  }
}

const YoutubeVideoListCard: React.FC<YoutubeVideoListCardProps> = ({
  channel,
  hasBackgroundImage = false,
}) => {
  const maxVideos = channel.amountOfVideos || 6
  const { videos, loading, error, refetch } = useYouTubeData(
    channel.youtubeChannelId || null,
    maxVideos
  )
  
  const [videoStates, setVideoStates] = useState<VideoPlayerState>({})
  
  const cardClasses = hasBackgroundImage ? BACKDROP_BLUR_CARD_CLASSES : 
    `w-full max-w-6xl ${DESIGN_TOKENS.SURFACE_BG} bg-opacity-95 ${DESIGN_TOKENS.BORDER_RADIUS} backdrop-blur-sm ${DESIGN_TOKENS.CARD_SHADOW} ${DESIGN_TOKENS.CARD_PADDING} mb-2`

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  const truncateTitle = (title: string, maxLength: number = 60) => {
    if (title.length <= maxLength) return title
    return title.substring(0, maxLength) + '...'
  }

  const handleThumbnailClick = (videoId: string) => {
    setVideoStates(prev => ({
      ...prev,
      [videoId]: {
        showPlayer: true,
        isLoading: true,
        hasError: false
      }
    }))
  }

  const handlePlayerReady = (videoId: string) => {
    setVideoStates(prev => ({
      ...prev,
      [videoId]: {
        ...prev[videoId],
        isLoading: false
      }
    }))
  }

  const handlePlayerError = (videoId: string) => {
    setVideoStates(prev => ({
      ...prev,
      [videoId]: {
        ...prev[videoId],
        isLoading: false,
        hasError: true
      }
    }))
  }

  const getVideoState = (videoId: string) => {
    return videoStates[videoId] || {
      showPlayer: false,
      isLoading: false,
      hasError: false
    }
  }

  const youtubeOptions = {
    width: '100%',
    height: '100%',
    playerVars: {
      autoplay: 0,
      modestbranding: 1,
      rel: 0,
    },
  }

  if (!channel.youtubeChannelId) {
    return (
      <div className={cardClasses}>
        <div className="text-center py-8">
          <h3 className="text-xl font-semibold text-white mb-2">Latest Videos</h3>
          <p className={ERROR_MESSAGE_CLASSES}>
            YouTube Channel ID not configured for this page.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className={cardClasses}>
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-white text-center">
          Latest Videos from {channel.youtubeChannelName || 'Channel'}
        </h3>
        {channel.youtubeChannelName && (
          <p className="text-gray-300 text-center mt-2">
            Showing up to {maxVideos} recent videos
          </p>
        )}
      </div>

      {loading && (
        <div className="text-center py-8">
          <p className={LOADING_MESSAGE_CLASSES}>Loading latest videos...</p>
        </div>
      )}

      {error && (
        <div className="text-center py-8">
          <p className={ERROR_MESSAGE_CLASSES}>
            Failed to load videos: {error}
          </p>
          <button
            onClick={refetch}
            className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-300"
          >
            Try Again
          </button>
        </div>
      )}

      {!loading && !error && videos.length === 0 && (
        <div className="text-center py-8">
          <p className={LOADING_MESSAGE_CLASSES}>
            No videos found for this channel.
          </p>
        </div>
      )}

      {!loading && !error && videos.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => {
            const videoId = video.id
            const state = getVideoState(videoId)
            
            return (
              <div key={videoId} className="group">
                {!state.showPlayer ? (
                  <div 
                    className="cursor-pointer relative overflow-hidden rounded-lg bg-gray-900"
                    onClick={() => handleThumbnailClick(videoId)}
                  >
                    <div className="aspect-video relative">
                      <img
                        src={video.snippet.thumbnails.medium.url}
                        alt={video.snippet.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                        <div className="w-16 h-16 bg-red-600 bg-opacity-90 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
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
                    
                    <div className="p-4 bg-gray-800 bg-opacity-80">
                      <h4 className="text-white font-medium text-sm leading-tight mb-2">
                        {truncateTitle(video.snippet.title)}
                      </h4>
                      <div className="flex justify-between items-center text-xs text-gray-400">
                        <span>{video.snippet.channelTitle}</span>
                        <span>{formatDate(video.snippet.publishedAt)}</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="rounded-lg overflow-hidden bg-gray-900">
                    {state.isLoading && (
                      <div className="aspect-video flex items-center justify-center bg-gray-800">
                        <p className={LOADING_MESSAGE_CLASSES}>Loading player...</p>
                      </div>
                    )}
                    
                    {state.hasError && (
                      <div className="aspect-video flex items-center justify-center bg-gray-800">
                        <div className="text-center">
                          <p className={ERROR_MESSAGE_CLASSES}>Failed to load video</p>
                          <button
                            onClick={() => setVideoStates(prev => ({
                              ...prev,
                              [videoId]: { showPlayer: false, isLoading: false, hasError: false }
                            }))}
                            className="mt-2 text-sm text-blue-400 hover:text-blue-300"
                          >
                            Back to thumbnail
                          </button>
                        </div>
                      </div>
                    )}
                    
                    <div className={`aspect-video ${state.isLoading ? 'hidden' : ''}`}>
                      <YouTube
                        videoId={videoId}
                        opts={youtubeOptions}
                        onReady={() => handlePlayerReady(videoId)}
                        onError={() => handlePlayerError(videoId)}
                        className="w-full h-full"
                      />
                    </div>
                    
                    <div className="p-4 bg-gray-800">
                      <h4 className="text-white font-medium text-sm leading-tight mb-2">
                        {video.snippet.title}
                      </h4>
                      <div className="flex justify-between items-center text-xs text-gray-400">
                        <span>{video.snippet.channelTitle}</span>
                        <span>{formatDate(video.snippet.publishedAt)}</span>
                      </div>
                      <button
                        onClick={() => setVideoStates(prev => ({
                          ...prev,
                          [videoId]: { showPlayer: false, isLoading: false, hasError: false }
                        }))}
                        className="mt-2 text-sm text-blue-400 hover:text-blue-300"
                      >
                        Back to thumbnail
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default YoutubeVideoListCard 