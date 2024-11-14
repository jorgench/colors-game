import { useImperativeHandle } from 'react'
import { forwardRef } from 'react'
import { useCallback } from 'react'
import { useState, useEffect } from 'react'

export const TimerInLevel = forwardRef(function TimerInLevel({ isActive = true }, ref) {
  const [seconds, setSeconds] = useState(0)

  useImperativeHandle(ref, () => ({
    getData: () => seconds,
  }))

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
})
