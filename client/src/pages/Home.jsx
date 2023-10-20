import { Link } from 'react-router-dom';
import ExploreBtn from '../components/ExploreBtn';

function Home() {
  return (
    <>
      <div className="partition-container | w-screen min-h-[90vh] flex justify-center sm:gap-x-1 gap-x-[2px]">
        <div className="left-partition | relative overflow-hidden flex transition-all flex-1 md:hover:flex-[150px] justify-center items-center ">
          <div className="background-image | w-full h-full absolute top-0 left-0 bg-[url('https://images.pexels.com/photos/1098460/pexels-photo-1098460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')] bg-no-repeat bg-center bg-cover"></div>
          <div className="inner-content | flex flex-col z-10 h-full w-full justify-center items-center backdrop-brightness-50 transition-all hover:backdrop-brightness-75">
            <h1 className="capitalize text-lg sm:text-xl mb-10 font-bold tracking-wide leading-none text-white md:text-2xl lg:text-3xl">
              3D visualization
            </h1>
            <Link to={'/projectalbums'}>
              <ExploreBtn text={'explore'}></ExploreBtn>
            </Link>
          </div>
        </div>

        <div className="right-partition | relative overflow-hidden flex transition-all flex-1 md:hover:flex-[150px] w-full">
          <div className="background-image | w-full h-full absolute top-0 right-0 bg-[url('https://images.pexels.com/photos/417430/pexels-photo-417430.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')] bg-no-repeat bg-center bg-cover"></div>
          <div className="inner-content | flex flex-col z-10  h-full w-full justify-center items-center backdrop-brightness-50 transition-all hover:backdrop-brightness-75">
            <h1 className="capitalize text-lg sm:text-xl mb-10 font-bold tracking-wide leading-none text-white md:text-2xl lg:text-3xl">
              virtual 3D Tour
            </h1>
            <Link to="/virtualLanding">
              <ExploreBtn text={'explore'}></ExploreBtn>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
