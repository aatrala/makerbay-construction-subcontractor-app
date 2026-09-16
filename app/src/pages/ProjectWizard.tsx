import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { projects, subcontractors } from '@/data/mock'
import type { PageRoute } from '@/types'
import {
  ArrowLeft, ArrowRight, Plus, Upload, CheckCircle2, MapPin,
  Calendar, Users, FileSpreadsheet, Building2, Send, X, Search,
} from 'lucide-react'

interface ProjectWizardProps {
  onNavigate: (page: PageRoute) => void
}

type Step = 1 | 2 | 3 | 4

const trades = ['Electrical', 'Plumbing', 'HVAC', 'Framing', 'Concrete', 'Drywall', 'Roofing', 'Fire Protection', 'Landscaping', 'Structural Steel']

export function ProjectWizard({ onNavigate }: ProjectWizardProps) {
  const [step, setStep] = useState<Step>(1)
  const [projectName, setProjectName] = useState('')
  const [address, setAddress] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [scheduleMethod, setScheduleMethod] = useState<'upload' | 'build' | 'import'>('build')
  const [invitedSubs, setInvitedSubs] = useState<string[]>([])
  const [subSearch, setSubSearch] = useState('')

  const availableSubs = subcontractors.filter(s =>
    !invitedSubs.includes(s.id) &&
    (subSearch === '' || s.companyName.toLowerCase().includes(subSearch.toLowerCase()) || s.trade.toLowerCase().includes(subSearch.toLowerCase()))
  )

  const toggleSub = (id: string) => {
    setInvitedSubs(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
  }

  const selectedSubs = subcontractors.filter(s => invitedSubs.includes(s.id))

  const steps = [
    { num: 1, label: 'Project Details' },
    { num: 2, label: 'Schedule' },
    { num: 3, label: 'Subcontractors' },
    { num: 4, label: 'Review & Launch' },
  ]

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-rise-in">
      {/* Step Indicator */}
      <div className="flex items-center justify-between">
        {steps.map((s, i) => (
          <div key={s.num} className="flex items-center gap-2">
            <div className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold transition-colors ${
              step > s.num ? 'bg-success text-white' : step === s.num ? 'bg-signal text-white' : 'bg-line text-muted'
            }`}>
              {step > s.num ? <CheckCircle2 className="h-4 w-4" /> : s.num}
            </div>
            <span className={`text-xs font-semibold ${step >= s.num ? 'text-ink' : 'text-muted'}`}>{s.label}</span>
            {i < steps.length - 1 && <div className={`w-12 h-px mx-1 ${step > s.num ? 'bg-success' : 'bg-line'}`} />}
          </div>
        ))}
      </div>

      {/* Step 1: Project Details */}
      {step === 1 && (
        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle>Create New Project</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-muted uppercase tracking-wider mb-1.5">Project Name</label>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                <input value={projectName} onChange={e => setProjectName(e.target.value)}
                  placeholder="e.g. 123 Main St Office Building"
                  className="h-10 w-full rounded-lg border border-line bg-surface pl-10 pr-3 text-sm text-ink focus:border-signal focus:outline-none focus:ring-2 focus:ring-signal/20" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-muted uppercase tracking-wider mb-1.5">Project Address</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                <input value={address} onChange={e => setAddress(e.target.value)}
                  placeholder="e.g. 123 Main St, Austin, TX 78701"
                  className="h-10 w-full rounded-lg border border-line bg-surface pl-10 pr-3 text-sm text-ink focus:border-signal focus:outline-none focus:ring-2 focus:ring-signal/20" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-muted uppercase tracking-wider mb-1.5">Start Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                  <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)}
                    className="h-10 w-full rounded-lg border border-line bg-surface pl-10 pr-3 text-sm text-ink focus:border-signal focus:outline-none" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-muted uppercase tracking-wider mb-1.5">End Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                  <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)}
                    className="h-10 w-full rounded-lg border border-line bg-surface pl-10 pr-3 text-sm text-ink focus:border-signal focus:outline-none" />
                </div>
              </div>
            </div>
            <div className="rounded-lg bg-canvas p-3">
              <p className="text-xs text-muted">Existing projects for reference: {projects.length} active projects in system</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Schedule */}
      {step === 2 && (
        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle>Project Schedule</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted">How would you like to set up the project schedule?</p>
            <div className="grid grid-cols-1 gap-3">
              {[
                { key: 'upload' as const, icon: Upload, label: 'Upload Schedule File', desc: 'Import Microsoft Project (.xml, .mpp) or Excel/CSV file' },
                { key: 'build' as const, icon: Calendar, label: 'Build in SubSync', desc: 'Use the built-in Gantt chart to create tasks and dependencies' },
                { key: 'import' as const, icon: FileSpreadsheet, label: 'Import from Template', desc: 'Start from a pre-built construction schedule template' },
              ].map(opt => (
                <button key={opt.key} onClick={() => setScheduleMethod(opt.key)}
                  className={`flex items-start gap-4 rounded-xl border p-4 text-left cursor-pointer transition-all ${
                    scheduleMethod === opt.key ? 'border-signal bg-signal-soft/30 ring-2 ring-signal/20' : 'border-line hover:bg-canvas'
                  }`}>
                  <div className={`shrink-0 rounded-lg p-2 ${scheduleMethod === opt.key ? 'bg-signal text-white' : 'bg-canvas text-muted'}`}>
                    <opt.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-ink">{opt.label}</p>
                    <p className="text-xs text-muted mt-0.5">{opt.desc}</p>
                  </div>
                  {scheduleMethod === opt.key && <CheckCircle2 className="h-5 w-5 text-signal shrink-0 ml-auto" />}
                </button>
              ))}
            </div>
            {scheduleMethod === 'upload' && (
              <div className="rounded-xl border-2 border-dashed border-line p-8 text-center animate-fade-in">
                <Upload className="h-8 w-8 text-muted/40 mx-auto mb-2" />
                <p className="text-sm font-semibold text-ink">Drop your schedule file here</p>
                <p className="text-xs text-muted mt-1">Supports .xml, .mpp, .xlsx, .csv (max 10MB)</p>
                <Button variant="outline" size="sm" className="mt-3"><Upload className="h-4 w-4" /> Browse Files</Button>
              </div>
            )}
            {scheduleMethod === 'build' && (
              <div className="rounded-lg bg-canvas p-4 animate-fade-in">
                <p className="text-xs text-muted mb-2">The Gantt chart builder will be available after project creation. You can add tasks, set durations, and define dependencies visually.</p>
                <div className="flex items-center gap-2 text-xs text-muted">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>Estimated setup time: 15-30 minutes for a typical 100-task schedule</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Step 3: Subcontractors */}
      {step === 3 && (
        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle>Invite Subcontractors</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
              <input value={subSearch} onChange={e => setSubSearch(e.target.value)}
                placeholder="Search by company name or trade..."
                className="h-9 w-full rounded-lg border border-line bg-surface pl-9 pr-3 text-sm focus:border-signal focus:outline-none focus:ring-2 focus:ring-signal/20" />
            </div>

            {selectedSubs.length > 0 && (
              <div className="space-y-2">
                <p className="text-xs font-bold text-muted uppercase tracking-wider">Selected ({selectedSubs.length})</p>
                <div className="flex flex-wrap gap-2">
                  {selectedSubs.map(sub => (
                    <span key={sub.id} className="flex items-center gap-1.5 rounded-full bg-signal-soft px-3 py-1 text-xs font-semibold text-signal">
                      {sub.companyName}
                      <button onClick={() => toggleSub(sub.id)} className="cursor-pointer hover:text-ink"><X className="h-3 w-3" /></button>
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-1 max-h-[300px] overflow-y-auto">
              {availableSubs.map(sub => (
                <button key={sub.id} onClick={() => toggleSub(sub.id)}
                  className="flex w-full items-center justify-between rounded-lg border border-line p-3 text-left cursor-pointer hover:bg-canvas transition-colors">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-bold text-ink">{sub.companyName}</p>
                      <Badge variant="outline">{sub.trade}</Badge>
                    </div>
                    <p className="text-xs text-muted mt-0.5">{sub.contactName} · {sub.phone}</p>
                  </div>
                  <Plus className="h-4 w-4 text-muted" />
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 4: Review */}
      {step === 4 && (
        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle>Review & Launch</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg bg-canvas p-3">
                <p className="text-[11px] font-bold text-muted uppercase tracking-wider mb-0.5">Project Name</p>
                <p className="text-sm font-semibold text-ink">{projectName || '—'}</p>
              </div>
              <div className="rounded-lg bg-canvas p-3">
                <p className="text-[11px] font-bold text-muted uppercase tracking-wider mb-0.5">Address</p>
                <p className="text-sm font-semibold text-ink">{address || '—'}</p>
              </div>
              <div className="rounded-lg bg-canvas p-3">
                <p className="text-[11px] font-bold text-muted uppercase tracking-wider mb-0.5">Duration</p>
                <p className="text-sm font-semibold text-ink">{startDate && endDate ? `${startDate} → ${endDate}` : '—'}</p>
              </div>
              <div className="rounded-lg bg-canvas p-3">
                <p className="text-[11px] font-bold text-muted uppercase tracking-wider mb-0.5">Schedule Method</p>
                <p className="text-sm font-semibold text-ink">{scheduleMethod === 'upload' ? 'Upload File' : scheduleMethod === 'build' ? 'Build in SubSync' : 'Template'}</p>
              </div>
            </div>
            <div className="rounded-lg bg-canvas p-3">
              <p className="text-[11px] font-bold text-muted uppercase tracking-wider mb-2">Subcontractors Invited ({selectedSubs.length})</p>
              {selectedSubs.length > 0 ? (
                <div className="space-y-1.5">
                  {selectedSubs.map(sub => (
                    <div key={sub.id} className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-ink">{sub.companyName}</span>
                      <Badge variant="outline">{sub.trade}</Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-muted">No subcontractors selected yet. You can invite them later.</p>
              )}
            </div>
            <div className="rounded-lg border border-signal/20 bg-signal-soft/30 p-3">
              <p className="text-xs font-semibold text-ink">Ready to launch!</p>
              <p className="text-xs text-muted mt-0.5">Subcontractors will receive SMS + email invitations with a link to download the SubSync mobile app.</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={() => step > 1 ? setStep((step - 1) as Step) : onNavigate('coordination')}
          className="gap-2">
          <ArrowLeft className="h-4 w-4" /> {step > 1 ? 'Back' : 'Cancel'}
        </Button>
        {step < 4 ? (
          <Button variant="signal" onClick={() => setStep((step + 1) as Step)} className="gap-2">
            Next <ArrowRight className="h-4 w-4" />
          </Button>
        ) : (
          <Button variant="signal" onClick={() => onNavigate('coordination')} className="gap-2">
            <Send className="h-4 w-4" /> Launch Project
          </Button>
        )}
      </div>
    </div>
  )
}
