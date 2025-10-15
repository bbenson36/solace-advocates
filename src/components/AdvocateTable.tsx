import React from 'react'
import AdvocateRow from './AdvocateRow'

type Advocate = {
  id?: number
  firstName: string
  lastName: string
  city: string
  degree: string
  specialties: string[]
  yearsOfExperience: number
  phoneNumber: number | string
}

export default function AdvocateTable({ advocates }: { advocates: Advocate[] }) {
  return (
    <div className="mt-6 overflow-auto">
      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr className="text-left bg-gray-100">
            <th className="px-3 py-2">First Name</th>
            <th className="px-3 py-2">Last Name</th>
            <th className="px-3 py-2">City</th>
            <th className="px-3 py-2">Degree</th>
            <th className="px-3 py-2">Specialties</th>
            <th className="px-3 py-2">Years of Experience</th>
            <th className="px-3 py-2">Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {advocates.map((advocate) => (
            <AdvocateRow key={advocate.id} advocate={advocate} />
          ))}
        </tbody>
      </table>
    </div>
  )
}
