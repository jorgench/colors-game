import { useFloating, useFocus, useHover, useInteractions } from '@floating-ui/react'
import { cloneElement } from 'react'
import { Children } from 'react'
import { useState } from 'react'

export function Tooltip({ children, text = '' }) {
  const [isOpen, setIsOpen] = useState(false)
  const { refs, context, floatingStyles } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
  })
  const hover = useHover(context)
  const focus = useFocus(context)

  const { getReferenceProps, getFloatingProps } = useInteractions([hover, focus])

  return (
    <>
      {Children.map(children, child => {
        cloneElement(child, {
          ref: refs.setReference,
          ...getReferenceProps,
        })
      })}

      {children}
      {isOpen && (
        <div ref={refs.setFloating} {...getFloatingProps()} style={floatingStyles}>
          {text}
        </div>
      )}
    </>
  )
}
