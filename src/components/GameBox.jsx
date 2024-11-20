import { useDroppable } from '@dnd-kit/core'

export function GameBox({ id, children, style, data }) {
  const { isOver, setNodeRef } = useDroppable({
    id: id,
    data,
  })
  const innerStyle = {
    outline: isOver ? '1px solid var(--default-color)' : 'none',
  }

  return (
    <div ref={setNodeRef} className="item-grid game-box" style={{ ...innerStyle, ...style }}>
      {children}
    </div>
  )
}
