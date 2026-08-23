import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "./Partners.css";

// Per-logo width so each renders at a balanced visual size (tweak individually)
const partners = [
  { src: "/partner-knight.png", alt: "Partner", width: 70 },
  { src: "/partner-we.png", alt: "WE", width: 80 },
  { src: "/partner-experteens.png", alt: "Experteens", width: 115 },
  { src: "/partner-league.png", alt: "League of Innovators", width: 180 },
  { src: "/partner-ashoka.png", alt: "Ashoka", width: 180 },
  { src: "/partner-zeroup.jpeg", alt: "Zero Up Initiative", width: 160 },
  { src: "/partner-crif.jpeg", alt: "Children's Rights Innovation Fund", width: 170 },
  { src: "/partner-link.jpeg", alt: "Link Gadgets & Store", width: 90 },
];

function Partners() {
  return (
    <section className="partners">
      <div className="partners__inner">
        <div className="partners__label">
          <h2 className="partners__title">Partners:</h2>
        </div>

        <Swiper
          className="partners__swiper"
          modules={[Autoplay, FreeMode]}
          loop={true}
          freeMode={true}
          allowTouchMove={false}
          speed={3500}
          autoplay={{ delay: 0, disableOnInteraction: false }}
          slidesPerView={2}
          spaceBetween={24}
          breakpoints={{
            600: { slidesPerView: 2, spaceBetween: 32 },
            900: { slidesPerView: 3, spaceBetween: 40 },
            1200: { slidesPerView: 4, spaceBetween: 40 },
          }}
        >
          {partners.map((p) => (
            <SwiperSlide key={p.src}>
              <div className="partner-logo">
                <img src={p.src} alt={p.alt} style={{ width: `${p.width}px` }} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

export default Partners;
