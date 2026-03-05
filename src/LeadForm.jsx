import { useState, useRef, useCallback } from 'react'
import { X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import './LeadForm.css'

function LeadForm({ isOpen, onClose }) {
  const navigate = useNavigate()
  // Store raw digits separately (e.g. "79161234567")
  const [phoneDigits, setPhoneDigits] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    contactMethod: 'Telegram',
    consent: false
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const phoneInputRef = useRef(null)

  // Format raw digits into display string
  const formatPhone = useCallback((digits) => {
    if (!digits || digits.length === 0) return ''

    // Always display +7 prefix
    let formatted = '+7'

    // digits here should NOT include the leading 7 (just the 10-digit number)
    if (digits.length > 0) {
      formatted += ' (' + digits.substring(0, 3)
    }
    if (digits.length >= 3) {
      formatted += ') ' + digits.substring(3, 6)
    }
    if (digits.length >= 6) {
      formatted += '-' + digits.substring(6, 8)
    }
    if (digits.length >= 8) {
      formatted += '-' + digits.substring(8, 10)
    }

    return formatted
  }, [])

  // Get the formatted display value
  const phoneDisplay = formatPhone(phoneDigits)

  // Full phone for submission (with country code)
  const fullPhone = phoneDigits.length > 0 ? '+7' + phoneDigits : ''

  const validatePhone = () => {
    if (phoneDigits.length < 10) {
      return 'Телефон должен содержать 10 цифр после +7'
    }
    return null
  }

  const handlePhoneKeyDown = (e) => {
    // Handle Backspace: always remove the last digit
    if (e.key === 'Backspace') {
      e.preventDefault()
      if (phoneDigits.length > 0) {
        const newDigits = phoneDigits.slice(0, -1)
        setPhoneDigits(newDigits)
      }
      if (errors.phone) setErrors({ ...errors, phone: null })
      return
    }

    // Handle Delete key: same as Backspace for simplicity
    if (e.key === 'Delete') {
      e.preventDefault()
      if (phoneDigits.length > 0) {
        const newDigits = phoneDigits.slice(0, -1)
        setPhoneDigits(newDigits)
      }
      if (errors.phone) setErrors({ ...errors, phone: null })
      return
    }

    // Allow: Tab, Enter, Escape, arrow keys
    if (['Tab', 'Enter', 'Escape', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key)) {
      return
    }

    // Allow Ctrl/Cmd + A, C, V, X
    if ((e.ctrlKey || e.metaKey) && ['a', 'c', 'v', 'x'].includes(e.key.toLowerCase())) {
      return
    }

    // Only allow digits
    if (/^\d$/.test(e.key)) {
      e.preventDefault()
      if (phoneDigits.length < 10) {
        const newDigits = phoneDigits + e.key
        setPhoneDigits(newDigits)
        if (errors.phone) setErrors({ ...errors, phone: null })
      }
      return
    }

    // Block everything else
    e.preventDefault()
  }

  // Handle paste
  const handlePhonePaste = (e) => {
    e.preventDefault()
    const pasted = e.clipboardData.getData('text')
    let digits = pasted.replace(/\D/g, '')

    // Remove leading 7 or 8 (country code)
    if (digits.startsWith('7') || digits.startsWith('8')) {
      digits = digits.substring(1)
    }

    // Take only first 10 digits
    digits = digits.substring(0, 10)

    setPhoneDigits(digits)
    if (errors.phone) setErrors({ ...errors, phone: null })
  }

  // Handle mobile input (some mobile keyboards use onInput/onChange instead of onKeyDown)
  const handlePhoneInput = (e) => {
    // Extract digits from whatever the browser gave us
    const rawValue = e.target.value
    let digits = rawValue.replace(/\D/g, '')

    // Remove leading 7 or 8 (country code that we add ourselves)
    if (digits.startsWith('7') || digits.startsWith('8')) {
      digits = digits.substring(1)
    }

    // Limit to 10 digits
    digits = digits.substring(0, 10)

    // Only update if digits actually changed (avoid loops)
    if (digits !== phoneDigits) {
      setPhoneDigits(digits)
      if (errors.phone) setErrors({ ...errors, phone: null })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validate
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Пожалуйста, введите ваше имя'
    }

    const phoneError = validatePhone()
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
          phone: fullPhone,
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
        toast.error('Произошла ошибка при отправке формы. Пожалуйста, попробуйте еще раз.')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      toast.error('Произошла ошибка при отправке формы. Пожалуйста, попробуйте еще раз.')
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

        <h2 className="modal-title">Получить демо + гайд бесплатно</h2>
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
              ref={phoneInputRef}
              value={phoneDisplay}
              onKeyDown={handlePhoneKeyDown}
              onPaste={handlePhonePaste}
              onChange={handlePhoneInput}
              className={`form-input ${errors.phone ? 'error' : ''}`}
              placeholder="+7 (___) ___-__-__"
              inputMode="numeric"
              autoComplete="tel"
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

          <div className="form-trust-signals">
            <span>🔒 Ваши данные защищены</span>
            <span>·</span>
            <span>Без спама</span>
            <span>·</span>
            <a href="/privacy-policy.html" target="_blank" rel="noopener" className="form-trust-link">Политика конфиденциальности</a>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LeadForm
