// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import WhatsappChat from '../components/WhatsappChat';
import axios from 'axios';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// import required modules
import { EffectFade, Navigation, Pagination, Autoplay } from 'swiper';
import { useEffect, useState } from 'react';
import BlogPost from '../components/BlogPost';

export default function Home() {
  const [carouselItems, setCarouselItems] = useState([]);
  const [blogPosts, setBlogPosts] = useState([]);

  useEffect(() => {
    const fecthData = async () => {
      const carousel = await axios.get('http://localhost:5000/carousel');
      setCarouselItems(carousel.data);
      const blogposts = await axios.get('http://localhost:5000/blogposts');
      setBlogPosts(blogposts.data);
    };
    fecthData();
  }, []);

  return (
    <>
      {/* Carousel */}
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
        {carouselItems.map((item) => {
          return (
            <SwiperSlide key={item._id}>
              <div className="w-full h-[35rem] overflow-hidden">
                <img src={item.image} className="max-w-full h-auto" alt="..." />
                <div className="absolute inset-x-[15%] bottom-3 py-5 text-center text-white hidden sm:block">
                  <h5 className="text-3xl font-medium subpixel-antialiased">
                    {item.title}
                  </h5>
                  <p className="text-xl font-normal">{item.subtitle}</p>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <BlogPost blogPosts={blogPosts}></BlogPost>
      <WhatsappChat></WhatsappChat>
    </>
  );
}
