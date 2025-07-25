# Cursor AI Agent Guide - Umbraco Content Creator Client

> Comprehensive guide for Cursor AI agents working on this React + TypeScript + Vite project

## Project Overview

This is a React 18 + TypeScript + Vite application that serves as a client for an Umbraco Content Management System. It uses the Umbraco Delivery API to fetch and display content with a modern, responsive design featuring background images and backdrop blur effects.

## Tech Stack & Environment

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Routing**: React Router v6
- **Styling**: Tailwind CSS
- **API**: Umbraco Delivery API
- **Package Manager**: npm
- **OS**: Windows 10 (PowerShell)
- **Workspace**: `/c:/Development/UmbracoContentCreator/content_creator_client`

## Project Structure for AI Operations

```
src/
├── components/          # Reusable UI components
│   ├── appShell/       # Application layout (AppShell.tsx)
│   ├── common/         # Shared components (ScrollIndicatorComponent.tsx)
│   ├── content/        # Content cards (BodyTextCard, MainImageCard, PageTitleCard)
│   ├── grid/           # Grid system (GridCardComponent, GridItem)
│   └── navigation/     # Navigation components
├── constants/          # Application constants
│   ├── routes.ts       # Route definitions
│   └── styles.ts       # Design system tokens
├── containers/         # Page-level containers
│   ├── homePage/       # Home page container
│   ├── newsPage/       # News listing page
│   └── newsItemPage/   # Individual news item pages
├── hooks/              # Custom React hooks (PageLoadHooks.ts)
├── model/              # TypeScript interfaces/types
│   ├── common/         # Shared types (UmbracoCommon.ts)
│   ├── VideoSummary.ts # YouTube API proxy response types
│   └── [entities].ts   # Entity-specific types
└── services/           # API and data services
```

## AI Agent Capabilities & Patterns

### File Operations
- **Read Operations**: Use `read_file` to examine existing code and understand patterns
- **Edit Operations**: Use `edit_file` for precise code modifications
- **Search Operations**: Use `codebase_search` for semantic search and `grep_search` for exact patterns
- **File Creation**: Use `edit_file` with new file paths to create components, types, or services

### Code Generation Patterns

#### Component Creation Pattern
```typescript
// 1. Create TypeScript interface
interface ComponentNameProps {
  /** Unique identifier for the component */
  id: string
  prop1: string
  prop2?: number
}

// 2. Create functional component with JSDoc
/**
 * ComponentName - Brief description
 * @param props - Component props
 * @returns JSX element
 */
export const ComponentName: React.FC<ComponentNameProps> = ({ id, prop1, prop2 }) => {
  return (
    <div id={id} className={`${DESIGN_TOKENS.SURFACE_BG} ${DESIGN_TOKENS.BORDER_RADIUS}`}>
      <div id={`${id}-content`}>
        {prop1}
      </div>
    </div>
  )
}
```

#### Service Layer Pattern
```typescript
// 1. Define return type
interface ServiceResponse {
  data: EntityType[]
  loading: boolean
  error: string | null
}

// 2. Create service function
export const fetchEntityData = async (): Promise<EntityType[]> => {
  try {
    const result = await executeContentApiQuery<IEntityProperties>('entityType')
    return result.items.map(mapEntityFromUmbraco)
  } catch (error) {
    console.error('Failed to fetch entity data:', error)
    throw error
  }
}

// 3. Create mapping function
const mapEntityFromUmbraco = (item: IUmbracoItem): EntityType => ({
  id: item.id,
  title: item.properties.title as string,
  // ... other mappings
})
```

#### Hook Pattern
```typescript
// 1. Create custom hook
export const useEntityData = (): ServiceResponse => {
  const [data, setData] = useState<EntityType[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const result = await fetchEntityData()
        setData(result)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return { data, loading, error }
}
```

## Key Architectural Patterns

### 1. Grid Component System
**Location**: `src/components/grid/`

