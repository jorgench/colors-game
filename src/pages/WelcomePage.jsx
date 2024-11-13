import { useGameState } from '../store/game.state'

export function WelcomePage() {
  const { setPlayer } = useGameState()

  return (
    <main className="container page">
      <h1 className="title h1">Colors</h1>
      <p>
        Este es un juego inspirado en <a href="#">Blendoku</a> Realizado en React
      </p>
      <button onClick={() => setPlayer('Jorge')}>Comenzar</button>
    </main>
  )
}
