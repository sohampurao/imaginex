import axios from 'axios';
import {
  Badge,
  Button,
  Label,
  Spinner,
  TextInput,
  Textarea,
} from 'flowbite-react';
import { useContext, useEffect, useReducer, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AlertBox from '../../../components/AlertBox';
import {
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_UPLOAD_PRESET,
  FormatDate,
  FormatTime,
  getError,
} from '../../../utils';
import { Store } from '../../../Store';
import { toast } from 'react-toastify';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, aboutus: action.payload };
    case 'FETCH_FAILED':
      return { ...state, loading: false, error: action.payload };
    case 'UPDATE_REQUEST':
      return { ...state, loadingUpdate: true };
    case 'UPDATE_SUCCESS':
      return { ...state, loadingUpdate: false, adminUpdate: action.payload };
    case 'UPDATE_FAILED':
      return { ...state, loadingUpdate: false, errorUpdate: action.payload };
    default:
      return state;
  }
};

export default function AboutusEdit() {
  const params = useParams();
  const { id: AboutusId } = params;

  const navigate = useNavigate();

  const { state } = useContext(Store);
  const { adminInfo } = state;

  const [{ loading, aboutus, error, errorUpdate, loadingUpdate }, dispatch] =
    useReducer(reducer, {
      loading: true,
      error: '',
    });

  const [formattedUpdateTime, setFormattedUpdateTime] = useState('');
  // this updates the uploaded time every seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      const formattedTime = FormatTime(aboutus.updatedAt);
      setFormattedUpdateTime(formattedTime);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [aboutus]);

  const [profileImage, setProfileImage] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [position, setPosition] = useState('');
  const [description, setDescription] = useState('');
  const [facebookURL, setFacebookURL] = useState('');
  const [linkedinURL, setLinkedinURL] = useState('');
  const [whatsappNo, setWhatsappNo] = useState('');
  const [instagramURL, setInstagramURL] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/aboutus/${AboutusId}`, {
          headers: { authorization: `Bearer ${adminInfo.token}` },
        });
        setProfileImage(data.profileImage);
        setFirstName(data.firstName);
        setLastName(data.lastName);
        setPosition(data.position);
        setDescription(data.description);
        setFacebookURL(data.facebookURL);
        setLinkedinURL(data.linkedinURL);
        setWhatsappNo(data.whatsappNo);
        setInstagramURL(data.instagramURL);
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (error) {
        dispatch({ type: 'FETCH_FAILED', payload: error });
      }
    };
    fetchData();
  }, [AboutusId, adminInfo]);

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
        folder: `Imaginex/about us`,
        clientAllowedFormats: ['image'],
        sources: ['local', 'url', 'camera', 'google_drive'],
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
        `/api/aboutus/${AboutusId}`,
        {
          profileImage,
          firstName,
          lastName,
          position,
          description,
          facebookURL,
          linkedinURL,
          whatsappNo,
          instagramURL,
        },
        {
          headers: { authorization: `Bearer ${adminInfo.token}` },
        }
      );
      dispatch({ type: 'UPDATE_SUCCESS' });
      toast.success('Information has saved.');
      navigate('/aboutuslist');
    } catch (error) {
      dispatch({ type: 'UPDATE_FAILED', payload: getError(error) });
    }
  };
  return (
    <>
      <div className="container mx-auto flex justify-center pb-5">
        <form
          className="flex flex-col w-full gap-4 mt-5 max-w-md sm:w-[500px] md:shadow p-4 rounded-lg"
          onSubmit={submitHandler}
        >
          <div className="signin-title | text-xl font-semibold font-serif text-center">
            Edit About
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
                    alt={aboutus.firstName + ' ' + aboutus.lastName}
                    className="h-52 w-auto"
                  />
                </div>
              </div>
              <div className="updated-status">
                {aboutus.createdAt !== aboutus.updatedAt ? (
                  <Badge
                    color="success"
                    className="mx-auto flex justify-center p-5 text-neutral-600 text-base w-[250px]"
                  >
                    <span>Updated at: {FormatDate(aboutus.updatedAt)}</span>
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
                  <i className="bi bi-person-circle"></i>
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
                  <Label htmlFor="position" value="Position" />
                </div>
                <TextInput
                  id="title"
                  type="text"
                  required={true}
                  placeholder="Enter your position in company."
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
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

              <div className="signin-title | text-base text-center mt-3">
                Social Media links
              </div>

              <div>
                <div className="mb-2 block">
                  <Label htmlFor="facebook" value="Facebook URL (optional)" />
                </div>
                <TextInput
                  id="facebook"
                  type="url"
                  placeholder="Enter your facebook profile URL."
                  value={facebookURL}
                  onChange={(e) => setFacebookURL(e.target.value)}
                  required="false"
                />
              </div>

              <div>
                <div className="mb-2 block">
                  <Label htmlFor="linkedin" value="LinkedIn URL (optional)" />
                </div>
                <TextInput
                  id="linkedin"
                  type="url"
                  placeholder="Enter your linkedIn profile URL."
                  value={linkedinURL}
                  onChange={(e) => setLinkedinURL(e.target.value)}
                  required="false"
                />
              </div>

              <div>
                <div className="mb-2 block">
                  <Label
                    htmlFor="whatsapp"
                    value="Whatsapp Number (optional)"
                  />
                </div>
                <TextInput
                  id="whatsapp"
                  type="number"
                  maxLength={10}
                  minLength={10}
                  placeholder="Enter your whatsapp number..."
                  value={whatsappNo}
                  onChange={(e) => setWhatsappNo(e.target.value)}
                  required="false"
                />
              </div>

              <div>
                <div className="mb-2 block">
                  <Label htmlFor="instagram" value="Instagram URL (optional)" />
                </div>
                <TextInput
                  id="instagram"
                  type="url"
                  placeholder="Enter your instagram profile URL."
                  value={instagramURL}
                  onChange={(e) => setInstagramURL(e.target.value)}
                  required="false"
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
