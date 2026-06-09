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

export type WeaponClass = 'assault_rifle' | 'smg' | 'lmg' | 'sniper' | 'marksman' | 'shotgun' | 'handgun'
export type MetaTier = 'S' | 'A' | 'B' | 'C' | 'D'

export interface MetaWeapon {
  id: string
  name: string
  class: WeaponClass
  classFa: string
  tier: MetaTier
  game: GameMode
  damage: number
  range: number
  fireRate: number
  mobility: number
  control: number
  bestFor: string
  topAttachments: string[]
  trending: 'up' | 'down' | 'stable'
}

export interface LoadoutWeapon {
  id: string
  name: string
  class: WeaponClass
  classFa: string
  game: GameMode
}

export interface Loadout {
  id: string
  name: string
  primary: string
  secondary: string
  perks: [string, string, string]
  lethal: string
  tactical: string
  fieldUpgrade: string
  createdAt: string
}

export interface PatchNote {
  id: string
  date: string
  version: string
  titleFa: string
  summary: string
  changes: { category: string; categoryFa: string; items: string[] }[]
}

export interface BattlePassItem {
  tier: number
  free: boolean
  rewardFa: string
  type: 'operator_skin' | 'blueprint' | 'xp_token' | 'cod_points' | 'emblem' | 'calling_card' | 'charm' | 'sticker' | 'vehicle' | 'camo'
  icon: string
  rarity?: Rarity
}

export interface MapInfo {
  id: string
  name: string
  nameFa: string
  game: 'warzone' | 'mw3'
  type: 'battle_royale' | 'multiplayer' | 'dmz'
  typeFa: string
  size: 'کوچک' | 'متوسط' | 'بزرگ' | 'عظیم'
  description: string
  tips: string[]
  icon: string
  gradient: string
}

export interface CamoWeapon {
  id: string
  name: string
  class: WeaponClass
  classFa: string
  challenges: {
    id: string
    nameFa: string
    descFa: string
    tier: 'base' | 'gold' | 'platinum' | 'polyatomic'
    icon: string
  }[]
}
