import React from 'react'

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

export default function AdvocateRow({ advocate }: { advocate: Advocate }) {
  return (
    <tr key={advocate.id} className="border-b">
      <td className="px-3 py-2 align-top">{advocate.firstName}</td>
      <td className="px-3 py-2 align-top">{advocate.lastName}</td>
      <td className="px-3 py-2 align-top">{advocate.city}</td>
      <td className="px-3 py-2 align-top">{advocate.degree}</td>
      <td className="px-3 py-2 align-top">
        {advocate.specialties.map((s, i) => (
          <div key={i}>{s}</div>
        ))}
      </td>
      <td className="px-3 py-2 align-top">{advocate.yearsOfExperience}</td>
      <td className="px-3 py-2 align-top">{advocate.phoneNumber}</td>
    </tr>
  )
}
