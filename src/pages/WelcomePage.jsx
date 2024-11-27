import { LogoGame } from '@/components/LogoGame'
import { PageLayout } from '@/layout/PageLayout'
import { useGameState } from '../store/game.state'

export function WelcomePage() {
  const { setStep } = useGameState()

  return (
    <PageLayout>
      <main className="container page animate fade-entry">
        <LogoGame className="title h1" />
        <p>
          Este es un juego inspirado en <a href="#">Blendoku</a> Realizado en React
        </p>
        <button onClick={() => setStep('started')}>Comenzar</button>
      </main>
    </PageLayout>
  )
}
