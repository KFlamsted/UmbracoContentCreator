# UI Component System

This directory contains reusable UI components that implement our design system using Tailwind CSS in a structured, consistent way. These components eliminate "inline styling" and provide a cohesive set of building blocks for the application.

## Folder Structure

```
src/components/ui/
├── typography/
│   ├── H1Component.tsx          # H1 heading component
│   ├── H2Component.tsx          # H2 heading component  
│   ├── H3Component.tsx          # H3 heading component
│   ├── ParagraphComponent.tsx   # Paragraph component
│   ├── SpanComponent.tsx        # Span component
│   ├── TextComponents.tsx       # Text, RichText components
│   ├── BadgeComponent.tsx       # Badge component
│   └── index.ts
├── layout/
│   ├── ContainerComponent.tsx   # Container component
│   ├── SectionComponent.tsx     # Section component  
│   ├── GridComponent.tsx        # Grid component
│   ├── LayoutComponents.tsx     # Flex, Spacer components
│   └── index.ts
├── cards/
│   ├── CardComponent.tsx        # Basic card component
│   ├── CardComponents.tsx       # ImageCard, YouTubeCard
│   └── index.ts
├── buttons/
│   ├── ButtonComponent.tsx      # Basic button component
│   ├── LinkButtonComponent.tsx  # Link button component
│   ├── ButtonComponents.tsx     # NavButton, IconButton
│   └── index.ts
├── positioning/
│   ├── PositioningComponents.tsx # Positioned, AbsoluteTopRight, AbsoluteBottomRight
│   └── index.ts
├── index.ts                     # Main export file
└── README.md                    # This file
```

## Philosophy

Instead of using Tailwind classes directly throughout the codebase, we centralize styling logic into reusable components that:
- Use our design tokens from `constants/styles.ts`
- Provide consistent variants and states
- Reduce code duplication
- Make design changes easier to implement across the entire application

## Components Overview

### Typography (`typography/`)

**Components:** `H1Component`, `H2Component`, `H3Component`, `TextComponent`, `SpanComponent`, `RichTextComponent`, `BadgeComponent`

Replace inline heading and text styling with semantic, variant-based components.

```tsx
// ❌ Before (inline styling)
<h1 className="text-3xl font-bold text-center text-gray-900">{title}</h1>
<p className="text-lg text-gray-700">{description}</p>
<span className="bg-blue-600 text-white px-2 py-1 rounded-full text-xs">Featured</span>

// ✅ After (UI components)
<H1Component id="page-title" variant="page" align="center">{title}</H1Component>
<TextComponent id="description" variant="body">{description}</TextComponent>
<BadgeComponent id="featured-badge" variant="primary">Featured</BadgeComponent>
```

**Variants:**
- `H1Component`: `hero`, `page`, `section`, `card`
- `H2Component`: `hero`, `page`, `section`, `card` 
- `H3Component`: `hero`, `page`, `section`, `card`
- `TextComponent`: `body`, `small`, `caption`, `meta`, `muted`
- `BadgeComponent`: `primary`, `secondary`, `success`, `warning`, `danger`, `info`

### Layout (`Layout.tsx`)

**Components:** `ContainerComponent`, `SectionComponent`, `FlexComponent`, `GridComponent`, `SpacerComponent`

Standardize layout patterns and spacing.

```tsx
// ❌ Before
<div className="w-full max-w-6xl mx-auto p-6">
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {items.map(item => <div key={item.id}>{item.content}</div>)}
  </div>
</div>

// ✅ After
<ContainerComponent id="content-container" variant="constrained">
  <GridComponent id="items-grid" columns="1-md-2-lg-3">
    {items.map(item => <div key={item.id}>{item.content}</div>)}
  </GridComponent>
</ContainerComponent>
```

### Cards (`Cards.tsx`)

**Components:** `CardComponent`, `ImageCardComponent`, `YouTubeCardComponent`

Consistent card layouts for different content types.

```tsx
// ❌ Before (complex inline styling)
<div className="w-full max-w-6xl bg-white rounded-lg shadow-md p-6 mb-2">
  <div className="relative bg-white rounded-lg shadow-md overflow-hidden h-64">
    <div className="absolute inset-0 bg-cover bg-center" style={{backgroundImage: `url(${imageUrl})`}} />
    <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-between p-4">
      <h3 className="text-lg font-bold mb-2 text-left text-white">{title}</h3>
    </div>
  </div>
</div>

// ✅ After
<CardComponent id="content-card" variant="content">
  <ImageCardComponent 
    id="feature-card"
    imageUrl={imageUrl}
    title={title}
    height="h-64"
    onClick={handleClick}
  />
</CardComponent>
```

### Buttons (`buttons/`)

**Components:** `ButtonComponent`, `NavButtonComponent`, `IconButtonComponent`, `LinkButtonComponent`

Consistent button styling and behavior.

```tsx
// ❌ Before
<button className="px-6 py-3 w-32 rounded-lg font-medium transition-colors cursor-pointer bg-blue-600 text-white hover:bg-blue-700">
  Click me
</button>

// ✅ After
<ButtonComponent id="submit-btn" variant="primary" onClick={handleSubmit}>
  Click me
</ButtonComponent>
```

