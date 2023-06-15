import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FormatDate, FormatTime } from '../utils';
import { Fade } from 'react-reveal';
import '../index.css';

/* eslint-disable react/prop-types */
export default function BlogPost({ blogPosts }) {
  const [formattedTimes, setFormattedTimes] = useState([]);

  // this updates the uploaded time every seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      const newFormattedTimes = blogPosts.map((post) =>
        FormatTime(post.createdAt)
      );
      setFormattedTimes(newFormattedTimes);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [blogPosts]);

  const [showControls, setShowControls] = useState(false);

  const handleVideoClick = () => {
    setShowControls((prevState) => !prevState);
  };
  return (
    <>
      <section className="blog-post | mx-auto mt-8 px-5">
        {blogPosts.map((post, index) => {
          return (
            <Fade top distance="20%" duration={1800} key={index}>
              <article className="blog-post-item | mx-auto shadow-lg mb-8 flex bg-[#222222] flex-col md:flex-row max-w-7xl">
                <div className="blog-post-display | md:w-6/12">
                  {post.mediaType == 'image' && (
                    <img
                      src={post.path}
                      alt=""
                      className="blogpost-image | w-full h-[270px] sm:h-[350px] md:h-[300px] lg:h-[370px]"
                    />
                  )}
                  {post.mediaType == 'video' && (
                    <video
                      className="blogpost-video | w-full h-auto max-w-full"
                      onClick={handleVideoClick}
                      controls={showControls}
                    >
                      <source src={post.path} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  )}

                  {post.mediaType == 'matterport' && (
                    <iframe
                      className="matterport-iframe | w-full aspect-video md:min-h-[300px]"
                      src={post.path}
                      allowFullScreen
                    ></iframe>
                  )}
                </div>

                <div className="blog-text | p-5  text-white md:w-6/12">
                  <div className="date-time | flex gap-2 items-center text-sm text-[#ffd900ed]">
                    <div className="date">{FormatDate(post.createdAt)}</div> •{' '}
                    <div className="uploaded-time">{formattedTimes[index]}</div>
                  </div>

                  <hr className="my-2 block" />

                  <h1 className="blog-title | text-lg font-serif font-medium hover:text-blue-400 cursor-pointer pb-2 capitalize">
                    <NavLink to={`/blogpost/${post.slug}`}>
                      {post.title}
                    </NavLink>
                  </h1>
                  <div
                    className={`blog-subtitle | text-base text-neutral-300 text-justify ${
                      post.description.length <= 235
                        ? 'hover:text-blue-400 cursor-pointer'
                        : ''
                    }`}
                  >
                    {post.description.length >= 235 ? (
                      <>
                        <div>
                          {post.description.slice(0, 235) + ' '}
                          <Link
                            to={`/blogpost/${post.slug}`}
                            className="text-sm text-blue-500 hover:text-blue-400 transition-all whitespace-nowrap"
                          >
                            ...Read more
                          </Link>
                        </div>
                      </>
                    ) : (
                      <Link to={`/blogpost/${post.slug}`}>
                        {post.description}
                      </Link>
                    )}
                  </div>
                </div>
              </article>
            </Fade>
          );
        })}
      </section>
    </>
  );
}
