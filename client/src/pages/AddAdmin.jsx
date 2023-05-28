import { Button, Label, TextInput } from 'flowbite-react';
import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { getError } from '../utils';

export default function AddAdmin() {
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
        await axios.post('http://localhost:5000/admins/signup', {
          firstName,
          lastName,
          // profileImage,
          email,
          password,
        });
        toast.success(
          `${firstName} ${lastName} is successfully added as a admin.`
        );
      } catch (error) {
        toast.error(getError(error));
      }
    }
  };

  return (
    <>
      <div className="container mx-auto flex justify-center">
        <form
          className="flex flex-col gap-4 mt-10 w-[300px] sm:w-[500px]"
          onSubmit={onSubmitHandler}
        >
          <div className="signin-title | text-2xl font-semibold font-serif text-center">
            Add Admin
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="firstName" value="First Name" />
            </div>
            <TextInput
              id="firstName"
              type="text"
              placeholder="enter your first name"
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
              placeholder="enter your last name"
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
