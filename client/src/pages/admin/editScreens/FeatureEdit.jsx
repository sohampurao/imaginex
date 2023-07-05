import { useContext, useEffect, useReducer, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_UPLOAD_PRESET,
  getError,
} from '../../../utils';
import axios from 'axios';
import { Store } from '../../../Store';
import { Button, Label, Spinner, TextInput, Textarea } from 'flowbite-react';
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
      return { ...state, loadingUpdate: true };
    case 'UPDATE_SUCCESS':
      return { ...state, loadingUpdate: false };
    case 'UPDATE_FAILED':
      return { ...state, loadingUpdate: false, errorUpdate: action.payload };
    default:
      return state;
  }
};

export default function FeatureEdit() {
  const params = useParams();
  const { id: featureId } = params;

  const navigate = useNavigate();

  const { state } = useContext(Store);
  const { adminInfo } = state;

  const [{ loading, error, loadingUpdate, errorUpdate }, dispatch] = useReducer(
    reducer,
    {
      loading: true,
      error: '',
      loadingUpdate: false,
      errorUpdate: '',
    }
  );

  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/features/${featureId}`, {
          headers: { authorization: `Bearer ${adminInfo.token}` },
        });
        setImage(data.image);
        setTitle(data.title);
        setDescription(data.description);
        dispatch({ type: 'FETCH_SUCCESS' });
      } catch (error) {
        dispatch({ type: 'FETCH_FAILED', payload: getError(error) });
      }
    };
    fetchData();
  }, [adminInfo, featureId]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch({ type: 'UPDATE_REQEUST' });
      await axios.put(
        `/api/features/${featureId}`,
        {
          image,
          title,
          description,
          adminInfo,
        },
        {
          headers: { authorization: `Bearer ${adminInfo.token}` },
        }
      );
      dispatch({ type: 'UPDATE_SUCCESS' });
      toast.success('Feature saved successfully.');
      navigate('/featureslist');
    } catch (error) {
      dispatch({ type: 'UPDATE_FAILED', payload: getError(error) });
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
      <div className="container mx-auto flex justify-center pb-5">
        <form
          className="flex flex-col gap-4 mt-5 max-w-md w-full sm:w-[500px] sm:shadow p-4 rounded-lg"
          onSubmit={submitHandler}
        >
          <div className="signin-title | text-xl font-semibold font-serif text-center">
            Edit Feature
          </div>
          {loading ? (
            <div className="text-center">
              <Spinner aria-label="Center-aligned spinner example" />
            </div>
          ) : error ? (
            <AlertBox variant="failure">{error}</AlertBox>
          ) : errorUpdate ? (
            <AlertBox variant="failure">{errorUpdate}</AlertBox>
          ) : (
            <>
              <div className="feature-img">
                <img
                  src={image}
                  alt="Blog Post"
                  className="blogpost-image | w-full h-[300px]"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      'https://placehold.co/500x300?text=Im+placeholder+replace+me!'; // Replace with your fallback video URL
                  }}
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
                  placeholder="Write Description..."
                  required
                  rows={4}
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                />
              </div>

              <Button type="submit" disabled={loadingUpdate}>
                {loadingUpdate ? (
                  <>
                    <Spinner aria-label="Spinner button example" />
                    <span className="pl-3">Saving...</span>
                  </>
                ) : (
                  'Save'
                )}
              </Button>
            </>
          )}
        </form>
      </div>
    </>
  );
}
