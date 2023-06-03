import { useContext, useEffect, useReducer, useState } from 'react';
import { Store } from '../../../Store';
import axios from 'axios';
import { getError } from '../../../utils';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  Button,
  Label,
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
    default:
      return state;
  }
};

export default function BlogPostEdit() {
  const params = useParams();
  const { id: blogPostId } = params;
  const { state } = useContext(Store);
  const { adminInfo } = state;
  const [path, setPath] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');

  const [{ loading, error }, dispatch] = useReducer(logger(reducer), {
    loading: true,
    error: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(
          `http://localhost:5000/blogposts/edit/${blogPostId}`,
          {
            headers: { authorization: `Bearer ${adminInfo.token}` },
          }
        );
        setPath(data.blogPost.path);
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
  return (
    <>
      <div className="container mx-auto flex justify-center pb-5">
        <form
          className="flex flex-col gap-4 mt-5 max-w-md sm:w-[500px] shadow p-4 rounded-lg"
          // onSubmit={submitHandler}
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
          ) : (
            <>
              <div className="carousel-img | ">
                <iframe
                  className="matterport-iframe | w-full h-[300px]"
                  src={path || 'https://my.matterport.com/show/?m=XYZ46qV7SaP'}
                  allowFullScreen
                ></iframe>
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="path" value="Path" />
                </div>
                <TextInput
                  id="path"
                  type="url"
                  required={true}
                  placeholder="paste URL"
                  value={path}
                  onChange={(e) => setPath(e.target.value)}
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
                </Select>
              </div>
              <Button type="submit">Save</Button>
            </>
          )}
        </form>
      </div>
    </>
  );
}
