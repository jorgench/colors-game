import { LogoGame } from '../components/LogoGame'
import { PageLayout } from '../layout/PageLayout'
import { useGameState } from '../store/game.state'

export function WelcomePage() {
  const { setPlayer } = useGameState()

  return (
    <PageLayout>
      <main className="container page">
        <LogoGame className="title h1" />
        <p>
          Este es un juego inspirado en <a href="#">Blendoku</a> Realizado en React
        </p>
        <button onClick={() => setPlayer('Jorge')}>Comenzar</button>
      </main>
    </PageLayout>
  )
}
