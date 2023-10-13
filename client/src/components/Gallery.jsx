import { useState } from 'react';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { MdClose } from 'react-icons/md';
import { FcPrevious } from 'react-icons/fc';
import { FcNext } from 'react-icons/fc';
function Gallery() {
  const images = [
    'https://picsum.photos/3000/2000',
    'https://picsum.photos/4000/1500',
    'https://picsum.photos/3000/1500',
    'https://picsum.photos/1000/1500',
    'https://picsum.photos/1000/2000',
    'https://picsum.photos/1500/2000',
    'https://picsum.photos/2300/1500',
    'https://picsum.photos/1200/1500',
    'https://picsum.photos/1200/2000',
    'https://picsum.photos/2000/1500',
  ];

  const [data, setData] = useState({ img: '', i: 0 });

  const ViewImage = (img, i) => {
    setData({ img, i });
  };

  const imgAction = (action) => {
    let i = data.i;
    if (action === 'next-img') {
      setData({ img: images[i + 1], i: i + 1 });
    }
    if (action === 'previous-img') {
      setData({ img: images[i - 1], i: i - 1 });
    }
    if (!action) {
      setData({ img: '', i: '' });
    }
  };

  return (
    <>
      {data.img && (
        <div className="w-full h-screen bg-black fixed flex justify-center items-center overflow-hidden z-[70] text-white">
          <button
            className="text-3xl md:me-4 hover:opacity-75"
            onClick={() => imgAction('previous-img')}
          >
            <FcPrevious />
          </button>
          <img
            src={data.img}
            alt=""
            className="w-auto max-w-[85%] max-h-[90vh]"
          />
          <button
            className="text-3xl md:ms-4 hover:opacity-75"
            onClick={() => imgAction('next-img')}
          >
            <FcNext />
          </button>
          <div className="image-count | absolute bottom-3 right-3 rounded-full p-1 tracking-wider">
            {data.i + 1 + '/' + images.length}
          </div>
          <button
            className="absolute top-3 right-3 text-3xl"
            onClick={() => imgAction()}
          >
            <MdClose />
          </button>
        </div>
      )}
      <div className="p-4">
        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
          <Masonry gutter="20px">
            {images.map((image, i) => (
              <img
                key={i}
                src={image}
                style={{ width: '100%', display: 'block', cursor: 'pointer' }}
                alt=""
                onClick={() => {
                  ViewImage(image, i);
                }}
              />
            ))}
          </Masonry>
        </ResponsiveMasonry>
      </div>
    </>
  );
}

export default Gallery;
