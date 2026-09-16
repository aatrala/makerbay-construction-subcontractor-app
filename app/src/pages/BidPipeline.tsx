import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  ArrowLeft, FileText, DollarSign, Calendar, Clock,
  TrendingUp, Target, Award, XCircle,
} from 'lucide-react'
import { bidEstimates, historicalBids } from '@/data/mock'
import type { PageRoute, EstimateStatus } from '@/types'

interface BidPipelineProps {
  onNavigate: (page: PageRoute, id?: string) => void
}

const stages: { key: EstimateStatus; label: string; icon: React.ElementType; color: string; bg: string }[] = [
  { key: 'draft', label: 'Draft', icon: FileText, color: 'text-muted', bg: 'bg-canvas' },
  { key: 'submitted', label: 'Submitted', icon: Clock, color: 'text-blue', bg: 'bg-blue-soft' },
  { key: 'won', label: 'Won', icon: Award, color: 'text-success', bg: 'bg-success-soft' },
  { key: 'lost', label: 'Lost', icon: XCircle, color: 'text-danger', bg: 'bg-danger-soft' },
]

export function BidPipeline({ onNavigate }: BidPipelineProps) {
  const [view, setView] = useState<'kanban' | 'list'>('kanban')

  const wonBids = historicalBids.filter(b => b.bidStatus === 'won')
  const lostBids = historicalBids.filter(b => b.bidStatus === 'lost')
  const winRate = Math.round((wonBids.length / historicalBids.length) * 100)
  const wonValue = wonBids.reduce((s, b) => s + b.estimatedCost, 0)
  const pipelineValue = bidEstimates.filter(e => e.estimateStatus === 'draft' || e.estimateStatus === 'submitted')
    .reduce((s, e) => s + e.totalCost, 0)
  const avgMargin = Math.round(wonBids.reduce((s, b) => s + b.profitMargin, 0) / wonBids.length)

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <button onClick={() => onNavigate('estimating')} className="flex items-center gap-1.5 text-sm font-medium text-muted hover:text-signal transition-colors cursor-pointer mb-2">
            <ArrowLeft className="h-4 w-4" /> Back to Estimates
          </button>
          <h2 className="text-xl font-extrabold text-ink">Bid Pipeline</h2>
          <p className="text-sm text-muted">Track all bids through your sales pipeline</p>
        </div>
        <div className="flex gap-1">
          <button
            onClick={() => setView('kanban')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${view === 'kanban' ? 'bg-signal text-white' : 'text-muted hover:bg-canvas'}`}
          >
            Kanban
          </button>
          <button
            onClick={() => setView('list')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${view === 'list' ? 'bg-signal text-white' : 'text-muted hover:bg-canvas'}`}
          >
            List
          </button>
        </div>
      </div>

      {/* Pipeline Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Win Rate', value: `${winRate}%`, icon: Target, color: 'text-success', bg: 'bg-success-soft' },
          { label: 'Pipeline Value', value: `$${(pipelineValue / 1000).toFixed(0)}K`, icon: DollarSign, color: 'text-blue', bg: 'bg-blue-soft' },
          { label: 'Won Value (YTD)', value: `$${(wonValue / 1000).toFixed(0)}K`, icon: TrendingUp, color: 'text-signal', bg: 'bg-signal-soft' },
          { label: 'Avg Win Margin', value: `${avgMargin}%`, icon: Award, color: 'text-violet', bg: 'bg-violet-soft' },
        ].map(stat => {
          const Icon = stat.icon
          return (
            <Card key={stat.label}>
              <CardContent className="flex items-center gap-3 p-4">
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${stat.bg}`}>
                  <Icon className={`h-5 w-5 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-xs font-medium text-muted">{stat.label}</p>
                  <p className="text-xl font-extrabold text-ink">{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Kanban View */}
      {view === 'kanban' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stages.map(stage => {
            const Icon = stage.icon
            const stageEstimates = bidEstimates.filter(e => e.estimateStatus === stage.key)
            const stageTotal = stageEstimates.reduce((s, e) => s + e.totalCost, 0)
            return (
              <div key={stage.key} className="space-y-3">
                {/* Column header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`flex h-7 w-7 items-center justify-center rounded-lg ${stage.bg}`}>
                      <Icon className={`h-3.5 w-3.5 ${stage.color}`} />
                    </div>
                    <span className="text-sm font-bold text-ink">{stage.label}</span>
                    <span className="text-xs text-muted">({stageEstimates.length})</span>
                  </div>
                  {stageTotal > 0 && (
                    <span className="text-xs font-bold text-muted">${(stageTotal / 1000).toFixed(0)}K</span>
                  )}
                </div>

                {/* Cards */}
                <div className="space-y-2">
                  {stageEstimates.map(est => {
                    const days = Math.ceil((new Date(est.bidDeadline).getTime() - Date.now()) / 86400000)
                    return (
                      <button
                        key={est.id}
                        onClick={() => onNavigate('estimate-detail', est.id)}
                        className="w-full rounded-xl border border-line bg-white p-4 text-left hover:border-signal/30 hover:shadow-sm transition-all cursor-pointer"
                      >
                        <p className="text-sm font-bold text-ink mb-1 truncate">{est.projectName}</p>
                        <p className="text-[11px] text-muted truncate mb-2">{est.customerName}</p>
                        {est.totalCost > 0 && (
                          <p className="text-lg font-extrabold text-ink mb-1">${(est.totalCost / 1000).toFixed(0)}K</p>
                        )}
                        <div className="flex items-center justify-between">
                          <Badge variant="outline">{est.trade}</Badge>
                          {est.estimateStatus !== 'won' && est.estimateStatus !== 'lost' && (
                            <span className={`text-[11px] font-bold ${days <= 7 ? 'text-danger' : days <= 14 ? 'text-warning' : 'text-muted'}`}>
                              {days > 0 ? `${days}d` : 'Past due'}
                            </span>
                          )}
                          {est.estimateStatus === 'won' && (
                            <span className="text-[11px] font-bold text-success">Won {est.wonAt?.slice(0, 10)}</span>
                          )}
                          {est.estimateStatus === 'lost' && (
                            <span className="text-[11px] font-bold text-danger">Lost</span>
                          )}
                        </div>
                        {est.aiConfidence > 0 && (
                          <div className="mt-2 flex items-center gap-1">
                            <div className="flex-1 h-1 rounded-full bg-line overflow-hidden">
                              <div className={`h-full rounded-full ${est.aiConfidence >= 93 ? 'bg-success' : est.aiConfidence >= 85 ? 'bg-warning' : 'bg-danger'}`}
                                style={{ width: `${est.aiConfidence}%` }}
                              />
                            </div>
                            <span className="text-[10px] text-muted">{est.aiConfidence}%</span>
                          </div>
                        )}
                      </button>
                    )
                  })}
                  {stageEstimates.length === 0 && (
                    <div className="rounded-xl border border-dashed border-line p-6 text-center">
                      <p className="text-xs text-muted">No bids</p>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* List View */}
      {view === 'list' && (
        <Card>
          <CardContent className="p-0">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-line">
                  <th className="p-3 text-left text-[10px] font-bold text-muted uppercase tracking-wider">Project</th>
                  <th className="p-3 text-left text-[10px] font-bold text-muted uppercase tracking-wider">Customer</th>
                  <th className="p-3 text-left text-[10px] font-bold text-muted uppercase tracking-wider">Trade</th>
                  <th className="p-3 text-right text-[10px] font-bold text-muted uppercase tracking-wider">Value</th>
                  <th className="p-3 text-left text-[10px] font-bold text-muted uppercase tracking-wider">Deadline</th>
                  <th className="p-3 text-left text-[10px] font-bold text-muted uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody>
                {bidEstimates.map(est => {
                  const days = Math.ceil((new Date(est.bidDeadline).getTime() - Date.now()) / 86400000)
                  return (
                    <tr
                      key={est.id}
                      onClick={() => onNavigate('estimate-detail', est.id)}
                      className="border-b border-line/50 hover:bg-canvas/30 cursor-pointer transition-colors"
                    >
                      <td className="p-3 font-medium text-ink">{est.projectName}</td>
                      <td className="p-3 text-muted">{est.customerName}</td>
                      <td className="p-3"><Badge variant="outline">{est.trade}</Badge></td>
                      <td className="p-3 text-right font-mono font-bold text-ink">
                        {est.totalCost > 0 ? `$${est.totalCost.toLocaleString()}` : '—'}
                      </td>
                      <td className="p-3">
                        <span className={`text-xs font-bold ${days <= 7 ? 'text-danger' : days <= 14 ? 'text-warning' : 'text-muted'}`}>
                          {est.bidDeadline} ({days > 0 ? `${days}d` : 'Past'})
                        </span>
                      </td>
                      <td className="p-3">
                        <Badge variant={est.estimateStatus === 'won' ? 'success' : est.estimateStatus === 'lost' ? 'danger' : est.estimateStatus === 'submitted' ? 'blue' : 'outline'}>
                          {est.estimateStatus}
                        </Badge>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </CardContent>
        </Card>
      )}

      {/* Historical Bids */}
      <Card>
        <CardContent className="p-4">
          <p className="text-sm font-bold text-ink mb-3">Historical Bids</p>
          <div className="space-y-2">
            {historicalBids.slice(0, 6).map(bid => (
              <div key={bid.id} className="flex items-center justify-between rounded-lg border border-line p-3">
                <div className="flex items-center gap-3">
                  <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${bid.bidStatus === 'won' ? 'bg-success-soft' : 'bg-danger-soft'}`}>
                    {bid.bidStatus === 'won' ? <Award className="h-4 w-4 text-success" /> : <XCircle className="h-4 w-4 text-danger" />}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-ink">{bid.projectName}</p>
                    <p className="text-[11px] text-muted">{bid.projectType} · {bid.trade} · Margin: {bid.profitMargin}%</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-ink">${(bid.estimatedCost / 1000).toFixed(0)}K</p>
                  <p className="text-[11px] text-muted">{bid.completedAt}</p>
                </div>
              </div>
            ))}
          </div>
          {historicalBids.length > 6 && (
            <Button variant="outline" size="sm" className="mt-3 w-full" onClick={() => onNavigate('historical-analytics')}>
              View All Historical Bids ({historicalBids.length})
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
