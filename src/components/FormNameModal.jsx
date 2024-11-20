import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useGameState } from '../store/game.state'

import '../assets/modal.css'
import { useRef } from 'react'
import { useState } from 'react'

export function FormNameModal({ isOpen = false, onClose = () => {} }) {
  const { setPlayer } = useGameState()
  const [hasError, setHasError] = useState(false)
  const nameRef = useRef(null)

  function setName() {
    const nameValue = nameRef?.current?.value

    if (!validateName(nameValue)) {
      setHasError(true)
      return
    }

    setPlayer(nameValue.trim())
  }

  function validateName(str) {
    return str && str.trim() !== ''
  }

  function checkNameValue() {
    const nameValue = nameRef?.current?.value
    if (!validateName(nameValue)) {
      setHasError(true)
      return
    }
  }

  console.log('re render')

  return (
    <Dialog open={isOpen} as="div" className="modal-root" onClose={() => onClose()}>
      <div className="modal-background">
        <div className="modal-center">
          <DialogPanel transition className="modal-block">
            <DialogTitle as="h3" className="text-center">
              Ingresa tu nombre
            </DialogTitle>
            <div className="center content">
              <input
                ref={nameRef}
                type="name"
                aria-label="ingresatu nombre"
                onFocus={() => setHasError(false)}
                onBlur={() => checkNameValue()}
              />
              {hasError ? <span className="text-xs text-error">El nombre es requerido</span> : null}
            </div>
            <div className="modal-options">
              <Button onClick={setName}>Aceptar</Button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}
