import { LogoGame } from './LogoGame'
import { ThemeColorSwitch } from './ThemeColorSwitch'

export function HeaderPage() {
  return (
    <header className="header-page">
      <div>
        <LogoGame />
      </div>
      <ThemeColorSwitch />
    </header>
  )
}
