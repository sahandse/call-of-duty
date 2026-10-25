'use client'
import { useState } from 'react'
import { StoreItem } from '../types'

const KIND_LABEL: Record<StoreItem['kind'], string> = {
  bundle: 'BUNDLE',
  battle_pass: 'BATTLE PASS',
  blackcell: 'BLACKCELL',
  vault: 'VAULT',
}

const KIND_STYLE: Record<StoreItem['kind'], string> = {
  bundle: 'text-cod-sand border-cod-sand/40',
  battle_pass: 'text-cod-gold border-cod-gold/40',
  blackcell: 'text-yellow-300 border-yellow-500/40',
  vault: 'text-cod-steel border-cod-steel/40',
}

export default function ShopItemCard({ item }: { item: StoreItem }) {
  const [open, setOpen] = useState(false)

  return (
    <article className="notch flex h-full flex-col border border-cod-border bg-cod-card transition-colors hover:border-cod-gold/40">
      <div className="border-b border-cod-border p-4">
        <div className="mb-2 flex items-start justify-between gap-3">
          <span className={`hud-tag border px-1.5 py-0.5 text-[9px] ${KIND_STYLE[item.kind]}`}>
            {KIND_LABEL[item.kind]}
          </span>
          {item.releasedOn && (
            <span className="font-mono text-[10px] text-gray-500">{item.releasedOn}</span>
          )}
        </div>
        <h3 className="font-display text-[15px] font-semibold uppercase leading-snug tracking-wide text-white">
          {item.name}
        </h3>
        <p className="mt-0.5 text-xs text-gray-400">{item.nameFa}</p>
        <p className="hud-tag mt-2 text-[9.5px] text-cod-olive">{item.themeFa}</p>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex items-baseline gap-2">
          {item.price ? (
            <>
              <span className="hud-num text-xl text-cod-gold-light">{item.price.toLocaleString('fa-IR')}</span>
              <span className="hud-tag text-cod-gold">CP</span>
            </>
          ) : (
            <span className="hud-tag text-gray-500">CP نامشخص در آرشیو</span>
          )}
        </div>
        {!item.price && item.priceNote && (
          <p className="text-[11px] leading-relaxed text-gray-500">{item.priceNote}</p>
        )}

        <button
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="mt-auto flex items-center justify-between border-t border-cod-border pt-3 text-right"
        >
          <span className="hud-tag text-cod-gold-light">محتوا · {item.includes.length}</span>
          <span className="hud-num text-gray-500">{open ? '−' : '+'}</span>
        </button>

        {open && (
          <ul className="space-y-1.5">
            {item.includes.map((line, i) => (
              <li key={i} className="flex gap-2 text-[12px] leading-relaxed text-gray-300">
                <span className="hud-num mt-0.5 shrink-0 text-cod-gold/60">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span>{line}</span>
              </li>
            ))}
            {item.blackCellNote && (
              <li className="border-r-2 border-yellow-500/50 bg-yellow-500/5 px-2.5 py-1.5 text-[11.5px] leading-relaxed text-yellow-200/90">
                {item.blackCellNote}
              </li>
            )}
            {item.note && (
              <li className="border-r-2 border-cod-border-light px-2.5 py-1.5 text-[11.5px] leading-relaxed text-gray-400">
                {item.note}
              </li>
            )}
          </ul>
        )}
      </div>
    </article>
  )
}
