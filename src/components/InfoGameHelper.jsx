import { useState } from 'react'
import { IconButton } from './IconButton'
import { InstructorModal } from './InstructionModal'

export function InfoGameHelper({ onChangeOpenState = () => {}, ...attrs }) {
  const [isOpenModal, setIsOpenModal] = useState(false)

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
      <IconButton icon="mynaui:info-circle-solid" onClick={openModal} {...attrs} />
      <InstructorModal isOpen={isOpenModal} onClose={closeModal} />
    </>
  )
}
