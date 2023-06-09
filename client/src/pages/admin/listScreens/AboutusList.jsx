import axios from 'axios';
import { Avatar, Spinner, Table } from 'flowbite-react';
import { useEffect, useReducer } from 'react';
import AlertBox from '../../../components/AlertBox';
import { Link } from 'react-router-dom';
import ActionBtn from '../../../components/ActionBtn';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, aboutus: action.payload };
    case 'FETCH_FAILED':
      return { ...state, loading: false, error: action.payload };
  }
};

export default function AboutusList() {
  const [{ loading, aboutus, error }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get('/api/aboutus');
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (error) {
        dispatch({ type: 'FETCH_FAILED', payload: error });
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 pb-5">
        <div className="carouseledit-title | mt-10 text-2xl font-semibold font-serif text-center">
          About Us
        </div>
        {loading ? (
          <div className="text-center">
            <Spinner aria-label="Center-aligned spinner example" />
          </div>
        ) : error ? (
          <AlertBox variant="failure">{error}</AlertBox>
        ) : (
          <>
            <div className="mx-auto overflow-x-scroll sm:overflow-x-hidden p-2">
              <Table hoverable>
                <Table.Head>
                  <Table.HeadCell>Admin</Table.HeadCell>
                  <Table.HeadCell>Position</Table.HeadCell>
                  <Table.HeadCell>
                    <span className="sr-only">Edit</span>
                  </Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                  {aboutus.map((item) => {
                    return (
                      <Table.Row
                        key={item._id}
                        className="bg-white dark:border-gray-700 dark:bg-gray-800"
                      >
                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                          <div className="flex items-center gap-3">
                            <Avatar
                              alt={item.firstName + ' ' + item.lastName}
                              img={item.profileImage}
                              rounded
                              bordered
                            />
                            <div className="owner-name | font-medium dark:text-white capitalize">
                              {item.firstName + ' ' + item.lastName}
                            </div>
                          </div>
                        </Table.Cell>
                        <Table.Cell>{item.position}</Table.Cell>
                        <Table.Cell className="flex flex-wrap gap-3">
                          <Link to={`/aboutusedit/${item._id}`}>
                            <ActionBtn
                              type="edit"
                              sizeReset="p-3 rounded-lg"
                              icon={<i className="bi bi-pencil-square"></i>}
                            />
                          </Link>
                        </Table.Cell>
                      </Table.Row>
                    );
                  })}
                </Table.Body>
              </Table>
            </div>
          </>
        )}
      </div>
    </>
  );
}
