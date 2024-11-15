import { Icon } from '@iconify/react'

export function LevelStarts({ points, animated = false }) {
  return (
    <div>
      {new Array(3).fill().map((_, i) => {
        return points > i * 333 ? <Icon key={i} icon="mynaui:star-solid" /> : <Icon key={i} icon="mynaui:star" />
      })}
    </div>
  )
}
