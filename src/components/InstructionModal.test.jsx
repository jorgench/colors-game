import { render, screen } from '@testing-library/react'

import { beforeEach, describe, expect, test, vi } from 'vitest'
import { InstructorModal } from './InstructionModal'
import userEvent from '@testing-library/user-event'
import { afterEach } from 'vitest'

vi.mock('react-transition-group', () => {
  const FakeCSSTransition = vi.fn(props => <>{props.children}</>)
  const SwitchTransition = vi.fn(({ children }) => <>{children}</>)
  return { CSSTransition: FakeCSSTransition, SwitchTransition }
})

describe('InstructorModal', () => {
  const mockOnClose = vi.fn()

  beforeEach(() => {
    mockOnClose.mockClear()
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  test('should render the first step when the modal is opened', () => {
    render(<InstructorModal isOpen={true} onClose={mockOnClose} />)

    expect(screen.getByText('Bienvenido a Colors')).toBeInTheDocument()
    expect(screen.getByText(/¡Prepárate para un desafío único!/)).toBeInTheDocument()
  })
})
