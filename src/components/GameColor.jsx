import { useDraggable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'

export function GameColor({ id, children, color, data }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
    data,
  })
  const style = {
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
    // Outputs `translate3d(x, y, 0)`
    transform: CSS.Translate.toString(transform),
  }

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {children}
    </div>
  )
}
