export function LevelItem({ level = 1, onClick = () => [] }) {
  return (
    <div onClick={onClick}>
      <div>⭐⭐⭐</div>
      <div>{level}</div>
    </div>
  )
}
