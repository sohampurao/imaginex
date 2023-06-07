// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import WhatsappChat from '../components/WhatsappChat';
import { useEffect, useReducer } from 'react';
import BlogPost from '../components/BlogPost';
import logger from 'use-reducer-logger';
import axios from 'axios';
import Preloader from '../components/Preloader';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// import required modules
import { EffectFade, Navigation, Pagination, Autoplay, Keyboard } from 'swiper';
import { getError } from '../utils';
import AlertBox from '../components/AlertBox';

const carouselReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_CAROUSEL_REQUEST':
      return { ...state, carouselLoading: true };
    case 'FETCH_CAROUSEL_SUCCESS':
      return {
        ...state,
        carouselItems: action.payload,
        carouselLoading: false,
      };
    case 'FETCH_CAROUSEL_FAIL':
      return {
        ...state,
        carouselLoading: false,
        carouselError: action.payload,
      };
    default:
      return state;
  }
};

const blogPostsReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_BLOGPOSTS_REQUEST':
      return { ...state, blogPostsLoading: true };
    case 'FETCH_BLOGPOSTS_SUCCESS':
      return { ...state, blogPostsLoading: false, blogPosts: action.payload };
    case 'FETCH_BLOGPOSTS_FAIL':
      return {
        ...state,
        blogPostsLoading: false,
        blogPostsError: action.payload,
      };
  }
};

export default function Home() {
  const [{ carouselLoading, carouselItems, carouselError }, carouselDispatch] =
    useReducer(carouselReducer, {
      carouselItems: [],
      carouselLoading: true,
      carouselError: '',
    });

  const [{ blogPosts, blogPostsLoading, blogPostsError }, blogPostsDispatch] =
    useReducer(logger(blogPostsReducer), {
      blogPosts: [],
      blogPostsLoading: true,
      blogPostsError: '',
    });

  // This hook is used to fetch carousel data
  useEffect(() => {
    const fetchData = async () => {
      carouselDispatch({ type: 'FETCH_CAROUSEL_REQUEST' });
      try {
        const carousel = await axios.get('/api/carousel');
        carouselDispatch({
          type: 'FETCH_CAROUSEL_SUCCESS',
          payload: carousel.data,
        });
      } catch (error) {
        carouselDispatch({
          type: 'FETCH_CAROUSEL_FAIL',
          payload: getError(error),
        });
      }
    };
    fetchData();
  }, []);

  // This hook is used to fetch blog post data
  useEffect(() => {
    const fetchData = async () => {
      blogPostsDispatch({ type: 'FETCH_BLOGPOSTS_REQUEST' });
      try {
        const response = await axios.get('/api/blogposts');
        blogPostsDispatch({
          type: 'FETCH_BLOGPOSTS_SUCCESS',
          payload: response.data,
        });
      } catch (error) {
        blogPostsDispatch({
          type: 'FETCH_BLOGPOSTS_FAIL',
          payload: getError(error),
        });
      }
    };
    fetchData();
  }, []);

  return (
    <>
      {/* Carousel */}
      {carouselLoading && blogPostsLoading ? (
        <Preloader></Preloader>
      ) : (
        <>
          {carouselError ? (
            <AlertBox variant="failure">{carouselError}</AlertBox>
          ) : (
            <>
              <Swiper
                spaceBetween={30}
                effect={'fade'}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                }}
                keyboard={{
                  enabled: true,
                }}
                navigation={true}
                pagination={{
                  clickable: true,
                }}
                loop={true}
                modules={[
                  EffectFade,
                  Navigation,
                  Pagination,
                  Autoplay,
                  Keyboard,
                ]}
                className="mySwiper"
              >
                {carouselItems.map((item) => {
                  return (
                    <SwiperSlide key={item._id}>
                      <div className="w-full h-[35rem] overflow-hidden">
                        <img
                          src={item.image}
                          className="max-w-full h-auto"
                          alt={item.title}
                        />
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
            </>
          )}

          {/* blog posts */}
          {blogPostsError ? (
            <AlertBox variant="failure">{blogPostsError}</AlertBox>
          ) : (
            <BlogPost blogPosts={blogPosts}></BlogPost>
          )}
        </>
      )}

      {/* WhatsApp chat link icon */}
      <WhatsappChat></WhatsappChat>
    </>
  );
}
