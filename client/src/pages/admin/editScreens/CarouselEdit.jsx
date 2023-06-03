import {
  Button,
  FileInput,
  Label,
  Spinner,
  TextInput,
  Textarea,
} from 'flowbite-react';
import { useContext, useEffect, useState } from 'react';
import { useReducer } from 'react';
import { Store } from '../../../Store';
import axios from 'axios';
import { getError } from '../../../utils';
import { useParams } from 'react-router-dom';
import AlertBox from '../../../components/AlertBox';
import logger from 'use-reducer-logger';
import { toast } from 'react-toastify';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false };
    case 'FETCH_FAILED':
      return { ...state, loading: false, error: action.payload };
    case 'UPDATE_REQUEST':
      return { ...state, loadingCreate: true };
    case 'UPDATE_SUCCESS':
      return { ...state, loadingCreate: false };
    case 'UPDATE_FAILED':
      return { ...state, loadingCreate: false, errorUpdate: action.payload };
    default:
      return state;
  }
};
export default function CarouselEdit() {
  const params = useParams();
  const { id: carouselItemId } = params;

  const [image, setImage] = useState('');
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');

  const { state } = useContext(Store);
  const { adminInfo } = state;

  const [{ loading, error, loadingCreate, errorUpdate }, dispatch] = useReducer(
    logger(reducer),
    {
      loading: true,
      error: '',
    }
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(
          `http://localhost:5000/carousel/admin/${carouselItemId}`,
          {
            headers: { authorization: `Bearer ${adminInfo.token}` },
          }
        );
        dispatch({ type: 'FETCH_SUCCESS' });
        const { carouselItem } = data;
        setTitle(carouselItem.title);
        console.log(carouselItem.title);
        setSubtitle(carouselItem.subtitle);
        setImage(carouselItem.image);
      } catch (error) {
        dispatch({ type: 'FETCH_FAILED', payload: getError(error) });
      }
    };
    fetchData();
  }, [adminInfo, carouselItemId]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch({ type: 'UPDATE_REQUEST' });
      await axios.put(
        `http://localhost:5000/carousel/update/${carouselItemId}`,
        {
          image,
          title,
          subtitle,
        },
        {
          headers: { authorization: `Bearer ${adminInfo.token}` },
        }
      );
      dispatch({ type: 'UPDATE_SUCCESS' });
      toast.success('Carousel Item updated succssfully');
    } catch (error) {
      dispatch({ type: 'UPDATE_FAILED', payload: error });
    }
  };
  return (
    <>
      {loading ? (
        <div className="text-center">
          <Spinner aria-label="Center-aligned spinner example" />
        </div>
      ) : error ? (
        <AlertBox variant="failure">{error}</AlertBox>
      ) : errorUpdate ? (
        <AlertBox variant="failure">{errorUpdate}</AlertBox>
      ) : (
        <div className="container mx-auto flex justify-center pb-5">
          <form
            className="flex flex-col gap-4 mt-5 max-w-md sm:w-[500px] shadow p-4 rounded-lg"
            onSubmit={submitHandler}
          >
            <div className="signin-title | text-xl font-semibold font-serif text-center">
              Edit Carousel Item
            </div>
            <div className="carousel-img | ">
              <img
                src={image}
                alt="Carousel Item"
                className="block w-full rounded-lg"
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="image" value="Upload Image" />
              </div>
              <FileInput
                id="image"
                type="file"
                // required={true}
                helperText="*4000×2000 image size is recommended"
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="title" value="Title" />
              </div>
              <TextInput
                id="title"
                type="text"
                required={true}
                placeholder="Write title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="description" value="Description" />
              </div>
              <Textarea
                id="description"
                placeholder="Write Subtitle..."
                required
                rows={4}
                value={subtitle}
                onChange={(e) => {
                  setSubtitle(e.target.value);
                }}
              />
            </div>
            <Button type="submit">
              {loadingCreate ? (
                <>
                  <Spinner aria-label="Spinner button example" />
                  <span className="pl-3">Updating...</span>
                </>
              ) : (
                'Update'
              )}
            </Button>
          </form>
        </div>
      )}
    </>
  );
}
