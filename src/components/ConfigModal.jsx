import { TemplateModal } from './TemplateModal'
import { ThemeColorSwitch } from './ThemeColorSwitch'

export function ConfigModal({ isOpen = false, onClose = () => {} }) {
  return (
    <TemplateModal isOpen={isOpen} onClose={onClose} title="Configuraciones">
      <div className="content">
        <label>Cambiar Tema</label>
        <ThemeColorSwitch />
      </div>
    </TemplateModal>
  )
}
