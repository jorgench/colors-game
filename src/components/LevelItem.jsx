import { LevelStarts } from './LevelStarts'

import '../assets/levelItem.css'

export function LevelItem({ level = 1, points, canSelected = false, onClick = () => [] }) {
  const levelPass = points > 0

  const className = ['level-item', levelPass ? 'level-pass' : null, canSelected ? 'level-option' : null]
    .filter(a => Boolean(a))
    .join(' ')

  return (
    <div onClick={onClick} className={className} role={canSelected ? 'button' : null} tabIndex={canSelected ? 0 : null}>
      <LevelStarts points={points} />
      <div style={{ alignSelf: 'flex-end' }}>{level}</div>
    </div>
  )
}
