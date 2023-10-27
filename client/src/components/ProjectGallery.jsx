import { useEffect, useReducer, useState } from 'react';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { MdClose } from 'react-icons/md';
import { FcPrevious } from 'react-icons/fc';
import { FcNext } from 'react-icons/fc';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { getError } from '../utils';
import { Spinner } from 'flowbite-react';
import AlertBox from './AlertBox';

// import { IoIosHome } from 'react-icons/io';

const projectImagesReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, album: action.payload };
    case 'FETCH_FAILED':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function ProjectGallery() {
  const params = useParams();
  const { id: projectAlbumId } = params;

  const [{ loading, album, error }, imagesDispatch] = useReducer(
    projectImagesReducer,
    {
      album: {},
      loading: true,
      error: '',
    }
  );

  useEffect(() => {
    const fetchData = async () => {
      imagesDispatch({ type: 'FETCH_REQUEST' });
      try {
        const response = await axios.get(
          `/api/projectalbums/images/${projectAlbumId}`
        );
        imagesDispatch({
          type: 'FETCH_SUCCESS',
          payload: response.data,
        });
      } catch (error) {
        imagesDispatch({ type: 'FETCH_FAILED', payload: getError(error) });
      }
    };
    fetchData();
  }, [error, projectAlbumId]);

  const [data, setData] = useState({ img: '', i: 0 });

  const ViewImage = (img, i) => {
    setData({ img, i });
  };

  const imgAction = (action) => {
    let i = data.i;
    if (action === 'next-img') {
      setData({ img: album.images[i + 1], i: i + 1 });
    }
    if (action === 'previous-img') {
      setData({ img: album.images[i - 1], i: i - 1 });
    }
    if (!action) {
      setData({ img: '', i: '' });
    }
  };

  return (
    <>
      {loading ? (
        <div className="text-center my-4">
          <Spinner aria-label="Center-aligned spinner example" />
        </div>
      ) : error ? (
        <AlertBox variant="failure">{error}</AlertBox>
      ) : (
        <>
          {/* <div
            className={`banner | relative w-full h-80 grid justify-center items-center bg-[url("${album.thumbnail}")] bg-center bg-cover bg-no-repeat mb-5`}
          >
            <div className="dark-filter | absolute left-0 top-0 h-full w-full backdrop-brightness-50"></div>

            <div className="z-10">
              <div className="inner-content | text-3xl text-white font-extrabold tracking-wide mb-5">
                {album.title}
              </div>

              <nav
                className="flex justify-center items-center"
                aria-label="Breadcrumb"
              >
                <ol className="inline-flex items-center space-x-1 md:space-x-3">
                  <li className="inline-flex items-center">
                    <Link
                      to="/"
                      className="inline-flex items-center text-sm md:text-lg font-medium text-[gold] opacity-80 hover:opacity-100 transition-opacity gap-1"
                    >
                      <IoIosHome className="text-2xl" />
                      Home
                    </Link>
                  </li>
                  <li>
                    <div className="flex items-center">
                      <svg
                        className="w-3 h-3 text-[gold] mx-1"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 6 10"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="m1 9 4-4-4-4"
                        />
                      </svg>
                      <Link
                        to="/projectalbums"
                        className="ml-1 text-sm md:text-lg font-medium md:ml-2 text-[gold] opacity-80 hover:opacity-100 transition-opacity"
                      >
                        Projects
                      </Link>
                    </div>
                  </li>
                  <li aria-current="page">
                    <div className="flex items-center">
                      <svg
                        className="w-3 h-3 text-[gold] mx-1"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 6 10"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="m1 9 4-4-4-4"
                        />
                      </svg>
                      <span className="ml-1 text-sm md:text-lg font-medium  md:ml-2 text-[gold] opacity-60">
                        Flowbite
                      </span>
                    </div>
                  </li>
                </ol>
              </nav>
            </div>
          </div> */}
          <div className="py-5">
            <ResponsiveMasonry
              columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
            >
              <Masonry gutter="20px">
                {album.images.map((image, i) => (
                  <img
                    key={i}
                    src={image}
                    style={{
                      width: '100%',
                      display: 'block',
                      cursor: 'pointer',
                    }}
                    alt=""
                    onClick={() => {
                      ViewImage(image, i);
                    }}
                  />
                ))}
              </Masonry>
            </ResponsiveMasonry>
          </div>

          {/* for viewing image in fullscreen */}
          {data.img && (
            <div className="w-full h-screen bg-black fixed flex justify-center items-center overflow-hidden z-[70] text-white">
              <button
                className="text-3xl md:me-4 hover:opacity-75"
                onClick={() => imgAction('previous-img')}
              >
                <FcPrevious />
              </button>
              <img
                src={data.img}
                alt=""
                className="w-auto max-w-[85%] max-h-[90vh]"
              />
              <button
                className="text-3xl md:ms-4 hover:opacity-75"
                onClick={() => imgAction('next-img')}
              >
                <FcNext />
              </button>
              <div className="image-count | absolute z-10 bottom-4 right-3 rounded-full p-1 tracking-wider">
                {data.i + 1 + '/' + album.images.length}
              </div>
              <button
                className="absolute top-3 right-3 text-3xl"
                onClick={() => imgAction()}
              >
                <MdClose />
              </button>
            </div>
          )}
        </>
      )}
    </>
  );
}

export default ProjectGallery;
