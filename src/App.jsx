import { useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from 'framer-motion'
import {
  ArrowDown,
  ArrowRight,
  Camera,
  ChevronDown,
  CircleCheck,
  Menu,
  MessageCircle,
  Play,
  Send,
  ShieldCheck,
  Sparkles,
  X,
} from 'lucide-react'

const CONTACTS = {
  whatsapp: '#booking',
  telegram: '#booking',
  instagram: '#booking',
}

const services = [
  {
    label: 'Первичный шаг',
    title: 'Консультация гинеколога-хирурга',
    text: 'Индивидуальная консультация для оценки состояния органов малого таза, тазового дна и интимной зоны.',
    details: [
      ['Бережный диалог', 'Обсудим симптомы, ожидания и вопросы без неловкости и спешки.'],
      ['Персональная тактика', 'После осмотра врач предложит подходящий маршрут диагностики и лечения.'],
    ],
    action: 'Записаться на консультацию',
    icon: '/assets/icon-consultation.webp',
  },
  {
    label: 'Реконструктивная хирургия',
    title: 'Реконструкция тазового дна',
    text: 'Субфасциальная техника для восстановления анатомии и функции тазового дна.',
    details: [
      ['Когда может применяться', 'При опущении органов малого таза, нарушении их поддержки, некоторых формах недержания мочи и последствиях родов.'],
      ['Цель операции', 'Восстановить поддержку тазовых органов с учётом анатомии и индивидуальных показаний.'],
    ],
    action: 'Обсудить операцию',
    icon: '/assets/icon-reconstruction.webp',
  },
  {
    label: 'Эстетическая хирургия',
    title: 'Хирургическая эстетика вульвы',
    text: 'Коррекция интимной зоны с учётом анатомических особенностей и пожеланий пациентки.',
    details: [
      ['Лабиопластика', 'Коррекция формы и размера малых половых губ, включая форму «крылья бабочки».'],
      ['Клиторальная пластика', 'Коррекция области капюшона клитора по показаниям и эстетическим запросам.'],
      ['Пластика больших половых губ', 'Коррекция формы и объёма больших половых губ.'],
    ],
    action: 'Обсудить операцию',
    icon: '/assets/icon-aesthetics.webp',
  },
  {
    label: 'Комплексная коррекция',
    title: 'Комплекс «Жена миллионера»',
    text: 'Одна индивидуальная программа для одновременного решения функциональных и эстетических задач.',
    details: [
      ['Возможный состав', 'Реконструкция тазового дна, коррекция цистоцеле и ректоцеле, пластика малых и больших половых губ.'],
      ['Только по показаниям', 'Объём вмешательства определяется персонально после консультации и обследования.'],
    ],
    action: 'Записаться на консультацию',
    icon: '/assets/icon-reconstruction.webp',
  },
  {
    label: 'Малоинвазивная хирургия',
    title: 'Лапароскопические операции',
    text: 'Операции через небольшие проколы передней брюшной стенки с бережным отношением к тканям.',
    details: [
      ['Кисты яичников', 'Удаление кисты с максимальным сохранением здоровой ткани яичника.'],
      ['Миома матки', 'Удаление миоматозных узлов с сохранением матки, когда это возможно.'],
      ['Эндометриоз и спаечный процесс', 'Удаление очагов, рассечение спаек и восстановление анатомии органов малого таза.'],
      ['Диагностика', 'Проверка проходимости маточных труб и диагностическая лапароскопия.'],
      ['Внематочная беременность', 'Выбор хирургической тактики с учётом состояния пациентки и клинической ситуации.'],
    ],
    action: 'Обсудить операцию',
    icon: '/assets/icon-consultation.webp',
  },
  {
    label: 'Неоперационные методы',
    title: 'Эстетическая гинекология',
    text: 'Современные процедуры для коррекции объёма и улучшения качества тканей интимной зоны.',
    details: [
      ['Контурная коррекция', 'Коррекция зоны точки G, объёма больших половых губ и мягких тканей промежности препаратами на основе гиалуроновой кислоты.'],
      ['Качество тканей', 'Биоревитализация и коллагенотерапия интимной зоны.'],
      ['Персональный выбор', 'Подходящая процедура и препарат определяются только после консультации врача.'],
    ],
    action: 'Записаться на процедуру',
    icon: '/assets/icon-aesthetics.webp',
  },
]

const faq = [
  ['С чего начать, если я не знаю, какая процедура мне нужна?', 'Начните с консультации. Врач уточнит жалобы, проведёт осмотр и объяснит, какие методы подходят именно в вашей ситуации.'],
  ['Можно ли совместить функциональную и эстетическую коррекцию?', 'Да, в ряде случаев задачи можно объединить в одну персональную программу. Возможность и объём вмешательства определяются после обследования.'],
  ['Как обеспечивается конфиденциальность?', 'Персональные данные и медицинские материалы не публикуются без отдельного согласия пациентки. Результаты показываются деликатно и обезличенно.'],
  ['Подойдёт ли мне лапароскопическая операция?', 'Это зависит от диагноза, истории заболевания и результатов обследования. На консультации врач оценит показания и обсудит возможные альтернативы.'],
]

const videoReviews = [
  {
    title: 'История пациентки',
    description: 'Личный опыт обращения и наблюдения',
    duration: '00:34',
    src: '/videos/review-1.mp4',
    poster: '/assets/reviews/review-1.webp',
  },
  {
    title: 'После реконструкции тазового дна',
    description: 'Отзыв о самочувствии после операции',
    duration: '00:47',
    src: '/videos/review-2.mp4',
    poster: '/assets/reviews/review-2.webp',
  },
  {
    title: 'После лечения',
    description: 'Короткий видеоотзыв пациентки',
    duration: '00:21',
    src: '/videos/review-3.mp4',
    poster: '/assets/reviews/review-3.webp',
  },
]

const reveal = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
}