### Positioning (`positioning/`)

**Components:** `PositionedComponent`, `AbsoluteTopRightComponent`, `AbsoluteBottomRightComponent`

Eliminate inline positioning classes with semantic positioning components.

```tsx
// ❌ Before (inline positioning)
<div className="absolute top-2 right-2">
  <span className="bg-blue-600 text-white px-2 py-1 rounded-full">Badge</span>
</div>

// ✅ After (positioned components)
<AbsoluteTopRightComponent id="badge-container" spacing="default">
  <BadgeComponent id="badge" variant="primary">Badge</BadgeComponent>
</AbsoluteTopRightComponent>
```

## Usage Guidelines

### 1. Import from the index file

```tsx
import { 
  H1Component, 
  TextComponent, 
  CardComponent, 
  ButtonComponent,
  GridComponent 
} from '../ui'
```

### 2. Always provide an `id` prop

Every component requires an `id` prop for accessibility and testing purposes.

### 3. Use variants instead of custom classes

Prefer using the built-in variants over adding custom `className` props:

```tsx
// ✅ Preferred
<TextComponent id="meta" variant="meta">{publishDate}</TextComponent>

// ⚠️ Only when necessary
<TextComponent id="special" variant="body" className="custom-special-styling">
  {content}
</TextComponent>
```

### 4. Combine components for complex layouts

```tsx
<SectionComponent id="article-section" variant="card-section">
  <H1Component id="article-title" variant="page">{title}</H1Component>
  <FlexComponent id="meta-info" direction="row" justify="between" align="center">
    <TextComponent id="author" variant="meta">By {author}</TextComponent>
    <TextComponent id="date" variant="meta">{publishDate}</TextComponent>
  </FlexComponent>
  <SpacerComponent id="spacer" size="default" />
  <TextComponent id="content" variant="body">{content}</TextComponent>
</SectionComponent>
```

## Migration Strategy

### Phase 1: New components (✅ Current)
- Use UI components for all new features
- Gradually refactor existing simple components

### Phase 2: Systematic refactoring
- Refactor high-traffic components first
- Update complex components like `GridItem`, navigation components
- Remove unused style constants as components are migrated

### Phase 3: Cleanup
- Remove redundant style constants
- Consolidate remaining inline styles
- Update design tokens as needed

## Extending the System

### Adding new variants

```tsx
// In Typography.tsx
const getVariantClasses = () => {
  switch (variant) {
    case 'hero':
      return 'text-5xl md:text-7xl font-bold text-white drop-shadow-2xl'
    case 'page':
      return `${DESIGN_TOKENS.HEADING_SIZE} font-bold ${DESIGN_TOKENS.TEXT_HEADING}`
    case 'new-variant': // ← Add new variant
      return 'text-2xl font-semibold text-blue-600'
    // ... existing cases
  }
}
```

### Adding new components

Create new component files in this directory and export them from `index.ts`:

```tsx
// NewComponent.tsx
export const NewComponent: React.FC<NewComponentProps> = ({ ... }) => {
  // Implementation
}

// index.ts
export { NewComponent } from './NewComponent'
```

## Benefits

1. **Consistency**: All similar elements look and behave the same
2. **Maintainability**: Change design system in one place
3. **Developer Experience**: Autocomplete for variants and props
4. **Accessibility**: Built-in ARIA attributes and semantic HTML
5. **Performance**: Reduced CSS bundle size through reuse
6. **Testing**: Easier to test with consistent component structure

## Examples

### Complete Component Refactoring Example

**Before (GridItem with inline styling):**
```tsx
// Multiple inline Tailwind classes scattered throughout
<div className="cursor-pointer transition-transform hover:scale-105">
  <div className="relative bg-white rounded-lg shadow-md overflow-hidden h-64">
    <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-between p-4">
      <h3 className="text-lg font-bold mb-2 text-left text-white">{title}</h3>
      <div className="text-xs opacity-80 mb-2 text-white">By {author} • {date}</div>
    </div>
    <div className="absolute top-2 right-2">
      <span className="bg-blue-600 text-white px-2 py-1 rounded-full text-xs">Featured</span>
    </div>
  </div>
</div>
```

**After (Using UI Component System):**
```tsx
// Clean, semantic components with no inline styling
<ImageCardComponent
  id="grid-item"
  imageUrl={imageUrl}
  title={title}
  author={author}
  publishDate={publishDate}
  height="h-64"
  onClick={onClick}
>
  <AbsoluteTopRightComponent id="badge-container" spacing="default">
    <BadgeComponent id="featured-badge" variant="primary">
      Featured
    </BadgeComponent>
  </AbsoluteTopRightComponent>
</ImageCardComponent>
```

See the refactored components:
- `PageTitleSection.tsx` - Simple heading section
- `BodyTextSection.tsx` - Rich text content
- `GridItemRefactored.tsx` - Complex card component with zero inline styling
