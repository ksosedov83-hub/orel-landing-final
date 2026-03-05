import { useState } from 'react'
import { Card, CardContent } from './components/ui/card'
import { Badge } from './components/ui/badge'
import { Button } from './components/ui/button'
import { CheckCircle, Clock, Users, BarChart3, Eye, Target, TrendingUp, Play, ArrowUp, Timer, Check, Zap, Shield, Award, Menu, X } from 'lucide-react'
import { Toaster } from 'sonner'
import './App.css'
import logo from './assets/logo_oryol_final_corrected.png'
import kirillPortrait from './assets/kirill-portrait-new.jpg'
import LeadForm from './LeadForm'
import CookieBanner from './CookieBanner'
import AnimatedNumber from './AnimatedNumber'
import ActionableInsights from './components/ActionableInsights'
import NeuralBackground from './components/NeuralBackground'
import { FadeUp, StaggerContainer, StaggerItem, ScrollImage } from './components/Reveal'


function App() {
  const [activeTab, setActiveTab] = useState('rop')
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [openFaq, setOpenFaq] = useState(null)

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex justify-between items-center h-20 sm:h-24">

          {/* Left section: Logo */}
          <div className="flex items-center gap-4 sm:gap-6 lg:w-1/3 justify-start">
            <img src={logo} alt="ОРЁЛ" className="h-12 sm:h-16 w-auto object-contain transition-transform hover:scale-105 duration-300 drop-shadow-sm" />
            <div className="flex flex-col">
              <span className="text-2xl sm:text-3xl font-extrabold text-[#1a365d] leading-none tracking-tight">ОРЁЛ</span>
              <span className="text-[10px] sm:text-xs font-bold text-slate-500 tracking-widest mt-1 sm:mt-1.5 uppercase">Оцифровка речевых лидов</span>
            </div>
          </div>

          {/* Middle section: Navigation */}
          <nav className="hidden md:flex items-center justify-center gap-10 lg:w-1/3">
            <a href="#capabilities" className="text-sm font-semibold text-slate-700 hover:text-orange-600 transition-colors">Возможности</a>
            <a href="#creator" className="text-sm font-semibold text-slate-700 hover:text-orange-600 transition-colors">О создателе</a>
          </nav>

          {/* Right section: Desktop Button */}
          <div className="hidden md:flex justify-end lg:w-1/3">
            <button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-6 py-2.5 rounded-full font-bold text-sm transition-all shadow-[0_4px_14px_0_rgba(249,115,22,0.39)] hover:shadow-[0_6px_20px_rgba(249,115,22,0.23)] hover:-translate-y-0.5" onClick={() => setIsFormOpen(true)}>
              Запросить демо
            </button>
          </div>

          {/* Mobile: CTA + Hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <button
              className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-4 py-2 rounded-full font-bold text-xs transition-all shadow-[0_4px_14px_0_rgba(249,115,22,0.39)]"
              onClick={() => setIsFormOpen(true)}
            >
              Демо
            </button>
            <button
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Меню"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

        </div>

        {/* Mobile dropdown menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white/98 backdrop-blur-md shadow-lg border-b border-gray-100 z-40">
            <nav className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
              <a
                href="#capabilities"
                className="px-4 py-3 text-sm font-semibold text-slate-700 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Возможности
              </a>
              <a
                href="#creator"
                className="px-4 py-3 text-sm font-semibold text-slate-700 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                О создателе
              </a>
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="hero-gradient relative overflow-hidden py-20 px-4">
        <NeuralBackground />
        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <FadeUp delay={0}>
            <h1 className="hero-title mb-6">
              Узнайте, почему ваши менеджеры теряют{' '}
              <span className="premium-accent">30% клиентов</span>
              {' '}
              <span className="premium-accent-blue">За 2 минуты</span>
            </h1>
          </FadeUp>
          <FadeUp delay={0.15}>
            <p className="hero-subtitle mb-8">
              Для собственников и руководителей, которые хотят контролировать качество
              продаж на 100%, не тратя на это личное время.
            </p>
          </FadeUp>
          <FadeUp delay={0.3}>
            <div className="flex flex-col gap-4 justify-center items-center mb-16">
              <button className="cta-primary relative overflow-hidden group" onClick={() => setIsFormOpen(true)}>
                <span className="absolute inset-0 w-full h-full bg-white/20 scale-x-0 group-hover:scale-x-100 transform origin-left transition-transform duration-500 ease-out"></span>
                <span className="relative flex items-center">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ display: "inline-block", verticalAlign: "middle", marginRight: "8px" }}>
                    <path d="M6 10L8.5 12.5L14 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                  Получить демо + гайд бесплатно
                </span>
              </button>
              <a
                href="https://t.me/AiConsult3"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white/80 hover:text-white border border-white/30 hover:border-white/60 px-6 py-2.5 rounded-full text-sm font-medium transition-all hover:bg-white/10"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248l-2.012 9.478c-.148.658-.537.818-1.088.508l-3.01-2.218-1.452 1.397c-.161.161-.296.296-.606.296l.216-3.059 5.576-5.034c.243-.216-.053-.336-.373-.12l-6.892 4.34-2.969-.925c-.645-.2-.658-.645.134-.954l11.59-4.47c.538-.196 1.008.12.886.761z" />
                </svg>
                Написать в Telegram
              </a>
              <p className="text-sm text-white/60 text-center">Видео разбора + практический гайд. Бесплатно.</p>
            </div>
          </FadeUp>

          {/* Statistics */}
          <StaggerContainer delay={0.5} className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <StaggerItem className="premium-card p-6 text-center stat-card-green relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-150 transition-transform duration-700">
                <ArrowUp className="h-24 w-24" />
              </div>
              <div className="stat-number green flex items-center justify-center gap-2 relative z-10">
                <div className="p-2 rounded-full stat-icon-green">
                  <ArrowUp className="h-6 w-6 text-white" />
                </div>
                +<AnimatedNumber value="28" suffix="%" />
              </div>
              <div className="stat-label relative z-10">к прибыли за 2 месяца</div>
            </StaggerItem>
            <StaggerItem className="premium-card p-6 text-center stat-card-orange relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-150 transition-transform duration-700">
                <Timer className="h-24 w-24" />
              </div>
              <div className="stat-number orange flex items-center justify-center gap-2 relative z-10">
                <div className="p-2 rounded-full stat-icon-orange">
                  <Timer className="h-6 w-6 text-white" />
                </div>
                <AnimatedNumber value="8" suffix=" часов" />
              </div>
              <div className="stat-label relative z-10">экономии в неделю</div>
            </StaggerItem>
            <StaggerItem className="premium-card p-6 text-center stat-card-blue relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-150 transition-transform duration-700">
                <Check className="h-24 w-24" />
              </div>
              <div className="stat-number blue flex items-center justify-center gap-2 relative z-10">
                <div className="p-2 rounded-full stat-icon-blue">
                  <Check className="h-6 w-6 text-white" />
                </div>
                <AnimatedNumber value="100" suffix="%" />
              </div>
              <div className="stat-label relative z-10">звонков под контролем</div>
            </StaggerItem>
          </StaggerContainer>
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
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6" key={activeTab}>
            {activeTab === 'rop' ? (
              <>
                <StaggerItem>
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
                </StaggerItem>
                <StaggerItem>
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
                </StaggerItem>
                <StaggerItem>
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
                </StaggerItem>
                <StaggerItem>
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
                </StaggerItem>
              </>
            ) : (
              <>
                <StaggerItem>
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
                </StaggerItem>
                <StaggerItem>
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
                </StaggerItem>
                <StaggerItem>
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
                </StaggerItem>
                <StaggerItem>
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
                </StaggerItem>
              </>
            )}
          </StaggerContainer>
        </div>
      </section>

      {/* Solution Section */}
      <section id="capabilities" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <FadeUp>
            <div className="text-center mb-16">
              <h2 className="section-title mb-4">
                ОРЁЛ — ваш независимый ИИ-аудитор отдела продаж
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto">
                Он слушает каждый звонок 24/7, находит ошибки и точки роста, предоставляя вам объективный отчет за 5 минут
              </p>
            </div>
          </FadeUp>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <StaggerItem className="premium-card-large group">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-red-100 rounded-lg flex-shrink-0 group-hover:bg-red-200 transition-colors">
                  <Eye className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">
                    Находит ошибки в диалогах
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    Автоматически определяет пропущенные этапы продажи, нарушения скрипта и неудачные формулировки
                  </p>
                  <span className="badge badge-green">Анализ 100% звонков</span>
                </div>
              </div>
            </StaggerItem>

            <StaggerItem className="premium-card-large group">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-100 rounded-lg flex-shrink-0 group-hover:bg-blue-200 transition-colors">
                  <BarChart3 className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    Оценивает эффективность объективно
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    Строит рейтинг менеджеров на основе десятков параметров, а не ваших ощущений
                  </p>
                  <span className="badge badge-blue">Объективные метрики</span>
                </div>
              </div>
            </StaggerItem>

            <StaggerItem className="premium-card-large group">
              <div className="flex items-start gap-4 h-full">
                <div className="p-3 bg-orange-100 rounded-lg flex-shrink-0 group-hover:bg-orange-200 transition-colors">
                  <Target className="h-6 w-6 text-orange-600" />
                </div>
                <div className="flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                      Дает конкретные рекомендации
                    </h3>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      "Менеджеру Иванову нужно поработать над отработкой возражения 'дорого'"
                    </p>
                  </div>
                  <span className="badge badge-orange">Готовые планы развития</span>
                </div>
              </div>
            </StaggerItem>

            <StaggerItem className="premium-card-large group">
              <div className="flex items-start gap-4 h-full">
                <div className="p-3 bg-green-100 rounded-lg flex-shrink-0 group-hover:bg-green-200 transition-colors">
                  <Zap className="h-6 w-6 text-green-600" />
                </div>
                <div className="flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                      Экономит вам 10+ часов в неделю
                    </h3>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      Предоставляет готовый отчет по всему отделу за 5 минут в день
                    </p>
                  </div>
                  <span className="badge badge-green">Автоматические отчеты</span>
                </div>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* Actionable Insights Section */}
      <ActionableInsights onOpenForm={() => setIsFormOpen(true)} />

      {/* Cases Section */}
      <section id="cases" className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <FadeUp>
            <div className="text-center mb-16">
              <h2 className="section-title mb-4">
                Цифры наших клиентов говорят сами за себя
              </h2>
              <p className="text-xl text-gray-600">
                Реальные результаты от компаний, которые уже используют ОРЁЛ
              </p>
            </div>
          </FadeUp>

          <StaggerContainer delay={0.2} className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            <StaggerItem>
              <div className="premium-card p-8 border-l-4 border-green-500 hover:-translate-y-1 transition-all duration-500 h-full flex flex-col">
                <span className="badge badge-green mb-4">Реальный кейс</span>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Продажа музыкальных инструментов</h3>
                <p className="text-gray-600 mb-4 text-sm">Региональный дистрибьютор, 12 менеджеров</p>
                <blockquote className="text-gray-700 italic mb-6 border-l-4 border-gray-300 pl-4 text-sm leading-relaxed flex-1">
                  "ОРЁЛ выявил, что менеджеры пропускают этап выявления потребностей. После точечной работы над этим — конверсия пошла вверх."
                </blockquote>
                <div className="flex items-center gap-6 pt-4 border-t border-gray-100">
                  <div className="text-center">
                    <div className="stat-number green text-2xl">+<AnimatedNumber value="28" suffix="%" /></div>
                    <span className="stat-label text-xs">к конверсии</span>
                  </div>
                  <div className="text-center">
                    <div className="stat-number orange text-2xl"><AnimatedNumber value="8" suffix=" ч" /></div>
                    <span className="stat-label text-xs">экономии в день</span>
                  </div>
                </div>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="premium-card p-8 border-l-4 border-blue-500 hover:-translate-y-1 transition-all duration-500 h-full flex flex-col">
                <span className="badge badge-blue mb-4">Реальный кейс</span>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Агентство недвижимости</h3>
                <p className="text-gray-600 mb-4 text-sm">Региональный застройщик, 8 менеджеров</p>
                <blockquote className="text-gray-700 italic mb-6 border-l-4 border-gray-300 pl-4 text-sm leading-relaxed flex-1">
                  "Менеджеры не дожимали клиентов на этапе 'подумаю'. ОРЁЛ показал конкретные фразы, которые убивали сделки — мы их исправили за неделю."
                </blockquote>
                <div className="flex items-center gap-6 pt-4 border-t border-gray-100">
                  <div className="text-center">
                    <div className="stat-number blue text-2xl">+<AnimatedNumber value="35" suffix="%" /></div>
                    <span className="stat-label text-xs">к закрытым сделкам</span>
                  </div>
                  <div className="text-center">
                    <div className="stat-number green text-2xl"><AnimatedNumber value="3" suffix=" мес" /></div>
                    <span className="stat-label text-xs">окупаемость</span>
                  </div>
                </div>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="premium-card p-8 border-l-4 border-orange-500 hover:-translate-y-1 transition-all duration-500 h-full flex flex-col">
                <span className="badge badge-orange mb-4">Реальный кейс</span>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Юридические услуги</h3>
                <p className="text-gray-600 mb-4 text-sm">Юридическая фирма, 6 менеджеров</p>
                <blockquote className="text-gray-700 italic mb-6 border-l-4 border-gray-300 pl-4 text-sm leading-relaxed flex-1">
                  "Мы не понимали, почему люди уходят после первого звонка. ОРЁЛ нашёл: менеджеры говорили о цене до объяснения ценности. Поменяли порядок — разница очевидна."
                </blockquote>
                <div className="flex items-center gap-6 pt-4 border-t border-gray-100">
                  <div className="text-center">
                    <div className="stat-number orange text-2xl">+<AnimatedNumber value="41" suffix="%" /></div>
                    <span className="stat-label text-xs">к конверсии в оплату</span>
                  </div>
                  <div className="text-center">
                    <div className="stat-number green text-2xl"><AnimatedNumber value="12" suffix=" ч" /></div>
                    <span className="stat-label text-xs">экономии в неделю</span>
                  </div>
                </div>
              </div>
            </StaggerItem>

          </StaggerContainer>
        </div>
      </section>

      {/* Creator Section */}
      <section id="creator" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <FadeUp delay={0.1}>
              <div className="relative">
                <ScrollImage
                  src={kirillPortrait}
                  alt="Кирилл Соседов"
                  className="w-full max-w-md mx-auto"
                  imgClassName="rounded-2xl shadow-2xl w-full h-auto"
                />
                <div className="absolute -bottom-6 -right-6 bg-blue-600 text-white p-6 rounded-xl shadow-xl hidden md:block shrink-0">
                  <div className="text-3xl font-bold">20+</div>
                  <div className="text-sm">лет в продажах</div>
                </div>
              </div>
            </FadeUp>
            <FadeUp delay={0.3}>
              <div>
                <h2 className="section-title mb-6 text-left">Кирилл Соседов, создатель ОРЁЛ</h2>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  "Меня зовут Кирилл. 20 лет я строил и руководил отделами продаж в России. Я прошел путь от менеджера по продажам до владельца бизнеса и точно знаю, где теряются ваши деньги."
                </p>
                <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                  "Поэтому я создал ОРЁЛ — инструмент, который я всегда хотел иметь сам. Он говорит не на языке технологий, а на языке цифр и прибыли."
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-lg border border-gray-100">
                    <CheckCircle className="text-green-500 h-5 w-5" />
                    <span className="font-medium text-gray-800">500+ обученных менеджеров</span>
                  </div>
                  <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-lg border border-gray-100">
                    <CheckCircle className="text-green-500 h-5 w-5" />
                    <span className="font-medium text-gray-800">100+ кейсов роста</span>
                  </div>
                </div>
                <div className="mt-8">
                  <a href="https://teletype.in/@aiconsult/zr7XkZa3KOu" target="_blank" rel="noopener" className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 bg-blue-50 px-6 py-3 rounded-full transition-colors group">
                    Читайте больше обо мне <ArrowUp className="rotate-45 h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </a>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <FadeUp>
            <div className="text-center mb-16">
              <h2 className="section-title mb-4">Начните увеличивать конверсию за 3 шага</h2>
            </div>
          </FadeUp>

          <StaggerContainer delay={0.2} className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StaggerItem className="text-center">
              <div className="premium-card p-8 h-full">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-blue-600">1</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Загрузите звонки</h3>
                <p className="text-gray-600">
                  Подключите вашу CRM-систему или просто загрузите аудиофайлы. Это занимает 15 минут.
                </p>
              </div>
            </StaggerItem>
            <StaggerItem className="text-center">
              <div className="premium-card p-8 h-full">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-orange-600">2</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Смотрите демо-разбор</h3>
                <p className="text-gray-600">
                  ОРЁЛ покажет на конкретном примере, где менеджер потерял клиента и как это исправить.
                </p>
              </div>
            </StaggerItem>
            <StaggerItem className="text-center">
              <div className="premium-card p-8 h-full">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-green-600">3</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Внедрите рекомендации</h3>
                <p className="text-gray-600">
                  Проведите точечную работу над ошибками с командой и наблюдайте за ростом конверсии.
                </p>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <FadeUp>
            <div className="text-center mb-12">
              <h2 className="section-title mb-4">Частые вопросы</h2>
              <p className="text-lg text-gray-600">Ответы на вопросы, которые задают чаще всего</p>
            </div>
          </FadeUp>

          <FadeUp delay={0.1}>
            <div className="flex flex-col divide-y divide-gray-200 border border-gray-200 rounded-2xl overflow-hidden">
              {[
                {
                  q: 'Как происходит интеграция с CRM?',
                  a: 'ОРЁЛ интегрируется с популярными CRM-системами (amoCRM, Битрикс24) через API. Также можно просто загружать аудиофайлы вручную — всё настраивается за 15 минут без программистов.'
                },
                {
                  q: 'Сколько времени занимает подключение?',
                  a: 'Первые результаты вы увидите в день обращения. Мы проводим демо-разбор вашего реального звонка за 24 часа — и вы сразу видите, как работает система.'
                },
                {
                  q: 'Данные звонков конфиденциальны?',
                  a: 'Да. Все данные передаются по защищённому каналу и хранятся на изолированном сервере. Мы подписываем NDA по запросу. Ваши звонки никогда не используются для обучения моделей.'
                },
                {
                  q: 'Какой минимальный размер отдела продаж?',
                  a: 'ОРЁЛ эффективен даже при команде от 2 человек. Система помогает выявить паттерны и точки роста — независимо от размера команды.'
                },
                {
                  q: 'Как быстро появятся первые результаты?',
                  a: 'Первые инсайты — в день подключения. Первые измеримые изменения в показателях клиенты фиксируют через 2–4 недели после внедрения рекомендаций.'
                },
                {
                  q: 'Есть ли пробный период?',
                  a: 'Да. Мы проводим бесплатный демо-разбор одного вашего звонка — вы получаете реальный анализ без обязательств. Дальше вы сами решаете, продолжать ли работу.'
                }
              ].map((item, i) => (
                <div key={i} className="bg-white">
                  <button
                    className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 hover:bg-gray-50 transition-colors"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    <span className="font-semibold text-gray-900 text-base">{item.q}</span>
                    <span className={`flex-shrink-0 w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center transition-transform duration-200 ${openFaq === i ? 'rotate-45 border-orange-500 bg-orange-500 text-white' : 'text-gray-400'}`}>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    </span>
                  </button>
                  {openFaq === i && (
                    <div className="px-6 pb-5 text-gray-600 leading-relaxed text-sm">
                      {item.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Final CTA */}
      <section className="final-cta-section">
        <div className="max-w-4xl mx-auto text-center">
          <FadeUp>
            <h2 className="final-cta-title">Готовы увидеть, где теряются ваши клиенты?</h2>
            <p className="final-cta-subtitle">Получите демо-видео анализа реального звонка + гайд "5 способов увеличить конверсию продаж"</p>

            <button className="final-cta-button relative overflow-hidden group" onClick={() => setIsFormOpen(true)}>
              <span className="absolute inset-0 w-full h-full bg-white/20 scale-x-0 group-hover:scale-x-100 transform origin-left transition-transform duration-500 ease-out"></span>
              <span className="relative">Получить демо + гайд бесплатно</span>
            </button>

            <a
              href="https://t.me/AiConsult3"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-4 text-white/70 hover:text-white border border-white/20 hover:border-white/50 px-6 py-2.5 rounded-full text-sm font-medium transition-all hover:bg-white/10"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248l-2.012 9.478c-.148.658-.537.818-1.088.508l-3.01-2.218-1.452 1.397c-.161.161-.296.296-.606.296l.216-3.059 5.576-5.034c.243-.216-.053-.336-.373-.12l-6.892 4.34-2.969-.925c-.645-.2-.658-.645.134-.954l11.59-4.47c.538-.196 1.008.12.886.761z" />
              </svg>
              Написать в Telegram
            </a>

            <p className="final-cta-subtext">Видео разбора + практический гайд. Бесплатно.</p>
          </FadeUp>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0f172a] text-slate-300 pt-20 pb-8 border-t border-slate-800 w-full mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 mb-16">

            <div className="md:col-span-5 flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <img src={logo} alt="ОРЁЛ" className="h-14 w-auto drop-shadow-sm" />
                <div className="flex flex-col">
                  <span className="text-3xl font-extrabold text-white tracking-tight">ОРЁЛ</span>
                  <span className="text-slate-400 text-sm font-medium tracking-wide uppercase mt-1">Оцифровка речевых лидов</span>
                </div>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
                Интеллектуальная система контроля качества продаж. Безошибочно анализируем звонки и увеличиваем конверсию без роста бюджета на маркетинг.
              </p>
            </div>

            <div className="md:col-span-3">
              <h4 className="text-white font-bold text-base mb-6 uppercase tracking-wider">Продукт</h4>
              <ul className="flex flex-col gap-4">
                <li><a href="#capabilities" className="text-slate-400 hover:text-orange-500 transition-colors font-medium">Возможности</a></li>
                <li><a href="#cases" className="text-slate-400 hover:text-orange-500 transition-colors font-medium">Кейсы</a></li>
                <li><a href="#demo" onClick={(e) => { e.preventDefault(); setIsFormOpen(true); }} className="text-slate-400 hover:text-orange-500 transition-colors font-medium cursor-pointer">Демо-доступ</a></li>
              </ul>
            </div>

            <div className="md:col-span-4 flex flex-col gap-8">
              <div>
                <h4 className="text-white font-bold text-base mb-6 uppercase tracking-wider">Компания</h4>
                <ul className="flex flex-col gap-4">
                  <li><a href="#creator" className="text-slate-400 hover:text-orange-500 transition-colors font-medium">О создателе</a></li>
                  <li><a href="https://teletype.in/@aiconsult/zr7XkZa3KOu" target="_blank" rel="noopener" className="text-slate-400 hover:text-orange-500 transition-colors font-medium">Блог (Teletype)</a></li>
                </ul>
              </div>

              <div>
                <h4 className="text-white font-bold text-base mb-6 uppercase tracking-wider">Связь с нами</h4>
                <div className="flex flex-col gap-4">
                  <a href="https://t.me/AiConsult3" target="_blank" rel="noopener" className="flex items-center gap-3 text-slate-400 hover:text-orange-500 transition-colors font-medium group">
                    <span className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-white group-hover:bg-orange-600 transition-colors shadow-md">
                      <span className="text-lg group-hover:scale-110 transition-transform">✈️</span>
                    </span>
                    @AiConsult3
                  </a>
                  <a href="mailto:k-sosedov@yandex.ru" className="flex items-center gap-3 text-slate-400 hover:text-orange-500 transition-colors font-medium group">
                    <span className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-white group-hover:bg-orange-600 transition-colors shadow-md">
                      <span className="text-lg group-hover:scale-110 transition-transform">📧</span>
                    </span>
                    k-sosedov@yandex.ru
                  </a>
                </div>
              </div>
            </div>

          </div>

          <div className="border-t border-slate-800/80 pt-8 pb-4 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-500 text-sm font-medium">© 2026 ОРЁЛ. Все права защищены.</p>
            <div className="flex gap-8">
              <a href="/privacy-policy.html" className="text-slate-500 hover:text-slate-300 transition-colors text-sm font-medium">Политика конфиденциальности</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Cookie Banner */}
      <CookieBanner />

      {/* Lead Form Modal */}
      <LeadForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />

      {/* Toast Notifications */}
      <Toaster position="top-center" richColors />
    </div>
  )
}

export default App
