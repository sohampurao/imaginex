import { useContext, useEffect, useReducer, useState } from 'react';
import { getError } from '../../../utils';
import { Store } from '../../../Store';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  Button,
  Label,
  Modal,
  Spinner,
  TextInput,
  Textarea,
} from 'flowbite-react';
import AlertBox from '../../../components/AlertBox';
import ActionBtn from '../../../components/ActionBtn';
import { toast } from 'react-toastify';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, ourwork: action.payload };
    case 'FETCH_FAILED':
      return { ...state, loading: false, error: action.payload };
    case 'UPDATE_REQUEST':
      return { ...state, loadingUpdate: true };
    case 'UPDATE_SUCCESS':
      return { ...state, loadingUpdate: false };
    case 'UPDATE_FAILED':
      return { ...state, loadingUpdate: false, errorUpdate: action.payload };
    case 'WORK_CREATE_REQUEST':
      return { ...state, loadingCreate: true };
    case 'WORK_CREATE_SUCCESS':
      return { ...state, loadingCreate: false };
    case 'WORK_CREATE_FAILED':
      return { ...state, loadingCreate: false, errorCreate: action.payload };
    case 'WORK_DELETE_REQUEST':
      return { ...state, loadingDelete: true, successDelete: false };
    case 'WORK_DELETE_SUCCESS':
      return { ...state, loadingDelete: false, successDelete: true };
    case 'WORK_DELETE_FAILED':
      return {
        ...state,
        loadingDelete: false,
        errorDelete: action.payload,
        successDelete: false,
      };
    case 'WORK_DELETE_RESET':
      return { ...state, loadingDelete: false, successDelete: false };
    default:
      return state;
  }
};

export default function OurWorkEdit() {
  const navigate = useNavigate();
  const [openModel, setOpenModel] = useState(null);

  const { state } = useContext(Store);
  const { adminInfo } = state;

  const params = useParams();
  const { id: OurWorkId } = params;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const [
    {
      loading,
      error,
      ourwork,
      loadingUpdate,
      errorUpdate,
      loadingCreate,
      errorCreate,
      successDelete,
    },
    dispatch,
  ] = useReducer(reducer, {
    loading: true,
    error: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/ourwork/edit/${OurWorkId}`, {
          headers: { authorization: `Bearer ${adminInfo.token}` },
        });
        setTitle(data.title);
        setDescription(data.description);
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (error) {
        dispatch({ type: 'FETCH_FAILED', payload: getError(error) });
      }
    };
    fetchData();
    if (successDelete) {
      fetchData();
      dispatch({ type: 'WORK_DELETE_RESET' });
    }
  }, [OurWorkId, adminInfo, successDelete]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch({ type: 'UPDATE_REQUEST' });
      await axios.put(
        `/api/ourwork/${OurWorkId}`,
        {
          title,
          description,
        },
        {
          headers: { authorization: `Bearer ${adminInfo.token}` },
        }
      );
      dispatch({ type: 'UPDATE_SUCCESS' });
      navigate('/ourworklist');
      toast.success('Work saved successfully.');
    } catch (error) {
      dispatch({ type: 'UPDATE_FAILED', payload: getError(error) });
    }
  };

  const deleteHandler = async (work) => {
    if (window.confirm(`Are you really want to delete "${work.title}"?`)) {
      try {
        dispatch({ type: 'WORK_DELETE_REQUEST' });
        await axios.delete(`/api/ourwork/work/${work._id}`, {
          headers: { authorization: `Bearer ${adminInfo.token}` },
        });
        dispatch({ type: 'WORK_DELETE_SUCCESS' });
        toast.success(`${work.title} deleted successfully.`);
      } catch (error) {
        toast.error(getError(error));
        dispatch({ type: 'WORK_DELETE_SUCCESS', payload: getError(error) });
      }
    }
  };

  const createHandler = async () => {
    setOpenModel(false);
    try {
      dispatch({ type: 'WORK_CREATE_REQUEST' });
      const { data } = await axios.post(
        `/api/ourwork/work/${OurWorkId}`,
        {},
        {
          headers: { authorization: `Bearer ${adminInfo.token}` },
        }
      );
      dispatch({ type: 'WORK_CREATE_SUCCESS' });
      navigate(`/ourwork/workedit/${data.work._id}`);
      toast.success('Work created successfully.');
    } catch (error) {
      dispatch({ type: 'WORK_CREATE_FAILED', payload: getError(error) });
    }
  };

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
        <>
          <div className="work-container | w-full lg:max-w-4xl mx-auto my-5 px-4">
            <div className="title | text-xl font-medium font-serif text-center mb-3">
              Edit &ldquo;{title}&rdquo;
            </div>
            <form className="flex flex-col gap-4" onSubmit={submitHandler}>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="title" value="Title" />
                </div>
                <TextInput
                  id="title"
                  type="text"
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
                  placeholder="Write description..."
                  required
                  rows={5}
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                />
              </div>

              <div>
                <div className="ourwork-title | text-xl font-semibold font-serif text-center mt-2">
                  Work Edit
                </div>
                <div className="create-btn-container | flex justify-end mx-auto pe-2 my-5">
                  <Button
                    gradientDuoTone="pinkToOrange"
                    onClick={() => setOpenModel(true)}
                    disabled={loadingCreate}
                  >
                    Create
                  </Button>
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
                  {errorCreate && (
                    <AlertBox variant="failure">{errorCreate}</AlertBox>
                  )}
                </div>
                <div className="work-display | mt-5 flex justify-evenly items-center flex-wrap ps-4">
                  {ourwork.work.map((work) => {
                    return (
                      <div
                        key={work._id}
                        className="display-col | w-full sm:w-6/12 lg:w-4/12 pe-4 pb-4 box-border"
                      >
                        <div className="work-card | hover:shadow-xl hover:scale-105 transition-all max-w-sm max-h-[300px] min-h-[300px] md:min-h-[330px] md:max-h-[330px] bg-white border border-gray-200 rounded-lg shadow mx-auto">
                          <img
                            className="rounded-t-lg max-h-[180px] min-h-[180px] w-full"
                            src={work.thumbnail}
                            alt={work.title}
                          />
                          <div className="px-5 py-4 flex flex-col items-center justify-between gap-1">
                            <h5 className="mb-2 text-sm font-bold tracking-tight text-neutral-600">
                              {work.title}
                            </h5>

                            <div className="action-btns | flex gap-3">
                              <ActionBtn
                                type="delete"
                                sizeReset="p-3 rounded-lg"
                                icon={<i className="bi bi-trash3-fill"></i>}
                                onCLick={() => {
                                  deleteHandler(work);
                                }}
                              />
                              <Link
                                to={`/ourwork/workedit/${work._id}`}
                                className="mx-auto"
                              >
                                <ActionBtn
                                  type="edit"
                                  sizeReset="p-3 rounded-lg"
                                  icon={<i className="bi bi-pencil-square"></i>}
                                />
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <Button
                type="submit"
                className="w-fit mx-auto px-10"
                disabled={loadingUpdate}
              >
                {loadingUpdate ? (
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
        </>
      )}
    </>
  );
}
