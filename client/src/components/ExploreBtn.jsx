/* eslint-disable react/prop-types */
function ExploreBtn({ text }) {
  return (
    <div>
      <button className="explore-btn text-xs sm:text-sm md:text-lg">
        {text}
      </button>
    </div>
  );
}

export default ExploreBtn;
