import axios from 'axios';
import { useEffect, useReducer } from 'react';
import { getError } from '../utils';
import { Spinner } from 'flowbite-react';
import AlertBox from '../components/AlertBox';
import { Link } from 'react-router-dom';
import WhatsappChat from '../components/WhatsappChat';

const projectAlbumsReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, albums: action.payload };
    case 'FETCH_FAILED':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function ProjectsAlbums() {
  const [{ loading, albums, error }, albumsDispatch] = useReducer(
    projectAlbumsReducer,
    {
      loading: true,
      albums: [],
      error: '',
    }
  );

  useEffect(() => {
    const fetchData = async () => {
      albumsDispatch({ type: 'FETCH_REQUEST' });
      try {
        const response = await axios.get('/api/projectalbums');
        albumsDispatch({ type: 'FETCH_SUCCESS', payload: response.data });
      } catch {
        albumsDispatch({ type: 'FETCH_FAILED', payload: getError(error) });
      }
    };
    fetchData();
  }, [error]);

  return (
    <>
      <section className="container | max-w-6xl mx-auto 3xl:max-w-7xl my-4 min-h-[90vh]">
        <h1 className="project-title | text-lg uppercase font-serif font-bold tracking-widest text-neutral-900 text-center mb-5 3xl:text-xl">
          3D visualization
        </h1>

        <article className="albumns | md:max-w-5xl mx-auto px-4 md:px-8">
          <h2 className="album-title | text-lg capitalize font-sans font-semibold text-neutral-900 text-start mb-4 3xl:text-xl">
            our projects
          </h2>
          {loading ? (
            <div className="text-center my-4">
              <Spinner aria-label="Center-aligned spinner example" />
            </div>
          ) : error ? (
            <AlertBox variant="failure">{error}</AlertBox>
          ) : (
            <>
              <div className="album-container | grid grid-cols-2 sm:grid-cols-3 gap-5 md:grid-cols-4">
                {albums.map((item) => {
                  return (
                    <Link key={item._id} to={`/projectgallery/${item._id}`}>
                      <div className="album | transition-all relative mx-auto max-w-[200px] md:max-w-sm bg-white h-[180px] md:h-[225px] border border-gray-200 rounded-3xl shadow overflow-hidden cursor-pointer">
                        <div className="album-thumbnail | h-[calc(100%-40px)] transition-all">
                          <img
                            src={item.thumbnail}
                            className="h-[180px] md:h-[225px] w-full transition-all"
                            alt={item.title}
                            loading="lazy"
                          />
                        </div>
                        <div className="album-info | absolute transition-all w-full h-[40px] left-0 bottom-0 p-3 pb-4 text-sm tracking-tight bg-white flex items-center justify-between">
                          <div className="album-info-title | font-medium text-ellipsis whitespace-nowrap flex-1 overflow-hidden">
                            {item.title}
                          </div>
                          <div className="album-img-count | text-sm font-medium">
                            {item.images.length}
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </>
          )}
        </article>
      </section>
      {/* WhatsApp chat link icon */}
      <WhatsappChat></WhatsappChat>
    </>
  );
}

export default ProjectsAlbums;
