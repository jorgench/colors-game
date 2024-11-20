import { Icon } from '@iconify/react/dist/iconify.js'

export function IconButton({ icon, onClick = () => {}, className = '', ...attr }) {
  return (
    <div role="button" className={['button-icon', className].join(' ')} tabIndex={0} onClick={onClick} {...attr}>
      <Icon icon={icon} />
    </div>
  )
}
