import { useState } from 'react'
import { generateField } from '../utils/level.utils'
import { createPallette, generatePallet, getBaseColor } from '../utils/colors.utils'
import { ColorItem } from '../components/ColorItem'

function BoxEmpty({ column, row, children }) {
  return (
    <div className="item-grid" style={{ gridColumn: column + 1, gridRow: row + 1 }}>
      {children}
    </div>
  )
}

function useGenerateLevel(dots) {
  const [state, setState] = useState(generateField(dots))
  const { gridMap, path, numColumn, numRow } = state

  function regenerateState() {
    setState(generateField(dots))
  }

  return { gridMap, numColumn, numRow, regenerateState }
}

export function GamePage() {
  const { gridMap, numColumn, numRow, regenerateState } = useGenerateLevel(4)
  const baseColor = getBaseColor()
  const pallette = createPallette(gridMap, baseColor)

  console.log('Path::', pallette)

  return (
    <main className="container">
      Grid: {gridMap.length} {gridMap[0].length}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${numColumn}, var(--size-box))`,
          gridTemplateRows: `repeat(${numRow}, var(--size-box))`,
          gap: '1rem',
          alignContent: 'center',
          justifyContent: 'center',
        }}
      >
        {gridMap.map((rows, x) => {
          return rows.map((col, y) => {
            return col ? (
              <ColorItem key={`item-${x}-${y}`} style={{ gridColumn: y + 1, gridRow: x + 1 }} color={pallette[x][y]} />
            ) : (
              <></>
            )
          })
        })}
      </div>
      <button onClick={() => regenerateState()}>Recargar</button>
    </main>
  )
}
