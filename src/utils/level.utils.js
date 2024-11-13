const levelConsts = {
  colorsIngrid: [4, 6, 10, 16, 22],
  distanceInHue: [20, 30, 40, 50, 60, 70],
  distanceMonochrome: [5, 4, 3, 2, 1],
}
/*
export function generatePath(fields) {
  const coords = {}
  const savedPosition = {}

  function getNewPosition(x, y) {
    const flow = Math.floor(Math.random() * 2)
    const dir = Math.floor(Math.random() * 2)

    const apply = flow > 0 ? -1 : 1
    const newPosition = dir === 0 ? [x + apply, y] : [x, y + apply]

    return savedPosition[String(newPosition)] ? getNewPosition(x, y) : newPosition
  }

  for (let a = 0; a < fields; a++) {
    if (a === 0) {
      coords[a] = [a, a]
      savedPosition[`${a}, ${a}`] = true
    } else {
      const [lastX, lastY] = coords[a - 1] //obtener Posición anterior
      const [newX, newY] = getNewPosition(lastX, lastY)
      coords[a] = [newX, newY]
      savedPosition[`${newX}, ${newY}`] = true
    }
  }

  return {
    path: Object.values(coords),
    savedPosition,
  }
}

function addBlock(point, lastDir) {
  let possibleDir = Math.floor(Math.random() * 4)
  const d = {
    0: point => [point[0] - 1, point[1]],
    1: point => [point[0], point[1] + 1],
    2: point => [point[0] + 1, point[1]],
    3: point => [point[0], point[1] - 1],
  }

  return { dir: d[possibleDir](point), lastDir: possibleDir }
}*/

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

/*function generatePath(dots, possiblePath = 4) {
  const coords = {}
  const savedPosition = {}

  const possibleStart = Math.floor(Math.random() * 4)

  if (possiblePath === 4) {
    coords[0] = [0, 0]
    savedPosition['0, 0'] = true
  }

  let lastDirection = null
  for (let i = 1; i < dots; i++) {
    const { dir, lastDir } = addBlock(coords[i - 1], lastDirection)
    lastDirection = lastDir
    coords[i] = dir
    savedPosition[`${coords[i][0]}, ${coords[i][1]}`] = true
  }

  return {
    path: coords,
    savedPosition,
  }
}*/

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
