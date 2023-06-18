import { useContext, useEffect, useReducer, useRef, useState } from 'react';
import { Store } from '../../../Store';
import axios from 'axios';
import { FormatDate, FormatTime, getError } from '../../../utils';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  Badge,
  Button,
  Label,
  Radio,
  Select,
  Spinner,
  TextInput,
  Textarea,
} from 'flowbite-react';
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

export default function BlogPostEdit() {
  const navigate = useNavigate();
  const params = useParams();

  const { id: blogPostId } = params;
  const { state } = useContext(Store);
  const { adminInfo } = state;

  const [blogPost, setBlogPost] = useState({});
  const [path, setPath] = useState('');
  const [mediaType, setMediaType] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [formattedUpdateTime, setFormattedUpdateTime] = useState('');

  const [{ loading, error, loadingUpdate, errorUpdate }, dispatch] = useReducer(
    logger(reducer),
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
      const formattedTime = FormatTime(blogPost.updatedAt);
      setFormattedUpdateTime(formattedTime);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [blogPost]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/blogposts/${blogPostId}`, {
          headers: { authorization: `Bearer ${adminInfo.token}` },
        });
        setBlogPost(data.blogPost);
        setPath(data.blogPost.path);
        setMediaType(data.blogPost.mediaType);
        setTitle(data.blogPost.title);
        setCategory(data.blogPost.category);
        setDescription(data.blogPost.description);
        dispatch({ type: 'FETCH_SUCCESS' });
      } catch (error) {
        toast.error(getError(error));
        dispatch({ type: 'FETCH_FAILED', payload: getError(error) });
      }
    };
    fetchData();
  }, [adminInfo, blogPostId]);

  const handleVideoError = (event) => {
    event.target.src =
      'https://placehold.co/550x300.mp4?text=Im+placeholder+replace+me!'; // Replace with your fallback video URL
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch({ type: 'UPDATE_REQUEST' });
      await axios.put(
        `/api/blogposts/${blogPostId}`,
        {
          path,
          mediaType,
          title,
          description,
          category,
          adminInfo,
        },
        {
          headers: { authorization: `Bearer ${adminInfo.token}` },
        }
      );
      dispatch({ type: 'UPDATE_SUCCESS' });
      toast.success('Blogpost saved successfully!');
      navigate('/blogpostslist');
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
        cloudName: 'dazvnvkca',
        uploadPreset: 'pgu2ly6f',
      },
      function (error, result) {
        if (result.event == 'success') {
          setPath(result.info.secure_url);
          console.log(path);
        }
        if (error) {
          toast.error(getError(error));
        }
      }
    );
  }, [path]);
  const text = 'https://my.matterport.com/show/?m=';
  console.log(text.length);
  return (
    <>
      <div className="container mx-auto flex justify-center pb-5">
        <form
          className="flex flex-col gap-4 mt-5 max-w-md sm:w-[500px] shadow p-4 rounded-lg"
          onSubmit={submitHandler}
        >
          <div className="signin-title | text-xl font-semibold font-serif text-center">
            Edit Blog Post
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
              <div className="updated-status">
                {blogPost.createdAt !== blogPost.updatedAt ? (
                  <Badge
                    color="success"
                    className="mx-auto flex justify-center p-5 text-neutral-600 text-base w-[250px]"
                  >
                    <span>Updated at: {FormatDate(blogPost.updatedAt)}</span>
                    <span className="mx-[5px] inline-block">||</span>
                    <span>{formattedUpdateTime}</span>
                  </Badge>
                ) : (
                  ''
                )}
              </div>
              <div className="carousel-img">
                {mediaType == 'image' && (
                  <img
                    src={path}
                    alt="Blog Post"
                    className="blogpost-image | w-full h-[300px]"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        'https://placehold.co/500x300?text=Im+placeholder+replace+me!'; // Replace with your fallback video URL
                    }}
                  />
                )}
                {mediaType == 'video' && (
                  <video
                    className="w-full h-[300px]"
                    controls
                    onError={handleVideoError}
                  >
                    <source src={path} type="video/mp4" />
                    <source
                      src="https://placehold.co/500x300.mp4?text=Im+placeholder+replace+me!"
                      type="video/mp4"
                    />
                    Your browser does not support the video tag.
                  </video>
                )}

                {mediaType == 'matterport' &&
                  (path.slice(0, 34) !==
                  'https://my.matterport.com/show/?m=' ? (
                    <img
                      className="blogpost-image | w-full h-[300px]"
                      src="https://placehold.co/500x300?text=Im+placeholder+replace+me!"
                      alt="place hodler"
                    />
                  ) : (
                    <iframe
                      className="matterport-iframe |  w-full h-[300px]"
                      src={path}
                      allowFullScreen
                    ></iframe>
                  ))}
              </div>
              <div>
                <fieldset className="flex max-w-md gap-4" id="radio">
                  <legend className="mb-4">Choose media type</legend>
                  <div className="flex items-center gap-2">
                    <Radio
                      defaultChecked={mediaType == 'matterport'}
                      id="matterport"
                      name="mediaType"
                      value="matterport"
                      onChange={(e) => setMediaType(e.target.value)}
                    />
                    <Label htmlFor="matterport">Matterport</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Radio
                      defaultChecked={mediaType == 'image'}
                      id="image"
                      name="mediaType"
                      value="image"
                      onChange={(e) => setMediaType(e.target.value)}
                    />
                    <Label htmlFor="image">Image</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Radio
                      defaultChecked={mediaType == 'video'}
                      id="video"
                      name="mediaType"
                      value="video"
                      onChange={(e) => setMediaType(e.target.value)}
                    />
                    <Label htmlFor="matterport">Video</Label>
                  </div>
                </fieldset>
              </div>
              <div>
                {mediaType == 'matterport' && (
                  <div className="mb-2 block">
                    <Label htmlFor="media" value={'Enter Path'} />
                  </div>
                )}
                {mediaType == 'matterport' && (
                  <TextInput
                    id="media"
                    type="text"
                    required={true}
                    placeholder="Enter matterport..."
                    value={path}
                    onChange={(e) => setPath(e.target.value)}
                    helperText="Replace the path given the input box."
                  />
                )}
                {(mediaType == 'image' || mediaType == 'video') && (
                  <div>
                    <Button
                      type="button"
                      gradientDuoTone="purpleToPink"
                      className="w-full font-semibold"
                      onClick={() => widgetRef.current.open()}
                    >
                      <i className="bi bi-cloud-arrow-up-fill"></i>{' '}
                      <span className="ms-2">
                        Upload {mediaType == 'image' ? 'Image' : 'Video'}
                      </span>
                    </Button>
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
                  placeholder="Write Description..."
                  required
                  rows={4}
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                />
              </div>
              <div className="max-w-md" id="select">
                <div className="mb-2">
                  <Label htmlFor="blogPostCategory" value="Select Category" />
                </div>
                <Select
                  id="blogPostCategory"
                  required
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option>Real Estate</option>
                  <option>Sample Flats</option>
                  <option>Resale Homes</option>
                  <option>Showrooms and Experience Centers</option>
                  <option>Hotes,Resorts,Villa</option>
                  <option>Hospiatls & Clinic&#39;s</option>
                  <option>Art-Gallery</option>
                  <option>Events Spaces</option>
                </Select>
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
