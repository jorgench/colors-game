import { render, screen } from '@testing-library/react'
import { describe, expect, test, vi } from 'vitest'
import { WinnerModal } from './WinnerModal'
import userEvent from '@testing-library/user-event'

describe('WinnerModal Component', () => {
  test('Renders correctly when isOpen is true', () => {
    render(<WinnerModal isOpen={true} points={100} />)
    expect(screen.getByText('¡Ganaste!')).toBeInTheDocument()
    expect(screen.getByText('100 pts')).toBeInTheDocument()
  })

  test('Does not render when isOpen is false', () => {
    render(<WinnerModal isOpen={false} points={100} />)
    expect(screen.queryByText('¡Ganaste!')).not.toBeInTheDocument()
  })

  test('The "Regresar" button triggers onCallback', async () => {
    const onCallbackMock = vi.fn()
    render(<WinnerModal isOpen={true} points={100} onCallback={onCallbackMock} />)
    const backButton = screen.getByText('Regresar')
    await userEvent.click(backButton)
    expect(onCallbackMock).toHaveBeenCalledTimes(1)
  })

  test('The "Siguiente Nivel" button triggers onNextLevelPress', async () => {
    const onNextLevelMock = vi.fn()
    render(<WinnerModal isOpen={true} points={100} onNextLevelPress={onNextLevelMock} />)
    const nextButton = screen.getByText('Siguiente Nivel')
    await userEvent.click(nextButton)
    expect(onNextLevelMock).toHaveBeenCalledTimes(1)
  })

  test('Displays the correct points', () => {
    const points = 250
    render(<WinnerModal isOpen={true} points={points} />)
    expect(screen.getByText(`${points} pts`)).toBeInTheDocument()
  })

  test('Closing the modal triggers onCallback', async () => {
    const onCallbackMock = vi.fn()
    render(<WinnerModal isOpen={true} points={100} onCallback={onCallbackMock} />)
    const backButton = screen.getByText('Regresar')
    await userEvent.click(backButton)
    expect(onCallbackMock).toHaveBeenCalled()
  })
})
