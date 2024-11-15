import { useState, useEffect } from 'react'
import {
  calculatePoints,
  generateCheckWinner,
  generateField,
  generateInitialOptions,
  generateLevel,
  moveItemInLevel,
} from '../utils/level.utils'
import {
  changeColorFromBoardState,
  changeColorFromOptionsState,
  createPallette,
  getBaseColor,
} from '../utils/colors.utils'
import { GameBox } from '../components/GameBox'
import { GameColor } from '../components/GameColor'
import { DndContext } from '@dnd-kit/core'
import { TimerInLevel } from '../components/TimerInLevel'
import { useGameState } from '../store/game.state'
import { useRef } from 'react'
import { useMemo } from 'react'

function useGenerateLevel(level) {
  const [levelInfo] = useState(generateLevel(level))
  const dots = levelInfo.dots
  const [colorDefault, setColorDefault] = useState(getBaseColor())
  const [state] = useState(generateField(dots))
  const { gridMap, numColumn, numRow } = state

  const [boardState, setBoardState] = useState({})

  const [plainPallette, setPlainPallette] = useState([])

  useEffect(() => {
    const pallette = createPallette(gridMap, colorDefault)
    const newPallette = generateInitialOptions(pallette)
    setPlainPallette(newPallette)
  }, [gridMap])

  const [isWinner, setIsWinner] = useState(false)
  useEffect(() => {
    setIsWinner(checkWinnerCondition({ boardState }))
  }, [boardState])

  const checkWinnerCondition = useMemo(() => generateCheckWinner(levelInfo), [levelInfo])

  function changeColor() {
    const newColor = getBaseColor()
    setColorDefault(newColor)

    setPlainPallette(changeColorFromOptionsState(plainPallette, newColor))
    setBoardState(changeColorFromBoardState(boardState, newColor))
  }

  const [steps, setSteps] = useState(0)

  useEffect(() => {
    setSteps(steps + 1)
    setIsWinner(checkWinnerCondition({ boardState }))
  }, [boardState])

  return {
    gridMap,
    numColumn,
    numRow,
    plainPallette,
    setPlainPallette,
    changeColor,
    boardState,
    setBoardState,
    isWinner,
    steps,
  }
}

export function GamePage() {
  const { setNextLevel, setStep, level } = useGameState()
  const {
    gridMap,
    numColumn,
    numRow,
    changeColor,
    plainPallette,
    setPlainPallette,
    boardState,
    setBoardState,
    isWinner,
    steps,
  } = useGenerateLevel(level)

  const timerRef = useRef()

  useEffect(() => {
    if (isWinner) {
      setNextLevel(
        calculatePoints({
          level: 8,
          time: timerRef.current.getData(),
          steps,
        }),
      )
      setStep('started')
    }
  }, [isWinner])

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
      <button onClick={() => changeColor(boardState)}>Cambiar color</button>
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