**Usage Pattern**:
```tsx
import { GridCardComponent, GridItem } from '../../components/grid'

<GridCardComponent
  items={data}
  columns={3}
  renderItem={(item) => <GridItem {...itemProps} />}
  getItemKey={(item) => item.id}
/>

// For equal height items (e.g., YouTube thumbnails)
<GridCardComponent
  items={videos}
  columns="1-md-2-lg-3"
  equalHeight={true}
  renderItem={(video) => <VideoThumbnail video={video} />}
  getItemKey={(video) => video.videoId}
/>
```

**Grid Props**:
- `columns`: Responsive column layout (`2`, `3`, `4`, `'1-md-2'`, `'1-md-2-lg-3'`)
- `equalHeight`: Makes all grid items stretch to equal heights (useful for cards with varying content)
- `maxItems`: Limits the number of displayed items
- `className`: Additional CSS classes for customization

**AI Implementation**: When creating grid layouts, always use this pattern for consistency. Use `equalHeight={true}` for cards with varying content heights (like video thumbnails with different title lengths).

### 2. Background Image System
**Location**: `src/components/appShell/AppShell.tsx`

**Key Features**:
- Global background image for all pages
- Conditional blue fallback (`bg-blue-200`) when no image
- Backdrop blur effects on content
- Z-index layering: background (z-0), content (z-20)

**AI Implementation**: Always consider background image when creating layout components.

### 3. Design System Integration
**Location**: `src/constants/styles.ts`

**Usage Pattern**:
```tsx
import { DESIGN_TOKENS, HOMEPAGE_CARD_CLASSES, NEWS_PAGE_CARD_CLASSES } from '../constants/styles'

// Use design tokens instead of hardcoded values
className={`${DESIGN_TOKENS.SURFACE_BG} ${DESIGN_TOKENS.BORDER_RADIUS}`}

// Use pre-composed classes for specific contexts
className={isHomePage ? HOMEPAGE_CARD_CLASSES : NEWS_PAGE_CARD_CLASSES}
```

### 4. Content Component Pattern
**Location**: `src/components/content/`

**Standard Props**:
```typescript
interface ContentCardProps {
  // Content props
  title?: string
  bodyText?: string
  mainImage?: Image
   
  // Context props for conditional styling
  isHomePage?: boolean
  isNewsPage?: boolean
   
  // Accessibility
  alt?: string
  ariaLabel?: string
}
```

### 5. HTML Element ID Patterns
**Implementation**: Comprehensive ID attributes on all HTML elements throughout the codebase

**ID Naming Conventions**:
- **Kebab-case format**: All IDs use lowercase with hyphens (`homepage-container`, `news-page-title`)
- **Hierarchical structure**: Child elements extend parent IDs (`{parentId}-content`, `{parentId}-title`)
- **Component-based**: IDs passed as props for reusable components (`{id}`, `{id}-wrapper`)
- **Content-derived**: Dynamic IDs from content (`grid-item-${title?.toLowerCase().replace(/\s+/g, '-')}`)

**Usage Patterns**:
```typescript
// Static container IDs
<div id="homepage-container">
<div id="news-page-container">
<div id="youtube-page-container">

// Component-based IDs (passed as props)
interface ComponentProps {
  /** Unique identifier for the component */
  id: string
}

<ComponentName id="specific-instance-id" />

// Inside component:
<div id={id} className={cardClasses}>
  <div id={`${id}-content`}>
    <h1 id={`${id}-title`}>{title}</h1>
  </div>
</div>

// Dynamic content-based IDs with safe transformations
<div id={`grid-item-${title?.toLowerCase().replace(/\s+/g, '-') || 'item'}`}>
<button id={`nav-button-${children?.toString().toLowerCase().replace(/\s+/g, '-') || 'button'}`}>

// YouTube video elements
<div id={`youtube-video-player-${videoId}`}>
<div id={`youtube-channel-container-${channel.channelId || 'unknown'}`}>
```

**Safety Features**:
- **Optional chaining**: `title?.toLowerCase()` to handle undefined values
- **Fallback values**: `|| 'item'`, `|| 'button'` for when content is missing
- **Special character handling**: `.replace(/\s+/g, '-')` converts spaces to hyphens
- **Consistent transformation**: Same pattern used throughout codebase

