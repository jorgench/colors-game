import { useState, useEffect, useCallback } from 'react'
import {
  calculatePoints,
  generateCheckWinner,
  generateField,
  generateInitialOptions,
  generateLevel,
  moveItemInLevel,
} from '../utils/level.utils'
import { createPallette, getBaseColor } from '../utils/colors.utils'
import { GameBox } from '../components/GameBox'
import { GameColor } from '../components/GameColor'
import { DndContext } from '@dnd-kit/core'
import { TimerInLevel } from '../components/TimerInLevel'
import { useGameState } from '../store/game.state'
import { useRef } from 'react'

function useGenerateLevel(level) {
  const [levelInfo] = useState(generateLevel(level))
  const dots = levelInfo.dots
  const [colorDefault, setColorDefault] = useState(getBaseColor())
  const [state, setState] = useState(generateField(dots))
  const { gridMap, numColumn, numRow } = state

  const regenerateState = useCallback(() => setState(generateField(dots)), [level])

  const [plainPallette, setPlainPallette] = useState([])

  useEffect(() => {
    const pallette = createPallette(gridMap, colorDefault)
    const newPallette = generateInitialOptions(pallette)
    setPlainPallette(newPallette)
  }, [gridMap])

  const checkWinnerCondition = generateCheckWinner(levelInfo)

  return { gridMap, numColumn, numRow, regenerateState, plainPallette, setPlainPallette, checkWinnerCondition }
}

export function GamePage() {
  const { setNextLevel, setStep, level } = useGameState()
  const { gridMap, numColumn, numRow, regenerateState, plainPallette, setPlainPallette, checkWinnerCondition } =
    useGenerateLevel(level)

  //const [pallette, setPalletteColor] = useState([])
  const [boardState, setBoardState] = useState({})

  const [steps, setSteps] = useState(0)

  const timerRef = useRef()

  useEffect(() => {
    setSteps(steps + 1)
    if (checkWinnerCondition({ boardState })) {
      setNextLevel(
        calculatePoints({
          level: 8,
          time: timerRef.current.getData(),
          steps,
        }),
      )
      setStep('started')
    }
  }, [boardState])

  function handleDragEnd(obj) {
    if (obj.collisions.length < 1) return

    const colorData = obj.active.data.current
    const boxData = obj.collisions[0].data.droppableContainer.data.current

    const copyBoardState = { ...boardState }
    const copyPlainPallette = [...plainPallette]

    const newPositions = moveItemInLevel({
      boardState: copyBoardState,
      optionsState: copyPlainPallette,
      colorData,
      placeData: boxData,
    })

    if (newPositions) {
      setBoardState(newPositions.boardState)
      setPlainPallette(newPositions.optionsState)
    }
    return
  }

  console.log('rerender')

  return (
    <main className="container">
      Grid: {gridMap.length} {gridMap[0].length}
      <TimerInLevel ref={timerRef} />
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
                  <GameBoxInside key={`${x},${y}`} item={boardState[`${x},${y}`]} x={x} y={y} />
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

function GameBoxInside({ item, x, y }) {
  return item ? (
    <GameColor
      id={item.color}
      data={{ ...item, place: { kind: 'board', key: `${x},${y}` } }}
      color={item.color}
      isInCorrectPlace={item.col === y && item.row === x}
    />
  ) : null
}
