import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { dailyLogs } from '@/data/mock'
import type { PhotoCategory } from '@/types'
import {
  Camera, CheckCircle2, XCircle, MapPin, User, Filter,
  AlertTriangle, HardHat, Package, ClipboardCheck, ListChecks,
  ChevronLeft, ChevronRight, ZoomIn, X,
} from 'lucide-react'

const categoryColors: Record<PhotoCategory, 'signal' | 'danger' | 'warning' | 'blue' | 'success' | 'violet'> = {
  progress: 'signal', issue: 'danger', safety: 'warning',
  'material-delivery': 'blue', inspection: 'success', 'punch-list': 'violet',
}

const categoryIcons: Record<PhotoCategory, React.ElementType> = {
  progress: Camera, issue: AlertTriangle, safety: HardHat,
  'material-delivery': Package, inspection: ClipboardCheck, 'punch-list': ListChecks,
}

const categoryLabels: Record<PhotoCategory, string> = {
  progress: 'Progress', issue: 'Issue', safety: 'Safety',
  'material-delivery': 'Material Delivery', inspection: 'Inspection', 'punch-list': 'Punch List',
}

export function Progress() {
  const [categoryFilter, setCategoryFilter] = useState<string>('all')
  const [projectFilter, setProjectFilter] = useState<string>('all')
  const [verifiedFilter, setVerifiedFilter] = useState<string>('all')
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null)

  // Flatten all photos from daily logs with log context
  const allPhotos = dailyLogs.flatMap(log =>
    log.photos.map(photo => ({
      ...photo,
      projectName: log.projectName,
      logDate: log.date,
    }))
  )

  const projectIds = [...new Set(dailyLogs.map(l => l.projectId))]
  const projectOptions = projectIds.map(id => ({
    id,
    name: dailyLogs.find(l => l.projectId === id)?.projectName ?? id,
  }))

  const filtered = allPhotos.filter(p => {
    const matchCat = categoryFilter === 'all' || p.category === categoryFilter
    const matchProject = projectFilter === 'all' || dailyLogs.find(l => l.photos.some(ph => ph.id === p.id))?.projectId === projectFilter
    const matchVerified = verifiedFilter === 'all' || (verifiedFilter === 'verified' ? p.verified : !p.verified)
    return matchCat && matchProject && matchVerified
  })

  const categories: PhotoCategory[] = ['progress', 'issue', 'safety', 'material-delivery', 'inspection', 'punch-list']

  const stats = {
    total: allPhotos.length,
    verified: allPhotos.filter(p => p.verified).length,
    unverified: allPhotos.filter(p => !p.verified).length,
    issues: allPhotos.filter(p => p.category === 'issue' || p.category === 'safety').length,
  }

  const selectedPhotoData = selectedPhoto ? allPhotos.find(p => p.id === selectedPhoto) : null

  const formatTime = (iso: string) => {
    const d = new Date(iso)
    return d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
  }

  return (
    <div className="space-y-6 animate-rise-in">
      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-1">
              <Camera className="h-4 w-4 text-signal" />
              <p className="text-xs text-muted">Total Photos</p>
            </div>
            <p className="text-2xl font-extrabold text-ink">{stats.total}</p>
            <p className="text-[11px] text-muted">Across {dailyLogs.length} daily logs</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-1">
              <CheckCircle2 className="h-4 w-4 text-success" />
              <p className="text-xs text-muted">Verified</p>
            </div>
            <p className="text-2xl font-extrabold text-success">{stats.verified}</p>
            <p className="text-[11px] text-muted">{stats.total > 0 ? Math.round((stats.verified / stats.total) * 100) : 0}% verification rate</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-1">
              <XCircle className="h-4 w-4 text-warning" />
              <p className="text-xs text-muted">Pending Review</p>
            </div>
            <p className="text-2xl font-extrabold text-warning">{stats.unverified}</p>
            <p className="text-[11px] text-muted">Awaiting verification</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-1">
              <AlertTriangle className="h-4 w-4 text-danger" />
              <p className="text-xs text-muted">Issues / Safety</p>
            </div>
            <p className="text-2xl font-extrabold text-danger">{stats.issues}</p>
            <p className="text-[11px] text-muted">Require attention</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3 flex-wrap">
          <select value={projectFilter} onChange={e => setProjectFilter(e.target.value)}
            className="h-9 rounded-lg border border-line bg-surface px-3 text-sm text-ink focus:border-signal focus:outline-none">
            <option value="all">All Projects</option>
            {projectOptions.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
          </select>
          <div className="flex gap-1 rounded-lg border border-line bg-surface p-1">
            <button onClick={() => setCategoryFilter('all')}
              className={`rounded-md px-2.5 py-1 text-[11px] font-semibold cursor-pointer transition-colors ${categoryFilter === 'all' ? 'bg-ink text-white' : 'text-muted hover:text-ink'}`}>
              All
            </button>
            {categories.map(cat => {
              const Icon = categoryIcons[cat]
              return (
                <button key={cat} onClick={() => setCategoryFilter(cat)}
                  className={`flex items-center gap-1 rounded-md px-2.5 py-1 text-[11px] font-semibold cursor-pointer transition-colors ${categoryFilter === cat ? 'bg-ink text-white' : 'text-muted hover:text-ink'}`}>
                  <Icon className="h-3 w-3" />
                  {categoryLabels[cat]}
                </button>
              )
            })}
          </div>
          <div className="flex gap-1 rounded-lg border border-line bg-surface p-1">
            {['all', 'verified', 'pending'].map(v => (
              <button key={v} onClick={() => setVerifiedFilter(v)}
                className={`rounded-md px-2.5 py-1 text-[11px] font-semibold cursor-pointer transition-colors ${verifiedFilter === v ? 'bg-ink text-white' : 'text-muted hover:text-ink'}`}>
                {v === 'all' ? 'All' : v === 'verified' ? 'Verified' : 'Pending'}
              </button>
            ))}
          </div>
        </div>
        <Button variant="signal" size="sm"><Camera className="h-4 w-4" /> Upload Photos</Button>
      </div>

      {/* Photo Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((photo, i) => {
          const Icon = categoryIcons[photo.category as PhotoCategory]
          return (
            <Card key={photo.id} className="overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer group"
              style={{ animationDelay: `${i * 40}ms` }}
              onClick={() => setSelectedPhoto(photo.id)}>
              {/* Placeholder image area */}
              <div className="relative h-48 bg-gradient-to-br from-canvas to-line/30 flex items-center justify-center overflow-hidden">
                <Camera className="h-10 w-10 text-muted/30" />
                <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/10 transition-colors flex items-center justify-center">
                  <ZoomIn className="h-6 w-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                {/* Category badge */}
                <div className="absolute top-2 left-2">
                  <Badge variant={categoryColors[photo.category as PhotoCategory]}>
                    <span className="flex items-center gap-1"><Icon className="h-3 w-3" /> {categoryLabels[photo.category as PhotoCategory]}</span>
                  </Badge>
                </div>
                {/* Verified badge */}
                <div className="absolute top-2 right-2">
                  {photo.verified ? (
                    <span className="flex items-center gap-1 rounded-full bg-success/90 px-2 py-0.5 text-[10px] font-bold text-white">
                      <CheckCircle2 className="h-3 w-3" /> Verified
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 rounded-full bg-warning/90 px-2 py-0.5 text-[10px] font-bold text-white">
                      <XCircle className="h-3 w-3" /> Pending
                    </span>
                  )}
                </div>
              </div>
              <CardContent className="p-3">
                <p className="text-sm font-semibold text-ink line-clamp-2 mb-1.5">{photo.caption}</p>
                <div className="flex items-center gap-2 text-[11px] text-muted mb-1">
                  <MapPin className="h-3 w-3 shrink-0" />
                  <span className="truncate">{photo.location}</span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-muted">
                  <span className="flex items-center gap-1"><User className="h-3 w-3" /> {photo.takenBy}</span>
                  <span>{formatTime(photo.takenAt)}</span>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <Camera className="h-12 w-12 text-muted/30 mb-3" />
          <p className="text-sm font-semibold text-ink">No photos match your filters</p>
          <p className="text-xs text-muted mt-1">Try adjusting the category or project filter</p>
        </div>
      )}

      {/* Photo Detail Modal */}
      {selectedPhotoData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/60 p-4" onClick={() => setSelectedPhoto(null)}>
          <div className="relative w-full max-w-2xl rounded-2xl bg-surface shadow-xl animate-rise-in" onClick={e => e.stopPropagation()}>
            <button onClick={() => setSelectedPhoto(null)}
              className="absolute -top-3 -right-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-ink text-white shadow-lg cursor-pointer hover:bg-ink/80">
              <X className="h-4 w-4" />
            </button>
            {/* Image area */}
            <div className="h-64 rounded-t-2xl bg-gradient-to-br from-canvas to-line/30 flex items-center justify-center">
              <Camera className="h-16 w-16 text-muted/20" />
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant={categoryColors[selectedPhotoData.category as PhotoCategory]}>
                      {categoryLabels[selectedPhotoData.category as PhotoCategory]}
                    </Badge>
                    {selectedPhotoData.verified ? (
                      <Badge variant="success"><CheckCircle2 className="h-3 w-3 mr-1" /> Verified</Badge>
                    ) : (
                      <Badge variant="warning"><XCircle className="h-3 w-3 mr-1" /> Pending Review</Badge>
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-ink mt-2">{selectedPhotoData.caption}</h3>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-lg bg-canvas p-3">
                  <p className="text-[11px] font-bold text-muted uppercase tracking-wider mb-0.5">Project</p>
                  <p className="text-sm font-semibold text-ink">{selectedPhotoData.projectName}</p>
                </div>
                <div className="rounded-lg bg-canvas p-3">
                  <p className="text-[11px] font-bold text-muted uppercase tracking-wider mb-0.5">Location</p>
                  <p className="text-sm font-semibold text-ink">{selectedPhotoData.location}</p>
                </div>
                <div className="rounded-lg bg-canvas p-3">
                  <p className="text-[11px] font-bold text-muted uppercase tracking-wider mb-0.5">Taken By</p>
                  <p className="text-sm font-semibold text-ink">{selectedPhotoData.takenBy}</p>
                </div>
                <div className="rounded-lg bg-canvas p-3">
                  <p className="text-[11px] font-bold text-muted uppercase tracking-wider mb-0.5">Date / Time</p>
                  <p className="text-sm font-semibold text-ink">
                    {new Date(selectedPhotoData.takenAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} at {formatTime(selectedPhotoData.takenAt)}
                  </p>
                </div>
              </div>
              {!selectedPhotoData.verified && (
                <div className="flex gap-2">
                  <Button variant="default" size="sm"><CheckCircle2 className="h-4 w-4" /> Verify Photo</Button>
                  <Button variant="outline" size="sm"><AlertTriangle className="h-4 w-4" /> Flag Issue</Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
