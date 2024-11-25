import { render, screen } from '@testing-library/react'
import { test } from 'vitest'
import { describe } from 'vitest'
import { HeaderPage } from './HeaderPage'
import { expect } from 'vitest'
import { vi } from 'vitest'

vi.mock('./LogoGame', () => ({
  LogoGame: () => <div data-testid="logo-game" />,
}))

vi.mock('./ThemeColorSwitch', () => ({
  ThemeColorSwitch: () => <div data-testid="theme-color-switch" />,
}))

describe('HeaderPage component', () => {
  test('renders HeaderPage with correct structure and classes', () => {
    render(<HeaderPage />)

    const header = screen.getByRole('banner')
    expect(header).toBeInTheDocument()
    expect(header).toHaveClass('header-page animate')
  })

  test('renders LogoGame and ThemeColorSwitch components', () => {
    render(<HeaderPage />)

    expect(screen.getByTestId('logo-game')).toBeInTheDocument()
    expect(screen.getByTestId('theme-color-switch')).toBeInTheDocument()
  })
})
