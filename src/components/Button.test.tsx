import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Button from './Button'
import { describe, it, expect, vi } from 'vitest'

describe('Button', () => {
  it('renders with children and responds to click', async () => {
    const user = userEvent.setup()
    const handleClick = vi.fn()

    render(<Button onClick={handleClick}>Click me</Button>)

    const btn = screen.getByRole('button', { name: /click me/i })
    expect(btn).toBeInTheDocument()

    await user.click(btn)
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
