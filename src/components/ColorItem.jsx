export function ColorItem({ color = '#fff', showColor = false, style }) {
  return (
    <div
      style={{
        borderRadius: '1rem',
        width: '5rem',
        height: '5rem',
        backgroundColor: color,
        textShadow: '1px 1px 2px #000',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        ...style,
      }}
    >
      {showColor ? color : ''}
    </div>
  )
}
