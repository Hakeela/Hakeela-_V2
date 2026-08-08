import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import { getCatalog } from '../../lib/data.js'
import './dashboard-pages.css'

// category -> section presentation
const SECTIONS = [
  { category: 'Courses', title: 'Courses', subtitle: 'Select from our wide range of courses and get started!', wide: false },
  { category: 'Special Needs & Tech', title: 'Special Need and Tech Courses', subtitle: 'Kindly note these courses are available anytime, any day, anywhere for our learners with special needs', wide: true },
  { category: 'Leadership', title: 'Leadership Courses', subtitle: 'In partnership with Ashoka Africa, We are Family Foundation, among others to provide Leadership courses for our learners.', wide: true },
]

const naira = (n) => (n === 0 ? 'Free' : '₦' + Number(n).toLocaleString('en-NG'))

function Arrow({ dir, onClick }) {
  return (
    <button className="cat-arrow" aria-label={dir === 'next' ? 'Next' : 'Previous'} onClick={onClick}>
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {dir === 'next' ? <><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></> : <><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></>}
      </svg>
    </button>
  )
}

function CourseRow({ title, subtitle, items, wide }) {
  const ref = useRef(null)
  if (!items || items.length === 0) return null
  return (
    <section className="cat-section">
      <h3 className="dash-section-title">{title}</h3>
      <p className="cat-section__sub">{subtitle}</p>

      <Swiper
        className="cat-swiper"
        onSwiper={(s) => (ref.current = s)}
        slidesPerView={1}
        spaceBetween={24}
        breakpoints={wide ? { 760: { slidesPerView: 2 } } : { 640: { slidesPerView: 2 }, 1080: { slidesPerView: 3 } }}
      >
        {items.map((c) => (
          <SwiperSlide key={c.id}>
            <article className={`cat-card ${wide ? 'cat-card--wide' : ''}`}>
              <div className="cat-card__media"><img src={c.thumbnail_url || '/gain-1.png'} alt="" /></div>
              <div className="cat-card__body">
                <h4 className="cat-card__title">{c.title}</h4>
                <p className="cat-card__desc">{c.description}</p>
                <div className="cat-card__foot">
                  <span className="cat-card__price">{naira(c.price)}</span>
                  <Link to={`/dashboard/enroll/${c.id}`} className="dash-btn dash-btn--outline cat-card__enroll">Enroll</Link>
                </div>
              </div>
            </article>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="cat-nav">
        <Arrow dir="prev" onClick={() => ref.current?.slidePrev()} />
        <Arrow dir="next" onClick={() => ref.current?.slideNext()} />
      </div>
    </section>
  )
}

function Catalog() {
  const [byCategory, setByCategory] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    getCatalog()
      .then((g) => active && setByCategory(g))
      .catch(() => active && setByCategory({}))
      .finally(() => active && setLoading(false))
    return () => { active = false }
  }, [])

  return (
    <div className="dashpg">
      <div className="cat-intro">
        <svg className="cat-intro__swoosh" viewBox="0 0 110 16" fill="none" aria-hidden="true">
          <path d="M4 13 Q55 1 106 13" stroke="var(--hak-yellow)" strokeWidth="4" strokeLinecap="round" />
        </svg>
        <h2 className="cat-intro__title">Select the program you want to join</h2>
        <p className="cat-intro__lead">If you already started an application, please make sure you finish it before the deadline!</p>
        <p className="cat-intro__note">Please note</p>
        <ul className="cat-intro__list">
          <li>You can only enroll in one program at a time</li>
          <li>Your application status is final and can&apos;t be altered, until the program deadline</li>
          <li>The program is for 3 months only, make the most out of it.</li>
        </ul>
      </div>

      {loading ? (
        <p style={{ color: '#8a8a8a' }}>Loading courses…</p>
      ) : (
        SECTIONS.map((s) => (
          <CourseRow key={s.category} title={s.title} subtitle={s.subtitle} items={byCategory[s.category]} wide={s.wide} />
        ))
      )}
    </div>
  )
}

export default Catalog
