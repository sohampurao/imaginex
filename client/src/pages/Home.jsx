import { Fade } from 'react-reveal';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <>
      <div className="partition-container | w-full min-h-[90vh] flex justify-center sm:gap-x-1 gap-x-[2px] overflow-hidden">
        <div
          className={`left-partition | relative overflow-hidden flex transition-all flex-1 md:hover:flex-[150px] justify-center items-center`}
        >
          <div className="background-image | w-full h-full absolute top-0 left-0 bg-[url('https://images.pexels.com/photos/1098460/pexels-photo-1098460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')] bg-no-repeat bg-center bg-cover"></div>
          <div className="inner-content | flex flex-col z-10 h-full w-full justify-center items-center backdrop-brightness-50 transition-all hover:backdrop-brightness-75">
            <h1 className="capitalize text-lg sm:text-xl mb-10 font-bold tracking-wide leading-none text-white md:text-2xl lg:text-3xl">
              <Fade top cascade delay={300} duration={1300}>
                3D visualization
              </Fade>
            </h1>
            <div>
              <Fade top delay={1300} duration={1300}>
                <Link to={'/projectalbums'}>
                  <button className="explore-btn text-xs sm:text-sm md:text-lg">
                    Explore
                  </button>
                </Link>
              </Fade>
            </div>
          </div>
        </div>

        <div
          className={`right-partition | relative overflow-hidden flex transition-all flex-1 md:hover:flex-[150px] w-full`}
        >
          <div className="background-image | w-full h-full absolute top-0 right-0 bg-[url('https://images.pexels.com/photos/417430/pexels-photo-417430.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')] bg-no-repeat bg-center bg-cover"></div>
          <div className="inner-content | flex flex-col z-10  h-full w-full justify-center items-center backdrop-brightness-50 transition-all hover:backdrop-brightness-75">
            <h1 className="capitalize text-lg sm:text-xl mb-10 font-bold tracking-wide leading-none text-white md:text-2xl lg:text-3xl">
              <Fade top cascade delay={300} duration={1300}>
                virtual 3D Tour
              </Fade>
            </h1>
            <div>
              <Fade top delay={1300} duration={1300}>
                <Link to={'/virtuallanding'}>
                  <button className="explore-btn text-xs sm:text-sm md:text-lg">
                    Explore
                  </button>
                </Link>
              </Fade>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
