import '../assets/preloader.scss';
export default function Preloader() {
  return (
    <>
      <div className="preloader-wrapper | absolute top-0 right-0 h-[100vh] w-full flex items-center justify-center">
        <div className="loader | relative w-20 h-24">
          <div className="loader__bar"></div>
          <div className="loader__bar"></div>
          <div className="loader__bar"></div>
          <div className="loader__bar"></div>
          <div className="loader__bar"></div>
          <div className="loader__ball"></div>
        </div>
      </div>
    </>
  );
}
