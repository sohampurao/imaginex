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

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false };
    case 'FETCH_FAILED':
      return { ...state, loading: false, error: action.payload };
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

  const [{ loading, error }, dispatch] = useReducer(logger(reducer), {
    loading: true,
    error: '',
  });

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

  const submitHandler = (e) => {
    e.preventDefault();
  };
  return (
    <>
      {loading ? (
        <div className="text-center">
          <Spinner aria-label="Center-aligned spinner example" />
        </div>
      ) : error ? (
        <AlertBox variant="failure">{error}</AlertBox>
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
                required={true}
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
            <Button type="submit">Save</Button>
          </form>
        </div>
      )}
    </>
  );
}
