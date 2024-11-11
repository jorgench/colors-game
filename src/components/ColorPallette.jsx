import { useState } from 'react'
import { generatePallet } from '../utils/colors.utils'
import { ColorItem } from './ColorItem'
import { useEffect } from 'react'

export function ColorPallete({ rows = 2, columns = 9 }) {
  //const colorsPalette = getColorsIngrid(rows, columns)

  const [pallette, setPallette] = useState([])

  useEffect(() => {
    getRandomPallete()
  }, [rows, columns])

  function getRandomPallete() {
    setPallette(generatePallet(rows, columns))
  }

  return (
    <div>
      Palleta {rows} {columns}
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${columns}, auto)`, gap: '0.5em' }}>
        {pallette.map((row, r) => {
          return row.map((color, y) => {
            return <ColorItem key={`other-${r}-${y}`} color={color} />
          })
        })}
      </div>
      <br />
      <button onClick={getRandomPallete}>Volver a ejecutar</button>
    </div>
  )
}
