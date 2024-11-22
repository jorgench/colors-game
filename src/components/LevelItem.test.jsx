import { LevelItem } from './LevelItem'
import { act } from '@testing-library/react'
import { render, screen, fireEvent } from '@testing-library/react'
import { vi, test, describe, expect } from 'vitest'

vi.mock('@iconify/react', () => ({
  Icon: ({ icon }) => <span data-testid="icon">{icon}</span>, // Mock del Icon para simplificar
}))

describe('LevelItem Component', () => {
  test('when is created should by render correctly with default props', () => {
    render(<LevelItem points={4} />)
    expect(screen.getByText('1')).toBeInTheDocument()
  })

  test('when pass a level prop should be render the level text', () => {
    render(<LevelItem level={2} points={2} />)
    expect(screen.getByText('2')).toBeInTheDocument()
  })

  test('when receive prop points > 0 should applies "level-pass" class', () => {
    render(<LevelItem points={10} canSelected={true} />)
    const container = screen.getByRole('button', { hidden: true })
    expect(container).toHaveClass('level-pass')
  })

  test('when receive prop points <= 0 should does not apply "level-pass" class', () => {
    render(<LevelItem points={0} canSelected={true} />)
    const container = screen.getByRole('button', { hidden: true })
    expect(container).not.toHaveClass('level-pass')
  })

  test('when canSelected prop is true and user click should by calls onClick function', () => {
    const handleClick = vi.fn()
    render(<LevelItem points={10} canSelected onClick={handleClick} />)
    const container = screen.getByRole('button')

    act(() => {
      fireEvent.click(container)
    })

    expect(handleClick).toHaveBeenCalled()
  })

  test('when canSelected prop is false and user click should doest call onClick function', () => {
    const handleClick = vi.fn()
    render(<LevelItem points={10} canSelected={false} onClick={handleClick} />)
    const container = screen.getByText('1')

    act(() => {
      fireEvent.click(container)
    })
    expect(handleClick).not.toHaveBeenCalled()
  })
})
