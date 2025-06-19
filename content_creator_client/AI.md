# AI Project Documentation - Umbraco Content Creator Client

> Quick reference guide for AI assistants working on this project

## Project Overview

This is a React + TypeScript + Vite application that serves as a client for an Umbraco Content Management System. It uses the Umbraco Delivery API to fetch and display content.

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Routing**: React Router v6
- **Styling**: Tailwind CSS
- **API**: Umbraco Delivery API
- **Package Manager**: npm

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── appShell/       # Application layout components
│   ├── common/         # Generic shared components (ScrollIndicatorComponent)
│   ├── content/        # Content-specific components (cards, etc.)
│   ├── grid/           # Grid layout components (NEW PATTERN)
│   └── navigation/     # Navigation components
├── constants/          # Application constants
│   ├── routes.ts       # Route definitions
│   └── styles.ts       # Design system tokens
├── containers/         # Page-level containers
│   ├── homePage/       # Home page container
│   ├── newsPage/       # News listing page
│   └── newsItemPage/   # Individual news item pages
├── hooks/              # Custom React hooks
├── model/              # TypeScript interfaces/types
│   ├── common/         # Shared types (Umbraco, etc.)
│   └── [entities].ts   # Entity-specific types
└── services/           # API and data services
```

## Key Architectural Patterns

### 1. Grid Components (Reusable Pattern)
Location: `src/components/grid/`

- **GridCardComponent**: Container for multiple items in a grid layout
- **GridItem**: Individual grid item with image, title, summary, badges
- **Clean Exports**: Use `src/components/grid/index.ts` for imports

```tsx
// Import pattern
import { GridCardComponent, GridItem } from '../../components/grid'

// Usage pattern
<GridCardComponent
  items={data}
  columns={3}
  renderItem={(item) => <GridItem {...itemProps} />}
  getItemKey={(item) => item.id}
/>
```

### 2. Service Layer Pattern
Location: `src/services/`

- **ContentServiceApi.ts**: Umbraco API interactions
- **PageLoaderService.ts**: Page-specific data fetching
- **Hooks**: `src/hooks/PageLoadHooks.ts` for data fetching

```tsx
// API patterns
const result = await executeContentApiQuery<IPropertiesType>('contentType')
const item = await fetchContentByIdOrPath<IPropertiesType>('id-or-path')

// Hook patterns
const { content, loading, error } = useNewsPage()
const { newsItems } = useNewsPageItems(parentId, maxItems)
```

### 3. Design System
Location: `src/constants/styles.ts`

- **DESIGN_TOKENS**: Atomic design values
- **Component Classes**: Pre-composed class combinations
- **Background System**: Global background image and overlay classes
- **Homepage Layout**: Full-screen section classes with scroll-snap
- **Consistent Styling**: Use tokens, not hardcoded values

```tsx
// Good pattern
className={`${DESIGN_TOKENS.SURFACE_BG} ${DESIGN_TOKENS.BORDER_RADIUS}`}

// Background system pattern
className={`${BACKGROUND_IMAGE_CLASSES} ${DESIGN_TOKENS.BACKGROUND_OVERLAY_DARK}`}

// Homepage layout pattern
className={`${HOMEPAGE_HERO_SECTION_CLASSES} homepage-scroll-section`}

