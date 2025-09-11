# UmbracoContentCreator

This project pairs an Umbraco CMS backend with a React thin client to manage and display content. It demonstrates surfacing content from the CMS alongside external sources such as YouTube, Bluesky/Twitter, and Twitch.

Be aware this project is a work in progress — some pages, styling and integrations are still being refined.

## Features

The features are split by the two main sub-projects so you can quickly see what belongs to the thin client and what is implemented in the Umbraco backend.

### React thin client (content_creator_client)

- Built with React + TypeScript + Vite (fast HMR development experience)
- Centralized UI component system and design tokens (replace inline Tailwind usage):
	- Typography, Layout, Container, Section, Layer, AppShell, NavBar
	- Card components: `CardComponent`, `ImageCardComponent`, `YouTubeCardComponent`
	- Grid and GridItem components with responsive column support
	- Media components: `ImageComponent`, `VideoComponent`
	- Buttons, positioning helpers and overlay/rich-text components
- Pages / routing:
	- Pages implemented or scaffolded: Home, News, NewsItem, Streaming, YouTube (and parent listing), Bluesky
	- Client-side routing using `react-router`
- Global data and hooks:
	- `GlobalDataContext` and hooks for page data loading and theming (e.g. `useGlobalData`, `PageLoadHooks`, `useThemeColors`)
	- `useYouTubeData` hook to consume the backend YouTube proxy
- Embeds and external content:
	- Supports `bsky-embed` (Bluesky) custom element typings
	- YouTube cards and pages that consume the Umbraco-backed YouTube proxy API
- Styling & developer guidelines:
	- Strict rules to avoid inline Tailwind outside of the UI system; ESLint and recommended plugin examples are present
	- Component-level README and examples inside `src/components/ui` to encourage consistent usage
- Accessibility & testing:
	- Components are designed with semantic HTML and ARIA where applicable; component reuse improves testability
- Environment-driven media URLs:
	- Uses `VITE_API_URL` environment variable to construct image/media URLs from the CMS

### Umbraco CMS (umbraco_cms)

- Umbraco 15 site scaffolding with BackOffice, Website and Delivery API enabled
- Content models and ModelsBuilder-generated published models (e.g. `YoutubePage`, `YoutubeParentPage`, `HomePage`, `News`, `NewsItemPage`, `StreamingPage`)
- YouTube API proxy and integration:
	- API controller `api/youtube` with endpoints such as `GET /api/youtube/channel/{channelId}/videos` and `GET /api/youtube/health`
	- Validates inputs, returns simplified `VideoListResponse` / `VideoSummary` objects for frontend consumption
	- Server-side caching via `IMemoryCache` to avoid exposing API keys or hitting YouTube on every request
	- `IYouTubeService` and `YouTubeService` using `HttpClient` (registered via DI) to call YouTube Data API v3 and parse pagination and thumbnails
	- Config-driven API key (`GoogleApiKey`) and cache durations
- Infrastructure & configuration:
	- Registers typed `HttpClient` and memory cache in `Program.cs` and uses DI for services
	- Enables permissive CORS in development for local client testing
- Media and custom types:
	- Models for media items and content (e.g. `UmbracoMediaVideo`, `UmbracoMediaAudio`, `VideoSummary`) to standardize data returned to the client

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.
