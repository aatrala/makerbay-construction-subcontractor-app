import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  ArrowLeft, Sparkles, AlertTriangle, CheckCircle2, XCircle,
  ThumbsUp, Package, Wrench, Truck, DollarSign, FileText,
  Send, Edit3, RotateCcw, TrendingUp, Info,
} from 'lucide-react'
import { bidEstimates, estimateLineItems, symbolResults, lengthResults } from '@/data/mock'
import type { PageRoute, LineItemType } from '@/types'

interface EstimateReviewProps {
  estimateId: string
  onNavigate: (page: PageRoute) => void
}

const typeIcons: Record<LineItemType, React.ElementType> = {
  material: Package,
  labor: Wrench,
  equipment: Truck,
}
const typeColors: Record<LineItemType, string> = {
  material: 'bg-blue-soft text-blue',
  labor: 'bg-success-soft text-success',
  equipment: 'bg-violet-soft text-violet',
}

type Tab = 'line-items' | 'symbols' | 'lengths' | 'flags' | 'adjustments'

export function EstimateReview({ estimateId, onNavigate }: EstimateReviewProps) {
  const estimate = bidEstimates.find(e => e.id === estimateId) || bidEstimates[0]
  const lineItems = estimateLineItems.filter(li => li.estimateId === estimate.id)
  const symbols = symbolResults.filter(s => s.estimateId === estimate.id)
  const lengths = lengthResults.filter(l => l.estimateId === estimate.id)
  const [activeTab, setActiveTab] = useState<Tab>('line-items')
  const [itemTypeFilter, setItemTypeFilter] = useState<LineItemType | 'all'>('all')

  const materials = lineItems.filter(li => li.itemType === 'material')
  const labor = lineItems.filter(li => li.itemType === 'labor')
  const equipment = lineItems.filter(li => li.itemType === 'equipment')

  const totalMaterial = materials.reduce((s, li) => s + li.totalCost, 0)
  const totalLabor = labor.reduce((s, li) => s + li.totalCost, 0)
  const totalEquip = equipment.reduce((s, li) => s + li.totalCost, 0)
  const subtotal = totalMaterial + totalLabor + totalEquip
  const overhead = Math.round(subtotal * estimate.overheadPercent / 100)
  const profit = Math.round((subtotal + overhead) * estimate.profitPercent / 100)
  const grandTotal = subtotal + overhead + profit

  const filteredItems = itemTypeFilter === 'all' ? lineItems : lineItems.filter(li => li.itemType === itemTypeFilter)
  const unresolvedFlags = estimate.aiFlags.filter(f => !f.resolved)

  const tabs: { key: Tab; label: string; count?: number }[] = [
    { key: 'line-items', label: 'Line Items', count: lineItems.length },
    { key: 'symbols', label: 'AI Symbols', count: symbols.length },
    { key: 'lengths', label: 'AI Lengths', count: lengths.length },
    { key: 'flags', label: 'AI Flags', count: unresolvedFlags.length },
    { key: 'adjustments', label: 'AI Adjustments', count: estimate.adjustments.length },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <button onClick={() => onNavigate('estimating')} className="flex items-center gap-1.5 text-sm font-medium text-muted hover:text-signal transition-colors cursor-pointer mb-2">
            <ArrowLeft className="h-4 w-4" /> Back to Estimates
          </button>
          <h2 className="text-xl font-extrabold text-ink">{estimate.projectName}</h2>
          <p className="text-sm text-muted">{estimate.customerName} · {estimate.projectAddress}</p>
        </div>
        <div className="flex gap-2">
          {estimate.estimateStatus === 'draft' && (
            <>
              <Button variant="outline" size="sm"><Edit3 className="h-4 w-4" /> Edit</Button>
              <Button variant="signal" size="sm"><Send className="h-4 w-4" /> Submit Bid</Button>
            </>
          )}
          {estimate.estimateStatus === 'submitted' && (
            <>
              <Button variant="outline" size="sm"><RotateCcw className="h-4 w-4" /> Mark Lost</Button>
              <Button variant="signal" size="sm"><ThumbsUp className="h-4 w-4" /> Mark Won</Button>
            </>
          )}
        </div>
      </div>

      {/* Cost Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
        {[
          { label: 'Materials', value: totalMaterial, icon: Package, color: 'text-blue', bg: 'bg-blue-soft' },
          { label: 'Labor', value: totalLabor, icon: Wrench, color: 'text-success', bg: 'bg-success-soft' },
          { label: 'Equipment', value: totalEquip, icon: Truck, color: 'text-violet', bg: 'bg-violet-soft' },
          { label: `Overhead (${estimate.overheadPercent}%)`, value: overhead, icon: DollarSign, color: 'text-warning', bg: 'bg-warning-soft' },
          { label: `Profit (${estimate.profitPercent}%)`, value: profit, icon: TrendingUp, color: 'text-signal', bg: 'bg-signal-soft' },
          { label: 'Total Estimate', value: grandTotal, icon: FileText, color: 'text-ink', bg: 'bg-canvas' },
        ].map(item => {
          const Icon = item.icon
          return (
            <Card key={item.label}>
              <CardContent className="p-3">
                <div className="flex items-center gap-2 mb-1">
                  <div className={`flex h-7 w-7 items-center justify-center rounded-lg ${item.bg}`}>
                    <Icon className={`h-3.5 w-3.5 ${item.color}`} />
                  </div>
                </div>
                <p className="text-lg font-extrabold text-ink">${(item.value).toLocaleString()}</p>
                <p className="text-[10px] font-medium text-muted">{item.label}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* AI Confidence & Info Bar */}
      {estimate.aiConfidence > 0 && (
        <div className="flex items-center gap-4 rounded-xl border border-blue/20 bg-blue-soft/30 p-3">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-blue" />
            <span className="text-sm font-bold text-ink">AI Confidence:</span>
            <span className={`text-sm font-extrabold ${estimate.aiConfidence >= 93 ? 'text-success' : estimate.aiConfidence >= 85 ? 'text-warning' : 'text-danger'}`}>
              {estimate.aiConfidence}%
            </span>
          </div>
          <div className="flex-1 h-2 rounded-full bg-line overflow-hidden max-w-xs">
            <div className={`h-full rounded-full ${estimate.aiConfidence >= 93 ? 'bg-success' : estimate.aiConfidence >= 85 ? 'bg-warning' : 'bg-danger'}`}
              style={{ width: `${estimate.aiConfidence}%` }}
            />
          </div>
          <div className="flex items-center gap-1 text-xs text-muted">
            <Info className="h-3.5 w-3.5" />
            Based on plan analysis quality and historical data
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-1 border-b border-line pb-0">
        {tabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors cursor-pointer -mb-px ${
              activeTab === tab.key ? 'border-signal text-signal' : 'border-transparent text-muted hover:text-ink'
            }`}
          >
            {tab.label}
            {tab.count !== undefined && (
              <span className={`ml-1.5 px-1.5 py-0.5 rounded text-[10px] font-bold ${
                tab.key === 'flags' && tab.count > 0 ? 'bg-danger-soft text-danger' : 'bg-canvas text-muted'
              }`}>{tab.count}</span>
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'line-items' && (
        <Card className="animate-fade-in">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-bold text-ink">Line Items ({filteredItems.length})</p>
              <div className="flex gap-1">
                {(['all', 'material', 'labor', 'equipment'] as const).map(t => (
                  <button
                    key={t}
                    onClick={() => setItemTypeFilter(t)}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                      itemTypeFilter === t ? 'bg-signal text-white' : 'text-muted hover:bg-canvas'
                    }`}
                  >
                    {t === 'all' ? 'All' : t.charAt(0).toUpperCase() + t.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-line text-left">
                    <th className="pb-2 text-[10px] font-bold text-muted uppercase tracking-wider">Type</th>
                    <th className="pb-2 text-[10px] font-bold text-muted uppercase tracking-wider">Description</th>
                    <th className="pb-2 text-[10px] font-bold text-muted uppercase tracking-wider text-right">Qty</th>
                    <th className="pb-2 text-[10px] font-bold text-muted uppercase tracking-wider">Unit</th>
                    <th className="pb-2 text-[10px] font-bold text-muted uppercase tracking-wider text-right">Unit Cost</th>
                    <th className="pb-2 text-[10px] font-bold text-muted uppercase tracking-wider text-right">Total</th>
                    <th className="pb-2 text-[10px] font-bold text-muted uppercase tracking-wider">Source</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredItems.map(item => {
                    const Icon = typeIcons[item.itemType]
                    return (
                      <tr key={item.id} className="border-b border-line/50 hover:bg-canvas/30 transition-colors">
                        <td className="py-2.5 pr-2">
                          <div className={`flex h-7 w-7 items-center justify-center rounded-lg ${typeColors[item.itemType]}`}>
                            <Icon className="h-3.5 w-3.5" />
                          </div>
                        </td>
                        <td className="py-2.5 pr-4">
                          <p className="font-medium text-ink">{item.description}</p>
                          {item.supplierName && <p className="text-[11px] text-muted">{item.supplierName}</p>}
                        </td>
                        <td className="py-2.5 pr-4 text-right font-mono text-ink">{item.quantity.toLocaleString()}</td>
                        <td className="py-2.5 pr-4 text-muted">{item.unit}</td>
                        <td className="py-2.5 pr-4 text-right font-mono text-ink">${item.unitCost.toFixed(2)}</td>
                        <td className="py-2.5 pr-4 text-right font-mono font-bold text-ink">${item.totalCost.toLocaleString()}</td>
                        <td className="py-2.5">
                          {item.aiGenerated ? (
                            <Badge variant="blue">AI</Badge>
                          ) : (
                            <Badge variant="outline">Manual</Badge>
                          )}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
                <tfoot>
                  <tr className="font-bold">
                    <td colSpan={5} className="pt-3 text-right text-ink">Subtotal:</td>
                    <td className="pt-3 text-right font-mono text-ink">${subtotal.toLocaleString()}</td>
                    <td />
                  </tr>
                </tfoot>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === 'symbols' && (
        <Card className="animate-fade-in">
          <CardContent className="p-4">
            <p className="text-sm font-bold text-ink mb-3">AI Symbol Recognition Results</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {symbols.map(sym => (
                <div key={sym.id} className="rounded-xl border border-line p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="blue">{sym.symbolType}</Badge>
                    <span className={`text-xs font-bold ${sym.confidence >= 93 ? 'text-success' : sym.confidence >= 85 ? 'text-warning' : 'text-danger'}`}>
                      {sym.confidence}%
                    </span>
                  </div>
                  <p className="text-2xl font-extrabold text-ink">{sym.quantity}</p>
                  <p className="text-xs text-muted">{sym.location}</p>
                  <p className="text-[10px] text-muted/60 mt-1">Floor(s): {sym.floor}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === 'lengths' && (
        <Card className="animate-fade-in">
          <CardContent className="p-4">
            <p className="text-sm font-bold text-ink mb-3">AI Length Measurements</p>
            <div className="space-y-2">
              {lengths.map(len => (
                <div key={len.id} className="flex items-center justify-between rounded-xl border border-line p-4">
                  <div>
                    <Badge variant="violet" className="mb-1">{len.lengthType}</Badge>
                    <p className="text-sm font-medium text-ink">{len.path}</p>
                    <p className="text-[11px] text-muted">Floor(s): {len.floor}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-extrabold text-ink">{len.length}'</p>
                    <span className={`text-xs font-bold ${len.confidence >= 93 ? 'text-success' : len.confidence >= 85 ? 'text-warning' : 'text-danger'}`}>
                      {len.confidence}% confidence
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === 'flags' && (
        <div className="space-y-3 animate-fade-in">
          {estimate.aiFlags.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <CheckCircle2 className="h-10 w-10 text-success/40 mx-auto mb-2" />
                <p className="text-sm font-bold text-ink">No AI flags</p>
                <p className="text-xs text-muted">All items passed validation.</p>
              </CardContent>
            </Card>
          ) : estimate.aiFlags.map(flag => (
            <Card key={flag.id} className={flag.severity === 'high' ? 'border-danger/30' : flag.severity === 'medium' ? 'border-warning/30' : ''}>
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className={`h-5 w-5 shrink-0 mt-0.5 ${
                    flag.severity === 'high' ? 'text-danger' : flag.severity === 'medium' ? 'text-warning' : 'text-muted'
                  }`} />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant={flag.severity === 'high' ? 'danger' : flag.severity === 'medium' ? 'warning' : 'outline'}>
                        {flag.flagType}
                      </Badge>
                      <Badge variant={flag.severity === 'high' ? 'danger' : flag.severity === 'medium' ? 'warning' : 'outline'}>
                        {flag.severity}
                      </Badge>
                    </div>
                    <p className="text-sm text-ink">{flag.description}</p>
                    {!flag.resolved && (
                      <div className="flex gap-2 mt-3">
                        <Button variant="default" size="sm"><CheckCircle2 className="h-3 w-3" /> Resolve</Button>
                        <Button variant="outline" size="sm"><XCircle className="h-3 w-3" /> Dismiss</Button>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {activeTab === 'adjustments' && (
        <div className="space-y-3 animate-fade-in">
          {estimate.adjustments.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Info className="h-10 w-10 text-muted/30 mx-auto mb-2" />
                <p className="text-sm font-bold text-ink">No AI adjustments</p>
                <p className="text-xs text-muted">This estimate has no historical data adjustments.</p>
              </CardContent>
            </Card>
          ) : estimate.adjustments.map(adj => (
            <Card key={adj.id}>
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <Sparkles className={`h-5 w-5 shrink-0 mt-0.5 ${adj.accepted ? 'text-success' : 'text-signal'}`} />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant={adj.accepted ? 'success' : 'signal'}>{adj.adjustmentType}</Badge>
                      <span className="text-sm font-extrabold text-ink">{adj.adjustmentPct > 0 ? '+' : ''}{adj.adjustmentPct}%</span>
                      <Badge variant="outline">{adj.source}</Badge>
                    </div>
                    <p className="text-sm text-ink">{adj.rationale}</p>
                    {!adj.accepted && (
                      <div className="flex gap-2 mt-3">
                        <Button variant="default" size="sm"><ThumbsUp className="h-3 w-3" /> Accept</Button>
                        <Button variant="outline" size="sm"><XCircle className="h-3 w-3" /> Reject</Button>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
