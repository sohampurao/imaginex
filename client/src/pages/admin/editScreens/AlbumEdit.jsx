import { useContext, useEffect, useReducer, useRef, useState } from 'react';
import { Store } from '../../../Store';
import axios from 'axios';
import {
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_UPLOAD_PRESET,
  FormatDate,
  FormatTime,
  getError,
} from '../../../utils';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Badge, Button, Label, Spinner, TextInput } from 'flowbite-react';
import AlertBox from '../../../components/AlertBox';
import { FcEditImage } from 'react-icons/fc';

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

export default function AlbumEdit() {
  const navigate = useNavigate();
  const params = useParams();

  const { id: AlbumId } = params;
  const { state } = useContext(Store);
  const { adminInfo } = state;

  const [album, setAlbum] = useState({});

  const [thumbnail, setThumbnail] = useState('');
  const [title, setTitle] = useState('');
  const [images, setImages] = useState([]);
  const [formattedUpdateTime, setFormattedUpdateTime] = useState('');

  const [{ loading, error, loadingUpdate, errorUpdate }, dispatch] = useReducer(
    reducer,
    {
      loading: true,
      error: '',
      loadingUpdate: false,
      errorUpdate: '',
    }
  );

  // this updates the uploaded time every seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      const formattedTime = FormatTime(album.updatedAt);
      setFormattedUpdateTime(formattedTime);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [album]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/projectalbums/${AlbumId}`, {
          headers: { authorization: `Bearer ${adminInfo.token}` },
        });
        setAlbum(data.album);
        setThumbnail(data.album.thumbnail);
        setTitle(data.album.title);
        setImages(data.album.images);

        dispatch({ type: 'FETCH_SUCCESS' });
      } catch (error) {
        toast.error(getError(error));
        dispatch({ type: 'FETCH_FAILED', payload: getError(error) });
      }
    };
    fetchData();
  }, [adminInfo, AlbumId]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch({ type: 'UPDATE_REQUEST' });
      await axios.put(
        `/api/projectalbums/${AlbumId}`,
        {
          thumbnail,
          title,
          images,
        },
        {
          headers: { authorization: `Bearer ${adminInfo.token}` },
        }
      );
      dispatch({ type: 'UPDATE_SUCCESS' });
      toast.success('Album saved successfully!');
      navigate('/albumslist');
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
        mutiple: false,
        showUploadMoreButton: false,
        folder: `Imaginex/albums/${album.title}`,
        clientAllowedFormats: ['image'],
        sources: ['local', 'url', 'camera', 'google_drive'],
      },
      function (error, result) {
        if (!error && result && result.event === 'success') {
          setThumbnail(result.info.secure_url);
        }
        if (error) {
          toast.error(getError(error));
        }
      }
    );
  }, [thumbnail, album]);

  return (
    <>
      <div className="container mx-auto flex justify-center pb-5">
        <form
          className="flex w-full flex-col gap-4 mt-5 max-w-md sm:w-[500px] sm:shadow p-4 rounded-lg"
          onSubmit={submitHandler}
        >
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
              <div className="signin-title | text-xl font-medium font-serif text-center">
                Edit {album.title}
              </div>
              <div className="updated-status">
                {album.createdAt !== album.updatedAt ? (
                  <Badge
                    color="success"
                    className="mx-auto flex justify-center p-5 text-neutral-600 text-base w-[250px]"
                  >
                    <span>Updated at: {FormatDate(album.updatedAt)}</span>
                    <span className="mx-[5px] inline-block">||</span>
                    <span>{formattedUpdateTime}</span>
                  </Badge>
                ) : (
                  ''
                )}
              </div>
              <div className="thumbnail">
                <img
                  src={thumbnail}
                  alt={album.title}
                  className="w-full max-h-[300px]"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      'https://placehold.co/500x300?text=Im+placeholder+replace+me!';
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
                  <i className="fa-solid fa-arrows-rotate"></i>
                  <span className="ms-2">Update Thumbnail</span>
                </Button>
              </div>
              <div>
                <div className="mb-2 block">
                  <Label
                    htmlFor="title"
                    value="Title"
                    className="font-medium"
                  />
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

              <div className="my-2 ">
                <div className="mb-2 flex justify-between items-center">
                  <Label value="Album Images" />
                  <Link to={`/albumimagesedit/${AlbumId}`}>
                    <div className="relative flex justify-between items-center py-1 px-4 rounded-3xl text-xs tracking-wider font-semibold text-neutral-500 cursor-pointer border border-slate-400 hover:opacity-75 transition-opacity">
                      Edit Images
                      <FcEditImage className="text-3xl"></FcEditImage>
                      <span className="sr-only">Notifications</span>
                      <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -right-2 dark:border-gray-900">
                        {album.images.length}
                      </div>
                    </div>
                  </Link>
                </div>
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
