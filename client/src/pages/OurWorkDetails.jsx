/* eslint-disable react/prop-types */
import axios from 'axios';
import { useEffect, useReducer, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Preloader from '../components/Preloader';
import { FormatDate, FormatTime, getError } from '../utils';
import AlertBox from '../components/AlertBox';
import { toast } from 'react-toastify';
import { Tooltip } from 'flowbite-react';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, workInfo: action.payload };
    case 'FETCH_FAILED':
      return { ...state, loading: false, error: action.payload };
  }
};
export default function OurWorkDetails({ setProgress }) {
  const params = useParams();
  const { id: WorkId } = params;

  const currentURL = window.location.href;

  const [{ loading, error, workInfo }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setProgress(Math.floor(Math.random() * 41 + 10));
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/ourwork/work/${WorkId}`);
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
        setProgress(100);
      } catch (error) {
        dispatch({ type: 'FETCH_FAILED', payload: getError(error) });
        setProgress(100);
      }
    };
    fetchData();
  }, [WorkId]);

  // this blocks body scrolling while Preloader is active
  useEffect(() => {
    const toggleBodyScrolling = () => {
      if (loading) {
        document.body.classList.add('overflow-y-hidden');
      } else {
        document.body.classList.remove('overflow-y-hidden');
      }
    };
    toggleBodyScrolling();
  }, [loading]);

  // this updates the date and uploaded time every seconds
  const [formattedTime, setFormattedTime] = useState(null);
  useEffect(() => {
    const intervalId = setInterval(() => {
      const FormattedTime = FormatTime(workInfo.work.createdAt);
      setFormattedTime(FormattedTime);
    }, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, [workInfo]);

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(currentURL)
      .then(() => {
        toast.success('Link copied to clipboard!');
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  return (
    <>
      {loading ? (
        <Preloader />
      ) : error ? (
        <AlertBox variant="failure">{error}</AlertBox>
      ) : (
        <section className="container mx-auto mt-5  px-5 md:px-0">
          <article className="work-post | bg-[#222222] text-white md:max-w-2xl lg:max-w-4xl mx-auto shadow mb-5">
            <div className="work-body | container p-5">
              <div className="date-time| flex gap-2 items-center text-sm text-[#ffd900ed]">
                <div className="date">
                  {FormatDate(workInfo.work.createdAt)}
                </div>
                <div className="inline-block mx-1">•</div>
                <div className="uploaded-time">{formattedTime}</div>
              </div>

              <hr className="my-2 block" />

              <h1 className="work-title | text-xl sm:text-2xl font-serif font-medium pb-2">
                {workInfo.work.title}
              </h1>
              <div className="work-subtitle | text-base text-justify text-neutral-300">
                {workInfo.work.description}
              </div>
            </div>

            <div className="work-display | w-full">
              <iframe
                className="matterport-iframe | w-full aspect-video mx-auto"
                src={workInfo.work.model}
                allowFullScreen
              ></iframe>
            </div>

            <div className="container p-5">
              <hr className="my-2 block bg-white" />
              <ul className="share-socialmedia-list | flex items-center justify-center gap-8">
                <li className="text-lg cursor-pointer hover:text-blue-500">
                  <Link
                    to={`https://www.facebook.com/sharer/sharer.php?u=${currentURL}`}
                    target="_blank"
                  >
                    <Tooltip
                      content="Share on Facebook"
                      animation="duration-300"
                      style="light"
                    >
                      <i className="bi bi-facebook"></i>
                    </Tooltip>
                  </Link>
                </li>
                <li className="text-lg cursor-pointer hover:text-blue-500">
                  <Link
                    to={`https://twitter.com/intent/tweet?url=${currentURL}&text=Check out this amazing content!`}
                    target="_blank"
                  >
                    <Tooltip
                      content="Share on Twitter"
                      animation="duration-300"
                      style="light"
                    >
                      <i className="bi bi-twitter"></i>
                    </Tooltip>
                  </Link>
                </li>
                <li className="text-lg cursor-pointer hover:text-blue-500">
                  <Link
                    to={`https://www.linkedin.com/sharing/share-offsite/?url=${currentURL}`}
                    target="_blank"
                  >
                    <Tooltip
                      content="Share on LinkedIn"
                      animation="duration-300"
                      style="light"
                    >
                      <i className="bi bi-linkedin"></i>
                    </Tooltip>
                  </Link>
                </li>
                <li className="text-lg cursor-pointer hover:text-blue-500">
                  <Tooltip
                    content="Copy Link"
                    animation="duration-300"
                    style="light"
                  >
                    <i
                      className="bi bi-link-45deg"
                      onClick={copyToClipboard}
                    ></i>
                  </Tooltip>
                </li>
              </ul>
              <hr className="my-2 block bg-white" />
            </div>
          </article>
        </section>
      )}
    </>
  );
}