// Avoid
className="bg-white rounded-lg"
```

### 4. Background Image Architecture
Location: `src/components/appShell/AppShell.tsx`

- **Global Background**: Single background image for all pages
- **Conditional Overlay**: Dark filter applied on non-homepage pages
- **Layered Design**: Fixed positioning with proper z-index stacking
- **Responsive**: Background covers full viewport with proper sizing

```tsx
// Background implementation pattern
{backgroundImage && (
  <div 
    className={BACKGROUND_IMAGE_CLASSES}
    style={{ backgroundImage: `url(${backgroundImage})` }}
  />
)}
{shouldShowOverlay && (
  <div className={`${BACKGROUND_OVERLAY_CLASSES} ${DESIGN_TOKENS.BACKGROUND_OVERLAY_DARK}`} />
)}
```

## Content Management

### Content Types
- **HomePage**: Landing page content with background image and full-screen layout
- **News**: News listing page with filters/settings
- **NewsItemPage**: Individual news articles

### Data Flow
1. **Fetch**: Services call Umbraco Delivery API
2. **Transform**: Map Umbraco response to typed models
3. **Hook**: Custom hooks provide loading states
4. **Background**: HomePage data provides background image for AppShell
5. **Render**: Containers use hooks, render components

## API Patterns

### Umbraco Delivery API Endpoints
```
GET /umbraco/delivery/api/v2/content?filter=contentType:typeName
GET /umbraco/delivery/api/v2/content?fetch=children:parentId
GET /umbraco/delivery/api/v2/content/item/{id}
```

### Type Mapping Pattern
```typescript
// Service layer maps Umbraco response to domain model
const mapNewsItem = (item: IUmbracoItem): NewsItemPage => ({
  id: item.id,
  title: item.properties.title as string,
  // ... other mappings
})
```

## File Naming Conventions

- **Components**: PascalCase.tsx (e.g., `GridCardComponent.tsx`)
- **Containers**: PascalCase + Container.tsx (e.g., `NewsPageContainer.tsx`)
- **Hooks**: camelCase + Hooks.ts (e.g., `PageLoadHooks.ts`)
- **Types**: PascalCase.ts (e.g., `NewsItemPage.ts`)
- **Services**: PascalCase + Service/Api.ts

## Import Patterns

### Preferred Import Styles
```typescript
// Type imports
import type { NewsItemPage } from '../model/NewsItemPage'

// Component imports from index files
import { GridCardComponent, GridItem } from '../../components/grid'

// Service imports
import { executeContentApiQuery } from './ContentServiceApi'

