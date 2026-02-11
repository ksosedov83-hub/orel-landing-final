import { useState } from 'react'
import { X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import './LeadForm.css'

function LeadForm({ isOpen, onClose }) {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    contactMethod: 'Telegram',
    consent: false
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const formatPhoneNumber = (value) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, '')
    
    // Start with +7
    if (digits.length === 0) return ''
    if (digits.length <= 1) return '+7'
    
    // Format: +7 (XXX) XXX-XX-XX
    let formatted = '+7'
    if (digits.length > 1) {
      formatted += ' (' + digits.substring(1, 4)
    }
    if (digits.length >= 4) {
      formatted += ') ' + digits.substring(4, 7)
    }
    if (digits.length >= 7) {
      formatted += '-' + digits.substring(7, 9)
    }
    if (digits.length >= 9) {
      formatted += '-' + digits.substring(9, 11)
    }
    
    return formatted
  }

  const validatePhone = (phone) => {
    const digits = phone.replace(/\D/g, '')
    
    // Check length
    if (digits.length < 11) {
      return 'Телефон должен содержать 11 цифр'
    }
    if (digits.length > 12) {
      return 'Телефон не может содержать более 12 цифр'
    }
    
    // Check for repeated digits (e.g., 999999, 111111)
    const phoneDigits = digits.substring(1) // Skip country code
    const repeatedPattern = /(\d)\1{5,}/
    if (repeatedPattern.test(phoneDigits)) {
      return 'Введите корректный номер телефона'
    }
    
    return null
  }

  const handlePhoneChange = (e) => {
    const formatted = formatPhoneNumber(e.target.value)
    setFormData({ ...formData, phone: formatted })
    
    // Clear error when user starts typing
    if (errors.phone) {
      setErrors({ ...errors, phone: null })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validate
    const newErrors = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Пожалуйста, введите ваше имя'
    }
    
    const phoneError = validatePhone(formData.phone)
    if (phoneError) {
      newErrors.phone = phoneError
    }
    
    if (!formData.consent) {
      newErrors.consent = 'Пожалуйста, согласитесь на обработку персональных данных'
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    
    setIsSubmitting(true)
    
    try {
      // Send to backend
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          contactMethod: formData.contactMethod,
          consent: formData.consent
        })
      })

      const result = await response.json()

      if (response.ok && result.success) {
        // Redirect to thank you page
        navigate(`/thank-you?name=${encodeURIComponent(formData.name)}&method=${encodeURIComponent(formData.contactMethod)}`)
        onClose()
      } else {
        alert('Произошла ошибка при отправке формы. Пожалуйста, попробуйте еще раз.')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      alert('Произошла ошибка при отправке формы. Пожалуйста, попробуйте еще раз.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <X className="h-6 w-6" />
        </button>
        
        <h2 className="modal-title">Получить демо + 5 способов роста</h2>
        <p className="modal-subtitle">Заполните форму, и мы отправим вам материалы</p>
        
        <form onSubmit={handleSubmit} className="lead-form">
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Имя <span className="required">*</span>
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => {
                setFormData({ ...formData, name: e.target.value })
                if (errors.name) setErrors({ ...errors, name: null })
              }}
              className={`form-input ${errors.name ? 'error' : ''}`}
              placeholder="Введите ваше имя"
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="phone" className="form-label">
              Телефон <span className="required">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              value={formData.phone}
              onChange={handlePhoneChange}
              className={`form-input ${errors.phone ? 'error' : ''}`}
              placeholder="+7 (___) ___-__-__"
            />
            {errors.phone && <span className="error-message">{errors.phone}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="contactMethod" className="form-label">
              Предпочтительный способ связи
            </label>
            <select
              id="contactMethod"
              value={formData.contactMethod}
              onChange={(e) => setFormData({ ...formData, contactMethod: e.target.value })}
              className="form-select"
            >
              <option value="Telegram">Telegram</option>
              <option value="WhatsApp">WhatsApp</option>
              <option value="Звонок">Звонок</option>
            </select>
          </div>
          
          <div className="form-group consent-group">
            <label className="consent-checkbox">
              <input
                type="checkbox"
                name="consent"
                id="consent"
                checked={formData.consent}
                onChange={(e) => {
                  setFormData({ ...formData, consent: e.target.checked })
                  if (errors.consent) setErrors({ ...errors, consent: null })
                }}
                required
              />
              <span className="checkmark"></span>
              <span className="consent-text">
                Я согласен на обработку персональных данных
              </span>
            </label>
            {errors.consent && <span className="error-message">{errors.consent}</span>}
          </div>
          
          <button 
            type="submit" 
            className="form-submit-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Отправка...' : 'Получить демо'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default LeadForm
