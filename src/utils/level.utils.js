const levelConsts = {
  colorsIngrid: [4, 6, 10, 16, 22],
  distanceInHue: [20, 30, 40, 50, 60, 70],
  distanceMonochrome: [5, 4, 3, 2, 1],
}

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

export function generateField(steps) {
  const { path, savedPosition } = generatePath(steps)
  const x = calculateMax(path, 0)
  const y = calculateMax(path, 1)

  const numColumn = Math.abs(y.min - y.max) + 1
  const numRow = Math.abs(x.min - x.max) + 1

  const gridMap = []
  for (let row = x.min; row <= x.max; row++) {
    let currentRow = gridMap.length
    for (let column = y.min; column <= y.max; column++) {
      if (!gridMap[currentRow]) {
        gridMap[currentRow] = []
      }
      gridMap[currentRow].push(savedPosition[`${row},${column}`] ? [row, column] : false)
    }
  }

  return {
    numColumn,
    numRow,
    path,
    gridMap,
  }
}

export function calculatePoints({ level, time, steps }) {
  const levelStart = 1000
  const timePenalization = 10
  const movePenalization = 10
  const minMovements = 4
  const additionalMoves = steps - minMovements

  const points = levelStart / (1 + time / timePenalization) - additionalMoves * movePenalization
  return Math.ceil(points)
}
