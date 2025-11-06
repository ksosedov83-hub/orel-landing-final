import { useState, useEffect } from 'react'
import './CookieBanner.css'

function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Check if user has already made a choice
    const cookieConsent = localStorage.getItem('cookieConsent')
    
    if (!cookieConsent) {
      // Show banner after 1 second
      const timer = setTimeout(() => {
        setIsVisible(true)
      }, 1000)
      
      return () => clearTimeout(timer)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted')
    hideBanner()
  }

  const handleReject = () => {
    localStorage.setItem('cookieConsent', 'rejected')
    hideBanner()
  }

  const hideBanner = () => {
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <div id="cookieBanner" className="cookie-banner show">
      <div className="cookie-content">
        <div className="cookie-icon">🍪</div>
        <div className="cookie-text">
          <p>
            Мы используем cookies для улучшения работы сайта. Продолжая использовать сайт, вы соглашаетесь с{' '}
            <a href="/privacy-policy.html" className="cookie-link">
              Политикой конфиденциальности
            </a>
            .
          </p>
        </div>
        <div className="cookie-buttons">
          <button onClick={handleAccept} className="cookie-accept">
            Принять
          </button>
          <button onClick={handleReject} className="cookie-reject">
            Отклонить
          </button>
        </div>
      </div>
    </div>
  )
}

export default CookieBanner

