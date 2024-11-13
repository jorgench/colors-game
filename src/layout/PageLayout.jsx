export function PageLayout({ children }) {
  return (
    <section className="layout">
      {children}
      <FooterPage />
    </section>
  )
}

function FooterPage() {
  return <footer className="footer">Creado el 2024</footer>
}
