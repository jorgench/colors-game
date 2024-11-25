import { expect } from 'vitest'
import { test } from 'vitest'
import { describe } from 'vitest'
import { TimerInLevel } from './TimerInLevel'
import { vi } from 'vitest'
import { act, screen, render } from '@testing-library/react'
import { beforeEach } from 'vitest'
import { afterEach } from 'vitest'
import { createRef } from 'react'

describe('TimerInLevel Component', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })
  afterEach(() => {
    vi.restoreAllMocks()
  })

  test('should render correctly with initial time set to 00:00', () => {
    render(<TimerInLevel />)
    expect(screen.getByText('00:00')).toBeInTheDocument()
  })

  test('when isActive is true should increment time every second', () => {
    render(<TimerInLevel isActive={true} />)
    act(() => {
      vi.advanceTimersByTime(3000)
    })
    expect(screen.getByText('00:03')).toBeInTheDocument()
  })

  test('when isActive is false should stop incrementing time', () => {
    const { rerender } = render(<TimerInLevel isActive={true} />)
    act(() => {
      vi.advanceTimersByTime(2000)
    })
    rerender(<TimerInLevel isActive={false} />)
    act(() => {
      vi.advanceTimersByTime(2000)
    })
    expect(screen.getByText('00:02')).toBeInTheDocument()
  })

  test('should correctly format time into MM:SS', () => {
    render(<TimerInLevel isActive={true} />)
    act(() => {
      vi.advanceTimersByTime(65000) // 65 segundos = 1:05
    })

    expect(screen.getByText('01:05')).toBeInTheDocument()
  })

  test('should expose getData method via ref', () => {
    const ref = createRef()
    render(<TimerInLevel isActive={false} ref={ref} />)

    act(() => {
      vi.advanceTimersByTime(5000) // Incrementa 5 segundos
    })

    expect(ref.current.getData()).toBe(0) // getData debería retornar 0 inicialmente
  })

  test('should not increment time when isActive is false initially', () => {
    render(<TimerInLevel isActive={false} />)
    act(() => {
      vi.advanceTimersByTime(2000)
    })
    expect(screen.getByText('00:00')).toBeInTheDocument()
  })

  /*test('should clear interval on component unmount', () => {
    const { unmount } = render(<TimerInLevel isActive={true} />)

    act(() => {
      vi.advanceTimersByTime(2000)
    })

    unmount()

    act(() => {
      vi.advanceTimersByTime(2000)
    })

    expect(screen.queryByText('00:02')).not.toBeInTheDocument()
  })*/
})
