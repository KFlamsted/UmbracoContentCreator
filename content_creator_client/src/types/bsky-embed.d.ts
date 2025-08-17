/**
 * Type declarations for bsky-embed custom elements
 */

import 'react'

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'bsky-embed': {
        username?: string
        limit?: number
        'load-more'?: string
        'custom-styles'?: string
        children?: React.ReactNode
      }
    }
  }
}
