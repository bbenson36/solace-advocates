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

    // Reset button should be present
    const resetBtn = screen.getByRole('button', { name: /reset search/i })
    expect(resetBtn).toBeInTheDocument()

    // Search input should be present; type a query that filters out John
    const input = screen.getByLabelText('search')
    await userEvent.type(input, 'Jane')

    // The "Searching for" span should reflect the typed value
    const searchTerm = document.getElementById('search-term')
    expect(searchTerm).toBeTruthy()
    expect(searchTerm?.textContent?.toLowerCase()).toContain('jane')

    // Now click Reset Search and expect John to be visible again
    await userEvent.click(resetBtn)
    expect(await screen.findByText('John')).toBeInTheDocument()
    expect(await screen.findByText('Jane')).toBeInTheDocument()
  })
})
