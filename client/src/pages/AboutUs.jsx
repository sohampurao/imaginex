import axios from 'axios';
import { Spinner } from 'flowbite-react';
import { useEffect, useReducer } from 'react';
import { Link } from 'react-router-dom';
import AlertBox from '../components/AlertBox';
import { Zoom } from 'react-reveal';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, aboutus: action.payload };
    case 'FETCH_FAILED':
      return { ...state, loading: false, error: action.payload };
  }
};

export default function AboutUs() {
  const [{ loading, aboutus, error }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get('/api/aboutus');
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (error) {
        dispatch({ type: 'FETCH_FAILED', payload: error });
      }
    };
    fetchData();
  }, []);

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row gap-5 justify-evenly my-8 3xl:max-w-[1400px]">
      {loading ? (
        <div className="text-center">
          <Spinner aria-label="Center-aligned spinner example" />
        </div>
      ) : error ? (
        <AlertBox variant="failure">{error}</AlertBox>
      ) : (
        <>
          {aboutus.map((item) => {
            return (
              <Zoom key={item._id}>
                <article className="about-container | border flex flex-col border-[gold] shadow-sm rounded p-4 min-h-[500px] max-w-[800px] md:w-6/12">
                  <div className="profile-container | flex flex-col gap-4 md:flex-row">
                    <div className="profile-image">
                      <img
                        src={item.profileImage}
                        alt=""
                        className="w-full mx-auto block rounded-md max-w-[250px] max-h-[200px] md:w-200px md:h-[120px]"
                        loading="lazy"
                      />
                    </div>
                    <div className="profile-detials | text-center md:text-start">
                      <div className="owner-name uppercase | font-semibold font-serif">
                        {item.firstName + ' ' + item.lastName}
                      </div>
                      <div className="owner-positon uppercase | text-sm mt-1">
                        {item.position}
                      </div>
                    </div>
                  </div>
                  <hr className="block md:hidden h-[2px] my-2" />
                  <div className="about-info | text-justify text-neutral-600 md:mt-2">
                    {item.description}
                  </div>

                  <div className="social-handles | text-center mt-auto pt-3">
                    {item.facebookURL ||
                    item.instagramURL ||
                    item.whatsappNo ||
                    item.linkedinURL ? (
                      <div className="font-serif">Connect with Me</div>
                    ) : (
                      ''
                    )}
                    <ul className="share-web | flex justify-center gap-4 mt-2 mb-4">
                      {item.facebookURL && (
                        <Link to={item.facebookURL} target="_blank">
                          <li className="social-link-item | transition-all bg-[#1877F2] hover:bg-opacity-80 hover:scale-105 flex justify-center items-center h-10 w-10  rounded-full text-white">
                            <i className="bi bi-facebook"></i>
                          </li>
                        </Link>
                      )}
                      {item.linkedinURL && (
                        <Link to={item.linkedinURL} target="_blank">
                          <li className="social-link-item | transition-all bg-[#0A66C2] hover:bg-opacity-80 hover:scale-105 flex justify-center items-center h-10 w-10  rounded-full text-white">
                            <i className="bi bi-linkedin"></i>
                          </li>
                        </Link>
                      )}
                      {item.whatsappNo && (
                        <Link
                          to={`https://api.whatsapp.com/send/?phone=91${item.whatsappNo}&text&type=phone_number&app_absent=0`}
                          target="_blank"
                        >
                          <li className="social-link-item | transition-all bg-[#25D366] hover:bg-opacity-80 hover:scale-105 flex justify-center items-center h-10 w-10  rounded-full text-white">
                            <i className="bi bi-whatsapp"></i>
                          </li>
                        </Link>
                      )}
                      {item.instagramURL && (
                        <Link to={item.instagramURL} target="_blank">
                          <li className="social-link-item | transition-all bg-gradient-to-r from-[#FEDA75] to-[#F58529] hover:bg-opacity-80 hover:scale-105 flex justify-center items-center h-10 w-10  rounded-full text-white">
                            <i className="bi bi-instagram"></i>
                          </li>
                        </Link>
                      )}
                    </ul>
                  </div>
                </article>
              </Zoom>
            );
          })}
        </>
      )}
    </section>
  );
}
