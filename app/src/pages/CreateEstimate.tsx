import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  ArrowLeft, ArrowRight, Upload, FileText, CheckCircle2,
  Building2, Calendar, MapPin, Zap, Loader2, Sparkles,
  AlertTriangle, X,
} from 'lucide-react'
import type { PageRoute, Trade, ProjectType } from '@/types'

interface CreateEstimateProps {
  onNavigate: (page: PageRoute) => void
}

type Step = 1 | 2 | 3 | 4

const tradeLabels: Record<Trade, string> = {
  electrical: 'Electrical',
  plumbing: 'Plumbing',
  hvac: 'HVAC',
  'fire-protection': 'Fire Protection',
}

const projectTypeLabels: Record<ProjectType, string> = {
  'new-construction': 'New Construction',
  renovation: 'Renovation',
  'tenant-improvement': 'Tenant Improvement',
  other: 'Other',
}

const analysisSteps = [
  { label: 'Reading plan documents', duration: 800 },
  { label: 'Identifying trade symbols', duration: 1200 },
  { label: 'Counting symbols and quantities', duration: 900 },
  { label: 'Measuring conduit and wire lengths', duration: 1100 },
  { label: 'Extracting specifications', duration: 700 },
  { label: 'Pulling real-time material pricing', duration: 600 },
  { label: 'Generating line items', duration: 800 },
  { label: 'Calculating labor from historical data', duration: 500 },
]

