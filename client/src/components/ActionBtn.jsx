/* eslint-disable react/prop-types */
export default function ActionBtn({ type, value, icon, onCLick }) {
  const editClasses =
    'text-white bg-indigo-600 ring-indigo-300 ring-offset-indigo-200 hover:ring-offset-indigo-500';
  const deleteClasses =
    'text-white bg-rose-600 ring-rose-300 ring-offset-rose-200 hover:ring-offset-rose-500';
  const createClasses =
    'text-white bg-yellow-300 ring-yellow-200 ring-offset-rose-100 hover:ring-offset-yellow-300';
  return (
    <>
      <button
        type="button"
        onClick={onCLick}
        className={`${
          type == 'edit'
            ? editClasses
            : type == 'delete'
            ? deleteClasses
            : type == 'create'
            ? createClasses
            : editClasses
        } box-border relative z-30 inline-flex items-center justify-center w-auto px-8 py-3 overflow-hidden font-bold transition-all duration-300 rounded-md cursor-pointer group ring-offset-2 ring-1  ring-offset-indigo-200  ease focus:outline-none`}
      >
        <span className="absolute bottom-0 right-0 w-8 h-20 -mb-8 -mr-5 transition-all duration-300 ease-out transform rotate-45 translate-x-1 bg-white opacity-10 group-hover:translate-x-0"></span>
        <span className="absolute top-0 left-0 w-20 h-8 -mt-1 -ml-12 transition-all duration-300 ease-out transform -rotate-45 -translate-x-1 bg-white opacity-10 group-hover:translate-x-0"></span>
        <span className="relative z-20 flex items-center text-sm capitalize gap-1">
          <span>{value}</span> {icon ? <span>{icon}</span> : ''}
        </span>
      </button>
    </>
  );
}
