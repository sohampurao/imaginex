import { Avatar, Badge } from 'flowbite-react';
import { Link } from 'react-router-dom';

/* eslint-disable react/prop-types */
export default function BlogPost(props) {
  const { blogPosts } = props;
  return (
    <>
      <section className="container mx-auto mt-5  px-5 md:px-0">
        {blogPosts.map((post) => {
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
                          <span className="date">Mar 25</span> •
                          <span className="uploaded-time"> 1 min</span>
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