// Constants
import { ROUTES } from '../constants/routes'
import { DESIGN_TOKENS } from '../constants/styles'
```

## Common Tasks & Solutions

### Adding New Content Type
1. Create interface in `src/model/[Type].ts`
2. Add properties interface in `src/model/common/UmbracoCommon.ts`
3. Add fetch function in `src/services/PageLoaderService.ts`
4. Add hook in `src/hooks/PageLoadHooks.ts`
5. Create container in `src/containers/[type]/`
6. Add route in `src/constants/routes.ts` and `src/Routes.tsx`

### Creating Reusable Components
1. Place in appropriate folder (`common`, `grid`, `content`, etc.)
2. Use TypeScript interfaces for props
3. Add JSDoc documentation
4. Include accessibility features (ARIA labels, keyboard support)
5. Export from index.ts file (optional)
6. Use design tokens for styling

### Grid Layouts
- Use `GridCardComponent` for lists
- Use `GridItem` for individual cards
- Support 2, 3, or 4 column layouts
- Handle empty states gracefully

## Environment & Configuration

### Build Commands
```bash
npm run dev      # Development server
npm run build    # Production build
npm run preview  # Preview production build
```

### Environment Variables
```env
VITE_API_URL=your-umbraco-url
```

## Code Quality Guidelines

### TypeScript
- Always use type imports (`import type`)
- Define interfaces for all props
- Use generic types for reusable components
- Avoid `any` - use proper typing

### React
- Use functional components
- Prefer hooks over class components
- Memoize expensive operations
- Handle loading and error states

### CSS/Styling
- Use Tailwind CSS classes
- Prefer design tokens over hardcoded values
- Keep responsive design in mind
- Use semantic HTML

## Debugging Tips

### Common Issues
1. **API Errors**: Check browser network tab, verify Umbraco URL
2. **Type Errors**: Ensure proper type imports and interfaces
3. **Build Errors**: Check for missing dependencies or syntax errors
4. **Routing Issues**: Verify route definitions in constants and Routes.tsx

### Development Tools
- React DevTools for component debugging
- Browser network tab for API calls
- TypeScript compiler for type checking
- Vite dev server for hot reload

## Recent Changes & Patterns

### Grid Component System (Latest)
- Created reusable `GridCardComponent` and `GridItem`
- Moved to dedicated `src/components/grid/` folder
- Supports generic types and flexible rendering
- Used in news item listing

### Content API Integration
- Implemented real API calls replacing mock data
- Added `fetchContentByIdOrPath` for individual items
- Proper error handling and loading states

### Background Image System (Updated - June 19, 2025)
- Global background image support in AppShell
- **No Dark Overlay**: Removed conditional dark overlay system for cleaner design
- Z-index layering: background (z-0), content (z-20) - simplified layer structure
- Background image configurable via HomePage model
- **Fallback System**: Blue background (`bg-blue-200`) only shows when no background image is available
- **Universal Backdrop Blur**: Background image stays visible with backdrop blur across all pages
- **Fixed Container Issue**: Created `getAppShellContainerClasses()` to prevent blue background from covering background image
- **Cross-Page Consistency**: Background image now displays correctly on both HomePage and NewsPage

### Full-Screen Homepage Layout (Updated - June 19, 2025)
- Hero section with full-viewport height and centered title
- Separate content section with scroll-snap behavior
- CSS scroll-snap for smooth section transitions
- Responsive typography (text-5xl to text-7xl)
- **ScrollIndicatorComponent**: Reusable animated scroll indicator with accessibility support
- Homepage-specific container classes bypass standard padding
- **Clean Backdrop Blur**: Content section uses backdrop blur without dark overlay

### Backdrop Blur System (Latest - June 19, 2025)
- **Universal Application**: Backdrop blur applied to homepage, news pages, and news item pages
- **Component-Level Support**: All content cards (`BodyTextCard`, `PageTitleCard`, `MainImageCard`) support conditional backdrop blur
- **CSS Implementation**: Uses `backdrop-filter: blur(8px)` with `-webkit-backdrop-filter` fallback
- **Conditional Props**: Components accept `isHomePage` and `isNewsPage` props for appropriate styling
- **Card Classes**: Multiple backdrop blur card classes (`HOMEPAGE_CARD_CLASSES`, `NEWS_PAGE_CARD_CLASSES`)
- **Container Classes**: `NEWS_PAGE_CONTAINER_CLASSES` applies backdrop blur to entire page sections
- **Performance**: CSS-only solution with minimal overhead and modern browser support

### Background Fallback System (Latest - June 19, 2025)
- **Conditional Background**: Blue background (`bg-blue-200`) only applied when no background image is available
- **Smart Implementation**: `getAppShellContainerClasses(!!backgroundImage)` ensures no conflicts between blue background and background image
- **Dynamic Container Classes**: Replaced static `APP_SHELL_CONTAINER_CLASSES` with conditional function to prevent background image being covered
- **Graceful Degradation**: Users always see a proper background (image or blue fallback)
- **No Overlap**: Prevents blue background from covering background image
- **Reliability**: Ensures visual consistency even when images fail to load
- **Cross-Page Fix**: Background image now works consistently on HomePage, NewsPage, and NewsItemPage

### Background Image Blur Effects (Updated - June 19, 2025)
- **Persistent Background**: Background image stays visible across all pages during scrolling
- **Pure Backdrop Blur**: Content sections use `backdrop-filter: blur(8px)` without dark overlay
- **Enhanced Card System**: Multiple card classes with backdrop blur (`HOMEPAGE_CARD_CLASSES`, `NEWS_PAGE_CARD_CLASSES`)
- **Component Integration**: All content components support `isHomePage`/`isNewsPage` props for conditional styling
- **Cross-browser Support**: Includes `-webkit-backdrop-filter` for Safari compatibility
- **Visual Continuity**: Same backdrop blur treatment across homepage content section and all news pages

---

## Quick Reference Cheat Sheet

### Most Used Imports
```typescript
import type { NewsItemPage } from '../model/NewsItemPage'
import { GridCardComponent, GridItem } from '../../components/grid'
import ScrollIndicatorComponent from '../../components/common/ScrollIndicatorComponent'
import { DESIGN_TOKENS, CARD_CLASSES, HOMEPAGE_CARD_CLASSES, NEWS_PAGE_CARD_CLASSES, BACKGROUND_IMAGE_CLASSES, getAppShellContainerClasses } from '../../constants/styles'
import { useNavigate } from 'react-router-dom'
import { useHomePage } from '../hooks/PageLoadHooks'
```

### Most Used Patterns
```typescript
// Data fetching hook
const { content, loading, error } = useNewsPage()
const { content: homePage } = useHomePage() // For background image

