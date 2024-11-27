import { render, screen } from '@testing-library/react'
import { describe, expect, vi, test } from 'vitest'
import { TemplateModal } from './TemplateModal'
import userEvent from '@testing-library/user-event'

describe('TemplateModal Component', () => {
  test('Renders correctly when isOpen is true', () => {
    render(
      <TemplateModal isOpen={true} title="Test Title" onClose={() => {}}>
        <p>Modal Content</p>
      </TemplateModal>,
    )
    expect(screen.getByText('Test Title')).toBeInTheDocument()
    expect(screen.getByText('Modal Content')).toBeInTheDocument()
  })

  test('Does not render when isOpen is false', () => {
    render(
      <TemplateModal isOpen={false} title="Test Title" onClose={() => {}}>
        <p>Modal Content</p>
      </TemplateModal>,
    )
    expect(screen.queryByText('Test Title')).not.toBeInTheDocument()
  })

  test('Displays title if provided', () => {
    render(<TemplateModal isOpen={true} title="My Modal" onClose={() => {}} />)
    expect(screen.getByText('My Modal')).toBeInTheDocument()
  })

  test('Does not render title if not provided', () => {
    render(<TemplateModal isOpen={true} onClose={() => {}} />)
    expect(screen.queryByRole('heading')).not.toBeInTheDocument()
  })

  test('Renders children correctly', () => {
    render(
      <TemplateModal isOpen={true} title="Test Title" onClose={() => {}}>
        <p>Child Content</p>
      </TemplateModal>,
    )
    expect(screen.getByText('Child Content')).toBeInTheDocument()
  })

  test('Renders footer if provided', () => {
    render(<TemplateModal isOpen={true} footer={<button>Footer Button</button>} onClose={() => {}} />)
    expect(screen.getByText('Footer Button')).toBeInTheDocument()
  })

  test('Does not render footer if not provided', () => {
    render(<TemplateModal isOpen={true} onClose={() => {}} />)
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })

  test('Calls onClose when modal is closed', async () => {
    const onCloseMock = vi.fn()
    render(<TemplateModal isOpen={true} title="Test Modal" onClose={onCloseMock} />)
    const modalRoot = screen.getByRole('dialog')
    await userEvent.click(modalRoot)
    expect(onCloseMock).toHaveBeenCalledTimes(1)
  })

  test('The modal has the correct accessible roles and labels', () => {
    render(
      <TemplateModal isOpen={true} title="Accessible Modal" onClose={() => {}}>
        <p>Accessible Content</p>
      </TemplateModal>,
    )
    const dialog = screen.getByRole('dialog')
    expect(dialog).toBeInTheDocument()
    expect(screen.getByText('Accessible Modal')).toBeInTheDocument()
  })
})
