import { render, screen } from '@testing-library/react'
import { expect } from 'vitest'
import { test } from 'vitest'
import { vi } from 'vitest'
import { describe } from 'vitest'
import { LevelStarts } from './LevelStarts'

vi.mock('@iconify/react', () => ({
  Icon: ({ icon }) => <span data-testid={icon} />,
}))

describe('LevelStart Component', () => {
  test('renders the correct number of solid and empty stars based on points', () => {
    render(<LevelStarts points={500} />)

    expect(screen.getAllByTestId('mynaui:star-solid')).toHaveLength(2)
    expect(screen.getAllByTestId('mynaui:star')).toHaveLength(1)
  })

  test('renders all empty stars when points is 0', () => {
    render(<LevelStarts points={0} />)
    expect(screen.getAllByTestId('mynaui:star')).toHaveLength(3)
    expect(screen.queryByTestId('mynaui:star-solid')).not.toBeInTheDocument()
  })

  test('renders all solid stars when points is 1000', () => {
    render(<LevelStarts points={1000} />)
    expect(screen.getAllByTestId('mynaui:star-solid')).toHaveLength(3)
    expect(screen.queryByTestId('mynaui:star')).not.toBeInTheDocument()
  })
})
