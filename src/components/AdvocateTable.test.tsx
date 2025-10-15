import { render, screen } from '@testing-library/react'
import AdvocateTable from './AdvocateTable'
import { describe, it, expect } from 'vitest'

const advocates = [
  { id: 1, firstName: 'John', lastName: 'Doe', city: 'NYC', degree: 'MD', specialties: ['Trauma'], yearsOfExperience: 10, phoneNumber: '5551234' },
  { id: 2, firstName: 'Jane', lastName: 'Smith', city: 'LA', degree: 'PhD', specialties: ['Anxiety'], yearsOfExperience: 5, phoneNumber: '5555678' }
]

describe('AdvocateTable', () => {
  it('renders rows for each advocate', () => {
    render(<AdvocateTable advocates={advocates} />)

    // header + 2 rows
    expect(screen.getAllByRole('row').length).toBeGreaterThanOrEqual(3)
    expect(screen.getByText('John')).toBeInTheDocument()
    expect(screen.getByText('Jane')).toBeInTheDocument()
  })
})
