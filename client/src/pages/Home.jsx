// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import WhatsappChat from '../components/WhatsappChat';
import { useEffect, useReducer } from 'react';
import BlogPost from '../components/BlogPost';
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
import { Fade } from 'react-reveal';

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
    useReducer(blogPostsReducer, {
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

  // this blocks body scrolling while Preloader is active
  useEffect(() => {
    const blockBodyScrolling = () => {
      if (carouselLoading || blogPostsLoading) {
        document.body.classList.add('overflow-y-hidden');
      } else {
        document.body.classList.remove('overflow-y-hidden');
      }
    };
    blockBodyScrolling();
  }, [blogPostsLoading, carouselLoading]);

  return (
    <>
      {/* Carousel */}
      {carouselLoading && blogPostsLoading ? (
        <Preloader></Preloader>
      ) : carouselError ? (
        <AlertBox variant="failure">{carouselError}</AlertBox>
      ) : blogPostsError ? (
        <AlertBox variant="failure">{blogPostsError}</AlertBox>
      ) : (
        <>
          <main>
            <section className="carousel-container">
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
                      <div className="w-full  overflow-hidden">
                        <img
                          src={item.image}
                          className="max-w-full max-h-[270px] min-h-[270px] sm:max-h-[600px] sm:min-h-[350px] md:min-h-[450px] 3xl:min-h-[760px]"
                          alt={item.title}
                        />
                        <div className="absolute inset-x-[15%] bottom-3 py-5 text-center text-white hidden sm:block">
                          <h5 className="text-2xl font-medium subpixel-antialiased 3xl:text-3xl">
                            {item.title}
                          </h5>
                          <p className="text-lg font-normal 3xl:text-xl">
                            {item.subtitle}
                          </p>
                        </div>
                      </div>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </section>

            {/* Blog Posts */}
            <BlogPost blogPosts={blogPosts}></BlogPost>
          </main>

          {/* intro text */}
          <section className="intro-container | relative text-white mb-5">
            <div className="intro-bg-image | w-full  max-h-[470px] min-h-[470px] md:min-h-[600px] bg-[url('/images/home/intro-banner.webp')] bg-cover bg-no-repeat bg-center brightness-50"></div>
            <div className="mx-auto px-5 w-full max-h-[470px] min-h-[470px] md:min-h-[600px] flex flex-col md:flex-row justify-center items-center gap-8  3xl:gap-14 absolute top-0">
              <article className="intro | max-w-lg">
                <Fade left duration={2500}>
                  <h1 className="intro-title | text-2xl mb-2 3xl:text-3xl">
                    Make smarter choices
                  </h1>
                  <p className="intro-discription | text-base 3xl:text-xl 3xl:leading-10">
                    Without leaving your home, get a thorough overview of the
                    property. Live-In Tours let you choose wisely every time
                    whether to buy or rent.
                  </p>
                </Fade>
              </article>

              <article className="intro | max-w-lg">
                <Fade right duration={2500}>
                  <div className="intro-container">
                    <div className="intro-title | text-2xl mb-2 3xl:text-3xl">
                      Find Your Dream Home More Quickly
                    </div>
                    <p className="intro-discription | text-lg 3xl:text-xl 3xl:leading-10">
                      Put an end to the pointless site visits! Live-In Tours
                      give you all the information you need to make an immediate
                      decision about your new home.
                    </p>
                    <p>
                      Property Listings with Live-In Tours Produce 30% More
                      Buyers
                    </p>
                  </div>
                </Fade>
              </article>
            </div>
          </section>
        </>
      )}
      {/* WhatsApp chat link icon */}
      <WhatsappChat></WhatsappChat>
    </>
  );
}
