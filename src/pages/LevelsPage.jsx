import { useState } from 'react'
import { LevelItem } from '../components/LevelItem'
import { useGameState } from '../store/game.state'
import { generateLevel } from '../utils/level.utils'

export function LevelsPage() {
  const allLevels = 25
  const { setStep, pointsHistory, level } = useGameState()
  const [page, setPage] = useState(Math.ceil((level + 1) / allLevels))

  const itemsPerPage = Array(allLevels)
    .fill(null)
    .map((_, i) => {
      return i + 1 + allLevels * (page - 1)
    })

  function openLevel(level) {
    console.log('New Level ', generateLevel(level))
    setStep()
  }

  function changePage(newPage) {
    if (newPage < 1) return

    setPage(newPage)
  }

  return (
    <main className="container page">
      <h1 className="title">
        Nivel {page}-{allLevels * page}
      </h1>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, var(--size-box))',
          gap: '1rem',
          alignContent: 'center',
          justifyContent: 'center',
        }}
      >
        {itemsPerPage.map(level => {
          return (
            <div className="item-grid" key={`level-${level}`}>
              <LevelItem level={level} points={pointsHistory[level - 1]} onClick={() => openLevel(level)} />
            </div>
          )
        })}
      </div>

      <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
        <button onClick={() => changePage(page - 1)}>Anterior</button>
        <button onClick={() => changePage(page + 1)}>Siguiente</button>
      </div>
    </main>
  )
}
