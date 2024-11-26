import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'

export function TemplateModal({ children, title = '', footer, isOpen = false, onClose }) {
  return (
    <Dialog open={isOpen} as="div" className="modal-root" onClose={() => onClose()}>
      <div className="modal-background">
        <div className="modal-center">
          <DialogPanel transition className="modal-block">
            {title && (
              <DialogTitle as="h3" className="text-center">
                {title}
              </DialogTitle>
            )}
            {children}
            {footer && <div className="modal-options">{footer}</div>}
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}