// Dynamic container classes (background image aware)
className={getAppShellContainerClasses(!!backgroundImage)}

// Background image conditional styling
className={`min-h-screen ${backgroundImage ? '' : 'bg-blue-200'} flex flex-col relative`}
```

// Grid rendering
<GridCardComponent
  items={items}
  columns={3}
  renderItem={(item) => <Component item={item} />}
  getItemKey={(item) => item.id}
/>

// Background image in AppShell (no overlay)
<AppShell backgroundImage={homePage.backgroundImage} />

// Full-screen homepage sections with backdrop blur
<section className={`${HOMEPAGE_HERO_SECTION_CLASSES} homepage-scroll-section`}>
  <h1 className={HOMEPAGE_TITLE_CLASSES}>{title}</h1>
  <ScrollIndicatorComponent />
</section>

<section className={`${HOMEPAGE_CONTENT_SECTION_CLASSES} homepage-scroll-section`}>
  <BodyTextCard bodyText={content.bodyText} isHomePage={true} />
</section>

// News pages with backdrop blur container and conditional props
<div className={NEWS_PAGE_CONTAINER_CLASSES}>
  <PageTitleCard title={content.title} isNewsPage={true} />
  <MainImageCard mainImage={content.mainImage} alt={content.title} isNewsPage={true} />
  <BodyTextCard bodyText={content.bodyText} isNewsPage={true} />
</div>

// Navigation
const navigate = useNavigate()
navigate(ROUTES.NEWS_ITEM.replace(':itemPage', slug))
```

### File Creation Checklist
- [ ] TypeScript interfaces defined
- [ ] Props documented with JSDoc
- [ ] Error handling implemented
- [ ] Loading states handled
- [ ] Design tokens used for styling
- [ ] Background image considerations (if layout component)
- [ ] Responsive design implemented
- [ ] Scroll behavior considered (for homepage)
- [ ] Exports added to index.ts (if applicable)
- [ ] Tests considered (future improvement)

---

## Architecture Patterns Reference

### Background Image System
```typescript
// 1. Add to HomePage model
interface HomePage {
  backgroundImage?: string
}

// 2. Update Umbraco properties
interface IHomePageProperties {
  backgroundImage?: string
}

// 3. Fetch in service
return {
  backgroundImage: content.properties.backgroundImage || fallbackUrl
}

// 4. Pass to AppShell
<AppShell backgroundImage={homePage.backgroundImage} />

// 5. Implement in AppShell with conditional fallback
<div className={`min-h-screen ${backgroundImage ? '' : 'bg-blue-200'} flex flex-col relative`}>
  {backgroundImage && (
    <div className={BACKGROUND_IMAGE_CLASSES} style={{ backgroundImage: `url(${backgroundImage})` }} />
  )}
</div>
```

### Full-Screen Layout Pattern
```css
/* CSS for smooth scrolling */
.homepage-scroll-container {
  scroll-snap-type: y mandatory;
  height: 100vh;
  overflow-y: scroll;
}
.homepage-scroll-section {
  scroll-snap-align: start;
  min-height: 100vh;
}

/* Backdrop blur effects (no dark overlay) */
.homepage-content-overlay {
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

/* News page backdrop blur */
.news-page-backdrop {
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}
```

