import { Button, Label, TextInput } from 'flowbite-react';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import {
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_UPLOAD_PRESET,
  getError,
} from '../utils';
import { useNavigate } from 'react-router-dom';

export default function AddAdmin() {
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isValid, setIsValid] = useState(true);

  const handleChange = (event) => {
    const newPassword = event.target.value;
    setPassword(newPassword);

    // Password validation criteria
    const regex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const isPasswordValid = regex.test(newPassword);
    setIsValid(isPasswordValid);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.warning('Password and Confirm password must be same!');
    } else {
      try {
        await axios.post('http://localhost:5000/admins/addadmin', {
          firstName,
          lastName,
          profileImage,
          email,
          password,
        });
        toast.success(
          `${firstName} ${lastName} is successfully added as a admin.`
        );
        navigate('/addlist');
      } catch (error) {
        toast.error(getError(error));
      }
    }
  };

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

  return (
    <>
      <div className="container mx-auto flex justify-center pb-5">
        <form
          className="flex flex-col gap-4 mt-5 max-w-md sm:w-[500px] shadow p-4 rounded-lg"
          onSubmit={onSubmitHandler}
        >
          <div className="signin-title | text-2xl font-semibold font-serif text-center">
            Add Admin
          </div>
          <div className="profile-image-container | flex flex-col justify-center items-center">
            <div className="profile-holder | h-40 w-40 rounded-full bg-white overflow-hidden flex flex-col justify-center">
              <img
                src={
                  profileImage
                    ? profileImage
                    : '/images/profile/default-profile-picture.webp'
                }
                alt={'Profile Image'}
                className="h-52 w-auto"
              />
            </div>
          </div>
          <div>
            <Button
              type="button"
              gradientDuoTone="purpleToPink"
              className="w-full font-semibold"
              onClick={() => widgetRef.current.open()}
            >
              <i className="bi bi-cloud-arrow-up-fill"></i>{' '}
              <span className="ms-2">Upload Profile Image</span>
            </Button>
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="firstName" value="First Name" />
            </div>
            <TextInput
              id="firstName"
              type="text"
              placeholder="enter first name"
              required={true}
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
              placeholder="enter last name"
              required={true}
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
              placeholder="example@mail.com"
              required={true}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label
                htmlFor="password"
                value="Password"
                color={!isValid ? 'failure' : 'gray'}
              />
            </div>
            <TextInput
              id="password"
              type="password"
              required={true}
              value={password}
              onChange={handleChange}
              color={!isValid ? 'failure' : 'gray'}
              helperText={
                !isValid
                  ? 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit and one special character.'
                  : ''
              }
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="confirmPassword" value="Confirm Password" />
            </div>
            <TextInput
              id="confirmPassword"
              type="password"
              required={true}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <Button type="submit">Add</Button>
        </form>
      </div>
    </>
  );
}
