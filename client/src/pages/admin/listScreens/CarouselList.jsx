import axios from 'axios';
import { Button, Card, Modal, Spinner } from 'flowbite-react';
import { useContext, useEffect, useReducer, useState } from 'react';
import { toast } from 'react-toastify';
import ActionBtn from '../../../components/ActionBtn';
import logger from 'use-reducer-logger';
import { Link, useNavigate } from 'react-router-dom';
import { Store } from '../../../Store';
import { getError } from '../../../utils';
import AlertBox from '../../../components/AlertBox';

const reducer = (state, action) => {
  switch (action.type) {
    case 'CAROUSEL_REQUEST':
      return { ...state, loading: true };
    case 'CAROUSEL_SUCCESS':
      return { ...state, loading: false, carouselItems: action.payload };
    case 'CAROUSEL_FAILED':
      return { ...state, loading: false, error: action.payload };
    case 'CAROUSEL_CREATE_REQUEST':
      return { ...state, loadingCreate: true };
    case 'CAROUSEL_CREATE_SUCCESS':
      return { ...state, loadingCreate: false };
    case 'CAROUSEL_CREATE_FAILED':
      return { ...state, loadingCreate: false, errorCreate: action.payload };
    case 'DELETE_REQUEST':
      return { ...state, loadingDelete: true, successDelete: false };
    case 'DELETE_SUCCESS':
      return { ...state, loadingDelete: false, successDelete: true };
    case 'DELETE_FAILED':
      return {
        ...state,
        loadingDelete: false,
        errorDelete: action.payload,
        success: false,
      };
    case 'DELETE_RESET':
      return {
        ...state,
        loadingDelete: false,
        success: false,
      };
    default:
      return state;
  }
};
export default function CarouselList() {
  const navigate = useNavigate();
  const [openModel, setOpenModel] = useState(null);
  const { state } = useContext(Store);
  const { adminInfo } = state;
  const [
    {
      carouselItems,
      loading,
      error,
      loadingCreate,
      errorCreate,
      successDelete,
    },
    dispatch,
  ] = useReducer(logger(reducer), {
    loading: true,
    error: '',
    errorDelete: '',
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
        dispatch({ type: 'CAROUSEL_FAILED', payload: getError(error) });
      }
    };
    fetchData();
    if (successDelete) {
      fetchData();
      dispatch({ type: 'DELETE_RESET' });
    }
  }, [adminInfo, successDelete]);

  const createHandler = async () => {
    setOpenModel(false);
    try {
      dispatch({ type: 'CAROUSEL_CREATE_REQUEST' });
      const { data } = await axios.post(
        'http://localhost:5000/carousel',
        { authorization: `Bearer ${adminInfo.token}` },
        {
          headers: { authorization: `Bearer ${adminInfo.token}` },
        }
      );
      toast.success('Carousel Item created succussfully!');
      dispatch({ type: 'CAROUSEL_CREATE_SUCCESS' });
      navigate(`/carousel/${data.carouselItem._id}`);
    } catch (error) {
      toast.error(getError(error));
      dispatch({ type: 'CAROUSEL_CREATE_FAILED', payload: getError(error) });
    }
  };

  const deleteHandler = async (item, index) => {
    if (
      window.confirm(
        `Are you sure you want to detele slide ${index} : ${item.title}`
      )
    )
      try {
        dispatch({ type: 'DELETE_REQUEST' });
        await axios.delete(
          `http://localhost:5000/carousel/delete/${item._id}`,
          {
            headers: { authorization: `Bearer ${adminInfo.token}` },
          }
        );
        dispatch({ type: 'DELETE_SUCCESS' });
        toast.success('Carousel item deleted successfully');
      } catch (error) {
        toast.error(getError(error));
        dispatch({ type: 'DELETE_FAILED', payload: error });
      }
  };

  return (
    <>
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="carouseledit-title | mt-10 text-2xl font-semibold font-serif text-center">
          Carousel
        </div>

        <div className="create-btn-container | flex justify-end mx-auto max-w-4xl my-2">
          <Button
            gradientDuoTone="pinkToOrange"
            onClick={() => setOpenModel(true)}
          >
            Create
          </Button>
        </div>
        <Modal show={openModel} onClose={() => setOpenModel(false)}>
          <Modal.Header>Add CarouselItem Confirmation</Modal.Header>
          <Modal.Body>
            <div className="space-y-6">
              <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                Are you sure you want to add Carousel Item?
              </p>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={createHandler}>Yess!</Button>
            <Button color="gray" onClick={() => setOpenModel(false)}>
              <p>Cancel</p>
            </Button>
          </Modal.Footer>
        </Modal>
        {loadingCreate ? (
          <div className="text-center">
            <Spinner aria-label="Center-aligned spinner example" />
          </div>
        ) : errorCreate ? (
          <AlertBox variant="failure">{errorCreate}</AlertBox>
        ) : (
          ''
        )}
        {loading ? (
          <div className="text-center">
            <Spinner aria-label="Center-aligned spinner example" />
          </div>
        ) : error ? (
          <AlertBox variant="failure">{error}</AlertBox>
        ) : (
          <>
            {carouselItems.map((item, index) => {
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
                      onCLick={() => deleteHandler(item, index)}
                      type="delete"
                      value="delete"
                      icon={<i className="bi bi-trash3-fill"></i>}
                    />
                    <Link to={`/carousel/${item._id}`}>
                      <ActionBtn
                        type="edit"
                        value="edit"
                        icon={<i className="bi bi-pencil-square"></i>}
                      />
                    </Link>
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
