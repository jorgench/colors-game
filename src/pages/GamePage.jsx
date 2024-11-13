import { useState } from 'react'
import { generateField } from '../utils/level.utils'
import { createPallette, generatePallet, getBaseColor } from '../utils/colors.utils'
import { ColorItem } from '../components/ColorItem'
import { GameBox } from '../components/GameBox'
import { GameColor } from '../components/GameColor'
import { DndContext } from '@dnd-kit/core'

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
  const plainPallete = pallette.flat().filter(Boolean)
  console.log('Re-render')

  function handleDragEnd(obj) {
    console.log('obj', obj)
  }

  return (
    <main className="container">
      Grid: {gridMap.length} {gridMap[0].length}
      <DndContext onDragEnd={handleDragEnd}>
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
                <GameBox
                  id={`item-${x}-${y}`}
                  key={`item-${x}-${y}`}
                  style={{ gridColumn: y + 1, gridRow: x + 1 }}
                  color={pallette[x][y]}
                />
              ) : (
                <></>
              )
            })
          })}
        </div>
        <div style={{ display: 'flex', gap: '1em' }}>
          {plainPallete.map((color, i) => (
            <GameColor key={i + color} id={color} color={color} />
          ))}
        </div>
      </DndContext>
      <button onClick={() => regenerateState()}>Recargar</button>
    </main>
  )
}
