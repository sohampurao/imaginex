// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// import required modules
import { EffectFade, Navigation, Pagination, Autoplay } from 'swiper';

const Carousel = () => {
  return (
    <>
      <Swiper
        spaceBetween={30}
        effect={'fade'}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        modules={[EffectFade, Navigation, Pagination, Autoplay]}
        className="mySwiper"
      >
        <SwiperSlide>
          <div className="relative w-full h-[35rem] overflow-hidden">
            <div className="dark-filter"></div>
            <img
              src="/images/carousel-image1.jpg"
              className="block w-full"
              alt="..."
            />
            <div className="absolute inset-x-[15%] bottom-3 py-5 text-center text-white">
              <h5 className="text-3xl font-medium subpixel-antialiased">
                First slide labe
              </h5>
              <p className="text-xl font-normal">
                Some Some representative placeholder content for the first
                slide.
              </p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="relative w-full h-[35rem] overflow-hidden">
            <div className="dark-filter"></div>
            <img
              src="/images/carousel-image2.jpg"
              className="block w-full"
              alt="..."
            />
            <div className="absolute inset-x-[15%] bottom-3 py-5 text-center text-white">
              <h5 className="text-3xl font-medium subpixel-antialiased">
                First slide labe
              </h5>
              <p className="text-xl font-normal">
                Some Some representative placeholder content for the first
                slide.
              </p>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default Carousel;
