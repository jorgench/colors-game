import { render, screen } from '@testing-library/react'
import { describe, expect, test, vi } from 'vitest'
import { GameColor } from './GameColor'

describe('GameColor Component', () => {
  test('Renders correctly with the given props', () => {
    render(
      <GameColor id="test" color="#00e1ff" data={{ key: 'value' }}>
        Test Child
      </GameColor>,
    )

    const element = screen.getByText('Test Child')
    expect(element).toBeInTheDocument()
    expect(element).toHaveStyle('background-color: rgb(0, 225, 255)')
  })

  test('Applies draggable attributes and listeners', () => {
    vi.mock('@dnd-kit/core', () => ({
      useDraggable: vi.fn(() => ({
        attributes: { role: 'draggable' },
        listeners: { onPointerDown: vi.fn() },
        setNodeRef: vi.fn(),
        transform: { x: 0, y: 0 },
      })),
    }))

    render(
      <GameColor id="draggable" color="blue" data={{}}>
        Draggable Item
      </GameColor>,
    )
    const element = screen.getByText('Draggable Item')
    expect(element).toHaveAttribute('role', 'draggable')
  })
})
