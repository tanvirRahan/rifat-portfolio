/** Site footer — editorial style with copyright and social links. */
export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer style={{ borderTop: '1px solid var(--color-line)', padding: '1.5rem 0' }}>
      <div
        className="wrap"
        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}
      >
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.05em', color: 'var(--color-muted)' }}>
          © {year} RIFAT
        </span>

        <div style={{ display: 'flex', gap: '2rem' }}>
          {[
            { label: 'GitHub',   href: 'https://github.com/tanvirRahan' },
            { label: 'LinkedIn', href: 'https://www.linkedin.com/in/tanvirrahanrifat/' },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-muted)', transition: 'color .2s ease' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-accent)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-muted)')}
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
