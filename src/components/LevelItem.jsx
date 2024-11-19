import { LevelStarts } from './LevelStarts'

export function LevelItem({ level = 1, points, onClick = () => [] }) {
  const levelPass = points > 0

  const style = {
    width: '100%',
    height: '100%',
    borderRadius: '0.5em',
    boxSizing: 'borderBox',
    padding: '0.5em',
    background: levelPass ? 'var(--secondary-surface)' : 'transparent',
    color: levelPass ? 'var(--secondary-color)' : 'var(--default-color)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  }

  return (
    <div onClick={onClick} style={style}>
      <LevelStarts points={points} />
      <div style={{ alignSelf: 'flex-end' }}>{level}</div>
    </div>
  )
}
