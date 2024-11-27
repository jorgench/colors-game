import { useState } from 'react'
import { IconButton } from './IconButton'
import { InstructorModal } from './InstructionModal'

export function InfoGameHelper({ initOpenModal = false, onChangeOpenState = () => {}, ...attrs }) {
  const [isOpenModal, setIsOpenModal] = useState(initOpenModal)

  function closeModal() {
    setIsOpenModal(false)
    onChangeOpenState(false)
  }

  function openModal() {
    setIsOpenModal(true)
    onChangeOpenState(true)
  }

  return (
    <>
      <IconButton textTooltip="Ayuda" icon="mynaui:info-circle-solid" onClick={openModal} {...attrs} />
      <InstructorModal isOpen={isOpenModal} onClose={closeModal} />
    </>
  )
}
