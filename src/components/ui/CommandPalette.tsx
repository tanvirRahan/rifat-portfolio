import { useEffect, useState, useRef } from 'react'

interface CommandItem {
  label: string
  tag: string
  action: () => void
}

interface CommandPaletteProps {
  isOpen: boolean
  onClose: () => void
}

const S = {
  backdrop: {
    position: 'fixed' as const, inset: 0, background: 'rgba(10,10,10,0.45)', zIndex: 500,
    display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: '14vh', paddingLeft: '1rem', paddingRight: '1rem',
  },
  panel: {
    background: 'var(--color-base)', width: '100%', maxWidth: '560px', border: '1px solid var(--color-line)',
    maxHeight: '60vh', display: 'flex', flexDirection: 'column' as const,
  },
  inputRow: {
    display: 'flex', alignItems: 'center', gap: '12px', padding: '1.5rem 2rem', borderBottom: '1px solid var(--color-line)',
  },
  input: {
    flex: 1, border: 'none', background: 'none', fontFamily: 'var(--font-sans)', fontSize: '16px', color: 'var(--color-ink)', outline: 'none',
  },
  list: { overflowY: 'auto' as const, padding: '8px 0' },
  item: (active: boolean): React.CSSProperties => ({
    padding: '14px 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    cursor: 'pointer', fontSize: '14px', color: 'var(--color-body)',
    background: active ? 'var(--color-surface)' : 'transparent',
  }),
  tag: { fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: 'var(--color-muted)' },
  empty: { padding: '1.5rem 2rem', fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--color-muted)' },
}

/** ⌘K command palette — jump to sections or links. */
export default function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToId = (id: string) => {
    onClose()
    const el = document.getElementById(id)
    el?.scrollIntoView({ behavior: 'smooth' })
  }

  const commands: CommandItem[] = [
    { label: 'About',    tag: 'Section', action: () => scrollToId('about') },
    { label: 'Work',     tag: 'Section', action: () => scrollToId('work') },
    { label: 'Research', tag: 'Section', action: () => scrollToId('research') },
    { label: 'Skills',   tag: 'Section', action: () => scrollToId('skills') },
    { label: 'Contact',  tag: 'Section', action: () => scrollToId('contact') },
    { label: 'GitHub',   tag: 'Link',    action: () => { onClose(); window.open('https://github.com/tanvirRahan', '_blank') } },
    { label: 'LinkedIn', tag: 'Link',    action: () => { onClose(); window.open('https://www.linkedin.com/in/tanvirrahanrifat/', '_blank') } },
    { label: 'Email — tanvirrahanrifat@gmail.com', tag: 'Contact', action: () => { onClose(); window.location.href = 'mailto:tanvirrahanrifat@gmail.com' } },
  ]

  const filtered = query
    ? commands.filter((c) => c.label.toLowerCase().includes(query.toLowerCase()))
    : commands

  /* Focus input when opened */
  useEffect(() => {
    if (isOpen) {
      setQuery('')
      setActiveIndex(0)
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [isOpen])

  /* Keyboard navigation */
  useEffect(() => {
    if (!isOpen) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowDown') { e.preventDefault(); setActiveIndex((i) => Math.min(i + 1, filtered.length - 1)) }
      if (e.key === 'ArrowUp')   { e.preventDefault(); setActiveIndex((i) => Math.max(i - 1, 0)) }
      if (e.key === 'Enter' && filtered[activeIndex]) filtered[activeIndex].action()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [isOpen, filtered, activeIndex, onClose])

  if (!isOpen) return null

  return (
    <div style={S.backdrop} onClick={(e) => { if (e.target === e.currentTarget) onClose() }}>
      <div style={S.panel}>
        <div style={S.inputRow}>
          <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-muted)', fontSize: '14px' }}>›</span>
          <input
            ref={inputRef}
            type="text"
            style={S.input}
            placeholder="Jump to a section or link…"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setActiveIndex(0) }}
            autoComplete="off"
          />
        </div>
        <div style={S.list}>
          {filtered.length === 0 ? (
            <div style={S.empty}>No results</div>
          ) : (
            filtered.map((cmd, i) => (
              <div
                key={cmd.label}
                style={S.item(i === activeIndex)}
                onClick={cmd.action}
                onMouseEnter={() => setActiveIndex(i)}
              >
                <span>{cmd.label}</span>
                <span style={S.tag}>{cmd.tag}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
