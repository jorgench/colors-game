import { render, screen } from '@testing-library/react'
import { PageLayout } from './PageLayout'
import { vi } from 'vitest'
import { describe } from 'vitest'
import { test } from 'vitest'
import { expect } from 'vitest'

vi.mock('../components/HeaderPage', () => ({
  HeaderPage: () => <header data-testid="header-page">mock header</header>,
}))

describe('PageLayout component', () => {
  test('renders PageLayout with HeaderPage and FooterPage', () => {
    render(<PageLayout>Test Content</PageLayout>)

    expect(screen.getByTestId('header-page')).toBeInTheDocument()
    expect(screen.getByText('Test Content')).toBeInTheDocument()
  })

  test('renders PageLayout with semantic structure', () => {
    render(<PageLayout>Test Content</PageLayout>)

    const footer = screen.getByRole('contentinfo')
    expect(footer).toHaveClass('footer')
  })

  test('renders children inside the PageLayout', () => {
    const childContent = 'Child Component'

    render(
      <PageLayout>
        <div>{childContent}</div>
      </PageLayout>,
    )

    expect(screen.getByText(childContent)).toBeInTheDocument()
  })
})
