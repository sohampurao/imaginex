import { Disclosure } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Slide, ToastContainer } from 'react-toastify';
import { Link, NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { Store } from '../Store';
import AdminDropdown from './AdminDropdown';

const navigation = [
  { name: 'Home', to: '/' },
  { name: 'Our Work', to: '/ourwork' },
  { name: 'Features', to: '/features' },
  { name: 'Virtual Tours', to: '/virtualtours' },
  { name: 'Contact Us', to: '/contactus' },
  { name: 'About Us', to: '/aboutus' },
];

export default function Navbar() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { adminInfo } = state;

  const signOutHandler = () => {
    ctxDispatch({ type: 'ADMIN_SIGNOUT' });
    localStorage.removeItem('adminInfo');
    console.log('signout!');
  };
  return (
    <>
      <ToastContainer transition={Slide} />
      <Disclosure
        as="nav"
        className="bg-[#202020] z-50 shadow-lg sticky top-0 rigth-0 w-full"
      >
        {({ open }) => (
          <>
            <div className="mx-auto px-5">
              <div className="relative flex h-20 items-center justify-between">
                <div className="flex flex-1 items-center justify-start md:items-stretch md:justify-start">
                  <div className="flex flex-shrink-0 items-center">
                    <Link to={'/'}>
                      <img
                        src="/images/logo/brand-logo.png"
                        className="h-[60px]"
                      ></img>
                    </Link>
                  </div>
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

                  <div className="hidden sm:ml-6 md:block">
                    <div className="flex space-x-4 items-center">
                      {adminInfo ? (
                        <>
                          <div className="admin-dropdown">
                            <AdminDropdown
                              adminInfo={adminInfo}
                              signOut={signOutHandler}
                            ></AdminDropdown>
                          </div>
                          <span className="text-white">|</span>
                        </>
                      ) : (
                        ''
                      )}
                      {navigation.map((item) => (
                        <div className="nav-item" key={item.name}>
                          <NavLink to={item.to} className="header-nav">
                            {item.name}
                          </NavLink>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="md:hidden">
              <div className="space-y-1 px-2 pb-3 pt-2">
                {adminInfo ? (
                  <>
                    <div className="admin-dropdown | flex justify-center">
                      <AdminDropdown
                        adminInfo={adminInfo}
                        signOut={signOutHandler}
                      ></AdminDropdown>
                    </div>
                  </>
                ) : (
                  ''
                )}
                {navigation.map((item) => (
                  <NavLink to={item.to} key={item.name} className="header-nav">
                    <Disclosure.Button
                      as="a"
                      to={item.to}
                      className={
                        'block rounded-md px-3 py-2 text-base font-medium hover:bg-gray-300 hover:text-neutral-800'
                      }
                    >
                      {item.name}
                    </Disclosure.Button>
                  </NavLink>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </>
  );
}