**Accessibility Integration**:
```typescript
// IDs work with accessibility attributes
<div 
  id={id}
  aria-label={ariaLabel}
  role="button"
  tabIndex={0}
>
  <svg 
    id={`${id}-arrow`}
    aria-hidden="true"
  >
    <path id={`${id}-path`} />
  </svg>
</div>

// Background images with proper ARIA
<div
  id={`grid-item-background-${title?.toLowerCase().replace(/\s+/g, '-') || 'bg'}`}
  role="img"
  aria-label={imageAlt || title || 'Grid item image'}
/>
```

**AI Implementation Guidelines**:
- **Always add IDs**: Every HTML element should have a unique ID attribute
- **Use hierarchical naming**: Child elements should extend parent IDs
- **Handle dynamic content safely**: Use optional chaining and fallbacks
- **Maintain consistency**: Follow established naming patterns
- **Consider accessibility**: IDs should work with ARIA attributes
- **Test transformations**: Ensure dynamic ID generation handles edge cases

### 6. YouTube Component Pattern
**Location**: `src/components/content/`

**Key Components**:
- `YoutubeVideoListCard.tsx` - Displays grid of videos with embedded player capability
- `YoutubeVideoCard.tsx` - Individual video card component
- `YoutubeFeaturedVideoCard.tsx` - Featured video display

**Usage Pattern**:
```tsx
// YouTube video list with backend proxy integration
const { videos, loading, error, refetch } = useYouTubeData(
  channel.channelId || null,
  maxVideos
)

<YoutubeVideoListCard 
  channel={youtubePage} 
  hasBackgroundImage={!!globalData?.backgroundImage}
/>

// Individual video card
<YoutubeVideoCard video={videoSummary} />
```

**VideoSummary Integration**:
```typescript
// Hook returns VideoSummary[] from backend proxy
export const useYouTubeData = (
  channelId: string | null, 
  maxResults: number = 10
): UseYouTubeDataResult => {
  const [videos, setVideos] = useState<VideoSummary[]>([])
  // ... implementation
}
```

## API Integration Patterns

### Axios HTTP Client (Updated June 19, 2025)
**Base Configuration**: `src/services/apiClient.ts`

**Key Features**:
- Centralized axios instance with interceptors
- Automatic JSON parsing
- Request/response logging
- Consistent error handling
- TypeScript support with proper typing

**Service Pattern**:
```typescript
// In ContentServiceApi.ts
import { apiClient, handleContentResponse } from './apiClient'

export const executeContentApiQuery = async <T>(
  contentType: string,
  additionalParams?: Record<string, string>
): Promise<{ items: IUmbracoItem[] }> => {
  const params = new URLSearchParams({
    filter: `contentType:${contentType}`,
    ...additionalParams
  })
  
  const response = await apiClient.get<{ items: IUmbracoItem[] }>(
    `/content?${params.toString()}`
  )
  
  return handleContentResponse(response)
}
```

### Umbraco Delivery API
**Base URL Pattern**: `{VITE_API_URL}/umbraco/delivery/api/v2/content`

**Common Endpoints**:
```typescript
// Fetch by content type
GET ?filter=contentType:typeName

// Fetch children of parent
GET ?fetch=children:parentId

// Fetch specific item
GET /item/{id}
```

**Service Pattern**:
```typescript
// In ContentServiceApi.ts
export const executeContentApiQuery = async <T>(
  contentType: string,
  additionalParams?: Record<string, string>
): Promise<{ items: IUmbracoItem[] }> => {
  const params = new URLSearchParams({
    filter: `contentType:${contentType}`,
    ...additionalParams
  })
  
  const response = await apiClient.get<{ items: IUmbracoItem[] }>(
    `/content?${params.toString()}`
  )
  
  return handleContentResponse(response)
}
```

## File Naming Conventions

- **Components**: `PascalCase.tsx` (e.g., `GridCardComponent.tsx`)
- **Containers**: `PascalCase + Container.tsx` (e.g., `NewsPageContainer.tsx`)
- **Hooks**: `camelCase + Hooks.ts` (e.g., `PageLoadHooks.ts`)
- **Types**: `PascalCase.ts` (e.g., `NewsItemPage.ts`)
- **Services**: `PascalCase + Service/Api.ts`

