/* eslint-disable react/prop-types */
import { Alert } from 'flowbite-react';

export default function AlertBox(props) {
  return (
    <>
      <div className="max-w-5xl mt-5 mx-auto px-3">
        <Alert color={props.variant || 'info'} withBorderAccent rounded>
          <span>
            <p>
              <span className="font-medium">{props.children}</span>
            </p>
          </span>
        </Alert>
      </div>
    </>
  );
}
