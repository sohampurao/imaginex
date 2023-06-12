import { Button } from 'flowbite-react';
import { useForm, ValidationError } from '@formspree/react';
import { toast } from 'react-toastify';
import { useEffect } from 'react';

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
          className="h-[450px] w-full"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          frameBorder="0"
        ></iframe>
        <div className="container my-8 mx-auto max-w-7xl">
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
                  id="mobile_number"
                  placeholder=" "
                  maxLength={10}
                  minLength={10}
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer "
                  required
                />
                <label
                  htmlFor="mobile-number"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8"
                  maxLength={10}
                  minLength={10}
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
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
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
                Submit
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
