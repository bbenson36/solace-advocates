import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Home from '../page'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

const sampleAdvocates = [
  {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    city: 'New York',
    degree: 'MD',
    specialties: ['Trauma'],
    yearsOfExperience: 10,
    phoneNumber: '5551234',
  },
  {
    id: 2,
    firstName: 'Jane',
    lastName: 'Smith',
    city: 'LA',
    degree: 'PhD',
    specialties: ['Anxiety'],
    yearsOfExperience: 5,
    phoneNumber: '5555678',
  },
]

describe('Home page', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ data: sampleAdvocates }),
      })
    ))
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('renders advocates after fetch and shows Reset Search button', async () => {
    render(<Home />)

    // Wait for fetched data to appear (the first advocate's name)
    const john = await screen.findByText('John')
    expect(john).toBeInTheDocument()

  // Reset button should be present (label updated to 'Reset')
  const resetBtn = screen.getByRole('button', { name: /reset/i })
    expect(resetBtn).toBeInTheDocument()

    // Search input should be present; type a query that filters out John
    const input = screen.getByLabelText('search')
    await userEvent.type(input, 'Jane')

  // The "Searching for" span should reflect the typed value
  const searchTerm = document.getElementById('search-term')
  expect(searchTerm).toBeTruthy()
  expect(searchTerm?.textContent?.toLowerCase()).toContain('jane')

  // John should be filtered out when searching for Jane
  expect(screen.queryByText('John')).not.toBeInTheDocument()

  // Now click Reset Search and expect John to be visible again and Jane present
  await userEvent.click(resetBtn)
  expect(await screen.findByText('John')).toBeInTheDocument()
  const janes = await screen.findAllByText('Jane')
  expect(janes.length).toBeGreaterThanOrEqual(1)
  })
})
