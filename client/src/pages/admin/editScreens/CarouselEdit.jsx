import {
  Badge,
  Button,
  Label,
  Spinner,
  TextInput,
  Textarea,
} from 'flowbite-react';
import { useContext, useEffect, useState, useRef } from 'react';
import { useReducer } from 'react';
import { Store } from '../../../Store';
import axios from 'axios';
import {
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_UPLOAD_PRESET,
  FormatDate,
  FormatTime,
  getError,
} from '../../../utils';
import { useNavigate, useParams } from 'react-router-dom';
import AlertBox from '../../../components/AlertBox';
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
      return { ...state, loadingCreate: false, updateSuccess: true };
    case 'UPDATE_FAILED':
      return {
        ...state,
        loadingCreate: false,
        errorUpdate: action.payload,
      };
    case 'UPDATE_RESET':
      return {
        ...state,
        loadingCreate: false,
        errorUpdate: action.payload,
      };
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
    {
      loading,
      error,
      loadingCreate,
      loadingUpdate,
      errorUpdate,
      updateSuccess,
    },
    dispatch,
  ] = useReducer(reducer, {
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
        const { data } = await axios.get(`/api/carousel/${carouselItemId}`, {
          headers: { authorization: `Bearer ${adminInfo.token}` },
        });
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
  }, [adminInfo, carouselItemId, updateSuccess]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch({ type: 'UPDATE_REQUEST' });
      await axios.put(
        `/api/carousel/${carouselItemId}`,
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
      toast.success('Carousel Item saved successfully');
      navigate('/carousellist');
    } catch (error) {
      toast.error(getError(error));
      dispatch({ type: 'UPDATE_FAILED', payload: error });
    }
  };

  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: CLOUDINARY_CLOUD_NAME,
        uploadPreset: CLOUDINARY_UPLOAD_PRESET,
        mutiple: false,
        showUploadMoreButton: false,
        folder: `Imaginex/carousel`,
        clientAllowedFormats: ['image'],
        sources: ['local', 'url', 'camera', 'google_drive'],
      },
      function (error, result) {
        if (result.event == 'success') {
          setImage(result.info.secure_url);
        }
        if (error) {
          toast.error(getError(error));
        }
      }
    );
  }, [image]);

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
            className="flex flex-col gap-4 mt-5 max-w-md sm:w-[500px] sm:shadow p-4 rounded-lg"
            onSubmit={submitHandler}
          >
            <div className="title | text-xl font-medium font-serif text-center">
              Edit &ldquo;{carouselItem.title}&rdquo;
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
              <Button
                type="button"
                gradientDuoTone="purpleToPink"
                className="w-full font-semibold"
                onClick={() => widgetRef.current.open()}
              >
                <i className="bi bi-cloud-arrow-up-fill"></i>{' '}
                <span className="ms-2">Upload Image</span>
              </Button>
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
            <Button type="submit" disabled={loadingUpdate}>
              {loadingCreate ? (
                <>
                  <Spinner aria-label="Spinner button example" />
                  <span className="pl-3">Saving...</span>
                </>
              ) : (
                'Save'
              )}
            </Button>
          </form>
        </div>
      )}
    </>
  );
}
