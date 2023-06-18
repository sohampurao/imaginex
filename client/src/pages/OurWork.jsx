import axios from 'axios';
import { Button } from 'flowbite-react';
import { useEffect, useReducer } from 'react';
import Preloader from '../components/Preloader';
import AlertBox from '../components/AlertBox';
import { Link } from 'react-router-dom';
import { BsArrowRight } from 'react-icons/bs';
import { Zoom } from 'react-reveal';
import { getError } from '../utils';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, ourwork: action.payload };
    case 'FETCH_FAILED':
      return { ...state, loading: false, error: action.payload };
  }
};

export default function OurWork() {
  const [{ loading, error, ourwork }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get('/api/ourwork');
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (error) {
        dispatch({ type: 'FETCH_FAILED', payload: getError(error) });
      }
    };
    fetchData();
  }, []);

  // this blocks body scrolling while Preloader is active
  useEffect(() => {
    const toggleBodyScrolling = () => {
      if (loading) {
        document.body.classList.add('overflow-y-hidden');
      } else {
        document.body.classList.remove('overflow-y-hidden');
      }
    };
    toggleBodyScrolling();
  }, [loading]);

  return (
    <>
      <section className="work-container | max-w-6xl mx-auto">
        {loading ? (
          <Preloader></Preloader>
        ) : error ? (
          <AlertBox variant="failure">{error}</AlertBox>
        ) : (
          <>
            {ourwork.map((item) => {
              return (
                <article className="work | w-full my-8" key={item._id}>
                  <h1 className="work-title | uppercase font-serif font-bold tracking-widest text-neutral-900 text-center mb-5">
                    {item.title}
                  </h1>
                  <div className="work-description | indent-8 text-justify subpixel-antialiased text-neutral-600 px-4">
                    {item.description}
                  </div>
                  <div className="work-display | mt-5 flex justify-evenly items-center flex-wrap ps-4">
                    {item.work.map((work, index) => {
                      return (
                        <Zoom key={work._id} delay={index * 250}>
                          <div className="display-col | w-full sm:w-6/12 lg:w-3/12 pe-4 pb-4 box-border">
                            <div className="work-card | hover:shadow-xl hover:scale-105 transition-all max-w-sm sm:min-h-[250px] md:min-h-[330px] bg-white border border-gray-200 rounded-lg shadow mx-auto">
                              <img
                                className="rounded-t-lg max-h-[180px] min-h-[180px] w-full"
                                src={work.thumbnail}
                                alt={work.title}
                              />
                              <div className="px-5 py-4 flex flex-col items-center justify-between gap-1">
                                <h5 className="mb-2 text-sm font-bold tracking-tight text-neutral-600">
                                  {work.title}
                                </h5>

                                <Link
                                  to={`/ourwork/${work.slug}`}
                                  className="mx-auto md:me-auto md:mx-0"
                                >
                                  <Button
                                    gradientDuoTone="purpleToPink"
                                    outline
                                    size="xs"
                                  >
                                    <div className="me-1">View Tour</div>
                                    <BsArrowRight></BsArrowRight>
                                  </Button>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </Zoom>
                      );
                    })}
                  </div>
                </article>
              );
            })}
          </>
        )}
      </section>
    </>
  );
}
