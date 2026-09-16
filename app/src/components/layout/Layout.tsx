import { useState, type ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { Sidebar } from './Sidebar'
import { Bell, Search, Menu } from 'lucide-react'
import type { PageRoute } from '@/types'

interface LayoutProps {
  children: ReactNode
  currentPage: PageRoute
  onNavigate: (page: PageRoute) => void
  title: string
  subtitle?: string
}

export function Layout({ children, currentPage, onNavigate, title, subtitle }: LayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  return (
    <div className="min-h-screen bg-canvas">
      <Sidebar
        currentPage={currentPage}
        onNavigate={onNavigate}
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      <div
        className={cn(
          'transition-all duration-300',
          sidebarCollapsed ? 'ml-[68px]' : 'ml-[240px]'
        )}
      >
        {/* Top bar */}
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-line bg-surface/80 backdrop-blur-sm px-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="rounded-lg p-2 text-muted hover:bg-canvas hover:text-ink transition-colors lg:hidden cursor-pointer"
            >
              <Menu className="h-5 w-5" />
            </button>
            <div>
              <h2 className="text-lg font-extrabold tracking-tight text-ink">{title}</h2>
              {subtitle && <p className="text-xs text-muted">{subtitle}</p>}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
              <input
                type="text"
                placeholder="Search jobs, invoices..."
                className="h-9 w-64 rounded-lg border border-line bg-canvas pl-9 pr-3 text-sm text-ink placeholder:text-muted/60 focus:border-signal focus:outline-none focus:ring-2 focus:ring-signal/20 transition-all"
              />
            </div>
            <button className="relative rounded-lg p-2 text-muted hover:bg-canvas hover:text-ink transition-colors cursor-pointer">
              <Bell className="h-5 w-5" />
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-signal" />
            </button>
            <div className="ml-2 flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-violet text-white flex items-center justify-center text-xs font-bold">
                JM
              </div>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