function Reveal({ children, className = '', delay = 0 }) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      className={className}
      variants={reveal}
      initial={reduceMotion ? 'visible' : 'hidden'}
      whileInView="visible"
      viewport={{ once: true, amount: 0.16 }}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

function Header() {
  const [open, setOpen] = useState(false)
  const items = [
    ['О враче', '#about'],
    ['Направления', '#services'],
    ['Результаты', '#results'],
    ['Отзывы', '#reviews'],
  ]

  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label="На главную">
        <span className="brand-mark">NR</span>
        <span className="brand-name">Наида Рамазанова</span>
      </a>
      <nav className="desktop-nav" aria-label="Основная навигация">
        {items.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
      </nav>
      <a className="button button-small desktop-cta" href="#booking">Записаться</a>
      <button className="menu-button" onClick={() => setOpen((value) => !value)} aria-label="Открыть меню" aria-expanded={open}>
        {open ? <X /> : <Menu />}
      </button>
      <AnimatePresence>
        {open && (
          <motion.nav
            className="mobile-nav"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            aria-label="Мобильная навигация"
          >
            {items.map(([label, href]) => <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>)}
            <a className="button" href="#booking" onClick={() => setOpen(false)}>Записаться</a>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}

function ServiceCard({ service, index }) {
  const [open, setOpen] = useState(index === 0)

  return (
    <motion.article className={`service-card ${open ? 'is-open' : ''}`} layout>
      <button className="service-summary" onClick={() => setOpen((value) => !value)} aria-expanded={open}>
        <span className="service-index">{String(index + 1).padStart(2, '0')}</span>
        <span className="service-icon-wrap"><img src={service.icon} alt="" /></span>
        <span className="service-heading">
          <span className="eyebrow">{service.label}</span>
          <span className="service-title">{service.title}</span>
          <span className="service-text">{service.text}</span>
        </span>
        <span className="service-toggle"><ChevronDown /></span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            className="service-body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="service-details">
              {service.details.map(([title, text]) => (
                <div className="detail-item" key={title}>
                  <span className="detail-dot" />
                  <div><h4>{title}</h4><p>{text}</p></div>
                </div>
              ))}
            </div>
            <a className="text-link" href="#booking">{service.action}<ArrowRight /></a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  )
}

function FAQItem({ question, answer }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="faq-item">
      <button onClick={() => setOpen((value) => !value)} aria-expanded={open}>
        <span>{question}</span><ChevronDown className={open ? 'rotated' : ''} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
            {answer}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

function VideoReview({ review, index }) {
  const videoRef = useRef(null)
  const [playing, setPlaying] = useState(false)

  const play = () => {
    setPlaying(true)
    videoRef.current?.play()
  }

  return (
    <Reveal className="video-review-card" delay={index * 0.08}>
      <div className="video-frame">
        <video
          ref={videoRef}
          src={review.src}
          poster={review.poster}
          controls
          preload="metadata"
          playsInline
          onPause={() => setPlaying(false)}
          onEnded={() => setPlaying(false)}
          aria-label={review.title}
        />
        {!playing && (
          <button className="video-play" onClick={play} aria-label={`Смотреть: ${review.title}`}>
            <Play fill="currentColor" />
          </button>
        )}
        <span className="video-duration">{review.duration}</span>
      </div>
      <div className="video-caption">
        <p>{review.title}</p>
        <span>{review.description}</span>
      </div>
    </Reveal>
  )
}

function BookingForm() {
  const [sent, setSent] = useState(false)

  const submit = (event) => {
    event.preventDefault()
    setSent(true)
  }

  if (sent) {
    return (
      <motion.div className="success-card" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} role="status">
        <CircleCheck />
        <h3>Заявка подготовлена</h3>
        <p>Форма работает в деморежиме. Подключите CRM или почту, чтобы заявки приходили администратору.</p>
        <button className="text-link light" onClick={() => setSent(false)}>Отправить ещё одну</button>
      </motion.div>
    )
  }

  return (
    <form className="booking-form" onSubmit={submit}>
      <label><span>Ваше имя</span><input name="name" autoComplete="name" placeholder="Как к вам обращаться" required /></label>
      <label><span>Телефон</span><input name="phone" type="tel" autoComplete="tel" placeholder="+7 (___) ___-__-__" required /></label>
      <label><span>Что хотите обсудить</span>
        <select name="topic" defaultValue="">
          <option value="" disabled>Выберите направление</option>
          <option>Консультация</option>
          <option>Реконструктивная хирургия</option>
          <option>Эстетическая хирургия</option>
          <option>Лапароскопия</option>
          <option>Неоперационная гинекология</option>
        </select>
      </label>
      <label className="consent"><input type="checkbox" required /><span>Я согласна на обработку персональных данных</span></label>
      <button className="button button-light" type="submit">Записаться на консультацию<ArrowRight /></button>
    </form>
  )
}

export default function App() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 110, damping: 28, restDelta: 0.001 })

  return (
    <>
      <motion.div className="scroll-progress" style={{ scaleX }} />
      <Header />
      <main id="top">
        <section className="hero" id="about">
          <div className="hero-copy">
            <motion.p className="eyebrow hero-kicker" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}>Гинекологическая хирургия · 18+ лет практики</motion.p>
            <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}>
              Возвращая<br /><em>уверенность</em><br />в своём теле
            </motion.h1>
            <motion.p className="hero-lead" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
              Комплексный подход к здоровью тазового дна и интимной зоны — от точной диагностики до восстановления.
            </motion.p>
            <motion.div className="hero-actions" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
              <a className="button" href="#booking">Записаться на консультацию<ArrowRight /></a>
              <a className="quiet-link" href="#services">Узнать о направлениях<ArrowDown /></a>
            </motion.div>
            <motion.div className="doctor-line" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }}>
              <span className="doctor-monogram">НР</span>
              <p><strong>Рамазанова Наида Рамазановна</strong><span>Врач высшей категории</span></p>
            </motion.div>
          </div>
          <motion.div className="hero-visual" initial={{ opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}>
            <img src="/assets/hero-calla.webp" alt="Калла — символ деликатности и точности" fetchPriority="high" />
            <div className="hero-stamp"><span>18</span><p>лет<br />непрерывной<br />практики</p></div>
            <p className="image-note">Диагностика · хирургия · восстановление</p>
          </motion.div>
        </section>

        <section className="credentials section-shell">
          <Reveal className="credentials-grid">
            <div className="credential-intro">
              <p className="eyebrow">О враче</p>
              <h2>Опыт, который помогает видеть ситуацию <em>целиком</em></h2>
            </div>
            <div className="doctor-bio">
              <p className="large-copy">Врач — гинеколог-хирург, руководитель Центра реконструктивной и эстетической тазовой хирургии.</p>
              <p>Наида Рамазановна регулярно повышает квалификацию и проходила профессиональное обучение в ведущих медицинских центрах Москвы, Санкт-Петербурга и Стамбула.</p>
              <div className="stats">
                <div><strong>18+</strong><span>лет непрерывной врачебной практики</span></div>
                <div><strong>10 000+</strong><span>пациенток</span></div>
              </div>
            </div>
          </Reveal>
        </section>

        <section className="philosophy">
          <div className="section-shell philosophy-grid">
            <Reveal className="philosophy-title">
              <p className="eyebrow light">Принцип работы</p>
              <h2>Не выбирать между здоровьем и эстетикой.</h2>
            </Reveal>
            <Reveal className="philosophy-copy" delay={0.1}>
              <p>Диагностика, реконструктивная и эстетическая хирургия, современные неоперационные методы — с индивидуальным подбором тактики для каждой пациентки.</p>
              <div className="principles">
                <span><ShieldCheck /> Конфиденциально</span>
                <span><Sparkles /> Индивидуально</span>
                <span><CircleCheck /> По показаниям</span>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="services section-shell" id="services">
          <Reveal className="section-heading">
            <p className="eyebrow">Направления работы</p>
            <h2>От первого разговора<br />до восстановления</h2>
            <p>Нажмите на направление, чтобы узнать подробнее.</p>
          </Reveal>
          <div className="services-list">
            {services.map((service, index) => <ServiceCard service={service} index={index} key={service.title} />)}
          </div>
        </section>

        <section className="results" id="results">
          <div className="section-shell">
            <Reveal className="results-heading">
              <div><p className="eyebrow light">Результаты работы</p><h2>Изменения, о которых<br />говорят деликатно</h2></div>
              <p>Фотографии «до / после» публикуются только с согласия пациенток и с сохранением медицинской конфиденциальности.</p>
            </Reveal>
            <div className="results-grid">
              {['Реконструктивная хирургия', 'Эстетическая коррекция'].map((title, index) => (
                <Reveal className="result-card" delay={index * 0.1} key={title}>
                  <div className="result-visual">
                    <div className="privacy-blur" />
                    <span className="before-label">До</span><span className="after-label">После</span>
                    <div className="privacy-badge"><ShieldCheck /><span>Материалы доступны<br />в закрытом канале</span></div>
                  </div>
                  <div className="result-meta"><span>{title}</span><span>Срок и описание — после согласования</span></div>
                </Reveal>
              ))}
              <Reveal className="telegram-card" delay={0.2}>
                <Send />
                <p className="eyebrow light">Закрытый Telegram-канал</p>
                <h3>Больше результатов — в деликатном формате</h3>
                <p>Запросите доступ, чтобы посмотреть примеры работ и подробные разборы.</p>
                <a className="button button-light" href={CONTACTS.telegram}>Запросить доступ<ArrowRight /></a>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="reviews section-shell" id="reviews">
          <Reveal className="section-heading split-heading">
            <div><p className="eyebrow">Отзывы пациенток</p><h2>Важное —<br />от первого лица</h2></div>
            <p>Реальные истории пациенток о самочувствии, лечении и возвращении к привычной жизни.</p>
          </Reveal>
          <div className="video-reviews-grid">
            {videoReviews.map((review, index) => <VideoReview review={review} index={index} key={review.src} />)}
          </div>
          <p className="reviews-privacy"><ShieldCheck /> Лица пациенток скрыты. Материалы размещены с сохранением медицинской конфиденциальности.</p>
        </section>

        <section className="faq section-shell">
          <Reveal className="faq-layout">
            <div className="faq-title"><p className="eyebrow">Частые вопросы</p><h2>Спокойно о важном</h2></div>
            <div className="faq-list">{faq.map(([question, answer]) => <FAQItem question={question} answer={answer} key={question} />)}</div>
          </Reveal>
        </section>

        <section className="booking" id="booking">
          <div className="booking-orbit orbit-one" /><div className="booking-orbit orbit-two" />
          <div className="section-shell booking-grid">
            <Reveal className="booking-copy">
              <p className="eyebrow light">Начните с консультации</p>
              <h2>Обсудите то, что вас беспокоит, <em>без неловкости</em></h2>
              <p>Если вас беспокоят изменения в интимной зоне, симптомы опущения органов малого таза, недержание мочи или вы хотите обсудить эстетическую коррекцию — врач оценит состояние и поможет определить оптимальную тактику.</p>
              <div className="social-links" aria-label="Связаться в социальных сетях">
                <a href={CONTACTS.whatsapp}><MessageCircle />WhatsApp</a>
                <a href={CONTACTS.telegram}><Send />Telegram</a>
                <a href={CONTACTS.instagram}><Camera />Instagram</a>
              </div>
            </Reveal>
            <Reveal delay={0.12}><BookingForm /></Reveal>
          </div>
        </section>
      </main>
      <footer className="footer">
        <div className="section-shell footer-inner">
          <a className="brand" href="#top"><span className="brand-mark">NR</span><span className="brand-name">Наида Рамазанова</span></a>
          <p>Информация на сайте не является медицинской консультацией. Имеются противопоказания — необходима консультация специалиста.</p>
          <a href="#top" className="to-top">Наверх<ArrowDown /></a>
        </div>
      </footer>
    </>
  )
}
