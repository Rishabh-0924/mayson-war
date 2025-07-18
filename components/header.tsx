"use client"

import { useState } from "react"
import { Menu, X, Shield } from "lucide-react"
import Image from "next/image"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  const handleLogoClick = () => {
    window.location.href = "/"
  }

  return (
    <header className="bg-black shadow-sm fixed top-0 left-0 right-0 z-50 backdrop-blur-sm bg-opacity-95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex rounded-xl group-hover:shadow-xl transition-all duration-300 group-hover:scale-110" onClick={handleLogoClick}>
            <Shield className="h-8 w-8 text-white" />
            <Image
              src="/maysonb-logo.png"
              alt="Mayson Logo"
              width={120}
              height={40}
              className="object-contain"
            />
          </div>

          <nav className="hidden md:flex space-x-8">
            <a href="/products" className="text-gray-300 hover:text-white transition-all duration-300 hover:scale-105">Products</a>
            <a href="#warranty" className="text-gray-300 hover:text-white transition-all duration-300 hover:scale-105">Warranty</a>
            <a href="#" className="text-gray-300 hover:text-white transition-all duration-300 hover:scale-105">Support</a>
          </nav>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white focus:outline-none">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden mt-2 space-y-2 px-2 pb-2">
            <a href="/products" className="block text-gray-300 hover:text-white transition-all duration-300">Products</a>
            <a href="#warranty" className="block text-gray-300 hover:text-white transition-all duration-300">Warranty</a>
            <a href="#" className="block text-gray-300 hover:text-white transition-all duration-300">Support</a>
          </div>
        )}
      </div>
    </header>
  )
}
