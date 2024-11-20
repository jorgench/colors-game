import { useState } from 'react'
import { LevelItem } from '../components/LevelItem'
import { useGameState } from '../store/game.state'
import { generateLevel } from '../utils/level.utils'
import { PageLayout } from '../layout/PageLayout'

export function LevelsPage() {
  const allLevels = 25
  const { setLevel, pointsHistory, level } = useGameState()
  const [page, setPage] = useState(Math.ceil((level + 1) / allLevels))

  const itemsPerPage = Array(allLevels)
    .fill(null)
    .map((_, i) => {
      const level = i + 1 + allLevels * (page - 1)
      const points = pointsHistory[level - 1]?.points ?? 0

      return {
        name: level,
        points: pointsHistory[level - 1]?.points,
        canSelected: points > 0 || level === pointsHistory.length + 1,
      }
    })

  function openLevel(level) {
    console.log('New Level ', generateLevel(level))
    setLevel(level)
  }

  function changePage(newPage) {
    if (newPage < 1) return

    setPage(newPage)
  }

  return (
    <PageLayout>
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
              <div className="item-grid" key={`level-${level.name}`}>
                <LevelItem
                  level={level.name}
                  points={level.points}
                  canSelected={level.canSelected}
                  onClick={() => openLevel(level.name)}
                />
              </div>
            )
          })}
        </div>

        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
          <button onClick={() => changePage(page - 1)}>Anterior</button>
          <button onClick={() => changePage(page + 1)}>Siguiente</button>
        </div>
      </main>
    </PageLayout>
  )
}
