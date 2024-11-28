import { useState } from 'react'
import { LevelItem } from '@/components/LevelItem'
import { useGameState } from '@/store/game.state'
import { PageLayout } from '@/layout/PageLayout'

export function LevelsPage() {
  const levelsByPage = 25
  const { setLevel, pointsHistory, level } = useGameState()
  const [page, setPage] = useState(Math.ceil((level + 1) / levelsByPage))
  const itemsPerPage = Array(levelsByPage)
    .fill(null)
    .map((_, i) => {
      const level = i + 1 + levelsByPage * (page - 1)
      const points = pointsHistory[level - 1]?.points ?? 0

      return {
        name: level,
        points: pointsHistory[level - 1]?.points,
        canSelected: points > 0 || level === pointsHistory.length + 1,
      }
    })

  function openLevel(level) {
    setLevel(level)
  }

  function changePage(newPage) {
    if (newPage < 1) return

    setPage(newPage)
  }

  return (
    <PageLayout>
      <main className="container page">
        <h1 className="title animate fade-entry">
          Niveles {levelsByPage * (page - 1) + 1}-{levelsByPage * page}
        </h1>

        <div className="level-page-grid">
          {itemsPerPage.map((level, i) => {
            return (
              <LevelItem
                key={`level-${level.name}`}
                style={{ '--n': i }}
                level={level.name}
                points={level.points}
                canSelected={level.canSelected}
                onClick={() => openLevel(level.name)}
              />
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
