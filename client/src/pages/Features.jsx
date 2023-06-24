import { useEffect, useReducer } from 'react';
import axios from 'axios';
import AlertBox from '../components/AlertBox';
import Preloader from '../components/Preloader';
import { Fade } from 'react-reveal';
import { getError } from '../utils';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, features: action.payload };
    case 'FETCH_FAILED':
      return { ...state, loading: false, error: action.payload };
  }
};

export default function Features() {
  const [{ loading, features, error }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get('/api/features');
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (error) {
        dispatch({ type: 'FETCH_FAILED', payload: getError(error) });
      }
    };
    fetchData();
  }, []);

  // this blocks body scrolling while Preloader is active
  useEffect(() => {
    const blockBodyScrolling = () => {
      if (loading) {
        document.body.classList.add('overflow-y-hidden');
      } else {
        document.body.classList.remove('overflow-y-hidden');
      }
    };
    blockBodyScrolling();
  }, [loading]);

  return (
    <>
      {loading ? (
        <Preloader />
      ) : error ? (
        <AlertBox variant="failure">{error}</AlertBox>
      ) : (
        <section className="feature | mx-auto mt-5 px-5 lg:ps-16 xl:ps-0">
          {features.map((feature) => {
            return (
              <Fade bottom duration={2000} distance="50%" key={feature._id}>
                <article className="feature-item | max-w-5xl mx-auto my-8 shadow-md flex bg-slate-50 flex-col md:flex-row-reverse 3xl:max-w-[1400px]">
                  <div className="feature-display | md:w-6/12">
                    <img
                      src={feature.image}
                      alt="feature"
                      className="feature-image | w-full max-w-full object-cover h-[250px] sm:h-[350px] 3xl:h-[430px]"
                    />
                  </div>

                  <div className="feature-text | lg:relative p-5 md:w-6/12 md:max-md:w-6/12">
                    <div className="bullet-box | lg:absolute lg:text-2xl lg:p-3 p-2 inline-block lg:right-full top-0 lg:me-2  bg-black text-white transition-colors hover:text-neutral-400">
                      <i className="fa-solid fa-dice-d20"></i>
                    </div>
                    <h1 className="feature-title | inline-block ms-2 lg:ms-0 text-lg font-serif font-medium mb-3 capitalize md:text-2xl">
                      {feature.title}
                    </h1>
                    <div className="feature-subtitle | text-base text-neutral-600 text-justify">
                      {feature.description}
                    </div>
                  </div>
                </article>
              </Fade>
            );
          })}
        </section>
      )}
    </>
  );
}
