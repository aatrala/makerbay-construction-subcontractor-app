import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  ArrowLeft, Search, RefreshCw, CheckCircle2, XCircle,
  AlertTriangle, ExternalLink, DollarSign, Package,
  Clock, Wifi, WifiOff,
} from 'lucide-react'
import { materialSuppliers } from '@/data/mock'
import type { PageRoute } from '@/types'

interface MaterialPricingProps {
  onNavigate: (page: PageRoute) => void
}

const apiStatusConfig = {
  connected: { icon: Wifi, label: 'Connected', variant: 'success' as const, color: 'text-success' },
  disconnected: { icon: WifiOff, label: 'Disconnected', variant: 'danger' as const, color: 'text-danger' },
  'rate-limited': { icon: AlertTriangle, label: 'Rate Limited', variant: 'warning' as const, color: 'text-warning' },
}

export function MaterialPricing({ onNavigate }: MaterialPricingProps) {
  const [search, setSearch] = useState('')
  const [selectedSupplier, setSelectedSupplier] = useState<string | null>(null)

  const allPrices = materialSuppliers.flatMap(s => s.materialPrices.map(p => ({
    ...p,
    supplierStatus: s.apiStatus,
    supplierName: s.name,
  })))

  const filteredPrices = search
    ? allPrices.filter(p => p.description.toLowerCase().includes(search.toLowerCase()))
    : allPrices

  // Group by material for comparison
  const materialGroups: Record<string, typeof filteredPrices> = {}
  filteredPrices.forEach(p => {
    const key = p.description.replace(/\s*\(.*\)/, '').trim()
    if (!materialGroups[key]) materialGroups[key] = []
    materialGroups[key].push(p)
  })

  const connectedCount = materialSuppliers.filter(s => s.apiStatus === 'connected').length
  const totalMaterials = allPrices.length
  const avgPrice = allPrices.length > 0
    ? (allPrices.reduce((s, p) => s + p.unitCost, 0) / allPrices.length).toFixed(2)
    : '0'

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <button onClick={() => onNavigate('estimating')} className="flex items-center gap-1.5 text-sm font-medium text-muted hover:text-signal transition-colors cursor-pointer mb-2">
            <ArrowLeft className="h-4 w-4" /> Back to Estimates
          </button>
          <h2 className="text-xl font-extrabold text-ink">Material Pricing</h2>
          <p className="text-sm text-muted">Real-time supplier pricing and comparison</p>
        </div>
        <Button variant="outline" size="sm">
          <RefreshCw className="h-4 w-4" /> Sync All
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Connected Suppliers', value: `${connectedCount}/${materialSuppliers.length}`, icon: Wifi, color: 'text-success', bg: 'bg-success-soft' },
          { label: 'Tracked Materials', value: String(totalMaterials), icon: Package, color: 'text-blue', bg: 'bg-blue-soft' },
          { label: 'Avg Price', value: `$${avgPrice}`, icon: DollarSign, color: 'text-signal', bg: 'bg-signal-soft' },
          { label: 'Last Sync', value: '2h ago', icon: Clock, color: 'text-violet', bg: 'bg-violet-soft' },
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

      {/* Supplier Cards */}
      <div>
        <p className="text-sm font-bold text-ink mb-3">Supplier Connections</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {materialSuppliers.map(supplier => {
            const statusCfg = apiStatusConfig[supplier.apiStatus]
            const StatusIcon = statusCfg.icon
            const isSelected = selectedSupplier === supplier.id
            return (
              <button
                key={supplier.id}
                onClick={() => setSelectedSupplier(isSelected ? null : supplier.id)}
                className={`rounded-xl border p-4 text-left transition-all cursor-pointer ${
                  isSelected ? 'border-signal bg-signal-soft/20' : 'border-line bg-white hover:border-signal/30'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-canvas text-xs font-extrabold text-ink">
                    {supplier.logo}
                  </div>
                  <Badge variant={statusCfg.variant}>
                    <StatusIcon className="h-3 w-3 mr-1" />
                    {statusCfg.label}
                  </Badge>
                </div>
                <p className="text-sm font-bold text-ink">{supplier.name}</p>
                <p className="text-[11px] text-muted">{supplier.materialPrices.length} materials tracked</p>
                <p className="text-[10px] text-muted mt-1">Last sync: {new Date(supplier.lastSync).toLocaleDateString()}</p>
              </button>
            )
          })}
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search materials..."
          className="w-full rounded-xl border border-line bg-white pl-10 pr-4 py-2.5 text-sm text-ink placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-signal/30"
        />
      </div>

      {/* Material Price Comparison */}
      <Card>
        <CardContent className="p-4">
          <p className="text-sm font-bold text-ink mb-3">Price Comparison by Material</p>
          <div className="space-y-4">
            {Object.entries(materialGroups).map(([material, prices]) => {
              const lowestPrice = Math.min(...prices.map(p => p.unitCost))
              const highestPrice = Math.max(...prices.map(p => p.unitCost))
              const hasVariation = highestPrice > lowestPrice * 1.01

              return (
                <div key={material} className="rounded-xl border border-line p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="text-sm font-bold text-ink">{material}</p>
                      {hasVariation && (
                        <p className="text-[11px] text-warning">
                          Price spread: ${lowestPrice.toFixed(2)} - ${highestPrice.toFixed(2)} ({((highestPrice - lowestPrice) / lowestPrice * 100).toFixed(1)}% difference)
                        </p>
                      )}
                    </div>
                    {hasVariation && (
                      <Badge variant="warning">Compare</Badge>
                    )}
                  </div>
                  <div className="space-y-1.5">
                    {prices.sort((a, b) => a.unitCost - b.unitCost).map((price, i) => (
                      <div key={`${price.supplierId}-${price.materialId}`} className={`flex items-center justify-between rounded-lg p-2.5 ${
                        i === 0 ? 'bg-success-soft/30' : 'bg-canvas/30'
                      }`}>
                        <div className="flex items-center gap-2">
                          {i === 0 && <CheckCircle2 className="h-4 w-4 text-success" />}
                          <span className="text-sm font-medium text-ink">{price.supplierName}</span>
                          <Badge variant={price.inStock ? 'success' : 'danger'}>{price.inStock ? 'In Stock' : 'Out'}</Badge>
                          {price.supplierStatus !== 'connected' && (
                            <Badge variant="outline">
                              <Clock className="h-3 w-3 mr-1" /> cached
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={`text-sm font-extrabold ${i === 0 ? 'text-success' : 'text-ink'}`}>
                            ${price.unitCost.toFixed(2)}
                          </span>
                          <span className="text-[10px] text-muted">{price.lastUpdated}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
