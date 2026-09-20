import { useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from 'framer-motion'
import {
  ArrowDown,
  ArrowRight,
  Camera,
  ChevronDown,
  Menu,
  MessageCircle,
  Play,
  Send,
  ShieldCheck,
  X,
} from 'lucide-react'
import { buildWhatsAppBookingUrl } from './whatsapp.js'

const TELEGRAM_CHANNEL_URL = 'https://t.me/ramazanovanai'
const CONSULTATION_URL = buildWhatsAppBookingUrl('Консультация гинеколога-хирурга')

const CONTACTS = {
  whatsapp: CONSULTATION_URL,
  telegram: TELEGRAM_CHANNEL_URL,
  instagram: 'https://www.instagram.com/dr.ramazanovan/',
}

const serviceGroups = [
  {
    id: 'consultation',
    title: 'Консультация',
    services: [
      {
        title: 'Консультация гинеколога-хирурга',
        text: 'Индивидуальная консультация для оценки состояния органов малого таза, тазового дна и интимной зоны.',
        action: 'Записаться на консультацию',
        icon: '/assets/icon-consultation.webp',
      },
    ],
  },
  {
    id: 'operations',
    title: 'Операции',
    services: [
      {
        title: 'Реконструкция тазового дна субфасциальной техникой',
        text: 'Реконструктивная операция, направленная на восстановление анатомии и функции тазового дна.',
        detailsTitle: 'Может применяться при:',
        details: [
          'опущении и выпадении органов малого таза;',
          'нарушении поддержки тазовых органов;',
          'некоторых формах недержания мочи;',
          'последствиях родов и других повреждений тканей тазового дна.',
        ],
        action: 'Записаться на операцию',
        icon: '/assets/icon-reconstruction.webp',
      },
      {
        title: 'Хирургическая эстетика вульвы',
        text: 'Хирургическая коррекция интимной зоны с учётом анатомических особенностей и пожеланий пациентки.',
        detailsTitle: 'Включает:',
        details: [
          {
            title: 'Лабиопластика',
            text: 'Коррекция формы и размера малых половых губ. В том числе наиболее востребованная форма — «крылья бабочки».',
          },
          {
            title: 'Клиторальная пластика',
            text: 'Коррекция области капюшона клитора по показаниям и эстетическим запросам пациентки.',
          },
          {
            title: 'Пластика больших половых губ',
            text: 'Коррекция формы и объёма больших половых губ.',
          },
        ],
        action: 'Записаться на операцию',
        icon: '/assets/icon-aesthetics.webp',
      },
      {
        title: 'Комплекс «Жена миллионера»',
        text: 'Комплексная операция для пациенток, которые хотят одновременно решить функциональные и эстетические задачи интимной зоны.',
        detailsTitle: 'В зависимости от индивидуальных показаний комплекс может включать:',
        details: [
          'реконструкцию тазового дна;',
          'коррекцию цистоцеле и ректоцеле;',
          'пластику малых и больших половых губ;',
          'коррекцию капюшона клитора;',
          'комплексную эстетическую коррекцию вульвы.',
        ],
        action: 'Записаться на операцию',
        icon: '/assets/icon-reconstruction.webp',
      },
      {
        title: 'Гинекологические операции лапароскопическим доступом',
        text: 'Минимально инвазивный хирургический доступ, при котором операция выполняется через небольшие проколы передней брюшной стенки.',
        details: [
          {
            title: 'Кисты яичников',
            text: 'Удаление кисты с максимально бережным отношением к здоровой ткани яичника.',
          },
          {
            title: 'Миома матки',
            text: 'Лапароскопическое удаление миоматозных узлов с сохранением матки, если это возможно и соответствует клинической ситуации.',
          },
          {
            title: 'Эндометриоз малого таза',
            text: 'Удаление очагов эндометриоза и лечение спаечного процесса для уменьшения боли и восстановления анатомии органов малого таза.',
          },
          {
            title: 'Спаечный процесс в малом тазу',
            text: 'Лапароскопическое рассечение спаек для восстановления нормального расположения и подвижности органов.',
          },
          {
            title: 'Внематочная беременность',
            text: 'Лапароскопическое хирургическое лечение внематочной беременности с выбором тактики с учётом состояния пациентки и расположения беременности.',
          },
          {
            title: 'Проверка проходимости маточных труб',
            text: 'Оценка проходимости маточных труб во время лапароскопии с помощью специального диагностического раствора.',
          },
          {
            title: 'Диагностическая лапароскопия',
            text: 'Малоинвазивное исследование органов малого таза для уточнения причины боли, бесплодия или других гинекологических симптомов и постановки точного диагноза.',
          },
        ],
        action: 'Записаться на операцию',
        icon: '/assets/icon-consultation.webp',
      },
      {
        title: 'Внутриматочные операции',
        details: ['Гистерорезектоскопия'],
        action: 'Записаться на операцию',
        icon: '/assets/icon-reconstruction.webp',
      },
    ],
  },
  {
    id: 'non-surgical-aesthetics',
    title: 'Неоперационная эстетическая гинекология',
    services: [
      {
        title: 'Процедуры интимной зоны',
        detailsTitle: 'Процедуры:',
        details: [
          {
            title: 'Точка G',
            text: 'Процедура с применением препаратов на основе гиалуроновой кислоты для коррекции данной зоны.',
          },
          {
            title: 'Придание объёма большим половым губам',
            text: 'Коррекция объёма и формы с использованием препаратов на основе гиалуроновой кислоты.',
          },
          {
            title: 'Восполнение объёмов промежности',
            text: 'Коррекция дефицита мягких тканей препаратами на основе гиалуроновой кислоты.',
          },
          {
            title: 'Сужение влагалища препаратами на основе гиалуроновой кислоты',
            text: '',
          },
          {
            title: 'Биоревитализация интимной зоны',
            text: 'Процедура для улучшения качества и состояния тканей интимной зоны.',
          },
          {
            title: 'Коллагенотерапия интимной зоны',
            text: 'Процедуры, направленные на улучшение качества тканей и стимуляцию процессов коллагенообразования.',
          },
        ],
        action: 'Записаться на процедуру',
        icon: '/assets/icon-aesthetics.webp',
      },
    ],
  },
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

const resultWorks = [
  { id: '01', image: '/assets/works/case-01.jpg', preview: '/assets/works/case-01-preview.jpg', aspectRatio: '4 / 5', title: 'Комплекс операций - Жена Миллионера.' },
  { id: '02', image: '/assets/works/case-02.jpg', preview: '/assets/works/case-02-preview.jpg', aspectRatio: '4 / 5', title: 'Реконструкция тазового дна субфасциальной техникой.' },
  { id: '03', image: '/assets/works/case-03.jpg', preview: '/assets/works/case-03-preview.jpg', aspectRatio: '4 / 5', title: 'Исправление после неудачной работы другого врача.' },
  { id: '04', image: '/assets/works/case-04.jpg', preview: '/assets/works/case-04-preview.jpg', aspectRatio: '4 / 5', title: 'Гименопластика, восстановление целостности девственной плевы.' },
  { id: '05', image: '/assets/works/case-05.jpg', preview: '/assets/works/case-05-preview.jpg', aspectRatio: '4 / 5', title: 'Эстетика вульвы с реконструкцией порванной половой губы в следствии травматичных родов.' },
  { id: '06', image: '/assets/works/case-06.jpg', preview: '/assets/works/case-06-preview.jpg', aspectRatio: '4 / 5', title: 'Эстетика вульвы.Пластика малых половых губ. Подтяжка клитора' },
  {
    id: '07',
    image: '/assets/works/case-07-after.jpg',
    preview: '/assets/works/case-07-after-preview.jpg',
    aspectRatio: '4 / 5',
    title: 'Липофилинг больших половых губ, восполнение объема собственным жиром',
    showLabels: false,
  },
  {
    id: '08',
    image: '/assets/works/case-07-before.jpg',
    preview: '/assets/works/case-07-before-preview.jpg',
    aspectRatio: '4 / 5',
    title: 'Установка слинга ( сетчатого импланта ) при недержании мочи + реконструкция тазового дна субфасциальной техникой',
    showLabels: false,
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
    ['Услуги', '#services'],
    ['Результаты', '#results'],
    ['Отзывы', '#reviews'],
  ]

  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label="На главную">
        <span className="brand-mark"><img src="/assets/logo-nr-gpt-image-2-5.webp" alt="" /></span>
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
  const hasCompactDetails = service.details?.every((detail) => typeof detail === 'string')
  return (
    <Reveal className="service-card" delay={Math.min(index * 0.05, 0.15)}>
      <article>
        <div className="service-card-header">
          <div className="service-icon-wrap"><img src={service.icon} alt="" /></div>
          <div className="service-card-title">
            <h3>{service.title}</h3>
            {service.text && <p>{service.text}</p>}
          </div>
        </div>

        {service.details?.length > 0 && (
          <div className="service-card-details">
            {service.detailsTitle && <p className="service-details-title">{service.detailsTitle}</p>}
            <ul className={`service-procedure-list ${hasCompactDetails ? 'is-compact' : ''}`}>
              {service.details.map((detail) => {
                const title = typeof detail === 'string' ? detail : detail.title
                return (
                  <li key={title}>
                    <span className="detail-dot" />
                    {typeof detail === 'string' ? (
                      <p>{detail}</p>
                    ) : (
                      <div>
                        <h4>{detail.title}</h4>
                        {detail.status && <span className="service-status">{detail.status}</span>}
                        <p>{detail.text}</p>
                      </div>
                    )}
                  </li>
                )
              })}
            </ul>
          </div>
        )}

        <a
          className="button service-action"
          href={buildWhatsAppBookingUrl(service.title)}
          target="_blank"
          rel="noopener noreferrer"
        >
          {service.action}<ArrowRight />
        </a>
      </article>
    </Reveal>
  )
}

function ResultCard({ work, index }) {
  const [revealed, setRevealed] = useState(false)
  const actionLabel = `${revealed ? 'Скрыть' : 'Показать'} медицинские фотографии — клинический случай ${work.id}`

  return (
    <Reveal className={`result-card ${work.showLabels === false ? 'is-single' : ''} ${revealed ? 'is-revealed' : ''}`} delay={Math.min(index * 0.06, 0.24)}>
      <button
        className="result-visual"
        type="button"
        style={{ '--result-aspect': work.aspectRatio }}
        onClick={() => setRevealed((value) => !value)}
        aria-label={actionLabel}
        aria-pressed={revealed}
      >
        <span className="result-media">
          <img
            src={revealed ? work.image : work.preview}
            alt=""
            loading="lazy"
            decoding="async"
            draggable="false"
          />
        </span>
        <span className="age-mark" aria-label="Материалы для лиц старше 18 лет">18+</span>
        {work.showLabels !== false && (
          <>
            <span className="before-label">До</span>
            <span className="after-label">После</span>
          </>
        )}
        <span className="privacy-badge">
          <ShieldCheck />
          <span>{revealed ? 'Скрыть фотографию' : <>Медицинские материалы<br />Нажмите, чтобы посмотреть</>}</span>
        </span>
      </button>
      <div className="result-meta">
        {work.title ? <span>{work.title}</span> : <><span>Клинический случай {work.id}</span><span>До / после</span></>}
      </div>
    </Reveal>
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

export default function App() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 110, damping: 28, restDelta: 0.001 })

  return (
    <>
      <motion.div className="scroll-progress" style={{ scaleX }} />
      <Header />
      <main id="top">
        <section className="hero" id="about" aria-labelledby="hero-title">
          <motion.div
            className="hero-copy"
            initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="hero-copy-inner">
              <h1 id="hero-title">Рамазанова Наида Рамазановна</h1>

              <div className="hero-roles">
                <p>Врач — гинеколог-хирург, врач высшей категории</p>
                <p>Руководитель Центра реконструктивной и эстетической тазовой хирургии</p>
                <p>Непрерывный стаж работы — более 18 лет.</p>
              </div>

              <div className="hero-mobile-portrait">
                <img src="/assets/ginecolog-naida-hero-teal.png" alt="Врач-гинеколог Наида Рамазанова" />
              </div>

              <p className="hero-experience">
                За годы непрерывной практики Наида Рамазановна регулярно повышала квалификацию и проходила профессиональное обучение в ведущих медицинских центрах Москвы, Санкт-Петербурга и Стамбула.
              </p>

              <div className="hero-positioning">
                <h2>Комплексный подход к решению проблем тазового дна и интимной зоны.</h2>
                <p>Диагностика, реконструктивная и эстетическая хирургия, а также современные методы неоперационной эстетической гинекологии — с индивидуальным подбором тактики лечения для каждой пациентки.</p>
              </div>

              <div className="hero-bottom">
                <div className="hero-stats" aria-label="Ключевые цифры">
                  <div><strong>18+</strong><span>лет непрерывной врачебной практики</span></div>
                  <div><strong>10 000+</strong><span>пациенток</span></div>
                </div>
                <div className="hero-actions">
                  <a className="button" href="#booking">Записаться<ArrowRight /></a>
                  <a className="quiet-link" href="#services">Направления работы<ArrowDown /></a>
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div className="hero-visual" initial={{ opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}>
            <img src="/assets/ginecolog-naida-hero-left-140px-teal.png" alt="Врач-гинеколог Наида Рамазанова" fetchPriority="high" />
          </motion.div>
        </section>

        <section className="services section-shell" id="services" aria-labelledby="services-title">
          <Reveal className="section-heading">
            <h2 id="services-title">Услуги</h2>
            <p>Консультация, хирургическое лечение и неоперационные процедуры — каждое направление начинается с индивидуальной оценки.</p>
          </Reveal>
          <div className="service-groups">
            {serviceGroups.map((group) => (
              <section className="service-group" aria-labelledby={`service-group-${group.id}`} key={group.id}>
                <div className="service-group-label">
                  <span>Направление</span>
                  <h3 id={`service-group-${group.id}`}>{group.title}</h3>
                </div>
                <div className="service-cards">
                  {group.services.map((service, index) => <ServiceCard service={service} index={index} key={service.title} />)}
                </div>
              </section>
            ))}
          </div>
        </section>

        <section className="results" id="results">
          <div className="section-shell">
            <Reveal className="results-heading">
              <div><p className="eyebrow light">Результаты работы</p><h2>ДО / ПОСЛЕ</h2></div>
              <p>Фотографии «до / после» публикуются только с согласия пациенток и с сохранением медицинской конфиденциальности.</p>
            </Reveal>
            <div className="results-grid">
              {resultWorks.map((work, index) => <ResultCard work={work} index={index} key={work.id} />)}
            </div>
            <Reveal className="telegram-card" delay={0.2}>
              <div className="telegram-card-intro">
                <span className="telegram-icon" aria-hidden="true"><Send /></span>
                <p className="eyebrow light">Закрытый Telegram-канал</p>
              </div>
              <h3>Больше результатов — в закрытом Telegram-канале.</h3>
              <a
                className="button button-light"
                href={TELEGRAM_CHANNEL_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                Перейти в канал<ArrowRight />
              </a>
            </Reveal>
          </div>
        </section>

        <section className="reviews section-shell" id="reviews">
          <Reveal className="section-heading split-heading">
            <div><h2>Отзывы пациенток</h2></div>
            <p>Реальные истории пациенток о самочувствии, лечении и возвращении к привычной жизни.</p>
          </Reveal>
          <div className="video-reviews-grid">
            {videoReviews.map((review, index) => <VideoReview review={review} index={index} key={review.src} />)}
          </div>
          <p className="reviews-privacy"><ShieldCheck /> Лица пациенток скрыты. Материалы размещены с сохранением медицинской конфиденциальности.</p>
        </section>

        

        <section className="booking" id="booking" aria-labelledby="booking-title">
          <div className="booking-orbit orbit-one" /><div className="booking-orbit orbit-two" />
          <div className="section-shell booking-grid">
            <Reveal className="booking-heading">
              <p className="eyebrow light">Начните с консультации</p>
              <h2 id="booking-title">Запишитесь на консультацию к гинекологу-хирургу</h2>
            </Reveal>
            <Reveal className="booking-actions" delay={0.12}>
              <div className="booking-text">
                <p>Если вас беспокоят изменения в интимной зоне, симптомы опущения органов малого таза, недержание мочи или вы хотите обсудить эстетическую коррекцию — начните с консультации.</p>
                <p>Врач оценит состояние и поможет определить оптимальную тактику лечения.</p>
              </div>
              <a className="button button-light booking-cta" href={CONSULTATION_URL} target="_blank" rel="noopener noreferrer">Записаться<ArrowRight /></a>
              <div className="social-links" aria-label="Связаться в социальных сетях">
                <a href={CONTACTS.whatsapp} target="_blank" rel="noopener noreferrer"><MessageCircle />WhatsApp</a>
                <a href={CONTACTS.telegram} target="_blank" rel="noopener noreferrer"><Send />Telegram</a>
                <a href={CONTACTS.instagram} target="_blank" rel="noopener noreferrer"><Camera />Instagram</a>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <footer className="footer">
        <div className="section-shell footer-inner">
          <a className="brand" href="#top"><span className="brand-mark"><img src="/assets/logo-nr-gpt-image-2-5.webp" alt="" /></span><span className="brand-name">Наида Рамазанова</span></a>
          <p>Информация на сайте не является медицинской консультацией. Имеются противопоказания — необходима консультация специалиста.</p>
          <a href="#top" className="to-top">Наверх<ArrowDown /></a>
        </div>
      </footer>
    </>
  )
}
