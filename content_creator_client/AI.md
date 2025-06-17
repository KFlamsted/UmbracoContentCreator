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
│   ├── common/         # Generic shared components
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
- **Consistent Styling**: Use tokens, not hardcoded values

```tsx
// Good pattern
className={`${DESIGN_TOKENS.SURFACE_BG} ${DESIGN_TOKENS.BORDER_RADIUS}`}

// Avoid
className="bg-white rounded-lg"
```

## Content Management

### Content Types
- **HomePage**: Landing page content
- **News**: News listing page with filters/settings
- **NewsItemPage**: Individual news articles

### Data Flow
1. **Fetch**: Services call Umbraco Delivery API
2. **Transform**: Map Umbraco response to typed models
3. **Hook**: Custom hooks provide loading states
4. **Render**: Containers use hooks, render components

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
1. Place in appropriate folder (`common`, `grid`, etc.)
2. Use TypeScript interfaces for props
3. Add JSDoc documentation
4. Export from index.ts file
5. Use design tokens for styling

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

---

## Quick Reference Cheat Sheet

### Most Used Imports
```typescript
import type { NewsItemPage } from '../model/NewsItemPage'
import { GridCardComponent, GridItem } from '../../components/grid'
import { DESIGN_TOKENS, CARD_CLASSES } from '../../constants/styles'
import { useNavigate } from 'react-router-dom'
```

### Most Used Patterns
```typescript
// Data fetching hook
const { content, loading, error } = useNewsPage()

// Grid rendering
<GridCardComponent
  items={items}
  columns={3}
  renderItem={(item) => <Component item={item} />}
  getItemKey={(item) => item.id}
/>

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
- [ ] Exports added to index.ts (if applicable)
- [ ] Tests considered (future improvement)

---

*Last Updated: June 17, 2025*
*This document should be updated as the project evolves*
