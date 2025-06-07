import type { ReactNode } from 'react'
import { APP_SHELL_CONTAINER_CLASSES, LOADING_MESSAGE_CLASSES, ERROR_MESSAGE_CLASSES } from '../../styles/constants'

interface AppShellProps {
  children: ReactNode
  loading?: boolean
  error?: string | null
}

const AppShell: React.FC<AppShellProps> = ({ children, loading, error }) => {
  return (
    <div className={APP_SHELL_CONTAINER_CLASSES}>
      {loading && (
        <div className={LOADING_MESSAGE_CLASSES}>Loading...</div>
      )}
      {error && (
        <div className={ERROR_MESSAGE_CLASSES}>Error: {error}</div>
      )}
      {/* Always render children so React hooks can execute, but hide visually when loading/error */}
      <div style={{ display: loading || error ? 'none' : 'contents' }}>
        {children}
      </div>
    </div>
  )
}

export default AppShell
