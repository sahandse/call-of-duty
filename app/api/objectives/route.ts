import { NextRequest, NextResponse } from 'next/server'
import { objectives } from '@/app/data/objectives'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const type = searchParams.get('type')
  const game = searchParams.get('game')
  const q = searchParams.get('q')?.toLowerCase()

  let result = objectives

  if (type && type !== 'all') result = result.filter(o => o.type === type)
  if (game && game !== 'all') result = result.filter(o => o.game === game || o.game === 'both')
  if (q) {
    result = result.filter(o =>
      o.title.toLowerCase().includes(q) ||
      o.description.toLowerCase().includes(q) ||
      o.tags.some(t => t.toLowerCase().includes(q))
    )
  }

  return NextResponse.json({ objectives: result, total: result.length })
}
