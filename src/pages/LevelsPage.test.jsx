import { vi } from 'vitest'
import { describe } from 'vitest'
import { useGameState } from '../store/game.state'
import { test } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { LevelsPage } from './LevelsPage'
import { expect } from 'vitest'
import userEvent from '@testing-library/user-event'

vi.mock('../store/game.state', () => ({
  useGameState: vi.fn(),
}))

vi.mock('../components/LevelItem', () => ({
  LevelItem: ({ level, points, canSelected, onClick }) => (
    <div data-testid={`level-item-${level}`} data-points={points} data-canselected={canSelected} onClick={onClick}>
      Level {level}
    </div>
  ),
}))

vi.mock('../layout/PageLayout', () => ({
  PageLayout: ({ children }) => <section>{children}</section>,
}))

describe('Page Level', () => {
  test('renders LevelsPage with levels and pagination', () => {
    useGameState.mockReturnValue({
      setLevel: vi.fn(),
      pointsHistory: Array(10).fill({ points: 100 }), // Simula 10 niveles con puntos
      level: 0,
    })

    render(<LevelsPage />)

    expect(screen.getByText(/Niveles 1-25/i)).toBeInTheDocument()
    expect(screen.getAllByTestId(/^level-item-/)).toHaveLength(25)
    expect(screen.getByText('Anterior')).toBeInTheDocument()
    expect(screen.getByText('Siguiente')).toBeInTheDocument()
  })

  test('navigates between pages using pagination buttons', async () => {
    useGameState.mockReturnValue({
      setLevel: vi.fn(),
      pointsHistory: Array(50).fill({ points: 100 }),
      level: 0,
    })

    render(<LevelsPage />)

    expect(screen.getByText(/Niveles 1-25/i)).toBeInTheDocument()

    await userEvent.click(screen.getByRole('button', { name: /Siguiente/i }))
    expect(screen.getByText(/Niveles 26-50/i)).toBeInTheDocument()

    await userEvent.click(screen.getByRole('button', { name: /Anterior/i }))
    expect(screen.getByText(/Niveles 1-25/i)).toBeInTheDocument()
  })

  test('calls setLevel when a level is selected', () => {
    const mockSetLevel = vi.fn()
    useGameState.mockReturnValue({
      setLevel: mockSetLevel,
      pointsHistory: Array(25).fill({ points: 100 }),
      level: 0,
    })

    render(<LevelsPage />)

    fireEvent.click(screen.getByTestId('level-item-1'))
    expect(mockSetLevel).toHaveBeenCalledWith(1)
  })

  test('renders levels with correct selection status', () => {
    useGameState.mockReturnValue({
      setLevel: vi.fn(),
      pointsHistory: [
        { points: 100 }, // Seleccionable
        { points: 0 }, // No seleccionable
      ],
      level: 0,
    })

    render(<LevelsPage />)

    const level1 = screen.getByTestId('level-item-1')
    const level2 = screen.getByTestId('level-item-2')

    expect(level1).toHaveAttribute('data-canselected', 'true')

    expect(level2).toHaveAttribute('data-canselected', 'false')
  })
})
