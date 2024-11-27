import { useState } from 'react'
import { IconButton } from '@/components/IconButton'
import { ConfigModal } from './ConfigModal'

export function ConfigGameHelper({ onChangeOpenState, ...props }) {
  const [isOpen, setOpen] = useState(false)

  function openModal() {
    setOpen(true)
    if (onChangeOpenState) {
      onChangeOpenState(true)
    }
  }

  function onClose() {
    setOpen(false)
    if (onChangeOpenState) {
      onChangeOpenState(false)
    }
  }

  return (
    <>
      <IconButton
        textTooltip="Configuración"
        icon="mynaui:cog-four-solid"
        className="game-page-settings-right rotate-hover"
        {...props}
        onClick={openModal}
      />
      <ConfigModal isOpen={isOpen} onClose={onClose} />
    </>
  )
}
