import { useDraggable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'
import { Icon } from '@iconify/react/dist/iconify.js'

export function GameColor({ id, children, color, data, isInCorrectPlace = false }) {
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
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    boxSizing: 'border-box',
    padding: '0.5em',
    // Outputs `translate3d(x, y, 0)`
    transform: CSS.Translate.toString(transform),
  }

  return isInCorrectPlace ? (
    <div style={style}>
      {children}
      <div
        style={{
          background: 'rgba(0,0,0,0.5)',
          borderRadius: '50%',
          width: '1em',
          height: '1em',
          display: 'flex',
          color: 'var(--white-color)',
        }}
      >
        <Icon icon="mynaui:check" />
      </div>
    </div>
  ) : (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {children}
    </div>
  )
}
