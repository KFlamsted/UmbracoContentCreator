# Copilot Instructions

- Always reference AI.md when creating new components or making architectural decisions
- Update AI.md when introducing new patterns or changing existing ones
- Follow the patterns documented in AI.md for consistency
- AI.md contains the authoritative guide for the UI component system architecture

## Tailwind CSS & Styling Rules (MANDATORY)
- **NEVER use inline Tailwind classes** in components outside of `src/components/ui/`
- **ALWAYS use the UI component system** from `src/components/ui/` for styling
- **NEVER add `className` props** with Tailwind classes to non-UI components
- **ALWAYS import components from `src/components/ui`** for typography, layout, cards, buttons, etc.
- **NEVER use style constants** like `DESIGN_TOKENS.SURFACE_BG` directly - use UI components instead
- **ALWAYS create new UI components** in `src/components/ui/` if needed functionality doesn't exist
- **NEVER revert to old patterns** like `CARD_CLASSES`, `BUTTON_CLASSES`, etc. - these are deprecated

## Examples of What NOT to Do:
```tsx
// ❌ NEVER do this
<div className="bg-white rounded-lg shadow-md p-6">
<h1 className="text-3xl font-bold text-center">
<button className="px-6 py-3 bg-blue-600 text-white rounded-lg">
```

## Examples of What TO Do:
```tsx
// ✅ ALWAYS do this  
<CardComponent id="my-card" variant="default">
<H1Component id="my-title" variant="page" align="center">
<ButtonComponent id="my-button" variant="primary">
```

## UI Component Import Pattern:
```tsx
import { 
  CardComponent, 
  H1Component, 
  ButtonComponent, 
  SectionComponent,
  TextComponent 
} from '../ui'
```

## When Creating New Components:
1. First check if needed UI components exist in `src/components/ui/`
2. If not, create new UI components following established patterns
3. Use variants and props instead of inline classes
4. Always use design tokens within UI components
5. Never bypass the UI component system
