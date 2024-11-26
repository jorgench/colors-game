import { Button } from '@headlessui/react'
import { useGameState } from '@/store/game.state'

import '../assets/modal.css'
import { useEffect, useRef, useState } from 'react'
import { TemplateModal } from './TemplateModal'

export function FormNameModal({ isOpen = false, onClose = () => {} }) {
  const { setPlayer } = useGameState()
  const [hasError, setHasError] = useState(false)
  const nameRef = useRef(null)

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        if (nameRef) {
          nameRef?.current?.focus()
        }
      })
    }
  }, [isOpen])

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

  return (
    <TemplateModal
      title="Ingresa tu nombre"
      isOpen={isOpen}
      onClose={onClose}
      footer={<Button onClick={setName}>Aceptar</Button>}
    >
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
    </TemplateModal>
  )
}
