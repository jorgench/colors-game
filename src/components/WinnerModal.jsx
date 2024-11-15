import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'

import '../assets/modal.css'
import { LevelStarts } from './LevelStarts'

export function WinnerModal({ isOpen = false, points, onCallback = () => {} }) {
  return (
    <Dialog open={isOpen} as="div" className="modal-root" onClose={() => onCallback()}>
      <div className="modal-background">
        <div className="modal-center">
          <DialogPanel transition className="modal-block">
            <DialogTitle as="h3" className="text-center">
              ¡Ganaste!
            </DialogTitle>
            <div style={{ fontSize: '2.5rem' }}>
              <LevelStarts points={points} animated={true} />
              {points} pts
            </div>
            <div>
              <Button onClick={() => onCallback()}>Regresar</Button>
              <Button onClick={() => onCallback()}>Siguiente Nivel</Button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}