## Import Patterns for AI

### Preferred Import Styles
```typescript
// Type imports (always use 'import type')
import type { NewsItemPage } from '../model/NewsItemPage'
import type { IUmbracoItem } from '../model/common/UmbracoCommon'

// Component imports from index files
import { GridCardComponent, GridItem } from '../../components/grid'

// Service imports
import { executeContentApiQuery } from './ContentServiceApi'

// Constants
import { ROUTES } from '../constants/routes'
import { DESIGN_TOKENS, HOMEPAGE_CARD_CLASSES } from '../constants/styles'

// React Router
import { useNavigate } from 'react-router-dom'
```

## Common AI Tasks & Solutions

### Adding New Content Type
1. **Create Model**: `src/model/NewContentType.ts`
2. **Add Properties**: `src/model/common/UmbracoCommon.ts`
3. **Create Service**: Add to `src/services/PageLoaderService.ts`
4. **Create Hook**: Add to `src/hooks/PageLoadHooks.ts`
5. **Create Container**: `src/containers/newContentType/`
6. **Add Routes**: Update `src/constants/routes.ts` and `src/Routes.tsx`

### Creating Reusable Components
1. **Place in appropriate folder** (`common`, `grid`, `content`, etc.)
2. **Use TypeScript interfaces** for props
3. **Add JSDoc documentation**
4. **Include accessibility features** (ARIA labels, keyboard support)
5. **Use design tokens** for styling
6. **Export from index.ts** if in a folder with multiple components

### Implementing Backdrop Blur Effects
```tsx
// Component with conditional backdrop blur
<BodyTextCard 
  bodyText={content.bodyText} 
  isHomePage={true} 
  isNewsPage={false} 
/>

// CSS classes for backdrop blur
className={`${HOMEPAGE_CARD_CLASSES} backdrop-blur-md`}
```

## Error Handling Patterns

### API Error Handling (Axios)
```typescript
try {
  const result = await executeContentApiQuery<IType>('contentType')
  return result.items.map(mapFunction)
} catch (error) {
  const axiosError = error as AxiosError
  console.error('Failed to fetch data:', {
    status: axiosError.response?.status,
    statusText: axiosError.response?.statusText,
    data: axiosError.response?.data,
    url: axiosError.config?.url
  })
  throw new Error(`Failed to fetch ${contentType}: ${axiosError.message}`)
}
```

### Component Error Boundaries
```tsx
// In containers
const { content, loading, error } = useHook()

if (loading) return <div>Loading...</div>
if (error) return <div>Error: {error}</div>
```

## Performance Considerations

### React Optimization
```tsx
// Memoize expensive operations
const memoizedData = useMemo(() => processData(rawData), [rawData])

// Use React.memo for components with expensive renders
export const ExpensiveComponent = React.memo<Props>(({ data }) => {
  return <div>{/* component content */}</div>
})
```

### Image Optimization
```tsx
// Use proper image loading
<img 
  src={image.url} 
  alt={image.altText || 'Image description'}
  loading="lazy"
  className="object-cover"
/>
```

## Testing Considerations

### Component Testing Structure
```typescript
// Test file naming: ComponentName.test.tsx
// Test structure for components
describe('ComponentName', () => {
  it('renders correctly with props', () => {
    // Test implementation
  })
  
  it('handles loading state', () => {
    // Test loading state
  })
  
  it('handles error state', () => {
    // Test error state
  })
})
```

## Debugging for AI Agents

### Common Issues & Solutions

1. **TypeScript Errors**
   - Check import statements for `import type`
   - Verify interface definitions match usage
   - Ensure proper generic type usage

2. **API Integration Issues**
   - Verify API base URL in environment variables
   - Check network tab for failed requests
   - Ensure proper error handling in services

3. **Styling Issues**
   - Use design tokens instead of hardcoded values
   - Check Tailwind CSS class validity
   - Verify backdrop blur browser support

4. **Routing Issues**
   - Check route definitions in `constants/routes.ts`
   - Verify route parameters match component expectations
   - Ensure proper navigation usage

### Development Commands
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

## Recent Architecture Updates

