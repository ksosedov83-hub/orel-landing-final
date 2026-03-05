import React, { useEffect, useState } from 'react';
import actionableScreenshot from '../assets/actionable_insight_screenshot.png';
import '../styles/ActionableInsights.css';

const ActionableInsights = ({ onOpenForm }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = React.useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <section className="actionable-insights-section" ref={ref}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-block mb-4">
            <span className="badge-orange text-white px-4 py-2 rounded-full text-sm font-semibold">
              🚀 Главное преимущество
            </span>
          </div>
          <h2 className="section-title text-3xl sm:text-4xl lg:text-5xl mb-4 sm:mb-6">
            Не просто аналитика —<br className="hidden sm:block" />
            <span className="text-orange-600">план действий</span>
          </h2>
          <p className="section-subtitle text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
            После каждого звонка ОРЁЛ не оставляет вас наедине с данными. ИИ-агент анализирует разговор и говорит точно, что нужно сделать прямо сейчас, чтобы не потерять сделку.
          </p>
        </div>

        {/* Main Content Container */}
        <div className={`actionable-insights-container ${isVisible ? 'animate-in' : ''}`}>
          {/* Left Column - Text Content */}
          <div className="actionable-insights-text">
            <div className="space-y-6">
              {/* Feature 1 */}
              <div className="actionable-feature-item">
                <div className="feature-icon">
                  <span className="icon-circle">⚡</span>
                </div>
                <div className="feature-content">
                  <h3 className="feature-title">Мгновенное спасение сделки</h3>
                  <p className="feature-description">
                    Клиент проявил интерес, но засомневался? ОРЁЛ подскажет, какой аргумент или предложение закроет его возражение в течение 15 минут.
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="actionable-feature-item">
                <div className="feature-icon">
                  <span className="icon-circle">🎯</span>
                </div>
                <div className="feature-content">
                  <h3 className="feature-title">Конкретные действия, не советы</h3>
                  <p className="feature-description">
                    Не "улучшайте отношения с клиентом", а "отправьте PDF с кейсом X в течение часа". Каждая рекомендация — это готовый к выполнению план.
                  </p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="actionable-feature-item">
                <div className="feature-icon">
                  <span className="icon-circle">📈</span>
                </div>
                <div className="feature-content">
                  <h3 className="feature-title">Обучение в процессе</h3>
                  <p className="feature-description">
                    Ваши менеджеры растут профессионально, просто следуя подсказкам системы. Через месяц они уже интуитивно знают, что делать.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Screenshot */}
          <div className="actionable-insights-screenshot">
            <div className="screenshot-wrapper">
              <div className="screenshot-frame">
                <img 
                  src={actionableScreenshot}
                  alt="ОРЁЛ Real-time Coaching - Пример рекомендации для спасения сделки"
                  className="screenshot-image"
                />
              </div>
              {/* Floating Badge */}
              <div className="floating-badge">
                <span className="badge-text">✨ Действие СЕЙЧАС</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA Section */}
        <div className="actionable-insights-cta mt-12 sm:mt-16">
          <div className="cta-box">
            <div className="cta-content">
              <h3 className="cta-title">Хотите увидеть, как это работает?</h3>
              <p className="cta-description">
                Посмотрите видео анализа реального звонка и получите гайд "5 способов спасить сделку"
              </p>
            </div>
            <button className="btn-premium-primary-final" onClick={onOpenForm}>
              Получить демо + гайд бесплатно
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ActionableInsights;
