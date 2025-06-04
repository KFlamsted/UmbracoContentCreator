import type { ReactNode } from 'react'

interface AppShellProps {
  children: ReactNode
  loading?: boolean
  error?: string | null
}

const AppShell: React.FC<AppShellProps> = ({ children, loading, error }) => {
  return (
    <div className="min-h-screen bg-blue-200 flex flex-col items-center justify-center px-4 py-8">
      {loading && (
        <div className="text-lg text-gray-600">Loading...</div>
      )}
      {error && (
        <div className="text-lg text-red-600">Error: {error}</div>
      )}
      {/* Always render children so React hooks can execute, but hide visually when loading/error */}
      <div style={{ display: loading || error ? 'none' : 'contents' }}>
        {children}
      </div>
    </div>
  )
}

export default AppShell
