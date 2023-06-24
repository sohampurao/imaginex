import axios from 'axios';
import { useContext, useEffect, useReducer, useState } from 'react';
import { FormatDate, getError } from '../../../utils';
import { Store } from '../../../Store';
import { Button, Modal, Spinner, Table } from 'flowbite-react';
import AlertBox from '../../../components/AlertBox';
import ActionBtn from '../../../components/ActionBtn';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, ourworks: action.payload };
    case 'FETCH_FAILED':
      return { ...state, loading: false, error: action.payload };
    case 'CREATE_REQUEST':
      return { ...state, loadingCreate: true };
    case 'CREATE_SUCCESS':
      return { ...state, loadingCreate: false };
    case 'CREATE_FAILED':
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
      return { ...state, loadingDelete: false, successDelete: false };
    default:
      return state;
  }
};

export default function OurWorkList() {
  const navigate = useNavigate();
  const [openModel, setOpenModel] = useState(null);

  const { state } = useContext(Store);
  const { adminInfo } = state;

  const [
    {
      loading,
      error,
      ourworks,
      successDelete,
      errorDelete,
      loadingCreate,
      errorCreate,
    },
    dispatch,
  ] = useReducer(reducer, {
    loading: true,
    error: '',
    loadingCreate: false,
    errorCreate: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get('/api/ourwork', {
          headers: { authorization: `Bearer ${adminInfo.token}` },
        });
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (error) {
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
      dispatch({ type: 'CREATE_REQUEST' });
      const { data } = await axios.post(
        '/api/ourwork',
        {},
        {
          headers: { authorization: `Bearer ${adminInfo.token}` },
        }
      );
      dispatch({ type: 'CREATE_SUCCESS' });
      navigate(`/ourworkedit/${data.ourwork._id}`);
      toast.success('Ourwork created successfully.');
    } catch (error) {
      dispatch({ type: 'CREATE_FAILED', payload: getError(error) });
    }
  };

  const deleteHandler = async (ourwork) => {
    if (window.confirm(`Are you sure you want to delete "${ourwork.title}"`)) {
      try {
        dispatch({ type: 'DELETE_REQUEST' });
        await axios.delete(`/api/ourwork/${ourwork._id}`, {
          headers: { authorization: `Bearer ${adminInfo.token}` },
        });
        dispatch({ type: 'DELETE_SUCCESS' });
      } catch (error) {
        dispatch({ type: 'DELETE_SUCCESS', payload: getError(error) });
      }
    }
  };
  return (
    <>
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 pb-5">
        <div className="carouseledit-title | mt-10 text-2xl font-semibold font-serif text-center">
          Our Work
        </div>
        <Modal show={openModel} onClose={() => setOpenModel(false)}>
          <Modal.Header>Add Work Confirmation</Modal.Header>
          <Modal.Body>
            <div className="space-y-6">
              <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                Are you sure you want to add Work?
              </p>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={createHandler} disabled={loadingCreate}>
              Yess!
            </Button>
            <Button color="gray" onClick={() => setOpenModel(false)}>
              <p>Cancel</p>
            </Button>
          </Modal.Footer>
        </Modal>
        {loading ? (
          <div className="text-center py-2">
            <Spinner aria-label="Center-aligned spinner example" />
          </div>
        ) : error ? (
          <AlertBox variant="failure">{error}</AlertBox>
        ) : errorDelete ? (
          <AlertBox variant="failure">{errorDelete}</AlertBox>
        ) : errorCreate ? (
          <AlertBox variant="failure">{errorCreate}</AlertBox>
        ) : (
          <>
            <div className="create-btn-container | flex justify-end mx-auto pe-2 my-5">
              <Button
                gradientDuoTone="pinkToOrange"
                onClick={() => setOpenModel(true)}
                disabled={loadingCreate}
              >
                Create
              </Button>
            </div>
            <div className="mx-auto overflow-x-scroll sm:overflow-x-hidden p-2">
              <Table hoverable>
                <Table.Head>
                  <Table.HeadCell>Title</Table.HeadCell>
                  <Table.HeadCell>Date</Table.HeadCell>
                  <Table.HeadCell>
                    <span className="sr-only">Edit</span>
                  </Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                  {ourworks.map((ourwork) => {
                    return (
                      <Table.Row
                        key={ourwork._id}
                        className="bg-white dark:border-gray-700 dark:bg-gray-800"
                      >
                        <Table.Cell className="whitespace-nowrap capitalize font-medium text-gray-900 dark:text-white">
                          {ourwork.title}
                        </Table.Cell>
                        <Table.Cell>{FormatDate(ourwork.createdAt)}</Table.Cell>
                        <Table.Cell className="flex flex-wrap gap-3">
                          <ActionBtn
                            type="delete"
                            sizeReset="p-3 rounded-lg"
                            icon={<i className="bi bi-trash3-fill"></i>}
                            onCLick={() => {
                              deleteHandler(ourwork);
                            }}
                          />
                          <Link to={`/ourworkedit/${ourwork._id}`}>
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
