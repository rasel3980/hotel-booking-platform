import React from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import bgimg1 from '../assets/images/slider1.jpg';
import bgimg2 from '../assets/images/slider2.jpg';
import bgimg3 from '../assets/images/slider3.jpg';
import Slide from './Slide';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';

interface SlideData {
  image: string;
  text: string;
}

const slides: SlideData[] = [
  { image: bgimg1, text: 'Charming farmhouse surrounded by greenery, perfect for family retreats' },
  { image: bgimg2, text: 'A cozy cottage with lake views, perfect for a peaceful retreat.' },
  { image: bgimg3, text: 'A serene bungalow with ocean views, perfect for relaxation.' },
];
const Carousel: React.FC = () => {
  return (
    <>
      <style>{`
        .carousel-wrap {
          position: relative;
          width: 100%;
        }

        /* ── Pagination dots ── */
        .carousel-wrap .swiper-pagination {
          bottom: 24px;
          z-index: 20;
        }
        .carousel-wrap .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          background: rgba(255,255,255,0.4);
          opacity: 1;
          border-radius: 9999px;
          transition: all 0.3s ease;
          margin: 0 4px !important;
        }
        .carousel-wrap .swiper-pagination-bullet-active {
          background: #f59e0b;
          width: 28px;
          border-radius: 9999px;
        }

        /* ── Navigation arrows ── */
        .carousel-wrap .swiper-button-next,
        .carousel-wrap .swiper-button-prev {
          width: 44px;
          height: 44px;
          background: rgba(10, 20, 40, 0.55);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(251,191,36,0.25);
          border-radius: 50%;
          color: #f59e0b;
          transition: all 0.25s ease;
        }
        .carousel-wrap .swiper-button-next:hover,
        .carousel-wrap .swiper-button-prev:hover {
          background: rgba(245,158,11,0.85);
          border-color: #f59e0b;
          color: #0a1428;
          transform: scale(1.08);
        }
        .carousel-wrap .swiper-button-next::after,
        .carousel-wrap .swiper-button-prev::after {
          font-size: 14px;
          font-weight: 700;
        }

        /* ── Slide transition ── */
        .carousel-wrap .swiper-slide {
          opacity: 0;
          transition: opacity 0.6s ease;
        }
        .carousel-wrap .swiper-slide-active {
          opacity: 1;
        }
      `}</style>

      <div className="carousel-wrap">
        <Swiper
          spaceBetween={0}
          centeredSlides={true}
          loop={true}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <Slide image={slide.image} text={slide.text} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default Carousel;