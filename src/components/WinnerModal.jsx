import { Button } from '@headlessui/react'

import '../assets/modal.css'
import { LevelStarts } from './LevelStarts'
import { TemplateModal } from './TemplateModal'

export function WinnerModal({ isOpen = false, points, onCallback = () => {}, onNextLevelPress = () => {} }) {
  return (
    <TemplateModal
      isOpen={isOpen}
      onClose={onCallback}
      title="¡Ganaste!"
      footer={
        <>
          <Button onClick={() => onCallback()}>Regresar</Button>
          <Button onClick={() => onNextLevelPress()}>Siguiente Nivel</Button>
        </>
      }
    >
      <div style={{ fontSize: '2.5rem' }} className="center content">
        <LevelStarts points={points} animated={true} />
        {points} pts
      </div>
    </TemplateModal>
  )
}
