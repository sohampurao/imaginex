import axios from 'axios';
import { useEffect, useReducer, useState } from 'react';
import { useParams } from 'react-router-dom';
import Preloader from '../components/Preloader';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Avatar, Badge, Tooltip } from 'flowbite-react';
import { FormatDate, FormatTime, getError } from '../utils';
import AlertBox from '../components/AlertBox';

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
      blogPostDispatch({ type: 'FETCH_BLOGPOST_REQUEST' });
      try {
        const response = await axios.get(
          `http://localhost:5000/blogposts/slug/${slug}`
        );
        blogPostDispatch({
          type: 'FETCH_BLOGPOST_SUCCESS',
          payload: response.data,
        });
      } catch (error) {
        toast.error(getError(error));
        blogPostDispatch({
          type: 'FETCH_BLOGPOST_FAIL',
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
              <div className="profile | flex gap-2 items-center">
                <Avatar
                  img={blogPost.admin.image}
                  alt="Admin Profile pic"
                  rounded={true}
                ></Avatar>
                <ul className="profile-details | flex items-center gap-2 list-none text-sm text-neutral-600 font-extralight">
                  <li>
                    <span className="fullname">
                      {blogPost.admin.firstName + ' ' + blogPost.admin.lastName}
                      <div className="inline-block mx-1">•</div>
                    </span>
                  </li>
                  <li>
                    <span className="type">
                      <span className="flex items-center font-semibold">
                        <Badge color="success">
                          {blogPost.admin.isAdmin ? (
                            <>
                              <span>Admin</span>
                              <img
                                src="/images/profile/crown.png"
                                className="float-right align-middle h-4 ms-[2px]"
                              />
                            </>
                          ) : (
                            'Unknown'
                          )}
                        </Badge>
                        <div className="inline-block mx-1">•</div>
                      </span>
                    </span>
                  </li>
                  <li>
                    <span className="date">
                      {FormatDate(blogPost.createdAt)}
                    </span>
                    <div className="inline-block mx-1">•</div>
                    <span className="uploaded-time">{formattedTime}</span>
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
