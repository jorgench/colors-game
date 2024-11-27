import { Icon } from '@iconify/react/dist/iconify.js'
import { autoPlacement, shift, useFloating, useFocus, useHover, useInteractions } from '@floating-ui/react'
import { useState } from 'react'

export function IconButton({ icon, textTooltip = '', onClick = () => {}, className = '', ...attr }) {
  const [isOpen, setIsOpen] = useState(false)
  const { refs, context, floatingStyles } = useFloating({
    strategy: 'fixed',
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [autoPlacement(), shift()],
  })
  const hover = useHover(context)
  const focus = useFocus(context)

  const { getReferenceProps, getFloatingProps } = useInteractions([hover, focus])

  return (
    <>
      <div
        role="button"
        ref={refs.setReference}
        className={['button-icon', className].join(' ')}
        tabIndex={0}
        onClick={onClick}
        {...attr}
        {...getReferenceProps}
      >
        <Icon icon={icon} />
      </div>
      {isOpen && textTooltip && (
        <div className="tooltip" ref={refs.setFloating} {...getFloatingProps()} style={floatingStyles}>
          {textTooltip}
        </div>
      )}
    </>
  )
}
