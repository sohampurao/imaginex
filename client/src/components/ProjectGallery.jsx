import { useEffect, useReducer, useState } from 'react';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { MdClose } from 'react-icons/md';
import { FcPrevious } from 'react-icons/fc';
import { FcNext } from 'react-icons/fc';
import { Link, useParams } from 'react-router-dom';
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
          <nav
            className="flex px-5 py-3 text-gray-700 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700 mx-auto mt-2"
            aria-label="Breadcrumb"
          >
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li>
                <div className="flex items-center">
                  <Link
                    to="/projectalbums"
                    className="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white whitespace-nowrap"
                  >
                    3D Visualization
                  </Link>
                </div>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  <svg
                    className="w-3 h-3 mx-1 text-gray-400"
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
                  <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400 cursor-default">
                    {album.title}
                  </span>
                </div>
              </li>
            </ol>
          </nav>

          <div className="p-5">
            <ResponsiveMasonry
              columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
            >
              <Masonry gutter="1.25rem">
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
            <div className="w-full h-screen bg-black fixed flex justify-center items-center overflow-hidden z-[70] text-white select-none">
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
