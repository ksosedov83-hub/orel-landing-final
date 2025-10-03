import { useState } from 'react'
import { Card, CardContent } from './components/ui/card'
import { Badge } from './components/ui/badge'
import { Button } from './components/ui/button'
import { CheckCircle, Clock, Users, BarChart3, Eye, Target, TrendingUp, Play, ArrowUp, Timer, Check, Zap, Shield, Award } from 'lucide-react'
import './App.css'
import logo from './assets/logo_oryol_final_corrected.png'
import kirillPortrait from './assets/kirill-portrait.png'

function App() {
  const [activeTab, setActiveTab] = useState('rop')

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="premium-header sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-full">
            <div className="flex items-center gap-4">
              <img src={logo} alt="ОРЁЛ" className="premium-logo-large" />
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-[#1a365d]">ОРЁЛ</span>
                <span className="text-sm text-gray-600">ИИ для продаж</span>
              </div>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#capabilities" className="premium-nav-link">Возможности</a>
              <a href="#creator" className="premium-nav-link">О создателе</a>
            </nav>
          </div>
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
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <button className="cta-primary" onClick={() => alert("Открытие формы демо...")}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{display: "inline-block", verticalAlign: "middle", marginRight: "8px"}}>
                <path d="M6 10L8.5 12.5L14 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              Получить демо + 5 способов роста
            </button>
            <p className="text-sm text-white mt-4">Видео разбора + практический гайд. Бесплатно.</p>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="premium-card p-6 text-center animate-count-up stat-card-green">
              <div className="stat-number green flex items-center justify-center gap-2">
                <div className="p-2 rounded-full stat-icon-green">
                  <ArrowUp className="h-6 w-6 text-white" />
                </div>
                +28%
              </div>
              <div className="stat-label">к прибыли за 2 месяца</div>
            </div>
            <div className="premium-card p-6 text-center animate-count-up stat-card-orange">
              <div className="stat-number orange flex items-center justify-center gap-2">
                <div className="p-2 rounded-full stat-icon-orange">
                  <Timer className="h-6 w-6 text-white" />
                </div>
                8 часов
              </div>
              <div className="stat-label">экономии в неделю</div>
            </div>
            <div className="premium-card p-6 text-center animate-count-up stat-card-blue">
              <div className="stat-number blue flex items-center justify-center gap-2">
                <div className="p-2 rounded-full stat-icon-blue">
                  <Check className="h-6 w-6 text-white" />
                </div>
                100%
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
            <div className="premium-card-large">
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 bg-red-100 rounded-lg">
                  <Eye className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Находит ошибки в диалогах
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Автоматически определяет пропущенные этапы продажи, нарушения скрипта и неудачные формулировки
                  </p>
                  <span className="badge badge-green">Анализ 100% звонков</span>
                </div>
              </div>
            </div>

            <div className="premium-card-large">
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <BarChart3 className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Оценивает эффективность объективно
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Строит рейтинг менеджеров на основе десятков параметров, а не ваших ощущений
                  </p>
                  <span className="badge badge-blue">Объективные метрики</span>
                </div>
              </div>
            </div>

            <div className="premium-card-large">
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 bg-orange-100 rounded-lg">
                  <Target className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Дает конкретные рекомендации
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    "Менеджеру Иванову нужно поработать над отработкой возражения 'дорого'"
                  </p>
                  <span className="badge badge-orange">Готовые планы развития</span>
                </div>
              </div>
            </div>

            <div className="premium-card-large">
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 bg-green-100 rounded-lg">
                  <Zap className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Экономит вам 10+ часов в неделю
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Предоставляет готовый отчет по всему отделу за 5 минут в день
                  </p>
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
              <span className="badge badge-green">Реальный кейс</span>
              
              <h3 className="text-xl font-bold text-gray-900 mb-2">Продажа музыкальных инструментов</h3>
              <p className="text-gray-600 mb-4">Региональный дистрибьютор, отдел продаж 12 человек</p>
              
              <blockquote className="text-gray-700 italic mb-6 border-l-4 border-gray-300 pl-4">
                "Конверсия падала, непонятно было где именно теряются клиенты. ОРЁЛ проанализировал звонки и выявил, что менеджеры пропускают этап выявления потребностей."
              </blockquote>
              
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <div className="stat-number green text-2xl">+28%</div>
                  <span className="stat-label">к конверсии за 2 месяца</span>
                </div>
                <div className="text-center">
                  <div className="stat-number orange text-2xl">8 часов</div>
                  <span className="stat-label">экономии в неделю</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Creator Section */}
      <section id="creator" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-title mb-4">
              Создано практиком для практиков
            </h2>
            <p className="text-xl text-gray-600">
              20 лет опыта в продажах, от менеджера до коммерческого директора
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Кирилл, создатель ОРЁЛ</h3>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  "Меня зовут Кирилл. 20 лет я строил и руководил отделами продаж в России. 
                  Я прошел путь от менеджера до коммерческого директора и знаю главную боль — 
                  невозможность контролировать всё."
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

              <a href="#teletype" className="teletype-link">
                Читать статью
              </a>
            </div>
            
            <div className="text-center">
              <div className="relative inline-block">
                <img 
                  src={kirillPortrait} 
                  alt="Кирилл, создатель ОРЁЛ" 
                  className="w-80 h-80 object-cover rounded-2xl shadow-2xl"
                  style={{
                    border: '4px solid transparent',
                    background: 'linear-gradient(135deg, #3b82f6, #ff6b35) padding-box, linear-gradient(135deg, #3b82f6, #ff6b35) border-box'
                  }}
                />
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
              Начните увеличивать конверсию уже завтра
            </h2>
            <p className="text-xl text-gray-600">
              От проблемы к росту продаж за 3 простых шага
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="premium-card p-8">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-blue-600">1</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Загрузите звонки</h3>
                <p className="text-gray-600">
                  Подключите вашу телефонию или просто загрузите аудиофайлы. Это занимает 15 минут.
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
          
          <button className="final-cta-button" onClick={() => alert("Открытие формы демо...")}>
            Получить демо + 5 способов роста
          </button>
          
          <p className="final-cta-subtext">Видео разбора + практический гайд. Бесплатно.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Колонка 1 - Продукт */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">Продукт</h3>
              <ul className="space-y-3">
                <li><a href="#capabilities" className="text-gray-400 hover:text-white transition-colors">Возможности</a></li>
                <li><a href="#pricing" className="text-gray-400 hover:text-white transition-colors">Тарифы</a></li>
                <li><a href="#integrations" className="text-gray-400 hover:text-white transition-colors">Интеграции</a></li>
                <li><a href="#demo" className="text-gray-400 hover:text-white transition-colors">Демо-версия</a></li>
              </ul>
            </div>

            {/* Колонка 2 - Поддержка */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">Поддержка</h3>
              <ul className="space-y-3">
                <li><a href="#docs" className="text-gray-400 hover:text-white transition-colors">Документация</a></li>
                <li><a href="#help" className="text-gray-400 hover:text-white transition-colors">Помощь</a></li>
                <li><a href="#contacts" className="text-gray-400 hover:text-white transition-colors">Контакты</a></li>
                <li><a href="#faq" className="text-gray-400 hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>

            {/* Колонка 3 - Компания */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">Компания</h3>
              <ul className="space-y-3">
                <li><a href="#creator" className="text-gray-400 hover:text-white transition-colors">О создателе</a></li>
                <li><a href="#teletype" className="text-gray-400 hover:text-white transition-colors">История в Teletype</a></li>
                <li><a href="#blog" className="text-gray-400 hover:text-white transition-colors">Блог</a></li>
                <li><a href="#career" className="text-gray-400 hover:text-white transition-colors">Карьера</a></li>
              </ul>
            </div>
          </div>

          {/* Низ footer */}
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center gap-4 mb-4 md:mb-0">
                <img src={logo} alt="ОРЁЛ" className="h-12 w-auto" />
                <div className="flex flex-col">
                  <span className="text-white font-semibold text-lg">ОРЁЛ</span>
                  <span className="text-gray-400 text-sm">ИИ-ассистент для анализа звонков отдела продаж</span>
                </div>
              </div>
              <p className="text-gray-400 text-sm">
                © 2024 ОРЁЛ. Все права защищены.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App

