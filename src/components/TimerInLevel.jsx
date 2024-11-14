import { useCallback } from 'react'
import { useState, useEffect } from 'react'

export function TimerInLevel({ isActive = true }) {
  const [seconds, setSeconds] = useState(0)

  const formatSeconds = useCallback(s => new Date(s * 1000).toISOString().substring(14, 19))

  useEffect(() => {
    let interval
    if (isActive) {
      interval = setInterval(() => {
        setSeconds(prevTime => prevTime + 1)
      }, 1000)
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval)
    }
    return () => clearInterval(interval)
  }, [isActive])

  return <div>{formatSeconds(seconds)}</div>
}
