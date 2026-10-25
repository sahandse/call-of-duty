export type GameMode = 'warzone' | 'mw3' | 'both'

export type StoreKind = 'bundle' | 'battle_pass' | 'blackcell' | 'vault'

export interface StoreItem {
  id: string
  name: string
  nameFa: string
  kind: StoreKind
  themeFa: string
  price?: number
  priceNote?: string
  releasedOn?: string
  includes: string[]
  blackCellNote?: string
  note?: string
}

export type WeaponClass =
  | 'assault_rifle'
  | 'battle_rifle'
  | 'smg'
  | 'lmg'
  | 'sniper'
  | 'marksman'
  | 'shotgun'
  | 'handgun'
  | 'melee'
  | 'launcher'
export type MetaTier = 'S' | 'A' | 'B' | 'C' | 'D'
export type PatchTag = 'S5' | 'S5R'

export interface MetaWeapon {
  id: string
  name: string
  class: WeaponClass
  classFa: string
  tier: MetaTier
  game: GameMode
  addedIn: string
  // Editorial 1–10 aggregate, not an in-game stat — see scoresNoteFa
  damage: number
  range: number
  fireRate: number
  mobility: number
  control: number
  scoresNoteFa: string
  bestFor: string
  prosFa: string[]
  consFa: string[]
  // Verbatim adjustments from the official Season 5 / Season 5 Reloaded notes
  changesFa: { patch: PatchTag; detail: string }[]
  topAttachments: string[]
  loadoutSource?: string
  verifiedBy: string
  trending: 'up' | 'down' | 'stable'
}

export interface Loadout {
  id: string
  name: string
  primary: string
  secondary: string
  vest: string
  gloves: string
  boots: string
  gear: string[]
  tactical: string
  lethal: string
  fieldUpgrade: string
  createdAt: string
}

export interface PatchNote {
  id: string
  date: string
  version: string
  titleFa: string
  summary: string
  source?: string
  changes: { category: string; categoryFa: string; items: string[] }[]
}

export interface BattlePassReward {
  name: string
  nameFa: string
  kind: 'operator_skin' | 'blueprint' | 'weapon' | 'finishing_move' | 'cod_points' | 'boost' | 'other'
  blackCell?: string
  detailFa?: string
}

export interface BattlePassSector {
  id: string
  sector: number | 'instant' | 'blackcell' | 'completion'
  label: string
  labelFa: string
  operator?: BattlePassReward
  rewards: BattlePassReward[]
  noteFa?: string
}

export interface MapInfo {
  id: string
  name: string
  nameFa: string
  game: 'warzone' | 'mw3'
  type: 'battle_royale' | 'resurgence' | 'multiplayer'
  typeFa: string
  size: 'کوچک' | 'متوسط' | 'بزرگ' | 'عظیم'
  description: string
  tips: string[]
  code: string
  accent: string
  addedIn: string
  provenance: 'official' | 'archive'
}

export interface CamoWeapon {
  id: string
  name: string
  class: WeaponClass
  classFa: string
  challenges: {
    id: string
    camo: string
    tier: 'base' | 'gilded' | 'forged' | 'priceless' | 'interstellar'
    rawEn: string
    descFa: string
  }[]
}
