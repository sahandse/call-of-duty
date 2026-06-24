'use client'
import { useState } from 'react'
import { dropZones, DropMap, DropStyle, MAP_LABELS } from '../data/dropGuideData'

const TRAFFIC_COLOR = { low: 'text-green-400 bg-green-900/20', medium: 'text-yellow-400 bg-yellow-900/20', high: 'text-red-400 bg-red-900/20' }
const STYLE_COLOR = { aggressive: 'text-red-400', safe: 'text-green-400', balanced: 'text-blue-400' }

function StarRating({ value }: { value: number }) {
  return (
    <div className="flex gap-0.5">
      {[1,2,3,4,5].map(i => (
        <span key={i} className={i <= value ? 'text-cod-gold' : 'text-gray-700'}>★</span>
      ))}
    </div>
  )
}

export default function DropGuide() {
  const [activeMap, setActiveMap] = useState<DropMap>('urzikstan')
  const [styleFilter, setStyleFilter] = useState<DropStyle | 'all'>('all')
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const maps: DropMap[] = ['urzikstan', 'rebirth_island', 'fortune_keep']
  const zones = dropZones.filter(z => z.map === activeMap && (styleFilter === 'all' || z.style === styleFilter))
  const selected = zones.find(z => z.id === selectedId) ?? zones[0]

  return (
    <div className="space-y-6">
      <div className="bg-cod-card border border-cod-border rounded-xl p-4">
        <h2 className="text-white font-bold text-lg">🪂 راهنمای Drop</h2>
        <p className="text-gray-500 text-xs mt-1">بهترین نقاط فرود Warzone با امتیاز لوت، ترافیک و استراتژی</p>
      </div>

      {/* Map tabs */}
      <div className="flex gap-1 bg-cod-card border border-cod-border rounded-xl p-1 w-fit">
        {maps.map(m => (
          <button key={m} onClick={() => { setActiveMap(m); setSelectedId(null) }}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeMap === m ? 'bg-cod-gold text-black' : 'text-gray-400 hover:text-white'}`}>
            {MAP_LABELS[m]}
          </button>
        ))}
      </div>

      {/* Style filter */}
      <div className="flex gap-2 flex-wrap">
        <span className="text-gray-500 text-xs self-center">سبک:</span>
        {(['all','aggressive','balanced','safe'] as const).map(s => (
          <button key={s} onClick={() => setStyleFilter(s)}
            className={`px-3 py-1.5 rounded-lg text-xs border transition-all ${
              styleFilter === s
                ? 'bg-cod-gold text-black border-cod-gold'
                : 'bg-cod-card border-cod-border text-gray-400 hover:text-white'
            }`}>
            {s === 'all' ? 'همه' : s === 'aggressive' ? 'تهاجمی' : s === 'balanced' ? 'همه‌کاره' : 'دفاعی'}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Zone list */}
        <div className="space-y-2">
          {zones.map(z => (
            <button key={z.id} onClick={() => setSelectedId(z.id)}
              className={`w-full text-right bg-cod-card border rounded-xl p-3 transition-all hover:border-cod-gold/30 ${
                (selected?.id === z.id) ? 'border-cod-gold/60 bg-cod-gold/5' : 'border-cod-border'
              }`}>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xl">{z.icon}</span>
                <span className="text-white font-medium text-sm flex-1">{z.nameFa}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${TRAFFIC_COLOR[z.traffic]}`}>{z.trafficFa}</span>
              </div>
              <div className="flex items-center gap-2 pr-7">
                <StarRating value={z.lootRating} />
                <span className={`text-xs ${STYLE_COLOR[z.style]}`}>{z.styleFa}</span>
              </div>
            </button>
          ))}
          {zones.length === 0 && (
            <div className="text-center py-8 text-gray-500 text-sm">هنوز اطلاعاتی برای این فیلتر ثبت نشده</div>
          )}
        </div>

        {/* Detail panel */}
        {selected && (
          <div className={`lg:col-span-2 bg-gradient-to-br ${selected.gradient} border border-cod-border rounded-xl overflow-hidden`}>
            <div className="p-5">
              <div className="flex items-start gap-3 mb-4">
                <span className="text-4xl">{selected.icon}</span>
                <div>
                  <h3 className="text-white font-bold text-lg">{selected.nameFa}</h3>
                  <div className="flex gap-2 flex-wrap mt-1">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${TRAFFIC_COLOR[selected.traffic]}`}>{selected.trafficFa}</span>
                    <span className={`text-xs font-medium ${STYLE_COLOR[selected.style]}`}>{selected.styleFa}</span>
                    <div className="flex items-center gap-1">
                      <span className="text-gray-500 text-xs">لوت:</span>
                      <StarRating value={selected.lootRating} />
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-gray-300 text-sm mb-4">{selected.description}</p>

              <div>
                <h4 className="text-gray-400 text-xs mb-2">💡 نکات استراتژیک</h4>
                <ul className="space-y-2">
                  {selected.tips.map((tip, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                      <span className="text-cod-gold mt-0.5 flex-shrink-0">▸</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
