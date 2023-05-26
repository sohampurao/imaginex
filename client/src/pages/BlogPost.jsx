import axios from 'axios';
import { useEffect, useReducer } from 'react';
import { useParams } from 'react-router-dom';
import Preloader from '../components/Preloader';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Tooltip } from 'flowbite-react';

const blogPostReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_BLOGPOST_REQUEST':
      return { ...state, blogPostLoading: true };
    case 'FETCH_BLOGPOST_SUCCESS':
      return { ...state, blogPostLoading: false, blogPost: action.payload };
    case 'FETCH_BLOGPOST_FAIL':
      return {
        ...state,
        blogPostLoading: false,
        blogPostError: action.payload,
      };
  }
};

export default function BlogPost() {
  const params = useParams();
  const { slug } = params;
  const currentURL = window.location.href;

  console.log(currentURL);
  const [{ blogPost, blogPostLoading, blogPostError }, blogPostDispatch] =
    useReducer(blogPostReducer, {
      blogPost: [],
      blogPostLoading: true,
      blogPostError: '',
    });

  // This hook is used to fetch blog post data
  useEffect(() => {
    const fetchData = async () => {
      blogPostDispatch({ type: 'FETCH_BLOGPOST_REQUEST' });
      try {
        const response = await axios.get(
          `http://localhost:5000/blogpost/slug/${slug}`
        );
        blogPostDispatch({
          type: 'FETCH_BLOGPOST_SUCCESS',
          payload: response.data,
        });
      } catch (error) {
        blogPostDispatch({
          type: 'FETCH_BLOGPOST_FAIL',
          payload: error.message,
        });
      }
    };
    fetchData();
  }, [slug]);

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(currentURL)
      .then(() => {
        toast.success('Link copied to clipboard!');
      })
      .catch((error) => {
        toast.error(error);
      });
  };
  return (
    <>
      {blogPostLoading ? (
        <Preloader />
      ) : blogPostError ? (
        <div>{blogPostError}</div>
      ) : (
        <section className="container mx-auto mt-5  px-5 md:px-0">
          <article className="blog-post | md:max-w-2xl lg:max-w-4xl mx-auto shadow mb-5">
            <div className="blog-body | container p-5">
              <div className="profile | flex gap-2 items-center">
                <img
                  src="/images/profile/profile-picture.webp"
                  alt="profile picture"
                  className="w-10 rounded-full"
                />
                <ul className="profile-details | flex items-center gap-2 list-none text-sm text-neutral-600 font-extralight">
                  <li>
                    <span className="fullname">
                      {blogPost.admin.fullname}
                      {' • '}
                    </span>
                  </li>
                  <li>
                    <span className="type">
                      <span className=" font-semibold">
                        {blogPost.admin ? 'Admin' : 'Unknown'}
                      </span>
                      {' • '}
                    </span>
                  </li>
                  <li>
                    <span className="date">Mar 25</span>
                    {' • '}
                    <span className="uploaded-time"> 1 min</span>
                  </li>
                </ul>
              </div>

              <hr className="my-2 block" />

              <h1 className="blog-title | text-2xl font-serif font-medium">
                {blogPost.title}
              </h1>
              <div className="blog-subtitle | text-base text-neutral-600 text-justify">
                {blogPost.description}
              </div>
            </div>

            <iframe
              className="matterport-iframe | w-full h-[330px] sm:h-[430px] md:h-[530px] mx-auto "
              src={blogPost.path}
              allowFullScreen
            ></iframe>
            <div className="container p-5">
              <hr className="my-2 block" />
              <div className="blogpost-footer | flex justify-between items-center px-1">
                <ul className="share-socialmedia-list | flex items-center justify-evenly gap-3">
                  <li className="text-lg text-neutral-900 cursor-pointer hover:text-blue-500">
                    <Link
                      to={`https://www.facebook.com/sharer/sharer.php?u=http://localhost:5173/blogposts/slug/${currentURL}`}
                      target="_blank"
                    >
                      <Tooltip
                        content="Share on Facebook"
                        animation="duration-300"
                      >
                        <i className="bi bi-facebook"></i>
                      </Tooltip>
                    </Link>
                  </li>
                  <li className="text-lg text-neutral-900 cursor-pointer hover:text-blue-500">
                    <Link
                      to={`https://twitter.com/intent/tweet?url=http://localhost:5173/blogposts/slug/${currentURL}&text=Check out this amazing content!`}
                      target="_blank"
                    >
                      <Tooltip
                        content="Share on Twitter"
                        animation="duration-300"
                      >
                        <i className="bi bi-twitter"></i>
                      </Tooltip>
                    </Link>
                  </li>
                  <li className="text-lg text-neutral-900 cursor-pointer hover:text-blue-500">
                    <Link
                      to={`https://www.linkedin.com/sharing/share-offsite/?url=http://localhost:5173/blogposts/slug/${currentURL}`}
                      target="_blank"
                    >
                      <Tooltip
                        content="Share on LinkedIn"
                        animation="duration-300"
                      >
                        <i className="bi bi-linkedin"></i>
                      </Tooltip>
                    </Link>
                  </li>
                  <li className="text-lg text-neutral-900 cursor-pointer hover:text-blue-500">
                    <Tooltip content="Copy Link" animation="duration-300">
                      <i
                        className="bi bi-link-45deg"
                        onClick={copyToClipboard}
                      ></i>
                    </Tooltip>
                  </li>
                </ul>
                <div className="category | font-sans font-semibold cursor-pointer hover:text-blue-400">
                  Real Estate
                </div>
              </div>
              <hr className="my-2 block" />
            </div>
          </article>
        </section>
      )}
    </>
  );
}
