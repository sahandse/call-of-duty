import { battlePassSectors } from './battlePassData'
import { storeArchive } from './shopCatalog'
import { weeklyRewards } from './objectives'
import { BattlePassReward } from '../types'

// کالکشن از همان سه مجموعهٔ تأییدشده ساخته می‌شود: پاس نبرد سیزن ۵،
// بایگانی شاپ و پاداش‌های هفتگی سیزن ۵. هیچ آیتم ساختگی اینجا نیست.

export type CollectionCategory = 'operator' | 'blueprint' | 'weapon' | 'finishing_move' | 'bundle' | 'attachment'
export type CollectionOrigin = 'battle_pass' | 'blackcell' | 'store' | 'weekly'

export interface CollectionItem {
  id: string
  name: string
  nameFa: string
  category: CollectionCategory
  origin: CollectionOrigin
  originFa: string
  detailFa?: string
}

export const CATEGORY_FA: Record<CollectionCategory, string> = {
  operator: 'اپراتور',
  blueprint: 'بلوپرینت',
  weapon: 'سلاح',
  finishing_move: 'Finishing Move',
  bundle: 'باندل',
  attachment: 'اتچمنت / کیت',
}

export const CATEGORY_ORDER: CollectionCategory[] = [
  'operator',
  'blueprint',
  'weapon',
  'finishing_move',
  'attachment',
  'bundle',
]

export const ORIGIN_FA: Record<CollectionOrigin, string> = {
  battle_pass: 'پاس نبرد سیزن ۵',
  blackcell: 'بخش BlackCell',
  store: 'بایگانی شاپ',
  weekly: 'چالش هفتگی سیزن ۵',
}

const CATEGORY_BY_KIND: Partial<Record<BattlePassReward['kind'], CollectionCategory>> = {
  operator_skin: 'operator',
  blueprint: 'blueprint',
  weapon: 'weapon',
  finishing_move: 'finishing_move',
}

function build(): CollectionItem[] {
  const items: CollectionItem[] = []

  battlePassSectors.forEach(sector => {
    const origin: CollectionOrigin = sector.sector === 'blackcell' ? 'blackcell' : 'battle_pass'
    const rewards = sector.operator ? [sector.operator, ...sector.rewards] : sector.rewards
    rewards.forEach((r, i) => {
      const category = CATEGORY_BY_KIND[r.kind]
      if (!category) return
      items.push({
        id: `${sector.id}-${i}`,
        name: r.name,
        nameFa: r.nameFa,
        category,
        origin,
        originFa: sector.labelFa,
        detailFa: r.detailFa,
      })
    })
  })

  storeArchive.forEach(s => {
    items.push({
      id: s.id,
      name: s.name,
      nameFa: s.nameFa,
      category: 'bundle',
      origin: 'store',
      originFa: s.releasedOn ? `${s.themeFa} · ${s.releasedOn}` : s.themeFa,
      detailFa: s.includes[0],
    })
  })

  weeklyRewards.forEach(w => {
    items.push({
      id: w.id,
      name: w.reward,
      nameFa: w.rewardFa,
      category: /blueprint/i.test(w.reward) ? 'blueprint' : 'attachment',
      origin: 'weekly',
      originFa: `هفتهٔ ${w.week} · ${w.weapon}`,
    })
  })

  return items
}

export const collectionItems: CollectionItem[] = build()

export const collectionMeta = {
  season: 'SEASON 05',
  noteFa:
    'فهرست از جوایز پاس نبرد، بایگانی شاپ و پاداش‌های هفتگی سیزن ۵ ساخته شده است. مالکیت فقط در همین مرورگر ثبت می‌شود.',
}
