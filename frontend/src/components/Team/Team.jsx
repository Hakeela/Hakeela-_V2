import { useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import './Team.css'

const team = [
  { img: '/team-victor.png', name: 'Victor Eyo', role: 'Founder, Director' },
  { img: '/team-toyi.png', name: 'Oluwatoyin Joy Yerokun', role: 'Information/Project Director' },
  { img: '/team-max.png', name: 'Edor Emmanuel', role: 'Chief Product Designer' },
  { img: '/team-comfort.png', name: 'Comfort Alphonsus', role: 'Chief Graphics Designer' },
  { img: '/team-michael.png', name: 'Nwogbaga Michael', role: 'Product Designer' },
]

function Team() {
  const swiperRef = useRef(null)

  return (
    <section className="team">
      <div className="team__inner">
        <header className="team__head">
          <h2 className="team__title">Meet our Team</h2>
          <p className="team__subtitle">
            Check out the unique individuals that are powering these amazing
            initiatives
          </p>
        </header>

        <Swiper
          className="team__swiper"
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          slidesPerView={1}
          spaceBetween={24}
          centerInsufficientSlides={true}
          breakpoints={{
            560: { slidesPerView: 2, spaceBetween: 24 },
            900: { slidesPerView: 3, spaceBetween: 32 },
            1280: { slidesPerView: 5, spaceBetween: 45 },
          }}
        >
          {team.map((member) => (
            <SwiperSlide key={member.name}>
              <article className="team-card">
                <div className="team-card__photo">
                  <img src={member.img} alt={member.name} />
                </div>
                <h3 className="team-card__name">{member.name}</h3>
                <p className="team-card__role">{member.role}</p>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="team__nav">
          <button
            className="team__arrow"
            aria-label="Previous"
            onClick={() => swiperRef.current?.slidePrev()}
          >
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
          </button>
          <button
            className="team__arrow"
            aria-label="Next"
            onClick={() => swiperRef.current?.slideNext()}
          >
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}

export default Team
