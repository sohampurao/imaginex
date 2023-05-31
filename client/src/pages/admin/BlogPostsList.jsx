import { Spinner, Table } from 'flowbite-react';
import { useContext, useEffect, useReducer } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FormatDate, getError } from '../../utils';
import { Store } from '../../Store';
import logger from 'use-reducer-logger';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        loading: false,
        blogPosts: action.payload,
      };
    case 'FETCH_FAILED':
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export default function BlogPostsList() {
  const { state } = useContext(Store);
  const { adminInfo } = state;

  const [{ blogPosts, loading, error }, dispatch] = useReducer(
    logger(reducer),
    {
      loading: true,
      error: '',
    }
  );

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const { data } = await axios.get(
          'http://localhost:5000/blogposts/admin',
          {
            headers: { Authorization: `Bearer ${adminInfo.token}` },
          }
        );
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (error) {
        toast.error(getError(error));
        dispatch({ type: 'FETCH_FAILED', payload: error.message });
      }
    };
    fetchData();
  }, []);
  console.log(blogPosts);
  return (
    <>
      {loading ? (
        <div className="text-center">
          <Spinner aria-label="Center-aligned spinner example" />
        </div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <>
          <div className="container mx-auto mt-10 overflow-x-scroll sm:overflow-x-hidden">
            <Table hoverable>
              <Table.Head>
                <Table.HeadCell>Post Title</Table.HeadCell>
                <Table.HeadCell>Admin</Table.HeadCell>
                <Table.HeadCell>Category</Table.HeadCell>
                <Table.HeadCell>Date</Table.HeadCell>
                <Table.HeadCell>
                  <span className="sr-only">Edit</span>
                </Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {blogPosts.map((post) => {
                  return (
                    <Table.Row
                      key={post._id}
                      className="bg-white dark:border-gray-700 dark:bg-gray-800"
                    >
                      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        {post.title}
                      </Table.Cell>
                      <Table.Cell>
                        {post.admin.firstName + ' ' + post.admin.lastName}
                      </Table.Cell>
                      <Table.Cell>{post.category}</Table.Cell>
                      <Table.Cell>{FormatDate(post.createdAt)}</Table.Cell>
                    </Table.Row>
                  );
                })}
              </Table.Body>
            </Table>
          </div>
        </>
      )}
    </>
  );
}
