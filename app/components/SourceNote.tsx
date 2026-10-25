interface SourceNoteProps {
  kind?: 'archive' | 'verified' | 'community' | 'warning'
  children: React.ReactNode
  source?: string
}

const KIND_STYLE: Record<NonNullable<SourceNoteProps['kind']>, { bar: string; tag: string; label: string }> = {
  archive: { bar: 'bg-cod-sand', tag: 'text-cod-sand', label: 'ARCHIVE' },
  verified: { bar: 'bg-cod-gold', tag: 'text-cod-gold', label: 'OFFICIAL' },
  community: { bar: 'bg-cod-steel', tag: 'text-cod-steel', label: 'COMMUNITY' },
  warning: { bar: 'bg-cod-red', tag: 'text-cod-red', label: 'NOT VERIFIED' },
}

export default function SourceNote({ kind = 'archive', children, source }: SourceNoteProps) {
  const s = KIND_STYLE[kind]
  return (
    <aside className="notch relative flex items-start gap-3 bg-cod-card px-3.5 py-2.5 text-[11.5px] leading-relaxed text-gray-400">
      <span className={`absolute inset-y-0 right-0 w-0.5 ${s.bar}`} aria-hidden />
      <span className={`hud-tag mt-0.5 shrink-0 ${s.tag}`}>{s.label}</span>
      <span className="min-w-0 flex-1">
        {children}
        {source && <span className="mt-1 block font-mono text-[10px] text-gray-600">{source}</span>}
      </span>
    </aside>
  )
}
