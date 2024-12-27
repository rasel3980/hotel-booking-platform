// Import Swiper React components

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules'

import bgimg1 from '../assets/images/Faf du Plessis.jpg'
import bgimg2 from '../assets/images/Quinton de Kock-pro.jpg'
import bgimg3 from '../assets/images/Quinton de Kock-pro.jpg'
import Slide from '../Pages/Slide'
import { Swiper, SwiperSlide } from 'swiper/react'

const Carousel = () => {
    return (
        <div className='container px-6 py-10 mx-auto'>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 5000,
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
            text='Get Your Web Development Projects Done in minutes'
          />
        </SwiperSlide>
        <SwiperSlide>
          <Slide
            image={bgimg2}
            text='Get Your Graphics Design Projects Done in minutes'
          />
        </SwiperSlide>
        <SwiperSlide>
          <Slide
            image={bgimg3}
            text='Start Your Digital Marketing Campaigns up n running'
          />
        </SwiperSlide>
      </Swiper>
    </div>
    );
};

export default Carousel;