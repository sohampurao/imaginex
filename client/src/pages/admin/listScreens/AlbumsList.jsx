import { Button, Modal, Spinner, Table } from 'flowbite-react';
import { useContext, useEffect, useReducer, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FormatDate, getError } from '../../../utils';
import { Store } from '../../../Store';
import ActionBtn from '../../../components/ActionBtn';
import { Link, useNavigate } from 'react-router-dom';
import AlertBox from '../../../components/AlertBox';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        loading: false,
        albums: action.payload,
      };
    case 'FETCH_FAILED':
      return { ...state, loading: false, error: action.payload };
    case 'CREATE_ALBUM_REQUEST':
      return { ...state, loadingCreate: true };
    case 'CREATE_ALBUM_SUCCESS':
      return {
        ...state,
        loadingCreate: false,
      };
    case 'CREATE_ALBUM_FAILED':
      return { ...state, loadingCreate: false, errorCreate: action.payload };
    case 'DELETE_REQUEST':
      return { ...state, loadingDelete: true, successDelete: false };
    case 'DELETE_SUCCESS':
      return { ...state, loadingDelete: false, successDelete: true };
    case 'DELETE_FAILED':
      return {
        ...state,
        loadingDelete: false,
        errorDelete: action.payload,
        successDelete: false,
      };
    case 'DELETE_RESET':
      return {
        ...state,
        loadingDelete: false,
        successDelete: false,
      };
    default:
      return state;
  }
};

export default function AlbumsList() {
  const [openModel, setOpenModel] = useState(null);
  const { state } = useContext(Store);
  const { adminInfo } = state;
  const navigate = useNavigate();

  const [
    { albums, loading, error, loadingCreate, errorCreate, successDelete },
    dispatch,
  ] = useReducer(reducer, {
    loading: true,
    albums: [],
    error: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const { data } = await axios.get('/api/projectalbums');
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (error) {
        toast.error(getError(error));
        dispatch({ type: 'FETCH_FAILED', payload: getError(error) });
      }
    };
    fetchData();
    if (successDelete) {
      fetchData();
      dispatch({ type: 'DELETE_RESET' });
    }
  }, [adminInfo, successDelete]);

  const createHandler = async () => {
    setOpenModel(false);
    try {
      dispatch({ type: 'CREATE_ALBUM_REQUEST' });
      const { data } = await axios.post(
        '/api/projectalbums',
        { adminInfo },
        {
          headers: { authorization: `Bearer ${adminInfo.token}` },
        }
      );
      toast.success('Album created successfully!');
      dispatch({ type: 'CREATE_ALBUM_SUCCESS' });
      console.log(data);
      navigate(`/projectalbumedit/${data.album._id}`);
    } catch (error) {
      dispatch({ type: 'CREATE_ALBUM_FAILED', payload: getError(error) });
    }
  };

  const deleteHandler = async (album) => {
    if (window.confirm(`Are you sure you want to detele: ${album.title}`))
      try {
        dispatch({ type: 'DELETE_REQUEST' });
        await axios.delete(`/api/projectalbums/${album._id}`, {
          headers: { authorization: `Bearer ${adminInfo.token}` },
        });
        dispatch({ type: 'DELETE_SUCCESS' });
        toast.success(`"${album.title}" Album deleted successfully`);
      } catch (error) {
        toast.error(getError(error));
        dispatch({ type: 'DELETE_FAILED', payload: error });
      }
  };
  return (
    <>
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 pb-5">
        <div className="carouseledit-title | mt-10 text-2xl font-semibold font-serif text-center">
          Project Albums
        </div>
        {loadingCreate ? (
          <div className="text-center">
            <Spinner aria-label="Center-aligned spinner example" />
          </div>
        ) : errorCreate ? (
          <AlertBox variant="failure">{errorCreate}</AlertBox>
        ) : (
          ''
        )}
        {loading ? (
          <div className="text-center py-2">
            <Spinner aria-label="Center-aligned spinner example" />
          </div>
        ) : error ? (
          <AlertBox variant="failure">{error}</AlertBox>
        ) : (
          <>
            <div className="create-btn-container | flex justify-end mx-auto pe-2 my-5">
              <Button
                gradientDuoTone="pinkToOrange"
                onClick={() => setOpenModel(true)}
              >
                Create
              </Button>
            </div>
            <Modal show={openModel} onClose={() => setOpenModel(false)}>
              <Modal.Header>Add Album Confirmation</Modal.Header>
              <Modal.Body>
                <div className="space-y-6">
                  <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    Are you sure you want to add new Album?
                  </p>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={createHandler}>Yes</Button>
                <Button color="gray" onClick={() => setOpenModel(false)}>
                  <p>Cancel</p>
                </Button>
              </Modal.Footer>
            </Modal>
            <div className="mx-over w-[320px] sm:w-full overflow-x-scroll sm:overflow-x-hidden p-2">
              <Table hoverable>
                <Table.Head>
                  <Table.HeadCell>Thumbnail</Table.HeadCell>
                  <Table.HeadCell>Title</Table.HeadCell>
                  <Table.HeadCell>Date</Table.HeadCell>
                  <Table.HeadCell>
                    <span className="sr-only">Edit</span>
                  </Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                  {albums.map((album) => {
                    return (
                      <Table.Row
                        key={album._id}
                        className="bg-white dark:border-gray-700 dark:bg-gray-800"
                      >
                        <Table.Cell>
                          <img
                            src={album.thumbnail}
                            className="w-20 md:w-40 max-h-40 rounded"
                            alt={album.title}
                          />
                        </Table.Cell>
                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                          {album.title}
                        </Table.Cell>
                        <Table.Cell>{FormatDate(album.createdAt)}</Table.Cell>
                        <Table.Cell>
                          <div className="flex flex-wrap items-center gap-3">
                            <ActionBtn
                              type="delete"
                              sizeReset="p-3 rounded-lg h-full"
                              icon={<i className="bi bi-trash3-fill"></i>}
                              onCLick={() => {
                                deleteHandler(album);
                              }}
                            />
                            <Link to={`/projectablumedit/${album._id}`}>
                              <ActionBtn
                                type="edit"
                                sizeReset="p-3 rounded-lg"
                                icon={<i className="bi bi-pencil-square"></i>}
                              />
                            </Link>
                          </div>
                        </Table.Cell>
                      </Table.Row>
                    );
                  })}
                </Table.Body>
              </Table>
            </div>
            <div className="block sm:hidden text-center text-neutral-600 mt-2">
              ⟪ Swipe ⟫
            </div>
          </>
        )}
      </div>
    </>
  );
}
