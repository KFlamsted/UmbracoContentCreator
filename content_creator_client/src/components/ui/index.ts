// Typography Components
export { 
  H1Component, 
  H2Component, 
  H3Component, 
  ParagraphComponent,  // ← Renamed from TextComponent for clarity
  SpanComponent, 
  RichTextComponent,
  OverlayRichTextComponent,
  TextComponent,       // ← Still available from TextComponents.tsx
  BadgeComponent, 
} from './typography'

// Layout Components
export { 
  ContainerComponent, 
  SectionComponent, 
  FlexComponent, 
  GridComponent, 
  SpacerComponent 
} from './layout'

// Card Components
export { 
  CardComponent, 
  ImageCardComponent, 
  YouTubeCardComponent 
} from './cards'

// Button Components
export { 
  ButtonComponent, 
  NavButtonComponent, 
  IconButtonComponent, 
  LinkButtonComponent 
} from './buttons'

// Positioning Components
export {
  PositionedComponent,
  AbsoluteTopRightComponent,
  AbsoluteBottomRightComponent
} from './positioning'
