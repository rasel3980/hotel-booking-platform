// Import Swiper React components

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

// import required modules

import bgimg1 from '../assets/images/slider1.jpg'
import bgimg2 from '../assets/images/slider2.jpg'
import bgimg3 from '../assets/images/slider3.jpg'
import Slide from './Slide'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'

const Carousel = () => {
    return (
        <div className='container px-6 py-10 mx-auto'>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className='mySwiper'
      >
        <SwiperSlide>
          <Slide
            image={bgimg1}
            text='Charming farmhouse surrounded by greenery, perfect for family retreats'
          />
        </SwiperSlide>
        <SwiperSlide>
          <Slide
            image={bgimg2}
            text='A cozy cottage with lake views, perfect for a peaceful retreat.'
          />
        </SwiperSlide>
        <SwiperSlide>
          <Slide
            image={bgimg3}
            text='A serene bungalow with ocean views, perfect for relaxation.'
          />
        </SwiperSlide>
      </Swiper>
    </div>
    );
};

export default Carousel;