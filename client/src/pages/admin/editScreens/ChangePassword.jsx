import axios from 'axios';
import { useContext, useReducer, useState } from 'react';
import { getError } from '../../../utils';
import { Button, Label, Spinner, TextInput } from 'flowbite-react';
import { Store } from '../../../Store';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const reducer = (state, action) => {
  switch (action.type) {
    case 'PASSCHANGE_REQUEST':
      return { ...state, loadingPassChange: true };
    case 'PASSCHANGE_SUCCESS':
      return { ...state, loadingPassChange: false };
    case 'PASSCHANGE_FAILED':
      return {
        ...state,
        loadingPassChange: false,
        errorPassChange: action.payload,
      };
    default:
      state;
  }
};

export default function ChangePassword() {
  const navigate = useNavigate();
  const { state } = useContext(Store);
  const { adminInfo } = state;

  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [{ loadingPassChange }, dispatch] = useReducer(reducer, {
    loadingPassChange: false,
  });

  const [isValid, setIsValid] = useState(true);
  const newPassHandleChange = (event) => {
    const newPassword = event.target.value;
    setNewPassword(newPassword);

    // Password validation criteria
    const regex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const isPasswordValid = regex.test(newPassword);
    setIsValid(isPasswordValid);
  };

  const [confirmPassIsValid, setConfirmPassIsValid] = useState(true);
  const confirmPassHandleChange = (event) => {
    const newConfirmPassword = event.target.value;
    setConfirmPassword(newConfirmPassword);

    if (newPassword == newConfirmPassword) {
      setConfirmPassIsValid(true);
    } else {
      setConfirmPassIsValid(false);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch({ type: 'PASSCHANGE_REQUEST' });
      await axios.put(
        `/api/admins/changepassword/${adminInfo._id}`,
        {
          password,
          newPassword,
        },
        {
          headers: { authorization: `Bearer ${adminInfo.token}` },
        }
      );
      dispatch({ type: 'PASSCHANGE_SUCCESS' });
      toast.success('Password updated successfully');
      navigate('/');
    } catch (error) {
      toast.error(getError(error));
      dispatch({ type: 'PASSCHANGE_FAILED', payload: getError(error) });
    }
  };
  return (
    <>
      <div className="container mx-auto flex justify-center pb-5">
        <form
          className="flex flex-col gap-4 mt-5 w-full max-w-md sm:w-[500px] sm:shadow p-4 px-8 rounded-lg"
          onSubmit={submitHandler}
        >
          <>
            <div className="profile-container | flex flex-col justify-center items-center gap-2">
              <div className="profile-image | h-32 w-32 rounded-full bg-white overflow-hidden flex flex-col justify-center ">
                <img
                  src={adminInfo.profileImage}
                  alt={adminInfo.firstName + ' ' + adminInfo.lastName}
                  className="h-40 w-auto"
                />
              </div>
              <div className="profile-info | text-center">
                <div className="fullname | mb-1 text-xl font-medium text-gray-900 ">
                  {adminInfo.firstName + ' ' + adminInfo.lastName}
                </div>
                <div className="email | text-sm text-gray-500 dark:text-gray-400">
                  {adminInfo.email}
                </div>
              </div>
            </div>

            <div>
              <div className="mb-2 block">
                <Label htmlFor="password" value="Current Password" />
              </div>
              <TextInput
                id="password"
                type="password"
                required={true}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                placeholder="Enter current password..."
              />
            </div>

            <div>
              <div className="mb-2 block">
                <Label
                  htmlFor="newPassword"
                  value="New Password"
                  color={!isValid ? 'failure' : 'gray'}
                />
              </div>
              <TextInput
                id="newPassword"
                type="password"
                required={true}
                value={newPassword}
                onChange={newPassHandleChange}
                color={!isValid ? 'failure' : 'gray'}
                helperText={
                  !isValid
                    ? 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit and one special character.'
                    : ''
                }
                placeholder="Enter new password..."
              />
            </div>

            <div>
              <div className="mb-2 block">
                <Label
                  htmlFor="confirmPassword"
                  value="Retype new password"
                  color={!confirmPassIsValid ? 'failure' : 'gray'}
                />
              </div>
              <TextInput
                id="confirmPassword"
                type="password"
                required={true}
                value={confirmPassword}
                onChange={confirmPassHandleChange}
                color={!confirmPassIsValid ? 'failure' : 'gray'}
                helperText={
                  !confirmPassIsValid
                    ? 'New password does not match. Enter new password again here.'
                    : ''
                }
                placeholder="Enter retype new password..."
              />
            </div>

            <Button type="submit" disabled={loadingPassChange}>
              {loadingPassChange ? (
                <>
                  <Spinner aria-label="Spinner button example" />
                  <span className="pl-3">Submiting...</span>
                </>
              ) : (
                'Submit'
              )}
            </Button>
          </>
        </form>
      </div>
    </>
  );
}