export function CreateEstimate({ onNavigate }: CreateEstimateProps) {
  const [step, setStep] = useState<Step>(1)
  const [projectName, setProjectName] = useState('')
  const [projectAddress, setProjectAddress] = useState('')
  const [bidDeadline, setBidDeadline] = useState('')
  const [trade, setTrade] = useState<Trade>('electrical')
  const [projectType, setProjectType] = useState<ProjectType>('new-construction')
  const [customerName, setCustomerName] = useState('')
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([])
  const [analysisProgress, setAnalysisProgress] = useState(0)
  const [currentAnalysisStep, setCurrentAnalysisStep] = useState('')
  const [analysisComplete, setAnalysisComplete] = useState(false)

  const addFile = (name: string) => {
    if (!uploadedFiles.includes(name)) setUploadedFiles(prev => [...prev, name])
  }
  const removeFile = (name: string) => setUploadedFiles(prev => prev.filter(f => f !== name))

  const startAnalysis = () => {
    setStep(3)
    setAnalysisProgress(0)
    setAnalysisComplete(false)
    let progress = 0
    const total = analysisSteps.reduce((s, a) => s + a.duration, 0)
    analysisSteps.forEach((step) => {
      setTimeout(() => {
        setCurrentAnalysisStep(step.label)
      }, progress)
      progress += step.duration
      setTimeout(() => {
        setAnalysisProgress(Math.round((progress / total) * 100))
      }, progress)
    })
    setTimeout(() => {
      setAnalysisComplete(true)
      setAnalysisProgress(100)
    }, total + 200)
  }

  const stepLabels = ['Project Details', 'Upload Plans', 'AI Analysis', 'Review & Submit']

  return (
    <div className="space-y-6">
      {/* Back navigation */}
      <button onClick={() => onNavigate('estimating')} className="flex items-center gap-1.5 text-sm font-medium text-muted hover:text-signal transition-colors cursor-pointer">
        <ArrowLeft className="h-4 w-4" /> Back to Estimates
      </button>

      {/* Step indicator */}
      <div className="flex items-center gap-2">
        {stepLabels.map((label, i) => (
          <div key={label} className="flex items-center gap-2 flex-1">
            <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-all ${
              i + 1 < step ? 'bg-success text-white' :
              i + 1 === step ? 'bg-signal text-white' : 'bg-canvas text-muted'
            }`}>
              {i + 1 < step ? <CheckCircle2 className="h-4 w-4" /> : i + 1}
            </div>
            <span className={`text-xs font-medium hidden sm:block ${i + 1 === step ? 'text-ink' : 'text-muted'}`}>{label}</span>
            {i < 3 && <div className={`flex-1 h-0.5 rounded ${i + 1 < step ? 'bg-success' : 'bg-line'}`} />}
          </div>
        ))}
      </div>

      {/* Step 1: Project Details */}
      {step === 1 && (
        <Card className="animate-fade-in">
          <CardContent className="p-6 space-y-5">
            <div className="flex items-center gap-2 mb-2">
              <Building2 className="h-5 w-5 text-signal" />
              <h2 className="text-lg font-extrabold text-ink">Project Details</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-muted uppercase tracking-wider mb-1.5">Project Name *</label>
                <input
                  value={projectName} onChange={e => setProjectName(e.target.value)}
                  placeholder="e.g. 123 Main St Office Building"
                  className="w-full rounded-lg border border-line bg-white px-3 py-2.5 text-sm text-ink placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-signal/30"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-muted uppercase tracking-wider mb-1.5">Customer / GC *</label>
                <input
                  value={customerName} onChange={e => setCustomerName(e.target.value)}
                  placeholder="e.g. Turner Construction"
                  className="w-full rounded-lg border border-line bg-white px-3 py-2.5 text-sm text-ink placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-signal/30"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-muted uppercase tracking-wider mb-1.5">Project Address</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
                  <input
                    value={projectAddress} onChange={e => setProjectAddress(e.target.value)}
                    placeholder="e.g. 123 Main St, Austin, TX 78701"
                    className="w-full rounded-lg border border-line bg-white pl-10 pr-3 py-2.5 text-sm text-ink placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-signal/30"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-muted uppercase tracking-wider mb-1.5">Trade</label>
                <div className="flex flex-wrap gap-2">
                  {(Object.keys(tradeLabels) as Trade[]).map(t => (
                    <button
                      key={t}
                      onClick={() => setTrade(t)}
                      className={`px-3 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        trade === t ? 'bg-signal text-white' : 'border border-line text-muted hover:border-signal/40'
                      }`}
                    >
                      {tradeLabels[t]}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-muted uppercase tracking-wider mb-1.5">Project Type</label>
                <div className="flex flex-wrap gap-2">
                  {(Object.keys(projectTypeLabels) as ProjectType[]).map(pt => (
                    <button
                      key={pt}
                      onClick={() => setProjectType(pt)}
                      className={`px-3 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        projectType === pt ? 'bg-signal text-white' : 'border border-line text-muted hover:border-signal/40'
                      }`}
                    >
                      {projectTypeLabels[pt]}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-muted uppercase tracking-wider mb-1.5">Bid Deadline</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
                  <input
                    type="date"
                    value={bidDeadline} onChange={e => setBidDeadline(e.target.value)}
                    className="w-full rounded-lg border border-line bg-white pl-10 pr-3 py-2.5 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-signal/30"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end pt-2">
              <Button variant="signal" onClick={() => setStep(2)}>
                Next: Upload Plans <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Upload Plans */}
      {step === 2 && (
        <Card className="animate-fade-in">
          <CardContent className="p-6 space-y-5">
            <div className="flex items-center gap-2 mb-2">
              <Upload className="h-5 w-5 text-signal" />
              <h2 className="text-lg font-extrabold text-ink">Upload Plans & Specifications</h2>
            </div>

            {/* Drop zone */}
            <div className="rounded-xl border-2 border-dashed border-line bg-canvas/50 p-8 text-center">
              <Upload className="h-10 w-10 text-muted/40 mx-auto mb-3" />
              <p className="text-sm font-bold text-ink mb-1">Drag & drop plans and specs here</p>
              <p className="text-xs text-muted mb-4">Supports PDF, DWG — Max 100MB per file</p>
              <div className="flex justify-center gap-2">
                <Button variant="outline" size="sm" onClick={() => addFile('E-101_Floor_Plans.pdf')}>+ Floor Plans</Button>
                <Button variant="outline" size="sm" onClick={() => addFile('E-201_Power_Plans.pdf')}>+ Power Plans</Button>
                <Button variant="outline" size="sm" onClick={() => addFile('Specs_Div26.pdf')}>+ Specifications</Button>
              </div>
            </div>

            {/* Uploaded files */}
            {uploadedFiles.length > 0 && (
              <div className="space-y-2">
                <p className="text-xs font-bold text-muted uppercase tracking-wider">Uploaded Files ({uploadedFiles.length})</p>
                {uploadedFiles.map(file => (
                  <div key={file} className="flex items-center justify-between rounded-lg border border-line bg-white p-3">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-blue" />
                      <span className="text-sm font-medium text-ink">{file}</span>
                    </div>
                    <button onClick={() => removeFile(file)} className="text-muted hover:text-danger cursor-pointer">
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="flex justify-between pt-2">
              <Button variant="outline" onClick={() => setStep(1)}>
                <ArrowLeft className="h-4 w-4" /> Back
              </Button>
              <Button variant="signal" onClick={startAnalysis} disabled={uploadedFiles.length === 0}>
                <Sparkles className="h-4 w-4" /> Analyze Plans with AI
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 3: AI Analysis */}
      {step === 3 && (
        <Card className="animate-fade-in">
          <CardContent className="p-6 space-y-5">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="h-5 w-5 text-signal" />
              <h2 className="text-lg font-extrabold text-ink">AI Plan Analysis</h2>
              {!analysisComplete && <Loader2 className="h-4 w-4 text-signal animate-spin" />}
              {analysisComplete && <CheckCircle2 className="h-4 w-4 text-success" />}
            </div>

            {/* Progress bar */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-muted">{currentAnalysisStep || 'Starting...'}</span>
                <span className="font-bold text-ink">{analysisProgress}%</span>
              </div>
              <div className="h-2 rounded-full bg-line overflow-hidden">
                <div className="h-full rounded-full bg-signal transition-all duration-500" style={{ width: `${analysisProgress}%` }} />
              </div>
            </div>

            {/* Analysis steps */}
            <div className="space-y-1.5">
              {analysisSteps.map((s, i) => {
                const stepStart = analysisSteps.slice(0, i).reduce((sum, a) => sum + a.duration, 0)
                const totalDuration = analysisSteps.reduce((sum, a) => sum + a.duration, 0)
                const stepProgress = analysisSteps.slice(0, i + 1).reduce((sum, a) => sum + a.duration, 0)
                const isDone = analysisProgress >= Math.round((stepProgress / totalDuration) * 100)
                const isActive = !isDone && analysisProgress >= Math.round((stepStart / totalDuration) * 100)
                return (
                  <div key={s.label} className="flex items-center gap-2 py-1">
                    {isDone ? (
                      <CheckCircle2 className="h-4 w-4 text-success shrink-0" />
                    ) : isActive ? (
                      <Loader2 className="h-4 w-4 text-signal animate-spin shrink-0" />
                    ) : (
                      <div className="h-4 w-4 rounded-full border border-line shrink-0" />
                    )}
                    <span className={`text-sm ${isDone ? 'text-ink' : isActive ? 'text-ink font-medium' : 'text-muted'}`}>{s.label}</span>
                  </div>
                )
              })}
            </div>

            {/* Results summary when complete */}
            {analysisComplete && (
              <div className="rounded-xl border border-success/20 bg-success-soft/30 p-4 animate-fade-in space-y-3">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-success" />
                  <p className="text-sm font-bold text-ink">Analysis Complete</p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { label: 'Symbols Detected', value: '495' },
                    { label: 'Lengths Measured', value: '4,170 ft' },
                    { label: 'Line Items Generated', value: '19' },
                    { label: 'AI Confidence', value: '94%' },
                  ].map(r => (
                    <div key={r.label} className="rounded-lg bg-white/60 p-3 text-center">
                      <p className="text-lg font-extrabold text-ink">{r.value}</p>
                      <p className="text-[10px] font-medium text-muted uppercase tracking-wider">{r.label}</p>
                    </div>
                  ))}
                </div>
                <div className="flex items-start gap-2 rounded-lg bg-warning-soft/40 p-3">
                  <AlertTriangle className="h-4 w-4 text-warning shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold text-ink">3 AI Flags Detected</p>
                    <p className="text-[11px] text-muted">Some items may need manual review. See details on the next step.</p>
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-between pt-2">
              <Button variant="outline" onClick={() => setStep(2)} disabled={!analysisComplete}>
                <ArrowLeft className="h-4 w-4" /> Back
              </Button>
              {analysisComplete && (
                <Button variant="signal" onClick={() => setStep(4)}>
                  Review Estimate <ArrowRight className="h-4 w-4" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 4: Review & Submit */}
      {step === 4 && (
        <Card className="animate-fade-in">
          <CardContent className="p-6 space-y-5">
            <div className="flex items-center gap-2 mb-2">
              <FileText className="h-5 w-5 text-signal" />
              <h2 className="text-lg font-extrabold text-ink">Review & Submit Estimate</h2>
            </div>

            {/* Project summary */}
            <div className="rounded-xl border border-line p-4">
              <p className="text-[10px] font-bold text-muted uppercase tracking-wider mb-2">Project Summary</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
                <div><span className="text-muted">Name:</span> <span className="font-bold text-ink">{projectName || '—'}</span></div>
                <div><span className="text-muted">Customer:</span> <span className="font-bold text-ink">{customerName || '—'}</span></div>
                <div><span className="text-muted">Trade:</span> <span className="font-bold text-ink">{tradeLabels[trade]}</span></div>
                <div><span className="text-muted">Type:</span> <span className="font-bold text-ink">{projectTypeLabels[projectType]}</span></div>
                <div><span className="text-muted">Deadline:</span> <span className="font-bold text-ink">{bidDeadline || '—'}</span></div>
                <div><span className="text-muted">Plans:</span> <span className="font-bold text-ink">{uploadedFiles.length} file(s)</span></div>
              </div>
            </div>

            {/* AI summary */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: 'Materials', value: '$87,450', color: 'bg-blue-soft' },
                { label: 'Labor', value: '$64,200', color: 'bg-success-soft' },
                { label: 'Equipment', value: '$8,500', color: 'bg-violet-soft' },
                { label: 'Total Estimate', value: '$190,328', color: 'bg-signal-soft' },
              ].map(item => (
                <div key={item.label} className={`rounded-xl ${item.color} p-4 text-center`}>
                  <p className="text-lg font-extrabold text-ink">{item.value}</p>
                  <p className="text-[10px] font-bold text-muted uppercase tracking-wider">{item.label}</p>
                </div>
              ))}
            </div>

            {/* AI flags */}
            <div className="rounded-xl border border-danger/20 bg-danger-soft/20 p-4">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-4 w-4 text-danger" />
                <p className="text-sm font-bold text-ink">3 AI Flags — Review Required</p>
              </div>
              <div className="space-y-2">
                <div className="rounded-lg bg-white/60 p-3">
                  <Badge variant="danger" className="mb-1">High</Badge>
                  <p className="text-xs text-ink">Plans show 3 panel schedules, but estimate only includes 2 panels.</p>
                </div>
                <div className="rounded-lg bg-white/60 p-3">
                  <Badge variant="warning" className="mb-1">Medium</Badge>
                  <p className="text-xs text-ink">Specifications require AFCI breakers for bedroom circuits. Estimate includes standard breakers.</p>
                </div>
                <div className="rounded-lg bg-white/60 p-3">
                  <Badge variant="outline" className="mb-1">Low</Badge>
                  <p className="text-xs text-ink">AI measured 600' of 3/4" EMT conduit. Typical range: 450-520'. Consider reviewing.</p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-between pt-2">
              <Button variant="outline" onClick={() => setStep(3)}>
                <ArrowLeft className="h-4 w-4" /> Back
              </Button>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => onNavigate('estimating')}>Save as Draft</Button>
                <Button variant="signal" onClick={() => onNavigate('estimating')}>
                  <Sparkles className="h-4 w-4" /> Review Full Estimate
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