### YouTube Proxy API Integration (December 2024)
- **Backend Proxy Pattern**: YouTube API calls now go through Umbraco backend proxy at `/api/youtube`
- **Type-Safe VideoSummary**: New `VideoSummary.ts` model matches C# backend VideoSummary class
- **Secure API Key Handling**: YouTube API key is now stored securely in backend, not exposed to frontend
- **Simplified Response Structure**: Backend returns simplified video data with `videoId`, `title`, `description`, `thumbnailUrl`, `youtubeUrl`
- **Updated googleApiClient**: Now uses VideoSummary types instead of raw YouTube API response types
- **Channel ID Migration**: Property renamed from `youtubeChannelId` to `channelId` to match Umbraco model

#### YouTube API Service Pattern
```typescript
// In googleApiClient.ts - updated to use backend proxy
export const getChannelLatestVideos = async (
  channelId: string,
  maxResults: number = 10
): Promise<VideoSummary[]> => {
  const response = await youtubeApiClient.get<VideoListResponse>(
    `/channel/${channelId}/videos`,
    { params: { maxResults } }
  )
  return response.data.videos
}

// VideoSummary interface matches C# backend model
interface VideoSummary {
  videoId: string
  title: string
  description: string
  thumbnailUrl: string
  youtubeUrl: string
}
```

### Axios HTTP Client Migration (June 19, 2025)
- **Replaced fetch**: All API calls now use Axios for better TypeScript support
- **Centralized Configuration**: `src/services/apiClient.ts` with interceptors
- **Automatic JSON Parsing**: No more manual `.json()` calls
- **Better Error Handling**: Detailed error information with status codes
- **Request/Response Logging**: Built-in debugging with interceptors
- **Type Safety**: Full TypeScript support with proper generic typing

### Background Image System (June 19, 2025)
- **Global Background**: Single background image for all pages
- **Conditional Fallback**: Blue background only when no image available
- **Dynamic Container Classes**: `getAppShellContainerClasses(hasBackgroundImage)`
- **Cross-Page Consistency**: Background works on HomePage, NewsPage, NewsItemPage

### Backdrop Blur System (June 19, 2025)
- **Universal Application**: Backdrop blur on all content cards
- **Conditional Props**: `isHomePage` and `isNewsPage` for appropriate styling
- **CSS Implementation**: `backdrop-filter: blur(8px)` with webkit fallback
- **Performance**: CSS-only solution with minimal overhead

### Full-Screen Homepage Layout (June 19, 2025)
- **Hero Section**: Full-viewport height with centered title
- **Scroll-Snap**: Smooth section transitions
- **ScrollIndicatorComponent**: Animated scroll indicator with accessibility
- **Responsive Typography**: Text scaling from text-5xl to text-7xl

### Comprehensive HTML Element ID System (January 2025)
- **Universal ID Coverage**: Every HTML element throughout the codebase has unique ID attributes
- **Hierarchical Naming**: Child elements extend parent IDs (`{parentId}-content`, `{parentId}-title`)
- **Component-Based IDs**: Reusable components accept `id` prop for instance-specific identification
- **Dynamic Content Safety**: Safe ID generation with optional chaining and fallbacks
- **Accessibility Integration**: IDs work seamlessly with ARIA attributes and assistive technologies
- **Consistent Conventions**: Kebab-case format with predictable naming patterns
- **Special Character Handling**: Automatic conversion of spaces and special characters in dynamic IDs

## Text Processing & Sanitization Patterns

### HTML Content Sanitization
**Location**: `src/utility/textUtility.ts`

**Purpose**: Handles HTML entities and markup in text content, especially for YouTube video titles that may contain HTML.

**Usage Pattern**:
```typescript
import { sanitizeHtml, truncateText, sanitizeAndTruncateText } from '../utility/textUtility'

// For video titles that might contain HTML
<h4>{sanitizeHtml(video.title)}</h4>

// For alt text attributes
<img alt={sanitizeHtml(video.title)} />

// For truncated titles with HTML sanitization
<h4>{sanitizeAndTruncateText(video.title, 60)}</h4>
```

