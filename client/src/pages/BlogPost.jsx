import axios from 'axios';
import { useEffect, useReducer, useState } from 'react';
import { useParams } from 'react-router-dom';
import Preloader from '../components/Preloader';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FormatDate, FormatTime, getError } from '../utils';
import AlertBox from '../components/AlertBox';
import { Tooltip } from 'flowbite-react';

const blogPostReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, blogPostLoading: true };
    case 'FETCH_SUCCESS':
      return { ...state, blogPostLoading: false, blogPost: action.payload };
    case 'FETCH_FAIL':
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
  const [formattedTime, setFormattedTime] = useState(null);

  const [{ blogPost, blogPostLoading, blogPostError }, blogPostDispatch] =
    useReducer(blogPostReducer, {
      blogPost: [],
      blogPostLoading: true,
      blogPostError: '',
    });

  // This hook is used to fetch blog post data
  useEffect(() => {
    const fetchData = async () => {
      try {
        blogPostDispatch({ type: 'FETCH_REQUEST' });
        const response = await axios.get(`/api/blogposts/slug/${slug}`);
        blogPostDispatch({
          type: 'FETCH_SUCCESS',
          payload: response.data,
        });
      } catch (error) {
        toast.error(getError(error));
        blogPostDispatch({
          type: 'FETCH_FAIL',
          payload: getError(error),
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

  // this updates the date and uploaded time every seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      const FormattedTime = FormatTime(blogPost.createdAt);
      setFormattedTime(FormattedTime);
    }, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, [blogPost]);

  return (
    <>
      {blogPostLoading ? (
        <Preloader />
      ) : blogPostError ? (
        <AlertBox variant="failure">{blogPostError}</AlertBox>
      ) : (
        <section className="container mx-auto mt-5  px-5 md:px-0">
          <article className="blog-post | md:max-w-2xl lg:max-w-4xl mx-auto shadow mb-5">
            <div className="blog-body | container p-5">
              <div className="date-time| flex gap-2 items-center text-sm text-gray-500 dark:text-gray-400">
                <div className="date">{FormatDate(blogPost.createdAt)}</div>
                <div className="inline-block mx-1">•</div>
                <div className="uploaded-time">{formattedTime}</div>
              </div>

              <hr className="my-2 block" />

              <h1 className="blog-title | text-2xl font-serif font-medium">
                {blogPost.title}
              </h1>
              <div className="blog-subtitle | text-base text-neutral-600 text-justify">
                {blogPost.description}
              </div>
            </div>

            <div className="blog-post-display | w-full">
              {blogPost.mediaType == 'image' && (
                <img
                  src={blogPost.path}
                  alt=""
                  className="blogblogPost.image | w-full h-[330px] sm:h-[430px] md:h-[530px] mx-auto"
                />
              )}
              {blogPost.mediaType == 'video' && (
                <video className="w-full h-auto max-w-full" controls autoPlay>
                  <source src={blogPost.path} type="video/mp4" />
                </video>
              )}

              {blogPost.mediaType == 'matterport' && (
                <iframe
                  className="matterport-iframe | w-full h-[330px] sm:h-[430px] md:h-[530px] mx-auto"
                  src={blogPost.path}
                  allowFullScreen
                ></iframe>
              )}
            </div>

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
                <div className="category | font-sans font-semibold cursor-pointer hover:text-blue-400 capitalize">
                  <Link to={`/virtualtours?category=${blogPost.category}`}>
                    {blogPost.category}
                  </Link>
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
