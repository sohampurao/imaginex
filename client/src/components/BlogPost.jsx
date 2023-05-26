import { Avatar, Badge } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

/* eslint-disable react/prop-types */
export const FormatTime = (createdAt) => {
  const date = new Date(createdAt);
  const now = new Date();

  const seconds = Math.floor((now - date) / 1000);
  if (seconds < 60) {
    return `${seconds} seconds ago`;
  }

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) {
    return `${minutes} ${minutes == 1 ? 'minute' : 'minutes'} ago`;
  }

  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return `${hours} ${hours == 1 ? 'hour' : 'hours'} ago`;
  }

  const days = Math.floor(hours / 24);
  return `${days} ${days == 1 ? 'day' : 'days'} ago`;
};

export const FormatDate = (createdAt) => {
  const date = new Date(createdAt);
  const month = date.toLocaleString('default', { month: 'long' });
  const day = date.getDate();

  return `${month} ${day}`;
};

export default function BlogPost(props) {
  const { blogPosts } = props;
  const [formattedTimes, setFormattedTimes] = useState([]);

  // this updates the date and uploaded time every seconds
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
                className="blog-post | md:max-w-2xl lg:max-w-4xl mx-auto shadow mb-5"
                key={post._id}
              >
                <iframe
                  className="matterport-iframe | w-full h-[330px] sm:h-[430px] md:h-[530px] mx-auto "
                  src={post.path}
                  allowFullScreen
                ></iframe>
                <div className="blog-body | container p-5">
                  <div className="profile | flex gap-2 items-center">
                    <Avatar img={post.admin.image} rounded={true}>
                      <div className="space-y-1 font-medium dark:text-white">
                        <div className="user-profile | flex  items-center gap-2">
                          <span>{post.admin.fullname}</span>
                          <Badge color="success">
                            {post.admin.isAdmin
                              ? ' ' + 'Admin'
                              : ' ' + 'Unknown'}
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
                    <Link to={`blogpost/slug/${post.slug}`}>{post.title}</Link>
                  </h1>
                  <div className="blog-subtitle | text-base text-neutral-600 text-justify hover:text-blue-400 cursor-pointer">
                    <Link to={`blogpost/slug/${post.slug}`}>
                      {post.description}
                    </Link>
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
