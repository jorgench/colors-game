function generatePath(spaces) {
  const savedPosition = {}
  const directions = [
    [1, 0], // derecha
    [-1, 0], // izquierda
    [0, 1], // arriba
    [0, -1], // abajo
  ]

  const path = [[0, 0]]
  savedPosition[`0,0`] = true

  while (path.length < spaces) {
    const [x, y] = path[path.length - 1]

    // Obtenemos una dirección aleatoria
    const [dx, dy] = directions[Math.floor(Math.random() * directions.length)]
    const newX = x + dx
    const newY = y + dy
    const newPoint = `${newX},${newY}`

    // Verificamos que el nuevo punto no haya sido visitado
    if (!savedPosition[newPoint]) {
      path.push([newX, newY])
      savedPosition[newPoint] = true
    }
  }

  return {
    path,
    savedPosition,
  }
}

function calculateMax(coords, xy = 0) {
  return coords.reduce(
    (prev, cur) => {
      prev.min = prev.min < cur[xy] ? prev.min : cur[xy]
      prev.max = prev.max > cur[xy] ? prev.max : cur[xy]
      return prev
    },
    { min: 0, max: 0 },
  )
}

export function generateField({ dots }) {
  const { path, savedPosition } = generatePath(dots)
  const x = calculateMax(path, 0)
  const y = calculateMax(path, 1)

  const numColumn = Math.abs(y.min - y.max) + 1
  const numRow = Math.abs(x.min - x.max) + 1

  const gridMap = []

  let minX = null,
    maxX = null,
    minY = null,
    maxY = null

  let rowCount = 0
  for (let row = x.min; row <= x.max; row++) {
    let currentRow = gridMap.length
    let columnCount = 0
    for (let column = y.min; column <= y.max; column++) {
      if (!gridMap[currentRow]) {
        gridMap[currentRow] = []
      }

      const itemSaved = savedPosition[`${row},${column}`]

      if (itemSaved) {
        minX ??= rowCount
        maxX = rowCount
        minY ??= columnCount
        maxY = columnCount
      }
      gridMap[currentRow].push(itemSaved ? [row, column] : false)

      columnCount++
    }
    rowCount++
  }

  return {
    numColumn,
    numRow,
    path,
    gridMap,
    max: {
      minX,
      minY,
      maxX,
      maxY,
    },
  }
}

/**
 * @param {{level: import("./level").Level, }} param0
 * @returns
 */
export function generateCalculatePoints({ level }) {
  const { maxPoints, minMovements, timePenalizationFactor, movePenalizationFactor } = level

  return function calculatePoints({ time, steps }) {
    const levelStart = maxPoints
    const additionalMoves = steps - minMovements

    const points = levelStart / (1 + time / timePenalizationFactor) - additionalMoves * movePenalizationFactor
    return Math.ceil(points)
  }
}

const levelConst = {
  colorsIngrid: [5, 6, 8, 10, 12, 14, 16],
  distanceInHue: [20, 30, 40, 50, 60, 70],
  distanceMonochrome: [5, 4, 3, 2, 1],
}

/**
 * @param {number} level
 * @returns {Level}
 */
export function generateLevel(level) {
  const separateBlock = 15
  const indBlock = Math.floor((level - 1) / separateBlock) // Nivel 1 comienza en el bloque 0
  const indInside = (level - 1) % separateBlock

  // Configurar una base de dots para los primeros niveles
  const initialDots = levelConst.colorsIngrid[0]
  let dotsInLevel

  if (level <= separateBlock) {
    dotsInLevel = initialDots // Usar valor base de dots para niveles hasta `separateBlock`
  } else {
    // Asegurar que `indBlock` y `indInside` no excedan los límites
    const startIndex = Math.max(0, indBlock - 2)
    const colorOptions = levelConst.colorsIngrid.slice(startIndex, indBlock + 1)

    dotsInLevel = colorOptions[Math.min(indInside, colorOptions.length - 1)] || initialDots
  }

  // Definir movimientos mínimos y puntos máximos
  const minMovements = Math.max(1, dotsInLevel - 2) // Evitar movimientos negativos
  const maxPoints = Math.min(10_000, 4000 + level * 20) // Limitar puntos máximos

  // Definir penalizaciones en función del nivel
  const movePenalizationFactor = 1 + Math.min(50, level * 0.05) // Límite máximo razonable
  const timePenalizationFactor = 1 + Math.min(30, level * 0.03)

  return {
    name: level,
    dots: dotsInLevel,
    minMovements,
    maxPoints,
    movePenalizationFactor,
    timePenalizationFactor,
  }
}

export function calculatePoints({ level, time, steps }) {
  const levelStart = level.maxPoints
  const timePenalization = level.timePenalizationFactor
  const movePenalization = level.movePenalizationFactor
  const minMovements = level.minMovements
  const additionalMoves = steps - minMovements

  const points = levelStart / (1 + time / timePenalization) - additionalMoves * movePenalization
  return Math.max(10, Math.ceil(points))
}

export function generateInitialOptions(pallette, { minX, minY, maxX, maxY }) {
  let firstColor = null
  let lastColor = null

  const newPallette = pallette
    .reduce((prev, row, x) => {
      if (!row) return prev
      row.forEach((col, y) => {
        if (col) {
          if (x === minX && y == minY) {
            firstColor = { color: col, row: x, col: y }
          } else if (x === maxX && y === maxY) {
            lastColor = { color: col, row: x, col: y }
          } else {
            prev.push({ color: col, row: x, col: y })
          }
        }
      })
      return prev
    }, [])
    .sort(() => Math.random() - 0.5)

  return { newPallette, firstColor, lastColor }
}

export function generateCheckWinner(level) {
  return ({ boardState }) => {
    const keys = Object.keys(boardState)
    const winner = keys.every(key => {
      const value = boardState[key]
      return value && key === `${value.row},${value.col}`
    })
    return winner && keys.length === level.dots
  }
}

export function moveItemInLevel({ boardState, optionsState, placeData, colorData }) {
  if (placeData.kind === 'option') {
    return movePositionInOptions({ boardState, optionsState, placeData, colorData })
  } else {
    return movePositionInBoard({ boardState, optionsState, placeData, colorData })
  }
}

function movePositionInOptions({ boardState, optionsState, placeData, colorData }) {
  if (optionsState[placeData.optionPlace]) {
    return
  }

  optionsState[placeData.optionPlace] = colorData

  if (colorData?.place?.kind === 'option') {
    optionsState[colorData.place.key] = null
  } else {
    boardState[`${colorData.place.key}`] = null
  }

  return {
    optionsState,
    boardState,
  }
}

function movePositionInBoard({ boardState, optionsState, placeData, colorData }) {
  if (boardState[`${placeData.row},${placeData.col}`]) {
    return
  }

  boardState[`${placeData.row},${placeData.col}`] = { ...colorData }
  if (colorData?.place?.kind === 'board') {
    boardState[`${colorData.place.key}`] = null
  } else {
    if (colorData?.place?.kind !== 'board') {
      const ind = optionsState.findIndex(item => {
        return item?.color === colorData.color
      })
      optionsState[ind] = null
    }
  }

  return {
    optionsState,
    boardState,
  }
}
