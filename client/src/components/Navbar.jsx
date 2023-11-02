import { Disclosure } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Slide, ToastContainer } from 'react-toastify';
import { Link, NavLink } from 'react-router-dom';
import { useContext, useState } from 'react';
import { Store } from '../Store';
import AdminDropdown from './AdminDropdown';
import { Dropdown } from 'flowbite-react';

export default function Navbar() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { adminInfo } = state;
  const [service, setService] = useState('Services');

  const signOutHandler = () => {
    ctxDispatch({ type: 'ADMIN_SIGNOUT' });
    localStorage.removeItem('adminInfo');
  };

  const serviceOnClick = (name) => {
    setService(name);
  };
  return (
    <>
      <ToastContainer transition={Slide} />
      <Disclosure
        as="nav"
        className="bg-[#000000] z-50 shadow-lg sticky top-0 rigth-0 w-full border-b border-b-slate-100 select-none"
      >
        {({ open }) => (
          <>
            <div className="mx-auto px-5">
              <div className="relative flex h-20 3xl:h-24 items-center justify-between">
                <div className="flex flex-1 items-center justify-start md:items-stretch md:justify-start">
                  <Link to={'/'}>
                    <div className="flex flex-shrink-0 items-center flex-row">
                      <img
                        src="/images/logo/IM.png"
                        className="h-[70px] 3xl:h-[95px]"
                      ></img>
                      <div className="brand-name | inline-block font-sans font-semibold text-white text-lg">
                        Imaginex
                      </div>
                    </div>
                  </Link>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  {/* Mobile menu button*/}
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white md:hidden">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>

                  <div className="hidden sm:ml-6 md:block text-base 3xl:text-xl">
                    <div className="flex space-x-4 items-center">
                      {adminInfo && (
                        <>
                          <div className="admin-dropdown">
                            <AdminDropdown
                              adminInfo={adminInfo}
                              signOut={signOutHandler}
                            ></AdminDropdown>
                          </div>
                          <span className="text-white">|</span>
                        </>
                      )}
                      <div className="nav-item">
                        <NavLink to={'/'} className="header-nav">
                          Home
                        </NavLink>
                      </div>
                      <div className="nav-item">
                        <NavLink to={'/ourwork'} className="header-nav">
                          Our Work
                        </NavLink>
                      </div>
                      <div className="nav-item">
                        <NavLink to={'/features'} className="header-nav">
                          Features
                        </NavLink>
                      </div>
                      <div className="text-white">
                        <Dropdown
                          inline
                          placement="bottom"
                          label="Services"
                          size="lg"
                          className="text-white"
                        >
                          <NavLink
                            to={'/virtualtours'}
                            onClick={() => {
                              serviceOnClick('Virtual Tours');
                            }}
                          >
                            <Dropdown.Item>Virtual Tours</Dropdown.Item>
                          </NavLink>
                          <Dropdown.Divider />
                          <NavLink
                            to={'/projectalbums'}
                            onClick={() => {
                              serviceOnClick('3D Visualization');
                            }}
                          >
                            <Dropdown.Item>3D Visualization</Dropdown.Item>
                          </NavLink>
                        </Dropdown>
                      </div>

                      <div className="nav-item">
                        <NavLink to={'/contactus'} className="header-nav">
                          Contact Us
                        </NavLink>
                      </div>
                      <div className="nav-item">
                        <NavLink to={'/aboutus'} className="header-nav">
                          About Us
                        </NavLink>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="md:hidden">
              <div className="space-y-1 px-2 pb-3 pt-2">
                {adminInfo && (
                  <>
                    <div className="admin-dropdown | flex justify-center">
                      <AdminDropdown
                        adminInfo={adminInfo}
                        signOut={signOutHandler}
                      ></AdminDropdown>
                    </div>
                  </>
                )}
                <NavLink to="/" className="header-nav">
                  <Disclosure.Button
                    className={
                      'block rounded-md px-3 py-2 text-base font-medium hover:bg-gray-300 hover:text-neutral-800'
                    }
                  >
                    Home
                  </Disclosure.Button>
                </NavLink>

                <NavLink to="/ourwork" className="header-nav">
                  <Disclosure.Button
                    className={
                      'block rounded-md px-3 py-2 text-base font-medium hover:bg-gray-300 hover:text-neutral-800'
                    }
                  >
                    Our Work
                  </Disclosure.Button>
                </NavLink>

                <NavLink to="/features" className="header-nav">
                  <Disclosure.Button
                    className={
                      'block rounded-md px-3 py-2 text-base font-medium hover:bg-gray-300 hover:text-neutral-800'
                    }
                  >
                    Features
                  </Disclosure.Button>
                </NavLink>

                <div className="text-white px-3 py-2 text-base font-medium">
                  <Dropdown
                    inline
                    placement="bottom"
                    label="Services"
                    size="lg"
                  >
                    <NavLink
                      to={'/virtualtours'}
                      onClick={() => {
                        serviceOnClick('Virtual Tours');
                      }}
                    >
                      <Dropdown.Item>Virtual Tours</Dropdown.Item>
                    </NavLink>
                    <Dropdown.Divider />
                    <NavLink
                      to={'/projectalbums'}
                      onClick={() => {
                        serviceOnClick('3D Visualization');
                      }}
                    >
                      <Dropdown.Item>3D Visualization</Dropdown.Item>
                    </NavLink>
                  </Dropdown>
                </div>

                <NavLink to="/contactus" className="header-nav">
                  <Disclosure.Button
                    className={
                      'block rounded-md px-3 py-2 text-base font-medium hover:bg-gray-300 hover:text-neutral-800'
                    }
                  >
                    Contact Us
                  </Disclosure.Button>
                </NavLink>

                <NavLink to="/aboutus" className="header-nav">
                  <Disclosure.Button
                    className={
                      'block rounded-md px-3 py-2 text-base font-medium hover:bg-gray-300 hover:text-neutral-800'
                    }
                  >
                    About Us
                  </Disclosure.Button>
                </NavLink>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </>
  );
}
