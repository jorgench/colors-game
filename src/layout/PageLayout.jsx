import { Icon } from '@iconify/react/dist/iconify.js'
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
  return (
    <footer className="footer center">
      <Icon icon="mynaui:brand-github-solid"></Icon>
      <a href="https://github.com/jorgench/colors-game">Ver Código</a>
    </footer>
  )
}
