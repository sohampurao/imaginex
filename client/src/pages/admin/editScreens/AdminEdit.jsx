import { useContext, useEffect, useReducer, useRef, useState } from 'react';
import { Store } from '../../../Store';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Badge, Button, Label, Spinner, TextInput } from 'flowbite-react';
import AlertBox from '../../../components/AlertBox';
import {
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_UPLOAD_PRESET,
  FormatDate,
  FormatTime,
  getError,
} from '../../../utils';
import logger from 'use-reducer-logger';
import { toast } from 'react-toastify';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, admin: action.payload };
    case 'FETCH_FAILED':
      return { ...state, loading: false, error: action.payload };
    case 'UPDATE_REQUEST':
      return { ...state, loadingUpdate: true };
    case 'UPDATE_SUCCESS':
      return { ...state, loadingUpdate: false, adminUpdate: action.payload };
    case 'UPDATE_FAILED':
      return { ...state, loadingUpdate: false, errorUpdate: action.payload };
    default:
      state;
  }
};

export default function AdminEdit() {
  const navigate = useNavigate();
  const params = useParams();
  const { id: adminId } = params;

  const { state } = useContext(Store);
  const { adminInfo } = state;

  const [{ loading, admin, error, loadingUpdate, errorUpdate }, dispatch] =
    useReducer(logger(reducer), {
      loading: true,
      error: '',
      loadingUpdate: false,
      errorUpdate: '',
    });

  const [profileImage, setProfileImage] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [formattedUpdateTime, setFormattedUpdateTime] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: `FETCH_REQUEST` });
        const { data } = await axios.get(`/api/admins/${adminId}`, {
          headers: { authorization: `Bearer ${adminInfo.token}` },
        });
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
        setFirstName(data.firstName);
        setLastName(data.lastName);
        setEmail(data.email);
        setProfileImage(data.profileImage);
      } catch (error) {
        dispatch({ type: 'FETCH_FAILED', payload: getError(error) });
      }
    };
    fetchData();
  }, [adminInfo, adminId]);

  // this updates the uploaded time every seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      const formattedTime = FormatTime(admin.updatedAt);
      setFormattedUpdateTime(formattedTime);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [admin]);

  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: CLOUDINARY_CLOUD_NAME,
        uploadPreset: CLOUDINARY_UPLOAD_PRESET,
      },
      function (error, result) {
        if (result.event == 'success') {
          setProfileImage(result.info.secure_url);
        }
        if (error) {
          toast.error(getError(error));
        }
      }
    );
  }, [profileImage]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch({ type: 'UPDATE_REQUEST' });
      await axios.put(
        `/api/admins/${adminId}`,
        {
          profileImage,
          firstName,
          lastName,
          email,
          password,
        },
        {
          headers: { authorization: `Bearer ${adminInfo.token}` },
        }
      );
      dispatch({ type: 'UPDATE_SUCCESS' });
      toast.success(`${firstName + ' ' + lastName} saved successfully.`);
      navigate('/adminlist');
    } catch (error) {
      toast.error(getError(error));
      dispatch({ type: 'UPDATE_SUCCESS', payload: error });
    }
  };
  return (
    <>
      <div className="container mx-auto flex justify-center pb-5">
        <form
          className="flex flex-col gap-4 mt-5 max-w-md sm:w-[500px] shadow p-4 rounded-lg"
          onSubmit={submitHandler}
        >
          <div className="signin-title | text-xl font-semibold font-serif text-center">
            Edit Admin
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
              <div className="profile-image-container | flex flex-col justify-center items-center">
                <div className="profile-holder | h-40 w-40 rounded-full bg-white overflow-hidden flex flex-col justify-center">
                  <img
                    src={profileImage}
                    alt={admin.firstName + ' ' + admin.lastName}
                    className="h-52 w-auto"
                  />
                </div>
              </div>
              <div className="updated-status">
                {admin.createdAt !== admin.updatedAt ? (
                  <Badge
                    color="success"
                    className="mx-auto flex justify-center p-5 text-neutral-600 text-base w-[250px]"
                  >
                    <span>Updated at: {FormatDate(admin.updatedAt)}</span>
                    <span className="mx-[5px] inline-block">||</span>
                    <span>{formattedUpdateTime}</span>
                  </Badge>
                ) : (
                  ''
                )}
              </div>

              <div>
                <Button
                  type="button"
                  gradientDuoTone="purpleToPink"
                  className="w-full font-semibold"
                  onClick={() => widgetRef.current.open()}
                >
                  <span className="me-2">Change Profile Image</span>{' '}
                  <i className="bi bi-image"></i>
                </Button>
              </div>

              <div>
                <div className="mb-2 block">
                  <Label htmlFor="firstName" value="First Name" />
                </div>
                <TextInput
                  id="firstName"
                  type="text"
                  required={true}
                  placeholder="Enter your firstname"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>

              <div>
                <div className="mb-2 block">
                  <Label htmlFor="lastName" value="Last Name" />
                </div>
                <TextInput
                  id="lastName"
                  type="text"
                  required={true}
                  placeholder="Enter your lastname"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>

              <div>
                <div className="mb-2 block">
                  <Label htmlFor="email" value="Email" />
                </div>
                <TextInput
                  id="email"
                  type="email"
                  required={email}
                  placeholder="example@mail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <div className="mb-2 block">
                  <Label htmlFor="password" value="password" />
                </div>
                <TextInput
                  id="password"
                  type="password"
                  required={true}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
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
