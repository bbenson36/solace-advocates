"use client"

import React from "react"

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary"
}

export default function Button({ variant = "primary", className = "", ...rest }: Props) {
  const base = "px-4 py-2 rounded font-medium focus:outline-none focus:ring-2 focus:ring-offset-2"
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
    secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-400",
  }

  return <button className={`${base} ${variants[variant]} ${className}`} {...rest} />
}
