import { Avatar, Badge, Button, Spinner, Table } from 'flowbite-react';
import { useContext, useEffect, useReducer } from 'react';
import { Store } from '../../../Store';
import axios from 'axios';
import { toast } from 'react-toastify';
import { getError } from '../../../utils';
import AlertBox from '../../../components/AlertBox';
import ActionBtn from '../../../components/ActionBtn';
import { Link } from 'react-router-dom';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, admins: action.payload };
    case 'FETCH_FAILED':
      return { ...state, loading: false, error: action.payload };
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
      break;
  }
};

export default function AdminList() {
  const { state } = useContext(Store);
  const { adminInfo } = state;

  const [{ loading, error, admins, successDelete }, dispatch] = useReducer(
    reducer,
    {
      loading: true,
      error: '',
      successDelete: false,
    }
  );

  useEffect(() => {
    const fectchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get('/api/admins', {
          headers: { authorization: `Bearer ${adminInfo.token}` },
        });
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (error) {
        toast.error(getError(error));
        dispatch({ type: 'FETCH_FAILED', payload: getError(error) });
      }
    };
    fectchData();
    if (successDelete) {
      fectchData();
    }
  }, [adminInfo, successDelete]);

  const deleteHandler = async (admin) => {
    if (
      window.confirm(
        `Are you really want to delete "${
          admin.firstName + ' ' + admin.lastName
        }" ?`
      )
    ) {
      try {
        dispatch({ type: 'DELETE_REQUEST' });
        await axios.delete(`/api/admins/${admin._id}`, {
          headers: { authorization: `Bearer ${adminInfo.token}` },
        });
        dispatch({ type: 'DELETE_SUCCESS' });
        toast.success(
          `${admin.firstName + ' ' + admin.lastName} deleted successfully.`
        );
      } catch (error) {
        toast.error(getError(error));
        dispatch({ type: 'DELETE_SUCCESS', payload: getError(error) });
      }
    }
  };
  return (
    <>
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 pb-5">
        <div className="carouseledit-title | mt-10 text-2xl font-semibold font-serif text-center">
          System Admins
        </div>
        {adminInfo.isOwner ? (
          <div className="create-btn-container | flex justify-end mx-auto pe-2 my-5">
            <Link to={'/addadmin'}>
              <Button gradientDuoTone="pinkToOrange">Add Admin</Button>
            </Link>
          </div>
        ) : (
          ''
        )}
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
                  <Table.HeadCell>
                    <span className="sr-only">Position</span>
                  </Table.HeadCell>
                  <Table.HeadCell>Email</Table.HeadCell>
                  <Table.HeadCell>
                    <span className="sr-only">Edit</span>
                  </Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                  {admins.map((admin) => {
                    return (
                      <Table.Row
                        key={admin._id}
                        className="bg-white dark:border-gray-700 dark:bg-gray-800"
                      >
                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                          <div className="flex items-center gap-3">
                            <Avatar
                              alt={admin.firstName + ' ' + admin.lastName}
                              img={admin.profileImage}
                              rounded
                              bordered
                            />
                            <div className="admin-name | font-medium dark:text-white">
                              {admin.firstName + ' ' + admin.lastName}
                            </div>
                          </div>
                        </Table.Cell>
                        <Table.Cell>
                          <Badge
                            color={`${
                              admin.isOwner
                                ? 'warning'
                                : admin.isAdmin
                                ? 'success'
                                : 'dark'
                            }`}
                            className="px-4 py-1"
                          >
                            {admin.isOwner
                              ? 'Owner'
                              : admin.isAdmin
                              ? 'Admin'
                              : 'Undefined'}
                          </Badge>
                        </Table.Cell>
                        <Table.Cell>{admin.email}</Table.Cell>
                        <Table.Cell className="flex flex-wrap gap-3">
                          <ActionBtn
                            type="delete"
                            sizeReset="p-3 rounded-lg"
                            icon={<i className="bi bi-trash3-fill"></i>}
                            onCLick={() => {
                              deleteHandler(admin);
                            }}
                          />
                          <Link to={`/admin/${admin._id}`}>
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
