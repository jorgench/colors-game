import { render, screen } from '@testing-library/react'
import { test } from 'vitest'
import { describe, vi } from 'vitest'
import { GameBox } from './GameBox'
import { expect } from 'vitest'
import { useDroppable } from '@dnd-kit/core'

vi.mock('@dnd-kit/core', () => ({
  useDroppable: vi.fn(() => ({
    isOver: false,
    setNodeRef: vi.fn(),
  })),
}))

describe('GameBox Component', () => {
  test('renders GameBox with children and default styles', () => {
    render(
      <GameBox id="test-box" style={{ backgroundColor: 'red' }}>
        <span>Child Element</span>
      </GameBox>,
    )

    const box = screen.getByText('Child Element').parentElement
    expect(box).toBeInTheDocument()
    expect(box).toHaveClass('item-grid game-box')
  })

  test('applies outline style when isOver is true', () => {
    // Simula isOver como verdadero
    useDroppable.mockReturnValue({
      isOver: true,
      setNodeRef: vi.fn(),
    })

    render(<GameBox id="test-box" data-testid="test-box" />)

    const box = screen.getByTestId('test-box')
    expect(box).toHaveStyle({ outline: '1px solid var(--default-color)' })
  })

  test('sets ref using setNodeRef', () => {
    const setNodeRefMock = vi.fn()
    useDroppable.mockReturnValue({
      isOver: false,
      setNodeRef: setNodeRefMock,
    })

    render(<GameBox id="test-box" />)

    expect(setNodeRefMock).toHaveBeenCalled()
  })

  test('passes data to useDroppable hook', () => {
    const mockData = { type: 'box', value: 42 }

    render(<GameBox id="test-box" data={mockData} />)

    expect(useDroppable).toHaveBeenCalledWith(expect.objectContaining({ id: 'test-box', data: mockData }))
  })
})
