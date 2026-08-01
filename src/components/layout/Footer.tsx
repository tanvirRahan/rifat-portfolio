/** Site footer with social links and copyright. */
export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer id="footer" className="border-t border-white/5 bg-surface">
      <div className="container-main flex flex-col items-center justify-center py-8">
        {/* Brand */}
        <p className="text-sm text-text-muted">
          © {year} <span className="font-semibold text-text">Rifat</span>. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
