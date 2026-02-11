import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import logo from './assets/logo_oryol_final_corrected.png'
import './ThankYou.css'

function ThankYou() {
  const [searchParams] = useSearchParams()
  const name = searchParams.get('name') || 'Друг'
  const contactMethod = searchParams.get('method') || 'указанный способ связи'

  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="thank-you-page">
      <div className="thank-you-content">
        <img src={logo} alt="ОРЁЛ" className="thank-you-logo" />
        
        <h1 className="thank-you-title">Спасибо, {name}!</h1>
        
        <p className="thank-you-subtitle">Ваши материалы уже ждут вас:</p>
        
        <div className="thank-you-buttons">
          <a 
            href="https://youtu.be/kUOVvT2DP2o" 
            target="_blank" 
            rel="noopener noreferrer"
            className="cta-button-youtube"
          >
            ▶ Смотреть демо-анализ звонка
          </a>
          
          <a 
            href="https://teletype.in/@aiconsult/zr7XkZa3KOu" 
            target="_blank" 
            rel="noopener noreferrer"
            className="cta-button-teletype"
          >
            📄 Читать гайд "5 способов увеличения конверсии"
          </a>
        </div>
        
        <p className="thank-you-footer-text">
          Мы свяжемся с вами через {contactMethod} в ближайшее время.
        </p>
      </div>
    </div>
  )
}

export default ThankYou
