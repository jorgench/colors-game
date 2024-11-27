import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi, describe, test, expect } from 'vitest'
import { IconButton } from './IconButton'
import { act } from '@testing-library/react'

vi.mock('@iconify/react', () => ({
  Icon: ({ icon }) => <span data-testid="icon">{icon}</span>, // Mock del Icon para simplificar
}))

const waitForPosition = () => act(async () => {})

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

  test('displays tooltip on hover or focus', async () => {
    render(
      <div>
        <IconButton icon="test-icon" textTooltip="Tooltip text" />
      </div>,
    )

    const button = screen.getByRole('button')

    await userEvent.hover(button)
    await waitForPosition()
    expect(screen.getByText('Tooltip text')).toBeInTheDocument()

    await userEvent.unhover(button)
    await waitForPosition()
    expect(screen.queryByText('Tooltip text')).not.toBeInTheDocument()

    //button.focus()
    //expect(screen.getByText('Tooltip text')).toBeInTheDocument()
  })

  test('does not render tooltip if textTooltip is not provided', async () => {
    render(<IconButton icon="test-icon" />)

    const button = screen.getByRole('button')
    await userEvent.hover(button)
    await waitForPosition()
    expect(screen.queryByText('Tooltip text')).not.toBeInTheDocument()
  })

  test('calls onClick handler on click', async () => {
    const mockOnClick = vi.fn()
    render(<IconButton icon="test-icon" textTooltip="Tooltip text" onClick={mockOnClick} />)

    const button = screen.getByRole('button')

    await userEvent.click(button)
    await waitForPosition()
    expect(mockOnClick).toHaveBeenCalledTimes(1)

    /*or Enter key press
    button.focus()
    await userEvent.keyboard('{Enter}')
    await waitForPosition()
    expect(mockOnClick).toHaveBeenCalledTimes(2)*/
  })
})
