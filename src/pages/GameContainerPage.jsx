import { useGameState } from '../store/game.state'
import { GamePage } from './GamePage'

export function GameContainerPage() {
  const { level } = useGameState()
  return <GamePage key={`level-${level}`} />
}
