import { useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'
import './Team.css'

// People sourced from the About page ("Meet the Individuals"), using the
// About images (yellow-circle cutouts). Roles kept from the homepage list
// where the person had one; the rest keep their About role.
const team = [
  { img: '/about-victor.png', name: 'Victor Eyo', role: 'Founder, Director' },
  { img: '/about-comfort.png', name: 'Comfort Alphonsus', role: 'Chief Graphics Designer' },
  { img: '/about-laurenz.png', name: 'Laurenz', role: 'Founder/CEO Hakeela' },
  { img: '/about-kavita.png', name: 'Kavita', role: 'Founder/CEO Hakeela' },
]

// Duplicated so Swiper has enough slides to loop seamlessly (4 members shown
// up to 4-at-a-time would otherwise disable looping and freeze the arrows).
const loopTeam = [...team, ...team]

// Social icons — links intentionally left empty (#) for now.
const Social = () => (
  <div className="about-member__socials">
    <a href="#" aria-label="LinkedIn">
      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM7.12 20.45H3.55V9h3.57v11.45ZM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.73V1.73C24 .77 23.21 0 22.23 0Z" /></svg>
    </a>
    <a href="#" aria-label="Instagram">
      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.43.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.43.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.72 3.72 0 0 1-1.38-.9 3.72 3.72 0 0 1-.9-1.38c-.16-.43-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.43-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16ZM12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63a5.88 5.88 0 0 0-2.12 1.38A5.88 5.88 0 0 0 .63 4.14c-.3.76-.5 1.64-.56 2.91C.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.3.79.72 1.46 1.38 2.12.66.66 1.33 1.07 2.12 1.38.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56.79-.3 1.46-.72 2.12-1.38.66-.66 1.07-1.33 1.38-2.12.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91a5.88 5.88 0 0 0-1.38-2.12A5.88 5.88 0 0 0 19.86.63c-.76-.3-1.64-.5-2.91-.56C15.67.01 15.26 0 12 0Zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.41-10.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88Z" /></svg>
    </a>
    <a href="#" aria-label="X">
      <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor"><path d="M18.9 1.15h3.68l-8.04 9.19L24 22.85h-7.41l-5.8-7.58-6.64 7.58H.46l8.6-9.83L0 1.15h7.6l5.24 6.93 6.06-6.93Zm-1.29 19.5h2.04L6.48 3.24H4.29L17.61 20.65Z" /></svg>
    </a>
  </div>
)

function Team() {
  const swiperRef = useRef(null)

  return (
    <section className="team">
      <div className="team__inner">
        <header className="team__head">
          <h2 className="team__title">Meet the Individuals, changing the world</h2>
        </header>

        <Swiper
          className="team__swiper"
          modules={[Autoplay]}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          rewind={true}
          observer={true}
          observeParents={true}
          speed={800}
          autoplay={{
            delay: 2200,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          slidesPerView={1}
          spaceBetween={24}
          breakpoints={{
            560: { slidesPerView: 2, spaceBetween: 24 },
            900: { slidesPerView: 3, spaceBetween: 32 },
            1280: { slidesPerView: 4, spaceBetween: 40 },
          }}
        >
          {loopTeam.map((member, i) => (
            <SwiperSlide key={`${member.name}-${i}`}>
              <article className="about-member">
                <div className="about-member__photo">
                  <img src={member.img} alt={member.name} />
                </div>
                <h3 className="about-member__name">{member.name}</h3>
                <p className="about-member__role">{member.role}</p>
                <Social />
              </article>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="team__nav">
          <button
            className="team__arrow"
            aria-label="Previous"
            onClick={() => swiperRef.current?.slidePrev(600)}
          >
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
          </button>
          <button
            className="team__arrow"
            aria-label="Next"
            onClick={() => swiperRef.current?.slideNext(600)}
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
