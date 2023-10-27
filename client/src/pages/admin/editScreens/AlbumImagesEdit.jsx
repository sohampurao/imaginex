import { useContext, useEffect, useReducer, useRef, useState } from 'react';
import { Store } from '../../../Store';
import axios from 'axios';
import {
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_UPLOAD_PRESET,
  getError,
} from '../../../utils';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button, Spinner } from 'flowbite-react';
import AlertBox from '../../../components/AlertBox';
import { BiImageAdd } from 'react-icons/bi';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { BsTrash } from 'react-icons/bs';

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

function AlbumImagesEdit() {
  const navigate = useNavigate();
  const params = useParams();
  const { id: AlbumId } = params;

  const { state } = useContext(Store);
  const { adminInfo } = state;

  const [album, setAlbum] = useState({});
  const [images, setImages] = useState([]);

  const [{ loading, error, loadingUpdate, errorUpdate }, dispatch] = useReducer(
    reducer,
    {
      loading: true,
      error: '',
      loadingUpdate: false,
      errorUpdate: '',
    }
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/projectalbums/${AlbumId}`, {
          headers: { authorization: `Bearer ${adminInfo.token}` },
        });
        setAlbum(data.album);
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
        `/api/projectalbums/images/${AlbumId}`,
        {
          images,
        },
        {
          headers: { authorization: `Bearer ${adminInfo.token}` },
        }
      );
      dispatch({ type: 'UPDATE_SUCCESS' });
      toast.success('Images saved successfully.');
      navigate(`/albumedit/${AlbumId}`);
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
          setImages([...images, result.info.secure_url]);
          toast.success('Image uploaded successfully.');
          console.log(result);
        }
        if (error) {
          toast.error(getError(error));
        }
      }
    );
  }, [album, images]);

  const removeImage = (imagePath) => {
    if (window.confirm('Do you really want to delete this image?')) {
      const updatedImages = images.filter((image) => image !== imagePath);
      setImages(updatedImages);
    }
  };
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

              <div>
                <div className="mb-2 text-center w-full text-sm">
                  Album Images
                </div>
                <div className="add-images | w-full grid justify-center items-center mb-2">
                  <button
                    type="button"
                    onClick={() => widgetRef.current.open()}
                    className="w-12 h-12 text-3xl text-sky-500 border-neutral-200 border-[3px] rounded-xl text-opacity-75 border-opacity-75 hover:text-opacity-100 hover:border-opacity-100 transition-opacity  grid items-center justify-center"
                  >
                    <BiImageAdd />
                  </button>
                </div>
                <ResponsiveMasonry columnsCountBreakPoints={{ 750: 2, 900: 3 }}>
                  <Masonry gutter="10px">
                    {images.map((image, i) => (
                      <div key={i} className="g-imgs-edit | relative">
                        <img
                          src={image}
                          style={{
                            width: '100%',
                            display: 'block',
                          }}
                          alt={`${album.title} image`}
                        />
                        <div className="g-action-btns | absolute h-full w-full text-neutral-700 z-10 backdrop-blur-sm top-0 left-0 grid items-center justify-center transition">
                          <button
                            type="button"
                            onClick={() => {
                              removeImage(image);
                            }}
                            className="delete-btn | h-[40px] w-[40px] rounded-full bg-white opacity-75 grid items-center justify-center cursor-pointer hover:opacity-100 transition-opacity"
                          >
                            <BsTrash></BsTrash>
                          </button>
                        </div>
                      </div>
                    ))}
                  </Masonry>
                </ResponsiveMasonry>
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

export default AlbumImagesEdit;
