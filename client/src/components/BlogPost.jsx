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
                    <img
                      src="/images/profile/profile-picture.webp"
                      alt="profile picture"
                      className="w-10 rounded-full"
                    />
                    <ul className="profile-details | list-none text-xs text-neutral-600 font-extralight">
                      <li>
                        <span className="fullname">{post.admin.fullname}</span>{' '}
                        <span className="type | font-semibold">
                          {post.admin ? 'Admin' : 'Unknown'}
                        </span>
                      </li>
                      <li>
                        <span className="date">Mar 25</span> •
                        <span className="uploaded-time"> 1 min</span>
                      </li>
                    </ul>
                  </div>

                  <hr className="my-2 block" />

                  <h1 className="blog-title | text-2xl font-serif font-medium hover:text-blue-400 cursor-pointer">
                    {post.title}
                  </h1>
                  <div className="blog-subtitle | text-base text-neutral-600 text-justify hover:text-blue-400 cursor-pointer">
                    {post.description}
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
