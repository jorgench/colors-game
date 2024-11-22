import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi, describe, test, expect } from 'vitest'
import { IconButton } from './IconButton'

vi.mock('@iconify/react', () => ({
  Icon: ({ icon }) => <span data-testid="icon">{icon}</span>, // Mock del Icon para simplificar
}))

describe('IconButton Component', () => {
  test('renders correctly with an icon', () => {
    render(<IconButton icon="test-icon" />)

    // Asegúrate de que el icono se renderiza correctamente
    const icon = screen.getByTestId('icon')
    expect(icon).toBeInTheDocument()
    expect(icon).toHaveTextContent('test-icon') // Confirma que muestra el ícono
  })

  test('calls onClick handler when clicked', async () => {
    const mockOnClick = vi.fn()
    render(<IconButton icon="test-icon" onClick={mockOnClick} />)

    const button = screen.getByRole('button')
    await userEvent.click(button) // Simula un clic con userEvent

    expect(mockOnClick).toHaveBeenCalledTimes(1) // Verifica que el evento fue llamado
  })

  test('applies custom class names', () => {
    render(<IconButton icon="test-icon" className="custom-class" />)

    const button = screen.getByRole('button')
    expect(button).toHaveClass('button-icon custom-class') // Verifica que tenga las clases correctas
  })

  test('supports custom attributes', () => {
    render(<IconButton icon="test-icon" data-testid="custom-button" aria-label="Custom Button" />)

    const button = screen.getByTestId('custom-button')
    expect(button).toBeInTheDocument()
    expect(button).toHaveAttribute('aria-label', 'Custom Button') // Verifica que los atributos personalizados se apliquen
  })

  test('is focusable with tabIndex', () => {
    render(<IconButton icon="test-icon" />)

    const button = screen.getByRole('button')
    button.focus() // Intenta enfocar el botón

    expect(button).toHaveFocus() // Verifica que sea enfocable
  })
})
