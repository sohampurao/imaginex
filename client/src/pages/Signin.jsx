import { Button, Label, TextInput } from 'flowbite-react';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Store } from '../Store';
import { useNavigate } from 'react-router-dom';
import { getError } from '../utils';

export default function Signin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { adminInfo } = state;

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('http://localhost:5000/admins/signin', {
        email,
        password,
      });
      ctxDispatch({ type: 'ADMIN_SIGNIN', payload: data });
      localStorage.setItem('adminInfo', JSON.stringify(data));
      navigate('/dashboard');
    } catch (error) {
      toast.error(getError(error));
    }
  };

  useEffect(() => {
    if (adminInfo) {
      navigate('/');
    }
  }),
    [adminInfo, navigate];
  return (
    <>
      <div className="container mx-auto flex justify-center">
        <form
          className="flex flex-col gap-4 mt-20 w-[300px] sm:w-[500px]"
          onSubmit={onSubmitHandler}
        >
          <div className="signin-title | text-2xl font-semibold font-serif text-center">
            Admin Sign-In
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email1" value="Email" />
            </div>
            <TextInput
              id="email1"
              type="email"
              placeholder="example@mail.com"
              required={true}
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
          <Button type="submit">Sign-In</Button>
        </form>
      </div>
    </>
  );
}
