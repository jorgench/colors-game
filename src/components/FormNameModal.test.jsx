import { act, render, screen } from '@testing-library/react'
import { expect } from 'vitest'
import { test } from 'vitest'
import { describe } from 'vitest'
import { FormNameModal } from './FormNameModal'
import { vi } from 'vitest'
import userEvent from '@testing-library/user-event'

const setPlayerMocked = vi.fn()
vi.mock('../store/game.state', () => ({
  useGameState() {
    return {
      setPlayer: setPlayerMocked,
    }
  },
}))
import { beforeEach } from 'vitest'

describe('Form Name Modal Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  test('renders correctly when open', () => {
    render(<FormNameModal isOpen={true} />)
    expect(screen.getByText('Ingresa tu nombre')).toBeInTheDocument()
    expect(screen.getByRole('textbox', { name: /ingresa tu nombre/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /aceptar/i })).toBeInTheDocument()
  })

  test('calls onClose when the modal is closed', async () => {
    const handleClose = vi.fn()

    render(<FormNameModal isOpen={true} onClose={handleClose} />)
    const modal = screen.getByRole('dialog')
    await act(async () => {
      await userEvent.click(modal)
    })

    expect(handleClose).toHaveBeenCalled()
  })

  test('shows error message when name is invalid', async () => {
    render(<FormNameModal isOpen={true} />)

    const input = screen.getByRole('textbox', { name: /ingresa tu nombre/i })
    const button = screen.getByRole('button', { name: /aceptar/i })
    await act(async () => {
      await userEvent.click(button)
    })
    expect(screen.getByText(/el nombre es requerido/i)).toBeInTheDocument()

    await act(async () => {
      await userEvent.type(input, ' ')
      await userEvent.click(button)
    })
    expect(screen.getByText(/el nombre es requerido/i)).toBeInTheDocument()
  })

  test('hides error message when input is focused', async () => {
    render(<FormNameModal isOpen={true} />)

    const input = screen.getByRole('textbox', { name: /ingresa tu nombre/i })
    const button = screen.getByRole('button', { name: /aceptar/i })

    await userEvent.click(button)
    expect(screen.getByText(/el nombre es requerido/i)).toBeInTheDocument()

    await userEvent.click(input)
    expect(screen.queryByText(/el nombre es requerido/i)).not.toBeInTheDocument()
  })

  test('calls setPlayer with valid name', async () => {
    render(<FormNameModal isOpen={true} />)

    const input = screen.getByRole('textbox', { name: /ingresa tu nombre/i })
    const button = screen.getByRole('button', { name: /aceptar/i })

    await userEvent.type(input, 'Jose Roberto')
    await userEvent.click(button)

    expect(setPlayerMocked).toHaveBeenCalledWith('Jose Roberto')
  })

  test('does not call setPlayer when name is invalid', async () => {
    render(<FormNameModal isOpen={true} />)

    const button = screen.getByRole('button', { name: /aceptar/i })

    await userEvent.click(button)
    expect(setPlayerMocked).not.toHaveBeenCalled()
  })

  test('closes modal when clicking outside the modal content', async () => {
    const handleClose = vi.fn()
    render(<FormNameModal isOpen={true} onClose={handleClose} />)

    const backdrop = screen.getByRole('dialog').parentElement
    await userEvent.click(backdrop)

    expect(handleClose).toHaveBeenCalled()
  })
})
