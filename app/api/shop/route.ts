import { NextResponse } from 'next/server'
import { shopCatalog } from '@/app/data/shopCatalog'
import { ShopItem } from '@/app/types'

function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

function getTodaySeed(): number {
  const now = new Date()
  return now.getUTCFullYear() * 10000 + (now.getUTCMonth() + 1) * 100 + now.getUTCDate()
}

function shuffleWithSeed<T>(arr: T[], seed: number): T[] {
  const result = [...arr]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(seededRandom(seed + i) * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

export async function GET() {
  const seed = getTodaySeed()
  const shuffled = shuffleWithSeed(shopCatalog, seed)

  const featured: ShopItem[] = shuffled
    .filter(i => i.rarity === 'فوق‌العاده' || i.rarity === 'افسانه‌ای')
    .slice(0, 4)
    .map(i => ({ ...i, isFeatured: true }))

  const daily: ShopItem[] = shuffled
    .filter(i => !featured.find(f => f.id === i.id))
    .slice(0, 12)

  const now = new Date()
  const nextReset = new Date()
  nextReset.setUTCHours(24, 0, 0, 0)

  return NextResponse.json({
    featured,
    daily,
    lastUpdated: now.toISOString(),
    nextReset: nextReset.toISOString(),
  })
}
