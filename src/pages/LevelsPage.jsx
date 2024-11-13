import { useState } from 'react'
import { LevelItem } from '../components/LevelItem'
import { useGameState } from '../store/game.state'

export function LevelsPage() {
  const { setStep } = useGameState()
  const [page, setPage] = useState(1)

  const allLevels = 25
  const itemsPerPage = Array(allLevels)
    .fill(null)
    .map((_, i) => {
      return i + 1 + allLevels * (page - 1)
    })

  function openLevel(level) {
    console.log('New Level ', level)
    setStep()
  }

  function changePage(newPage) {
    if (newPage < 1) return

    setPage(newPage)
  }

  return (
    <main className="container">
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
              <LevelItem level={level} onClick={() => openLevel(level)} />
            </div>
          )
        })}
      </div>

      <button onClick={() => changePage(page - 1)}>Anterior</button>
      <button onClick={() => changePage(page + 1)}>Siguiente</button>
    </main>
  )
}
