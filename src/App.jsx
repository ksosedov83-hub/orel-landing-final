import { useState } from 'react'
import { Card, CardContent } from './components/ui/card'
import { Badge } from './components/ui/badge'
import { Button } from './components/ui/button'
import { CheckCircle, Clock, Users, BarChart3, Eye, Target, TrendingUp, Play, ArrowUp, Timer, Check, Zap, Shield, Award } from 'lucide-react'
import './App.css'
import logo from './assets/logo_oryol_final_corrected.png'
import kirillPortrait from './assets/kirill-portrait-new.jpg'
import LeadForm from './LeadForm'
import CookieBanner from './CookieBanner'
import AnimatedNumber from './AnimatedNumber'
import { useFadeIn } from './useFadeIn'

function App() {
  const [activeTab, setActiveTab] = useState('rop')
  const [isFormOpen, setIsFormOpen] = useState(false)
  
  // Fade-in animations for cards
  const [card1Ref, card1Visible] = useFadeIn()
  const [card2Ref, card2Visible] = useFadeIn()
  const [card3Ref, card3Visible] = useFadeIn()
  const [card4Ref, card4Visible] = useFadeIn()

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="premium-header sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-full">
          <div className="logo-container flex items-center gap-6">
            <img src={logo} alt="ОРЁЛ" className="premium-logo-large" />
            <div className="flex flex-col gap-1">
              <span className="text-2xl font-bold text-[#1a365d] leading-tight">ОРЁЛ</span>
              <span className="text-sm text-gray-600 hidden lg:inline leading-tight">Искусственный интеллект для отдела продаж</span>
              <span className="logo-tagline hidden">ИИ для отдела продаж</span>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#capabilities" className="premium-nav-link">Возможности</a>
            <a href="#creator" className="premium-nav-link">О создателе</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-gradient py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
            <h1 className="hero-title mb-6">
              Узнайте, почему ваши менеджеры теряют{' '}
              <span className="premium-accent">30% клиентов</span>
              {' '}
              <span className="premium-accent-blue">За 2 минуты</span>
            </h1>
            <p className="hero-subtitle mb-8">
              Для собственников и руководителей, которые хотят контролировать качество
              продаж на 100%, не тратя на это личное время.
            </p>
            <div className="flex flex-col gap-4 justify-center items-center mb-16">
            <button className="cta-primary" onClick={() => setIsFormOpen(true)}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{display: "inline-block", verticalAlign: "middle", marginRight: "8px"}}>
                <path d="M6 10L8.5 12.5L14 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              Получить демо + 5 способов роста
            </button>
            <p className="text-sm text-white mt-2 text-center">Видео разбора + практический гайд. Бесплатно.</p>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="premium-card p-6 text-center animate-count-up stat-card-green">
              <div className="stat-number green flex items-center justify-center gap-2">
                <div className="p-2 rounded-full stat-icon-green">
                  <ArrowUp className="h-6 w-6 text-white" />
                </div>
                +<AnimatedNumber value="28" suffix="%" />
              </div>
              <div className="stat-label">к прибыли за 2 месяца</div>
            </div>
            <div className="premium-card p-6 text-center animate-count-up stat-card-orange">
              <div className="stat-number orange flex items-center justify-center gap-2">
                <div className="p-2 rounded-full stat-icon-orange">
                  <Timer className="h-6 w-6 text-white" />
                </div>
                <AnimatedNumber value="8" suffix=" часов" />
              </div>
              <div className="stat-label">экономии в неделю</div>
            </div>
            <div className="premium-card p-6 text-center animate-count-up stat-card-blue">
              <div className="stat-number blue flex items-center justify-center gap-2">
                <div className="p-2 rounded-full stat-icon-blue">
                  <Check className="h-6 w-6 text-white" />
                </div>
                <AnimatedNumber value="100" suffix="%" />
              </div>
              <div className="stat-label">звонков под контролем</div>
            </div>
          </div>
        </div>
      </section>

      {/* Problems Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="section-title mb-4">
              Пока вы заняты стратегией, деньги теряются в звонках
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Выберите свою роль и узнайте, как ОРЁЛ решает именно ваши проблемы
            </p>
            <div className="tab-switcher">
              <button
                className={`tab-option ${activeTab === 'rop' ? 'active' : ''}`}
                onClick={() => setActiveTab('rop')}
              >
                Я РОП
              </button>
              <button
                className={`tab-option ${activeTab === 'owner' ? 'active' : ''}`}
                onClick={() => setActiveTab('owner')}
              >
                Я Собственник
              </button>
            </div>
          </div>

          {/* Problems Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {activeTab === 'rop' ? (
              <>
                <div className="problem-card">
                  <div className="flex items-start gap-4">
                    <Clock className="h-6 w-6 text-red-500 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="problem-title">Нет времени на всё</h3>
                      <p className="problem-description">
                        Вы не можете разорваться и прослушать 500 звонков в день
                      </p>
                    </div>
                  </div>
                </div>
                <div className="problem-card">
                  <div className="flex items-start gap-4">
                    <Shield className="h-6 w-6 text-red-500 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="problem-title">Нарушение скриптов</h3>
                      <p className="problem-description">
                        Новички игнорируют скрипты, а вы узнаете об этом через месяц
                      </p>
                    </div>
                  </div>
                </div>
                <div className="problem-card">
                  <div className="flex items-start gap-4">
                    <Users className="h-6 w-6 text-red-500 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="problem-title">Кто эффективен?</h3>
                      <p className="problem-description">
                        Непонятно, кто из команды — звезда, а кто — балласт
                      </p>
                    </div>
                  </div>
                </div>
                <div className="problem-card">
                  <div className="flex items-start gap-4">
                    <TrendingUp className="h-6 w-6 text-red-500 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="problem-title">Рутина vs развитие</h3>
                      <p className="problem-description">
                        Вы тратите 10+ часов в неделю на рутину вместо развития
                      </p>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="problem-card">
                  <div className="flex items-start gap-4">
                    <Eye className="h-6 w-6 text-red-500 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="problem-title">Нет контроля</h3>
                      <p className="problem-description">
                        Вы не знаете, что происходит в отделе продаж на самом деле
                      </p>
                    </div>
                  </div>
                </div>
                <div className="problem-card">
                  <div className="flex items-start gap-4">
                    <BarChart3 className="h-6 w-6 text-red-500 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="problem-title">Неясные метрики</h3>
                      <p className="problem-description">
                        РОП говорит "всё хорошо", но продажи не растут
                      </p>
                    </div>
                  </div>
                </div>
                <div className="problem-card">
                  <div className="flex items-start gap-4">
                    <Target className="h-6 w-6 text-red-500 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="problem-title">Слабые места скрыты</h3>
                      <p className="problem-description">
                        Вы не видите, где именно теряются клиенты в воронке
                      </p>
                    </div>
                  </div>
                </div>
                <div className="problem-card">
                  <div className="flex items-start gap-4">
                    <CheckCircle className="h-6 w-6 text-red-500 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="problem-title">Зависимость от РОПа</h3>
                      <p className="problem-description">
                        Вся информация идет через одного человека — это риск
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section id="capabilities" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-title mb-4">
              ОРЁЛ — ваш независимый ИИ-аудитор отдела продаж
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              Он слушает каждый звонок 24/7, находит ошибки и точки роста, предоставляя вам объективный отчет за 5 минут
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div ref={card1Ref} className={`premium-card-large fade-in-card ${card1Visible ? 'visible' : ''}`}>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-red-100 rounded-lg flex-shrink-0">
                  <Eye className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Находит ошибки в диалогах
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    Автоматически определяет пропущенные этапы продажи, нарушения скрипта и неудачные формулировки
                  </p>
                  <span className="badge badge-green">Анализ 100% звонков</span>
                </div>
              </div>
            </div>

            <div ref={card2Ref} className={`premium-card-large fade-in-card ${card2Visible ? 'visible' : ''}`}>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-100 rounded-lg flex-shrink-0">
                  <BarChart3 className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Оценивает эффективность объективно
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    Строит рейтинг менеджеров на основе десятков параметров, а не ваших ощущений
                  </p>
                  <span className="badge badge-blue">Объективные метрики</span>
                </div>
              </div>
            </div>

            <div ref={card3Ref} className={`premium-card-large fade-in-card ${card3Visible ? 'visible' : ''}`}>
              <div className="flex items-start gap-4 h-full">
                <div className="p-3 bg-orange-100 rounded-lg flex-shrink-0">
                  <Target className="h-6 w-6 text-orange-600" />
                </div>
                <div className="flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Дает конкретные рекомендации
                    </h3>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      "Менеджеру Иванову нужно поработать над отработкой возражения 'дорого'"
                    </p>
                  </div>
                  <span className="badge badge-orange">Готовые планы развития</span>
                </div>
              </div>
            </div>

            <div ref={card4Ref} className={`premium-card-large fade-in-card ${card4Visible ? 'visible' : ''}`}>
              <div className="flex items-start gap-4 h-full">
                <div className="p-3 bg-green-100 rounded-lg flex-shrink-0">
                  <Zap className="h-6 w-6 text-green-600" />
                </div>
                <div className="flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Экономит вам 10+ часов в неделю
                    </h3>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      Предоставляет готовый отчет по всему отделу за 5 минут в день
                    </p>
                  </div>
                  <span className="badge badge-green">Автоматические отчеты</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cases Section */}
      <section id="cases" className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-title mb-4">
              Цифры наших клиентов говорят сами за себя
            </h2>
            <p className="text-xl text-gray-600">
              Реальные результаты от компаний, которые уже используют ОРЁЛ
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
            <div className="premium-card p-8 border-l-6 border-green-500">
              <span className="badge badge-green mb-4">Реальный кейс</span>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Продажа музыкальных инструментов</h3>
              <p className="text-gray-600 mb-4">Региональный дистрибьютор, отдел продаж 12 человек</p>
              
              <blockquote className="text-gray-700 italic mb-6 border-l-4 border-gray-300 pl-4">
                "Конверсия падала, непонятно было где именно теряются клиенты. ОРЁЛ проанализировал звонки и выявил, что менеджеры пропускают этап выявления потребностей."
              </blockquote>
              
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <div className="stat-number green text-2xl">+<AnimatedNumber value="28" suffix="%" /></div>
                  <span className="stat-label">к конверсии за 2 месяца</span>
                </div>
                <div className="text-center">
                  <div className="stat-number orange text-2xl"><AnimatedNumber value="8" suffix=" часов" /></div>
                  <span className="stat-label">экономии в день</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Creator Section */}
      <section id="creator" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Mobile: Text first, then photo */}
          <div className="lg:hidden">
            <div className="text-center mb-8">
              <h2 className="section-title mb-2">
                Создано практиком для практиков
              </h2>
              <p className="text-base text-gray-600 mb-6">
                20 лет опыта в продажах, от менеджера до владельца бизнеса
              </p>
            </div>
            
            {/* Photo for mobile */}
            <div className="text-center mb-8">
              <div className="relative inline-block">
                <img 
                  src={kirillPortrait} 
                  alt="Кирилл, создатель ОРЁЛ" 
                  className="founder-photo w-56 h-56 object-cover rounded-2xl shadow-2xl"
                  style={{
                    border: '4px solid transparent',
                    background: 'linear-gradient(135deg, #3b82f6, #ff6b35) padding-box, linear-gradient(135deg, #3b82f6, #ff6b35) border-box'
                  }}
                />
              </div>
            </div>
            
            {/* Content for mobile */}
            <div className="text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Кирилл Соседов, создатель ОРЁЛ</h3>
              <div className="space-y-3 text-gray-700 leading-relaxed text-sm mb-6">
                <p>
                  "Меня зовут Кирилл. 20 лет я строил и руководил отделами продаж в России. Я прошел путь от менеджера по продажам до владельца бизнеса и точно знаю, где теряются ваши деньги."
                </p>
                <p>
                  "Поэтому я создал ОРЁЛ — инструмент, который я всегда хотел иметь сам. Он говорит не на языке технологий, а на языке цифр и прибыли."
                </p>
              </div>
              
              <div className="flex justify-center gap-6 mb-6">
                <div className="text-center">
                  <div className="stat-number blue text-xl">20+</div>
                  <div className="stat-label text-xs">лет в продажах</div>
                </div>
                <div className="text-center">
                  <div className="stat-number blue text-xl">500+</div>
                  <div className="stat-label text-xs">обученных менеджеров</div>
                </div>
              </div>

              <a href="https://teletype.in/@aiconsult/zr7XkZa3KOu" target="_blank" rel="noopener noreferrer" className="teletype-link inline-block">
                Читать статью
              </a>
            </div>
          </div>
          
          {/* Desktop: Original layout */}
          <div className="hidden lg:block">
            <div className="text-center mb-16">
              <h2 className="section-title mb-4">
                Создано практиком для практиков
              </h2>
              <p className="text-xl text-gray-600">
                20 лет опыта в продажах, от менеджера до владельца бизнеса
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="text-center lg:text-left">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Кирилл Соседов, создатель ОРЁЛ</h3>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p>
                    "Меня зовут Кирилл. 20 лет я строил и руководил отделами продаж в России. 
                    Я прошел путь от менеджера по продажам до владельца бизнеса и точно знаю, 
                    где теряются ваши деньги."
                  </p>
                  <p>
                    "Поэтому я создал ОРЁЛ — инструмент, который я всегда хотел иметь сам. 
                    Он говорит не на языке технологий, а на языке цифр и прибыли."
                  </p>
                </div>
                
                <div className="flex items-center gap-8 mt-8">
                  <div className="text-center">
                    <div className="stat-number blue text-2xl">20+</div>
                    <div className="stat-label">лет в продажах</div>
                  </div>
                  <div className="text-center">
                    <div className="stat-number blue text-2xl">500+</div>
                    <div className="stat-label">обученных менеджеров</div>
                  </div>
                </div>

                <a href="https://teletype.in/@aiconsult/zr7XkZa3KOu" target="_blank" rel="noopener noreferrer" className="teletype-link mt-6 inline-block">
                  Читать статью
                </a>
              </div>
              
              <div className="text-center">
                <div className="relative inline-block">
                  <img 
                    src={kirillPortrait} 
                    alt="Кирилл, создатель ОРЁЛ" 
                    className="founder-photo w-80 h-80 object-cover rounded-2xl shadow-2xl"
                    style={{
                      border: '4px solid transparent',
                      background: 'linear-gradient(135deg, #3b82f6, #ff6b35) padding-box, linear-gradient(135deg, #3b82f6, #ff6b35) border-box'
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-title mb-4">
              Начните увеличивать конверсию за 3 шага
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="premium-card p-8">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-blue-600">1</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Загрузите звонки</h3>
                <p className="text-gray-600">
                  Подключите вашу CRM-систему или просто загрузите аудиофайлы. Это занимает 15 минут.
                </p>
              </div>
            </div>

            <div className="text-center">
              <div className="premium-card p-8">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-orange-600">2</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Смотрите демо-разбор</h3>
                <p className="text-gray-600">
                  ОРЁЛ покажет на конкретном примере, где менеджер потерял клиента и как это исправить.
                </p>
              </div>
            </div>

            <div className="text-center">
              <div className="premium-card p-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-green-600">3</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Внедрите рекомендации</h3>
                <p className="text-gray-600">
                  Проведите точечную работу над ошибками с командой и наблюдайте за ростом конверсии.
                </p>
              </div>
            </div>
          </div>


        </div>
      </section>

      {/* Final CTA */}
      <section className="final-cta-section">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="final-cta-title">Готовы увидеть, где теряются ваши клиенты?</h2>
          <p className="final-cta-subtitle">Получите демо-видео анализа реального звонка + гайд "5 способов увеличить конверсию продаж"</p>
          
          <button className="final-cta-button" onClick={() => setIsFormOpen(true)}>
            Получить демо + 5 способов роста
          </button>
          
          <p className="final-cta-subtext">Видео разбора + практический гайд. Бесплатно.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          {/* Footer Content */}
          <div className="footer-content">
            {/* Logo & About */}
            <div className="footer-logo-section">
              <img src={logo} alt="ОРЁЛ" className="footer-logo" />
              <div className="footer-logo-text">ОРЁЛ</div>
              <p className="footer-tagline">
                ИИ-ассистент для анализа звонков отдела продаж
              </p>
            </div>
            
            {/* Product Column */}
            <div className="footer-column">
              <h4>Продукт</h4>
              <div className="footer-links">
                <a href="#capabilities">Возможности</a>
                <a href="#cases">Кейсы</a>
                <a href="#demo" onClick={(e) => { e.preventDefault(); setIsFormOpen(true); }}>Демо</a>
              </div>
            </div>
            
            {/* Company Column */}
            <div className="footer-column">
              <h4>Компания</h4>
              <div className="footer-links">
                <a href="#creator">О создателе</a>
                <a href="https://teletype.in/@aiconsult/zr7XkZa3KOu" target="_blank" rel="noopener">Блог</a>
              </div>
              
              <h4 style={{marginTop: '24px'}}>Связаться</h4>
              <div className="footer-contact">
                <div className="footer-contact-item">
                  <span className="contact-icon">✈️</span>
                  <a href="https://t.me/AiConsult3" target="_blank" rel="noopener">@AiConsult3</a>
                </div>
                <div className="footer-contact-item">
                  <span className="contact-icon">📧</span>
                  <a href="mailto:k-sosedov@yandex.ru">k-sosedov@yandex.ru</a>
                </div>
              </div>
            </div>
          </div>
          
          {/* Footer Bottom */}
          <div className="footer-bottom">
            <div className="footer-copyright">
              © 2025 ОРЁЛ. Все права защищены.
            </div>
            
            <div className="footer-legal">
              <a href="/privacy-policy.html">Политика конфиденциальности</a>
            </div>
          </div>
        </div>
      </footer>
      
      {/* Cookie Banner */}
      <CookieBanner />
      
      {/* Lead Form Modal */}
      <LeadForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
    </div>
  )
}

export default App

