import {
  Badge,
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
import { FormatDate, FormatTime, getError } from '../../../utils';
import { useNavigate, useParams } from 'react-router-dom';
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
    case 'UPLOAD_REQUEST':
      return { ...state, loadingUpload: true, errorUpload: '' };
    case 'UPLOAD_SUCCESS':
      return { ...state, loadingUpload: false, errorUpload: '' };
    case 'UPLOAD_FAILED':
      return { ...state, loadingUpload: false, errorUpload: action.payload };
    default:
      return state;
  }
};
export default function CarouselEdit() {
  const navigate = useNavigate();
  const params = useParams();
  const { id: carouselItemId } = params;

  const [carouselItem, setCarouselItem] = useState({});
  const [image, setImage] = useState('');
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');

  const { state } = useContext(Store);
  const { adminInfo } = state;
  const [formattedUpdateTime, setFormattedUpdateTime] = useState('');

  const [
    { loading, error, loadingCreate, errorUpdate, loadingUpload },
    dispatch,
  ] = useReducer(logger(reducer), {
    loading: true,
    error: '',
    loadingCreate: false,
    errorUpdate: '',
  });

  // this updates the uploaded time every seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      const formattedTime = FormatTime(carouselItem.updatedAt);
      setFormattedUpdateTime(formattedTime);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [carouselItem]);

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
        setCarouselItem(data.carouselItem);
        setTitle(data.carouselItem.title);
        setSubtitle(data.carouselItem.subtitle);
        setImage(data.carouselItem.image);
        dispatch({ type: 'FETCH_SUCCESS' });
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
      navigate('/carousellist');
    } catch (error) {
      dispatch({ type: 'UPDATE_FAILED', payload: error });
    }
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append('file', file);
    try {
      dispatch({ type: 'UPLOAD_REQUEST' });
      const { data } = await axios.post(
        'http://localhost:5000/upload',
        bodyFormData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            authorization: `Bearer ${adminInfo.token}`,
          },
        }
      );
      dispatch({ type: 'UPLOAD_SUCCESS' });

      toast.success('Image uploaded successfully');
      setImage(data.secure_url);
    } catch (err) {
      toast.error(getError(err));
      dispatch({ type: 'UPLOAD_FAIL', payload: getError(err) });
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
            <div className="updated-status">
              {carouselItem.createdAt !== carouselItem.updatedAt ? (
                <Badge
                  color="success"
                  className="mx-auto flex justify-center p-5 text-neutral-600 text-base w-[250px]"
                >
                  <span>Updated at: {FormatDate(carouselItem.updatedAt)}</span>
                  <span className="mx-[5px] inline-block">||</span>
                  <span>{formattedUpdateTime}</span>
                </Badge>
              ) : (
                ''
              )}
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
                onChange={uploadFileHandler}
                helperText="*4000×2000 image size is recommended"
              />
              {loadingUpload && (
                <div className="text-center">
                  <Spinner aria-label="Center-aligned spinner example" />
                </div>
              )}
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
