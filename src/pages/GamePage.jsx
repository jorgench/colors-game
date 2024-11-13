import { useState } from 'react'
import { generateField } from '../utils/level.utils'
import { createPallette, generatePallet, getBaseColor } from '../utils/colors.utils'
import { ColorItem } from '../components/ColorItem'
import { GameBox } from '../components/GameBox'
import { GameColor } from '../components/GameColor'
import { DndContext } from '@dnd-kit/core'
import { useEffect } from 'react'

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
  const [colorDefault, setColorDefault] = useState(getBaseColor())
  const [pallette, setPalletteColor] = useState([])
  const [boardState, setBoardState] = useState({})

  useEffect(() => {
    setPalletteColor(createPallette(gridMap, colorDefault))
  }, [gridMap, colorDefault])

  const [plainPallette, setPlainPallette] = useState([])
  useEffect(() => {
    const newPallette = pallette
      .map((col, x) =>
        col.map((v, y) => {
          return !v ? false : { color: v, row: x + 1, col: y + 1 }
        }),
      )
      .flat()
      .filter(Boolean)
    setPlainPallette(newPallette)
  }, [pallette])

  function handleDragEnd(obj) {
    if (obj.collisions.length < 1) return

    const colorData = obj.active.data.current
    const boxData = obj.collisions[0].data.droppableContainer.data.current

    const copyBoardState = { ...boardState }

    console.log(copyBoardState, boxData)
    if (copyBoardState[`${boxData.row},${boxData.col}`]) {
      return
    }

    copyBoardState[`${boxData.row},${boxData.col}`] = colorData

    setBoardState(copyBoardState)
    removeItemFromPallette(colorData)
  }

  function removeItemFromPallette(colorData) {
    const copyPainPallette = [...plainPallette]
    const ind = copyPainPallette.findIndex(item => {
      return item.color === colorData.color
    })
    console.log('ind', ind)
    copyPainPallette[ind] = null
    setPlainPallette(copyPainPallette)
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
                  data={{ row: x, col: y }}
                >
                  {boardState[`${x},${y}`] ? (
                    <GameColor
                      key={boardState[`${x},${y}`].color}
                      id={boardState[`${x},${y}`].color}
                      data={boardState[`${x},${y}`]}
                      color={boardState[`${x},${y}`].color}
                    />
                  ) : null}
                </GameBox>
              ) : (
                <></>
              )
            })
          })}
        </div>
        <div style={{ display: 'flex', gap: '1em' }}>
          {plainPallette.map((item, i) => {
            return (
              <GameBox id={`item-${i}`} key={`item-${i}`}>
                {item ? <GameColor key={i + item.color} id={item.color} data={item} color={item.color} /> : null}
              </GameBox>
            )
          })}
        </div>
      </DndContext>
      <button onClick={() => regenerateState()}>Recargar</button>
    </main>
  )
}
