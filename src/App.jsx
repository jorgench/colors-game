import { GamePage } from './pages/GamePage'
import { LevelsPage } from './pages/LevelsPage'
import { WelcomePage } from './pages/WelcomePage'
import { useGameState } from './store/game.state'

function App() {
  const { gameStep } = useGameState()

  return <>{gameStep === 'empty' ? <WelcomePage /> : gameStep === 'started' ? <LevelsPage /> : <GamePage />}</>
}

export default App
