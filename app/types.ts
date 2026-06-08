export type ObjectiveType =
  | 'daily'
  | 'weekly'
  | 'seasonal'
  | 'weapon'
  | 'operator'
  | 'battle_pass'
  | 'ranked'

export type GameMode = 'warzone' | 'mw3' | 'both'
export type Difficulty = 'آسان' | 'متوسط' | 'سخت'
export type Rarity = 'معمولی' | 'نادر' | 'حماسی' | 'افسانه‌ای' | 'فوق‌العاده'

export interface Objective {
  id: string
  title: string
  description: string
  type: ObjectiveType
  typeFa: string
  game: GameMode
  gameFa: string
  xp: number
  difficulty: Difficulty
  maxProgress: number
  tags: string[]
  weaponClass?: string
}

export interface ShopItem {
  id: string
  name: string
  nameFa: string
  category: string
  categoryFa: string
  price: number
  originalPrice?: number
  rarity: Rarity
  game: GameMode
  isFeatured: boolean
  isNew: boolean
  discount?: number
  colorScheme: [string, string]
  icon: string
  includes?: string[]
}

export interface ShopResponse {
  featured: ShopItem[]
  daily: ShopItem[]
  lastUpdated: string
  nextReset: string
}
