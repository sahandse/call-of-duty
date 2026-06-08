'use client'
import { useState, useEffect } from 'react'

export default function ShopTimer({ nextReset }: { nextReset: string }) {
  const [timeLeft, setTimeLeft] = useState({ h: 0, m: 0, s: 0 })

  useEffect(() => {
    const calc = () => {
      const diff = Math.max(0, new Date(nextReset).getTime() - Date.now())
      const h = Math.floor(diff / 3600000)
      const m = Math.floor((diff % 3600000) / 60000)
      const s = Math.floor((diff % 60000) / 1000)
      setTimeLeft({ h, m, s })
    }
    calc()
    const id = setInterval(calc, 1000)
    return () => clearInterval(id)
  }, [nextReset])

  const pad = (n: number) => String(n).padStart(2, '0')

  return (
    <div className="flex items-center gap-2">
      <span className="text-gray-400 text-sm">بروزرسانی در:</span>
      <div className="flex items-center gap-1 font-mono">
        {[
          { v: timeLeft.h, l: 'ساعت' },
          { v: timeLeft.m, l: 'دقیقه' },
          { v: timeLeft.s, l: 'ثانیه' },
        ].map((t, i) => (
          <span key={t.l} className="flex items-center gap-1">
            {i > 0 && <span className="text-gray-600">:</span>}
            <span className="bg-cod-card border border-cod-border rounded px-2 py-0.5 text-cod-gold font-bold text-sm tabular-nums">
              {pad(t.v)}
            </span>
          </span>
        ))}
      </div>
    </div>
  )
}
