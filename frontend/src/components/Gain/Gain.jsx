import { useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import './Gain.css'

const cards = [
  {
    image: '/gain-1.png',
    title: 'Internship & Job Placements',
    body: 'Gain access to Internship opportunities and job placements after the 8 weeks program.',
  },
  {
    image: '/gain-2.png',
    title: 'Certification',
    body: 'Get a certificate of completion from Hakeela.',
  },
]

function Gain() {
  const swiperRef = useRef(null)

  return (
    <section className="gain">
      <div className="gain__inner">
        <header className="gain__head">
          <h2 className="gain__title">What you stand to gain</h2>
          <p className="gain__subtitle">
            Be a part of the Hakeela Margin Internship to enjoy these benefits
          </p>
        </header>

        <Swiper
          className="gain__swiper"
          onSwiper={(s) => (swiperRef.current = s)}
          slidesPerView={1}
          spaceBetween={24}
          centerInsufficientSlides={true}
          breakpoints={{ 760: { slidesPerView: 2, spaceBetween: 32 } }}
        >
          {cards.map((card) => (
            <SwiperSlide key={card.title}>
              <article className="gain-card">
                <div className="gain-card__img">
                  <img src={card.image} alt="" />
                </div>
                <h3 className="gain-card__title">{card.title}</h3>
                <p className="gain-card__body">{card.body}</p>
                <a href="#" className="gain-card__btn">Learn More</a>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="carousel-nav">
          <button className="carousel-arrow" aria-label="Previous" onClick={() => swiperRef.current?.slidePrev()}>
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></svg>
          </button>
          <button className="carousel-arrow" aria-label="Next" onClick={() => swiperRef.current?.slideNext()}>
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
          </button>
        </div>
      </div>
    </section>
  )
}

export default Gain