```tsx
// Full-screen section component
<section className={`${HOMEPAGE_HERO_SECTION_CLASSES} homepage-scroll-section`}>
  <h1 className={HOMEPAGE_TITLE_CLASSES}>{title}</h1>
  <div className={HOMEPAGE_SCROLL_INDICATOR_CLASSES}>↓</div>
</section>

// Content section with backdrop blur (no dark overlay)
<section className={`${HOMEPAGE_CONTENT_SECTION_CLASSES} homepage-scroll-section`}>
  <BodyTextCard bodyText={content.bodyText} isHomePage={true} />
</section>

// News page with backdrop blur container
<div className={NEWS_PAGE_CONTAINER_CLASSES}>
  <PageTitleCard title={content.title} isNewsPage={true} />
  <BodyTextCard bodyText={content.bodyText} isNewsPage={true} />
</div>
```

---

*Last Updated: June 19, 2025*
*This document should be updated as the project evolves*

---

## Troubleshooting Guide

### Background Image Not Showing on Non-HomePage (Fixed - June 19, 2025)

**Problem**: Background image displays correctly on HomePage but not on NewsPage or other pages.

**Root Cause**: The `APP_SHELL_CONTAINER_CLASSES` included `bg-blue-200` which was being applied over the background image layer, effectively hiding it behind a blue background.

**Symptoms**:
- Background image loads correctly (visible in console logs)
- Background image passed to AppShell correctly
- Blue background appears instead of background image on non-HomePage routes

**Solution**: 
1. **Created Dynamic Container Classes**: Replaced static `APP_SHELL_CONTAINER_CLASSES` with `getAppShellContainerClasses(hasBackgroundImage: boolean)`
2. **Conditional Background Application**: Function only applies blue background when no background image exists
3. **Updated AppShell Usage**: `getAppShellContainerClasses(!!backgroundImage)` ensures proper conditional styling

**Code Changes**:
```typescript
// Before (problematic)
export const APP_SHELL_CONTAINER_CLASSES = `min-h-screen ${DESIGN_TOKENS.MUTED_BG} flex flex-col items-center justify-start ${DESIGN_TOKENS.SECTION_PADDING_X} ${DESIGN_TOKENS.SECTION_PADDING_Y}`

// After (fixed)
export const getAppShellContainerClasses = (hasBackgroundImage: boolean) => 
  `min-h-screen ${hasBackgroundImage ? '' : DESIGN_TOKENS.MUTED_BG} flex flex-col items-center justify-start ${DESIGN_TOKENS.SECTION_PADDING_X} ${DESIGN_TOKENS.SECTION_PADDING_Y}`
```

**Prevention**: Always check z-index layers and background applications when implementing global background systems.

---

### New ScrollIndicatorComponent Usage (June 19, 2025)

**Overview**: Introduced `ScrollIndicatorComponent` for animated scroll indication on the homepage.

**Location**: `src/components/common/ScrollIndicatorComponent.tsx`

**Usage**:
```tsx
import ScrollIndicatorComponent from '../../components/common/ScrollIndicatorComponent'

// In component
<ScrollIndicatorComponent />
<ScrollIndicatorComponent className="custom-class" ariaLabel="Custom accessibility label" />
```

**Features**:
- Reusable and customizable
- Animated with Tailwind CSS
- Accessible with ARIA labels and keyboard support

**Integration**: Used in the homepage layout to indicate scrollable content.

**Code Example**:
```tsx
<section className={`${HOMEPAGE_HERO_SECTION_CLASSES} homepage-scroll-section`}>
  <h1 className={HOMEPAGE_TITLE_CLASSES}>{title}</h1>
  <ScrollIndicatorComponent />
</section>
```
