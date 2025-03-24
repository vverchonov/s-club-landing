'use client'

import Image from 'next/image'
import { useState } from 'react'
import { usePathname } from 'next/navigation'

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const isMainPage = pathname === '/'

  const navItems = [
    { name: 'ГОЛОВНА', href: '#home' },
    { name: 'КЛУБ', href: '#club' },
    { name: 'МЕНЮ', href: '#menu' },
    { name: 'ВІДГУКИ', href: '#testimonials' },
    // { name: 'НОВИНИ', href: '#news' },
    { name: 'ВАКАНСІЇ', href: '/vacancies' },
    { name: 'КОНТАКТИ', href: '#contact' },
  ]

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    
    if (href.startsWith('#')) {
      if (isMainPage) {
        // If we're on the main page, scroll to the section
        const element = document.querySelector(href)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
          setIsOpen(false)
        }
      } else {
        // If we're not on the main page, redirect to main page with hash
        window.location.href = `/${href}`
      }
    } else {
      // For non-hash links (like /vacancies), navigate normally
      window.location.href = href
    }
  }

  return (
    <nav className="bg-black text-white shadow-lg fixed top-0 left-0 right-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-28 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <a href="#home" onClick={(e) => handleClick(e, '#home')} className="flex items-center space-x-2">
              <Image src="/logo.png" alt="Cherry Lips Логотип" width={72} height={72} className="h-24 w-auto" />
            </a>
          </div>
          
          {/* Desktop Navigation - Centered */}
          <div className="hidden md:flex items-center justify-center flex-1 space-x-12 px-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleClick(e, item.href)}
                className="text-white hover:text-red-500 px-3 py-2 text-base font-medium tracking-wider transition-colors"
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-900 focus:outline-none"
            >
              <span className="sr-only">Відкрити меню</span>
              <div className="relative w-6 h-6">
                <span className={`absolute block h-0.5 w-6 bg-current transform transition duration-500 ease-in-out ${isOpen ? 'rotate-45 translate-y-1.5' : '-translate-y-1'}`} />
                <span className={`absolute block h-0.5 w-6 bg-current transform transition duration-500 ease-in-out ${isOpen ? 'opacity-0' : 'opacity-100'}`} />
                <span className={`absolute block h-0.5 w-6 bg-current transform transition duration-500 ease-in-out ${isOpen ? '-rotate-45 -translate-y-1.5' : 'translate-y-1'}`} />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div 
        className={`md:hidden bg-black overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navItems.map((item, index) => (
            <a
              key={item.name}
              href={item.href}
              onClick={(e) => handleClick(e, item.href)}
              className={`text-white hover:text-red-500 block px-3 py-2 text-lg font-medium tracking-wider transform transition-all duration-300 ${
                isOpen ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {item.name}
            </a>
          ))}
        </div>
      </div>
    </nav>
  )
}

export default Navigation 