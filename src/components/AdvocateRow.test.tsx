import { render, screen } from '@testing-library/react'
import AdvocateRow from './AdvocateRow'
import { describe, it, expect } from 'vitest'

const advocate = {
  id: 1,
  firstName: 'John',
  lastName: 'Doe',
  city: 'NYC',
  degree: 'MD',
  specialties: ['Trauma', 'Anxiety'],
  yearsOfExperience: 10,
  phoneNumber: '5551234',
}

describe('AdvocateRow', () => {
  it('renders advocate fields', () => {
    render(
      <table>
        <tbody>
          <AdvocateRow advocate={advocate} />
        </tbody>
      </table>
    )

    expect(screen.getByText('John')).toBeInTheDocument()
    expect(screen.getByText('Doe')).toBeInTheDocument()
    expect(screen.getByText('NYC')).toBeInTheDocument()
    expect(screen.getByText('MD')).toBeInTheDocument()
    expect(screen.getByText('Trauma')).toBeInTheDocument()
    expect(screen.getByText('Anxiety')).toBeInTheDocument()
    expect(screen.getByText('10')).toBeInTheDocument()
    expect(screen.getByText('5551234')).toBeInTheDocument()
  })
})
