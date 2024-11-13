export function ColorItem({ color = '#fff', showColor = false, style }) {
  return (
    <div
      style={{
        borderBottomLeftRadius: '0.5em 1em',
        borderBottomRightRadius: '0.5em 1em',
        borderTopLeftRadius: '0.5em 1em',
        borderTopRightRadius: '0.5em 1em',
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
