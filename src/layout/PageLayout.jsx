import { HeaderPage } from '../components/HeaderPage'

export function PageLayout({ children }) {
  return (
    <section className="layout">
      <HeaderPage />
      {children}
      <FooterPage />
    </section>
  )
}

function FooterPage() {
  return <footer className="footer">Versión únicamente test</footer>
}
