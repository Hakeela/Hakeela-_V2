import { useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import './Courses.css'

const courses = [
  { image: '/course-1.png', title: 'Experteens VA Bootcamp' },
  { image: '/course-2.png', title: 'Hakeela AI Hustle Bootcamp' },
  { image: '/course-3.png', title: 'Hakeela Blockchain Challenge' },
]

function Courses() {
  const swiperRef = useRef(null)

  return (
    <section className="courses">
      <div className="courses__inner">
        <header className="courses__head">
          <h2 className="courses__title">Courses</h2>
          <p className="courses__subtitle">
            Select from our wide range of courses and get started!
          </p>
        </header>

        <Swiper
          className="courses__swiper"
          onSwiper={(s) => (swiperRef.current = s)}
          slidesPerView={1}
          spaceBetween={24}
          centerInsufficientSlides={true}
          breakpoints={{
            600: { slidesPerView: 2, spaceBetween: 24 },
            960: { slidesPerView: 3, spaceBetween: 28 },
          }}
        >
          {courses.map((course) => (
            <SwiperSlide key={course.title}>
              <article className="course-card">
                <div className="course-card__img">
                  <img src={course.image} alt="" />
                </div>
                <h3 className="course-card__title">{course.title}</h3>
                <a href="#" className="course-card__btn">Enroll</a>
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

export default Courses
