import React from 'react'

export default function Footer() {
  return (
    <footer className="bg-dark footer fixed-bottom text-center text-white">
      Copyright &copy;{new Date().getFullYear()} Site Saver
    </footer>
  )
}