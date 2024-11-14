import { useState, useEffect, useCallback } from 'react'
import { generateField } from '../utils/level.utils'
import { createPallette, getBaseColor } from '../utils/colors.utils'
import { GameBox } from '../components/GameBox'
import { GameColor } from '../components/GameColor'
import { DndContext } from '@dnd-kit/core'
import { TimerInLevel } from '../components/TimerInLevel'

function useGenerateLevel(dots) {
  const [state, setState] = useState(generateField(dots))
  const { gridMap, path, numColumn, numRow } = state

  const regenerateState = useCallback(() => setState(generateField(dots)), [dots])

  return { gridMap, numColumn, numRow, regenerateState }
}

export function GamePage() {
  const { gridMap, numColumn, numRow, regenerateState } = useGenerateLevel(4)
  const [colorDefault, setColorDefault] = useState(getBaseColor())
  //const [pallette, setPalletteColor] = useState([])
  const [boardState, setBoardState] = useState({})

  const [plainPallette, setPlainPallette] = useState([])

  const [steps, setSteps] = useState(0)

  useEffect(() => {
    const pallette = createPallette(gridMap, colorDefault)
    const newPallette = pallette.reduce((prev, row, x) => {
      if (!row) return prev
      row.forEach((col, y) => {
        if (col) {
          prev.push({ color: col, row: x, col: y })
        }
      })
      return prev
    }, [])

    setPlainPallette(newPallette)
  }, [gridMap, colorDefault])

  useEffect(() => {
    setSteps(steps + 1)
    checkWinnerCondition()
  }, [boardState])

  function handleDragEnd(obj) {
    if (obj.collisions.length < 1) return

    const colorData = obj.active.data.current
    const boxData = obj.collisions[0].data.droppableContainer.data.current

    const copyBoardState = { ...boardState }

    if (boxData.kind === 'option') {
      const copyPlainPallette = [...plainPallette]
      const optionPallette = copyPlainPallette[boxData.optionPlace]

      if (!optionPallette) {
        copyPlainPallette[boxData.optionPlace] = { ...colorData }

        if (colorData?.place?.kind === 'option') {
          copyPlainPallette[`${colorData.place.key}`] = null
        } else {
          copyBoardState[`${colorData.place.key}`] = null
          setBoardState(copyBoardState)
        }
        setPlainPallette(copyPlainPallette)
      }
    } else {
      if (copyBoardState[`${boxData.row},${boxData.col}`]) {
        return
      }

      copyBoardState[`${boxData.row},${boxData.col}`] = { ...colorData }

      if (colorData?.place?.kind === 'board') {
        copyBoardState[`${colorData.place.key}`] = null
        setBoardState(copyBoardState)
      } else {
        setBoardState(copyBoardState)
        removeItemFromPallette(colorData)
      }
    }
  }

  function removeItemFromPallette(colorData) {
    const copyPlainPallette = [...plainPallette]
    const ind = copyPlainPallette.findIndex(item => {
      return item?.color === colorData.color
    })
    copyPlainPallette[ind] = null
    setPlainPallette(copyPlainPallette)
  }

  function checkWinnerCondition() {
    console.log(boardState, steps)

    const keys = Object.keys(boardState)
    const winner = keys.every(key => {
      const value = boardState[key]
      return value && key === `${value.row},${value.col}`
    })

    console.log('Has Winner: ', winner && keys.length === 4)
  }
  console.log('rerender')

  return (
    <main className="container">
      Grid: {gridMap.length} {gridMap[0].length}
      <TimerInLevel />
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
                  data={{ row: x, col: y, kind: 'board' }}
                >
                  {boardState[`${x},${y}`] ? (
                    <GameColor
                      key={boardState[`${x},${y}`].color}
                      id={boardState[`${x},${y}`].color}
                      data={{ ...boardState[`${x},${y}`], place: { kind: 'board', key: `${x},${y}` } }}
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
              <GameBox id={`item-${i}`} key={`item-${i}`} data={{ optionPlace: i, kind: 'option' }}>
                {item ? (
                  <GameColor
                    key={i + item.color}
                    id={item.color}
                    data={{ ...item, place: { kind: 'option', key: i } }}
                    color={item.color}
                  />
                ) : null}
              </GameBox>
            )
          })}
        </div>
      </DndContext>
      <button onClick={() => regenerateState()}>Recargar</button>
    </main>
  )
}
