import { LevelStarts } from './LevelStarts'

import '../assets/levelItem.css'

export function LevelItem({ level = 1, points, canSelected = false, onClick = () => {}, ...attrs }) {
  const levelPass = points > 0

  const className = ['level-item animate', levelPass ? 'level-pass' : null, canSelected ? 'level-option' : null]
    .filter(a => Boolean(a))
    .join(' ')

  function checkOnClick() {
    if (canSelected) {
      return onClick()
    }
    return
  }

  return (
    <div
      onClick={checkOnClick}
      className={className}
      role={canSelected ? 'button' : null}
      tabIndex={canSelected ? 0 : null}
      {...attrs}
    >
      <LevelStarts points={points} />
      <div style={{ alignSelf: 'flex-end' }}>{level}</div>
    </div>
  )
}
