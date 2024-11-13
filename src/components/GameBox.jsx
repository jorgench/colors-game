import { useDroppable } from '@dnd-kit/core'

export function GameBox({ id, children, style }) {
  const { isOver, setNodeRef } = useDroppable({
    id: id,
  })
  const innerStyle = {
    opacity: isOver ? 1 : 0.5,
  }

  return (
    <div ref={setNodeRef} className="item-grid" style={{ ...innerStyle, ...style }}>
      {children}
    </div>
  )
}
