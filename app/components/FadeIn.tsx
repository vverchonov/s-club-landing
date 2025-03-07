'use client'

import { useEffect, useState, useRef } from 'react'

interface FadeInProps {
  children: React.ReactNode
  delay?: number
}

const FadeIn = ({ children, delay = 0 }: FadeInProps) => {
  const [isVisible, setIsVisible] = useState(false)
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // When element enters viewport
        if (entry.isIntersecting) {
          // Add delay if specified
          setTimeout(() => {
            setIsVisible(true)
          }, delay)
          // Unobserve after triggering
          if (elementRef.current) {
            observer.unobserve(elementRef.current)
          }
        }
      },
      {
        // Element is considered "visible" when it's 10% in view
        threshold: 0.1,
        // Start observing slightly before element comes into view
        rootMargin: '50px'
      }
    )

    if (elementRef.current) {
      observer.observe(elementRef.current)
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current)
      }
    }
  }, [delay])

  return (
    <div
      ref={elementRef}
      className={`transition-all duration-1000 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      {children}
    </div>
  )
}

export default FadeIn 