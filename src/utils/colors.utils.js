import { random, converter, formatHex } from 'culori'

function adjustHue(val) {
  if (val < 0) val += Math.ceil(-val / 360) * 360
  return val % 360
}

function getMonochromePosition(baseColor, move) {
  let j = Math.abs(move) + 1
  if (move < 0) {
    return {
      l: baseColor.l + j * 5.75,
      c: baseColor.c + j * 10,
      h: adjustHue(baseColor.h),
      mode: 'lch',
    }
  } else {
    return {
      l: baseColor.l - j * 8.76,
      c: baseColor.c - j * 12,
      h: adjustHue(baseColor.h),
      mode: 'lch',
    }
  }
}

function generateMonochrome(baseColor, step) {
  const colorScale = []

  const medium = Math.floor(step / 2)
  for (let i = -medium; i < step - medium; i++) {
    let j = Math.abs(i) + 1
    if (i > 0) {
      colorScale.push({
        l: baseColor.l + j * 4.75,
        c: baseColor.c + j * 8,
        h: adjustHue(baseColor.h),
        mode: 'lch',
      })
    } else if (i < 0) {
      colorScale.push({
        l: baseColor.l - j * 4.76,
        c: baseColor.c - j * 10,
        h: adjustHue(baseColor.h),
        mode: 'lch',
      })
    } else {
      colorScale.push(baseColor)
    }
  }

  return colorScale.reverse()
}

/*function createScientificPalettes(baseColor) {
  const targetHueSteps = {
    analogous: [0, 30, 60],
    triadic: [0, 120, 240],
    tetradic: [0, 90, 180, 270],
    complementary: [0, 180],
    splitComplementary: [0, 150, 210],
  }

  const palettes = {}

  for (const type of Object.keys(targetHueSteps)) {
    palettes[type] = targetHueSteps[type].map(step => ({
      l: baseColor.l,
      c: baseColor.c,
      h: adjustHue(baseColor.h + step),
      mode: 'lch',
    }))
  }

  return palettes
}*/

function mapColor(n, start1, end1, start2, end2) {
  return ((n - start1) / (end1 - start1)) * (end2 - start2) + start2
}

function generateHue({ base, minLightness, maxLightness }) {
  return (move, steps) => {
    const hue = move > 0 ? adjustHue(base.h + steps * move) : adjustHue(base.h - steps * move)
    const lightness =
      move > 0 ? mapColor(move, 0, steps, base.l, maxLightness) : mapColor(move, 0, steps, base.l, minLightness)

    return {
      l: lightness,
      c: base.c,
      h: hue,
      mode: 'lch',
    }
  }
}

function createHueShiftPalette({ base, minLightness, maxLightness, hueStep, steps = 4 }) {
  const palette = [base]

  for (let i = 1; i < steps; i++) {
    const hueDark = adjustHue(base.h - hueStep * i)
    const hueLight = adjustHue(base.h + hueStep * i)
    const lightnessDark = mapColor(i, 0, steps, base.l, minLightness)
    const lightnessLight = mapColor(i, 0, steps, base.l, maxLightness)
    const chroma = base.c

    palette.push({
      l: lightnessDark,
      c: chroma,
      h: hueDark,
      mode: 'lch',
    })

    palette.unshift({
      l: lightnessLight,
      c: chroma,
      h: hueLight,
      mode: 'lch',
    })
  }

  return palette
}

function getHueColor(baseColor, position) {
  return generateHue({ base: baseColor, minLightness: 30, maxLightness: 90 })(position, 40)
}

const lchConvert = converter('lch')

function generateRowPallette(baseColor, columns) {
  const toFinal = createHueShiftPalette({
    base: baseColor,
    minLightness: 10,
    maxLightness: 90,
    hueStep: 20,
    steps: Math.ceil(columns / 2),
  })

  return toFinal
}

export function generatePallet(rows, columns) {
  const baseColor = lchConvert(random())
  const rowsPallette = generateMonochrome(baseColor, rows, 1)
  return rowsPallette.map(color => generateRowPallette(color, columns).map(color => formatHex(color)))
}

export function getBaseColor() {
  return lchConvert(random())
}

function getColorForThisPosition(baseColor, row, column) {
  if (row === 0 && column === 0) {
    return baseColor
  }

  return getMonochromePosition(getHueColor(baseColor, column), row)
}

export function changeColorFromBoardState(boardState, baseColor) {
  const newBoardState = { ...boardState }

  Object.keys(newBoardState).forEach(key => {
    if (!newBoardState[key]) return

    newBoardState[key] = {
      ...newBoardState[key],
      color: formatHex(getColorForThisPosition(baseColor, newBoardState[key].row, newBoardState[key].col)),
    }
  })

  return newBoardState
}

export function changeColorFromOptionsState(optionsState = [], baseColor) {
  return optionsState.map(option => {
    if (option) {
      return {
        ...option,
        color: formatHex(getColorForThisPosition(baseColor, option.row, option.col)),
      }
    }
    return null
  })
}

/**
 * @param {[]} gridMap
 * @param {{}} baseColor
 * @returns []
 */
export function createPallette(gridMap, baseColor) {
  return gridMap.map(row => {
    return row.map(position => {
      return position ? formatHex(getColorForThisPosition(baseColor, position[0], position[1])) : false
    })
  })
}

export function createAndEnsurePalletteColor(gridMap) {
  let hasRepeatColor = true
  let finalPallette = []

  while (hasRepeatColor) {
    const newColor = getBaseColor()
    finalPallette = createPallette(gridMap, newColor)

    let map = new Map()
    const hasElement = finalPallette
      .flat()
      .filter(c => Boolean(c))
      .find(color => {
        if (map.get(color)) {
          console.log(color, map)
          return true
        }
        map.set(color, true)
        return false
      })

    hasRepeatColor = !!hasElement
  }

  return finalPallette
}

export function getAndEnsurePalletteColor(options, board) {
  let newOptions = null
  let newBoardState = null

  let isSame = true

  while (isSame) {
    let newColor = getBaseColor()

    newOptions = changeColorFromOptionsState(options, newColor)
    newBoardState = changeColorFromBoardState(board, newColor)

    const allOptions = [...newOptions, ...Object.values(newBoardState)].filter(i => Boolean(i))
    let map = new Map()

    const t = allOptions.find(option => {
      if (map.get(option.color)) {
        return true
      }
      map.set(option.color, true)
      return false
    })

    isSame = !!t
  }
  return { options: newOptions, board: newBoardState }
}

// https://tympanus.net/codrops/2021/12/07/coloring-with-code-a-programmatic-approach-to-design/
