import { PageLayout } from './layout/PageLayout'
import { GamePage } from './pages/GamePage'
import { LevelsPage } from './pages/LevelsPage'
import { WelcomePage } from './pages/WelcomePage'
import { useGameState } from './store/game.state'

function App() {
  const { gameStep } = useGameState()

  return (
    <PageLayout>
      {gameStep === 'empty' ? <WelcomePage /> : gameStep === 'started' ? <LevelsPage /> : <GamePage />}
    </PageLayout>
  )
}

export default App
