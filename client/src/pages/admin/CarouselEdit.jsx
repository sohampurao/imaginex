import axios from 'axios';
import { Card, Spinner } from 'flowbite-react';
import { useContext, useEffect, useReducer } from 'react';
import { Store } from '../../Store';
import { toast } from 'react-toastify';
import { getError } from '../../utils';
import ActionBtn from '../../components/ActionBtn';

const reducer = (state, action) => {
  switch (action.type) {
    case 'CAROUSEL_REQUEST':
      return { ...state, loading: true };
    case 'CAROUSEL_SUCCESS':
      return { ...state, loading: false, carouselItems: action.payload };
    case 'CAROUSEL_FAILED':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
export default function CarouselEdit() {
  const { state } = useContext(Store);
  const { adminInfo } = state;
  const [{ carouselItems, loading, error }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'CAROUSEL_REQUEST' });
      try {
        const { data } = await axios.get(
          'http://localhost:5000/carousel/admin',
          {
            headers: { Authorization: `Bearer ${adminInfo.token}` },
          }
        );
        dispatch({ type: 'CAROUSEL_SUCCESS', payload: data });
      } catch (error) {
        toast.error(getError(error));
        dispatch({ type: 'CAROUSEL_FAILED', payload: error });
      }
    };
    fetchData();
  }, [adminInfo]);
  return (
    <>
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="carouseledit-title | mt-10 text-2xl font-semibold font-serif text-center">
          Edit Carousel
        </div>

        <div className="create-btn-container | flex justify-end mx-auto max-w-4xl my-2">
          <ActionBtn type="create" value="Create" />
        </div>
        {loading ? (
          <div className="text-center">
            <Spinner aria-label="Center-aligned spinner example" />
          </div>
        ) : error ? (
          <div>{error}</div>
        ) : (
          <>
            {carouselItems.map((item) => {
              return (
                <Card
                  key={item._id}
                  imgAlt={item.title}
                  imgSrc={item.image}
                  className="max-w-4xl mx-auto my-8"
                >
                  <h5 className="text-2xl font-medium tracking-tight text-gray-900 dark:text-white">
                    <p>{item.title}</p>
                  </h5>
                  <p className="font-normal text-gray-700 dark:text-gray-400">
                    {item.subtitle}
                  </p>
                  <div className="action-btns | flex justify-center gap-10 pt-3">
                    <ActionBtn
                      type="delete"
                      value="delete"
                      icon={<i className="bi bi-trash3-fill"></i>}
                    />
                    <ActionBtn
                      type="edit"
                      value="edit"
                      icon={<i className="bi bi-pencil-square"></i>}
                    />
                  </div>
                </Card>
              );
            })}
          </>
        )}
      </div>
    </>
  );
}
