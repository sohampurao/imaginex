/* eslint-disable react/prop-types */
function ExploreBtn({ text, onClick }) {
  return (
    <div>
      <button
        className="explore-btn text-xs sm:text-sm md:text-lg"
        onClick={onClick}
      >
        {text}
      </button>
    </div>
  );
}

export default ExploreBtn;
