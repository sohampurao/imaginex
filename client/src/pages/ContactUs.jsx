import { Button, Spinner } from 'flowbite-react';
import { useForm, ValidationError } from '@formspree/react';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function ContactUs() {
  const [state, handleSubmit] = useForm('mbjenrkp');

  useEffect(() => {
    const mailConfirmation = () => {
      if (state.succeeded) {
        return toast.success('Your message has been send.');
      }
    };
    mailConfirmation();
  });

  return (
    <section>
      <div className="google-map | min-w-full h-auto">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3084.4299131228795!2d72.92775625541314!3d18.563624394481355!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be86fede644c453%3A0x11b858cf963dcf9b!2sSankura%20Cottage!5e0!3m2!1sen!2sin!4v1686545940301!5m2!1sen!2sin"
          className="h-[420px] w-full"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          frameBorder="0"
        ></iframe>
        <div className="container my-8 mx-auto max-w-7xl flex justify-between items-start">
          <div className="contact-form | md:w-7/12 p-5 shadow border border-neutral-100">
            <form onSubmit={handleSubmit}>
              <div className="greet-feedback | mb-7 text-neutral-600">
                <p>How can we help?</p>
                <p>
                  Have questions or want to chat? Fill out our contact form, and
                  we’ll put you in touch with the right people.
                </p>
              </div>

              <div className="relative z-0 w-full mb-7 group">
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="name"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8"
                >
                  Name
                </label>
              </div>
              <ValidationError
                prefix="Name"
                field="name"
                errors={state.errors}
              />

              <div className="relative z-0 w-full mb-7 group">
                <input
                  type="email"
                  name="email"
                  id="floating_email"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="floating_email"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8 autofill:bg-none"
                >
                  Email address
                </label>
              </div>
              <ValidationError
                prefix="Email"
                field="email"
                errors={state.errors}
              />

              <div className="relative z-0 w-full mb-7 group">
                <input
                  type="number"
                  name="mobile-number"
                  id="mobile-number"
                  placeholder=" "
                  maxLength={10}
                  minLength={10}
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer "
                  required
                />
                <label
                  htmlFor="mobile-number"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8"
                >
                  Phone number
                </label>
              </div>

              <ValidationError
                prefix="Mobile-Number"
                field="mobile-number"
                errors={state.errors}
              />

              <div className="w-full mb-7 group">
                <label
                  htmlFor="message"
                  className="block mb-2 text-sm font-medium text-gray-500 dark:text-white"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter your message..."
                ></textarea>
              </div>

              <ValidationError
                prefix="Message"
                field="message"
                errors={state.errors}
              />

              <Button
                type="submit"
                disabled={state.submitting}
                gradientDuoTone="purpleToBlue"
                className="mx-auto w-28 rounded-3xl"
              >
                {state.submitting ? (
                  <>
                    <Spinner aria-label="Spinner button example" />
                    <span className="pl-3">Sanding...</span>
                  </>
                ) : (
                  <>
                    <span className="me-2">Send</span>
                    <i className="bi bi-send-fill"></i>
                  </>
                )}
              </Button>
            </form>
          </div>

          <div className="other-contact-details | md:w-4/12 shadow bg-black text-slate-100">
            <div className="contact-legend py-5 px-8 text-center bg-gray-500 text-xl">
              Contact Details:
            </div>
            <ul className="contact-list px-5 py-6">
              <li className="pb-4 border-b border-gray-500 mt-3">
                <address className="flex gap-3">
                  <div className="contact-icon">
                    <i className="bi bi-geo-alt-fill"></i>
                  </div>
                  <div className="contact-info">
                    <div className="contact label font-semibold pb-2 text-[gold]">
                      Address:
                    </div>
                    <div className="contact-content font-medium">
                      Sankura Cottage, At post chaul, near Rameshwar temple,
                      Alibag, Maharashtra-402203.
                    </div>
                  </div>
                </address>
              </li>
              <li className="pb-4 border-b border-gray-500 mt-3">
                <div className="flex gap-3">
                  <div className="contact-icon">
                    <i className="bi bi-phone-fill"></i>
                  </div>
                  <div className="contact-info">
                    <div className="contact label font-semibold pb-2 text-[gold]">
                      Phone:
                    </div>
                    <div className="contact-content font-medium">
                      <Link to="tel:+91 9999999999">+91 9999999999</Link>
                    </div>
                  </div>
                </div>
              </li>
              <li className="mt-3">
                <div className="flex gap-3">
                  <div className="contact-icon">
                    <i className="bi bi-envelope-at-fill"></i>
                  </div>
                  <div className="contact-info">
                    <div className="contact label font-semibold pb-2 text-[gold]">
                      Mail:
                    </div>
                    <div className="contact-content font-medium">
                      <Link to="mailto: example@gmail.com">
                        example@gmail.com
                      </Link>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
