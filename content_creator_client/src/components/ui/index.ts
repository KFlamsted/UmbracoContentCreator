// Typography Components
export { 
  H1Component, 
  H2Component, 
  H3Component, 
  ParagraphComponent, // ← Renamed from TextComponent for clarity
  SpanComponent, 
  RichTextComponent,
  OverlayRichTextComponent,
  TextComponent, // ← Still available from TextComponents.tsx
  BadgeComponent, 
} from './typography'

// Layout Components
export { 
  ContainerComponent, 
  SectionComponent, 
  BackgroundComponent,
  LayerComponent,
  AppContainerComponent,
  FlexComponent, 
  GridComponent, 
  SpacerComponent,
} from './layout'

// Card Components
export { 
  CardComponent, 
  ImageCardComponent, 
  YouTubeCardComponent,
} from './cards'

// Button Components
export { 
  ButtonComponent, 
  LinkButtonComponent, 
  NavButtonComponent, 
  IconButtonComponent,
} from './buttons'

// Positioning Components
export { 
  PositionedComponent, 
  AbsoluteTopRightComponent, 
  AbsoluteBottomRightComponent,
  CenteredPositionedComponent,
} from './positioning'

// Navigation Components
export { NavBarComponent, InPageNavBarComponent } from './navigation'

// Common Components
export { HomeIconComponent } from './common'

// Media Components
export { ImageComponent, VideoComponent } from './media'
