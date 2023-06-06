import { Avatar, Badge } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FormatDate, FormatTime } from '../utils';
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
  return (
    <>
      <section className="container mx-auto mt-5  px-5 md:px-0">
        {blogPosts.map((post, index) => {
          return (
            <>
              <article
                key={index}
                className="blog-post-item | max-w-5xl mx-auto my-8 shadow-md flex bg-slate-50 flex-col md:flex-row"
              >
                <div className="blog-post-display | w-6/12">
                  {post.mediaType == 'image' && (
                    <img
                      src={post.path}
                      alt=""
                      className="blogpost-image | w-full h-[250px] sm:h-[350px] md:h-[300px]"
                    />
                  )}
                  {post.mediaType == 'video' && (
                    <video
                      className="blogpost-video | w-full h-auto max-w-full"
                      controls
                    >
                      <source src={post.path} type="video/mp4" />
                    </video>
                  )}

                  {post.mediaType == 'matterport' && (
                    <iframe
                      className="matterport-iframe | w-full h-[250px] sm:h-[350px] md:h-[300px]"
                      src={post.path}
                      allowFullScreen
                    ></iframe>
                  )}
                </div>

                <div className="blog-text | p-5 w-6/12">
                  <div className="profile | flex gap-2 items-center">
                    <Avatar img={post.admin.profileImage} rounded={true}>
                      <div className="space-y-1 font-medium dark:text-white">
                        <div className="user-profile | flex  items-center gap-2">
                          <span>
                            {post.admin.firstName + ' ' + post.admin.lastName}
                          </span>
                          <Badge color="success">
                            {post.admin.isAdmin ? (
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
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          <span className="date">
                            {FormatDate(post.createdAt)}
                          </span>{' '}
                          •{' '}
                          <span className="uploaded-time">
                            {formattedTimes[index]}
                          </span>
                        </div>
                      </div>
                    </Avatar>
                  </div>

                  <hr className="my-2 block" />

                  <h1 className="blog-title | text-2xl font-serif font-medium hover:text-blue-400 cursor-pointer">
                    <NavLink to={`/blogpost/slug/${post.slug}`}>
                      {post.title}
                    </NavLink>
                  </h1>
                  <div
                    className={`blog-subtitle | text-base text-neutral-600 text-justify ${
                      post.description.length <= 200
                        ? 'hover:text-blue-400 cursor-pointer'
                        : ''
                    }`}
                  >
                    {post.description.length >= 200 ? (
                      <>
                        <div>
                          {post.description.slice(0, 190) + ' '}
                          <Link
                            to={`/blogpost/slug/${post.slug}`}
                            className="text-sm text-blue-500 hover:text-blue-400 transition-all whitespace-nowrap"
                          >
                            ...Read more
                          </Link>
                        </div>
                      </>
                    ) : (
                      <Link to={`/blogpost/slug/${post.slug}`}>
                        {post.description}
                      </Link>
                    )}
                  </div>
                </div>
              </article>
            </>
          );
        })}
      </section>
    </>
  );
}
