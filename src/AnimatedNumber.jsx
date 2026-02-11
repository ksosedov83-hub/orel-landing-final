import { useEffect, useRef, useState } from 'react'

function AnimatedNumber({ value, duration = 2000, suffix = '', prefix = '' }) {
  const [count, setCount] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)
  const elementRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          animateCount()
        }
      },
      { threshold: 0.5 }
    )

    if (elementRef.current) {
      observer.observe(elementRef.current)
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current)
      }
    }
  }, [hasAnimated])

  const animateCount = () => {
    const startTime = Date.now()
    const startValue = 0
    const endValue = parseFloat(value)

    const animate = () => {
      const now = Date.now()
      const progress = Math.min((now - startTime) / duration, 1)
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const currentValue = startValue + (endValue - startValue) * easeOutQuart

      setCount(currentValue)

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        setCount(endValue)
      }
    }

    requestAnimationFrame(animate)
  }

  const formatNumber = (num) => {
    // If the original value has a + sign, keep it
    if (value.toString().includes('+')) {
      return Math.round(num)
    }
    return Math.round(num)
  }

  return (
    <span ref={elementRef} className="stat-number">
      {prefix}{formatNumber(count)}{suffix}
    </span>
  )
}

export default AnimatedNumber

