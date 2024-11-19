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
import { WinnerModal } from '../components/WinnerModal'

import '../assets/gamePage.css'
import { Icon } from '@iconify/react/dist/iconify.js'

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
  const [points, setPoints] = useState(0)
  const [localLevel] = useState(level)

  useEffect(() => {
    if (isWinner) {
      const newPoints = calculatePoints({
        level,
        time: timerRef.current.getData(),
        steps,
      })
      setPoints(newPoints)
      setNextLevel(newPoints)
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

  function nextLevel() {
    setStep('started')
  }

  return (
    <main className="container game-page">
      <div className="game-page-header ">
        {/*Grid: {gridMap.length} {gridMap[0].length}*/}
        <TimerInLevel ref={timerRef} isActive={!isWinner} />
        <h4 className="title h4">Nivel {localLevel}</h4>
        <div style={{ fontSize: 'var(--size-m)' }}>
          <Icon icon="mynaui:logout" />
        </div>
      </div>

      <WinnerModal isOpen={isWinner} points={points} onCallback={nextLevel} />

      <section className="game-page-center">
        <DndContext onDragEnd={handleDragEnd}>
          <div
            className="game-page-board"
            style={{
              gridTemplateColumns: `repeat(${numColumn}, var(--size-box))`,
              gridTemplateRows: `repeat(${numRow}, var(--size-box))`,
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
                    <GameBoxInsideBoard key={`${x},${y}`} item={boardState[`${x},${y}`]} x={x} y={y} />
                  </GameBox>
                ) : (
                  <></>
                )
              })
            })}
          </div>
          <div className="game-page-options">
            {plainPallette.map((item, i) => {
              return (
                <GameBox id={`item-${i}`} key={`item-${i}`} data={{ optionPlace: i, kind: 'option' }}>
                  <GameBoxInsideOption key={i + 'option'} item={item} index={i} />
                </GameBox>
              )
            })}
          </div>
        </DndContext>
      </section>
      <div className="game-page-footer">
        <GameControls onChangeColor={() => changeColor(boardState)} />
        <div
          className="game-page-settings-right"
          style={{ fontSize: 'var(--size-m)' }}
          onClick={() => changeColor(boardState)}
        >
          <Icon icon="mynaui:cog-four-solid" />
        </div>
      </div>
    </main>
  )
}

function GameControls({ onChangeColor = () => {} }) {
  return (
    <div className="game-page-settings">
      <div onClick={() => onChangeColor()}>
        <Icon icon="mynaui:chevron-left" />
      </div>
      <div className="big-option" onClick={() => onChangeColor()}>
        <Icon icon="mynaui:refresh-alt" />
      </div>
      <div onClick={() => onChangeColor()}>
        <Icon icon="mynaui:chevron-right" />
      </div>
    </div>
  )
}

function GameBoxInsideBoard({ item, x, y }) {
  return item ? (
    <GameColor
      id={item.color}
      data={{ ...item, place: { kind: 'board', key: `${x},${y}` } }}
      color={item.color}
      isInCorrectPlace={item.col === y && item.row === x}
    />
  ) : null
}

function GameBoxInsideOption({ item, index }) {
  return item ? (
    <GameColor id={item.color} data={{ ...item, place: { kind: 'option', key: index } }} color={item.color} />
  ) : null
}
