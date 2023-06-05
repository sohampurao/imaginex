import { useEffect, useRef } from 'react';

const UploadWidget = () => {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: 'dazvnvkca',
        uploadPreset: 'pgu2ly6f',
      },
      function (error, result) {
        console.log(result);
        console.log(result.info.secure_url);
      }
    );
  }, []);
  return <button onClick={() => widgetRef.current.open()}>upload</button>;
};

export default UploadWidget;