**Available Functions**:
- `sanitizeHtml(text: string)` - Removes HTML tags and decodes entities
- `truncateText(text: string, maxLength: number)` - Truncates with ellipsis
- `sanitizeAndTruncateText(text: string, maxLength: number)` - Combines both operations

**AI Implementation**: Always use `sanitizeHtml()` for user-generated content or external API data (like YouTube titles) that might contain HTML markup.

## Quick Reference for AI Agents

### Most Used Patterns
```typescript
// Data fetching
const { content, loading, error } = useHook()

// YouTube data fetching (with backend proxy)
const { videos, loading, error, refetch } = useYouTubeData(
  channel.channelId || null,
  maxResults
)

// Navigation
const navigate = useNavigate()
navigate(ROUTES.ROUTE_NAME.replace(':param', value))

// Grid rendering
<GridCardComponent items={items} columns={3} renderItem={Component} />

// Background image handling
<AppShell backgroundImage={homePage.backgroundImage} />

// YouTube components
<YoutubeVideoListCard channel={youtubePage} hasBackgroundImage={!!backgroundImage} />
<YoutubeVideoCard video={videoSummary} />

// Text sanitization (for external content)
<h4>{sanitizeHtml(video.title)}</h4>
<img alt={sanitizeHtml(video.title)} />

// Conditional styling
className={isHomePage ? HOMEPAGE_CARD_CLASSES : NEWS_PAGE_CARD_CLASSES}
```

### File Creation Checklist
- [ ] TypeScript interfaces defined with proper types
- [ ] JSDoc documentation added
- [ ] Error handling implemented
- [ ] Loading states handled
- [ ] Design tokens used for styling
- [ ] **HTML element IDs added** (every element should have unique ID)
- [ ] **ID prop included** in component interfaces (for reusable components)
- [ ] **Hierarchical ID structure** implemented (`{id}-content`, `{id}-title`)
- [ ] **Safe dynamic ID generation** with optional chaining and fallbacks
- [ ] Background image considerations (if layout component)
- [ ] YouTube API proxy integration (if YouTube-related)
- [ ] VideoSummary types used instead of raw YouTube API types
- [ ] Responsive design implemented
- [ ] Accessibility features included (ARIA attributes work with IDs)
- [ ] Proper import/export patterns
- [ ] Component follows established patterns

### Environment Variables
```env
VITE_API_URL=https://your-umbraco-instance.com
```

## Global State Management (React Context)

### GlobalDataProvider & useGlobalData

**Location:**
- Provider: `src/context/GlobalDataContext.tsx`
- Hook: `src/hooks/useGlobalData.ts`

**Purpose:**
- Provides a global state for app-wide properties such as `footerText`, `backgroundImage`, `pageTitle`, `bodyText`, and theme colors (`color1`, `color2`, `color3`).
- Uses React Context API to make these values accessible throughout the component tree.
- Fetches global data (from the homepage) on mount and exposes a `refetch` method for updates.

**Usage Pattern:**
```tsx
// In your app root (e.g., main.tsx or AppShell.tsx)
import { GlobalDataProvider } from './context/GlobalDataContext'

<GlobalDataProvider>
  <App />
</GlobalDataProvider>
```

```typescript
// In any component
import { useGlobalData } from '../hooks/useGlobalData'

const { globalData, loading, error, refetch } = useGlobalData()

if (loading) return <div>Loading...</div>
if (error) return <div>Error: {error}</div>
```

**GlobalData Properties:**
- `footerText?: string`
- `backgroundImage?: HomePage['backgroundImage']`
- `pageTitle?: string`
- `bodyText?: string`
- `color1?: string` (theme color)
- `color2?: string` (theme color)
- `color3?: string` (theme color)

**Notes:**
- All components that need global data should use the `useGlobalData` hook.
- The context may be replaced with a more advanced state management solution in the future.

## Removed Components

### Footer Component
- The `Footer` component (`src/components/common/Footer.tsx`) has been **removed** as of June 2025.
- Reason: The component was not behaving as expected and has been temporarily removed for future reconsideration.
- If global footer functionality is needed, consider re-implementing with improved design and integration with global state.

---

*Last Updated: June 19, 2025*
*Optimized for Cursor AI Agent Operations*
