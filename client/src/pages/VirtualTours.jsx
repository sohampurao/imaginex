import { useEffect, useReducer, useState } from 'react';
import { toast } from 'react-toastify';
import { getError } from '../utils';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import { Spinner } from 'flowbite-react';
import BlogPost from '../components/BlogPost';
import AlertBox from '../components/AlertBox';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        blogPosts: action.payload,
        loading: false,
      };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
export default function VirtualTours() {
  const { search } = useLocation();
  const sp = new URLSearchParams(search); //search?category=postname
  const category = sp.get('category') || 'all';

  const [{ loading, error, blogPosts }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
  });

  useEffect(() => {
    try {
      const fetchData = async () => {
        const { data } = await axios.get(
          `/api/blogposts/search/virtualtours?&category=${category}`
        );
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      };
      fetchData();
    } catch (error) {
      dispatch({ type: 'FETCH_FAIL', payload: getError(error) });
    }
  }, [category]);

  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get('/api/blogposts/search/categories');
        setCategories(data);
      } catch (error) {
        toast.error(getError(error));
      }
    };
    fetchCategories();
  }, []);

  const getFilterUrl = (filter) => {
    const filterCategory = filter.category || category;
    return `/virtualtours?category=${filterCategory}`;
  };

  return (
    <>
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 3xl:max-w-[1400px]">
        <nav>
          <ul className="nav-tab | mt-10 list-none flex flex-wrap justify-center items-center">
            <li
              className={`tab-item | px-5 py-3 font-medium capitalize text-sm text-center rounded-md md:min-h-0 flex items-center ${
                'all' === category ? 'text-[#1c64f2] tab-item-active' : ''
              }`}
            >
              <Link to={getFilterUrl({ category: 'all' })}>All Posts</Link>
            </li>
            {categories.map((c) => (
              <li
                key={c}
                className={`tab-item | px-5 py-3 font-medium capitalize text-sm text-center rounded-md flex items-center ${
                  c === category ? 'text-[#1c64f2] tab-item-active' : ''
                }`}
              >
                <Link to={getFilterUrl({ category: c })}>{c}</Link>
              </li>
            ))}
          </ul>
        </nav>{' '}
      </div>
      <main>
        {loading ? (
          <div className="text-center my-4">
            <Spinner aria-label="Center-aligned spinner example" />
          </div>
        ) : error ? (
          <AlertBox variant="failure">{error}</AlertBox>
        ) : (
          <>
            <BlogPost blogPosts={blogPosts}></BlogPost>
          </>
        )}
      </main>
    </>
  );
}
