import { Button, Label, TextInput } from 'flowbite-react';

export default function Signin() {
  return (
    <>
      <div className="container mx-auto flex justify-center">
        <form className="flex flex-col gap-4 mt-20 w-[300px] sm:w-[500px]">
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email1" value="Email" />
            </div>
            <TextInput
              id="email1"
              type="email"
              placeholder="example@mail.com"
              required={true}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password" value="Password" />
            </div>
            <TextInput id="password" type="password" required={true} />
          </div>
          <Button type="submit">Sign-In</Button>
        </form>
      </div>
    </>
  );
}
