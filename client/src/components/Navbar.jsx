import { Disclosure } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Slide, ToastContainer } from 'react-toastify';
import { Avatar } from 'flowbite-react';
import { Link, NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { Store } from '../Store';
import Dashboard from './Dashboard';

const navigation = [
  { name: 'Our Work', to: '/ourwork' },
  { name: 'Features', to: '/features' },
  { name: 'Virtual Tours', to: '/virtualtours' },
  { name: 'Contact', to: '/contact' },
  { name: 'About Us', to: '/aboutus' },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

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
      <Dashboard signOut={signOutHandler}></Dashboard>
      <ToastContainer transition={Slide} />
      <Disclosure
        as="nav"
        className="bg-zinc-100 z-40 shadow-lg sticky top-0 rigth-0 w-full"
      >
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
              <div className="relative flex h-16 items-center justify-between">
                <div className="block sm:ml-6 sm:hidden">
                  <Avatar
                    data-drawer-target="drawer-navigation"
                    data-drawer-show="drawer-navigation"
                    aria-controls="drawer-navigation"
                    className="cursor-pointer"
                    alt="Admin Profile"
                    img={
                      adminInfo
                        ? adminInfo.profileImage
                        : '/images/profile/admin.png'
                    }
                    rounded={true}
                    bordered={true}
                  />
                </div>
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="flex flex-shrink-0 items-center">
                    <div className="font-semibold text-xl">
                      <Link to={'/'}>Blog App</Link>
                    </div>
                  </div>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  {/* Mobile menu button*/}
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white sm:hidden">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>

                  <div className="hidden sm:ml-6 sm:block">
                    <div className="flex space-x-4 items-center">
                      {navigation.map((item) => (
                        <div className="nav-item" key={item.name}>
                          <NavLink to={item.to} className="header-nav">
                            {item.name}
                          </NavLink>
                        </div>
                      ))}

                      <Avatar
                        data-drawer-target="drawer-navigation"
                        data-drawer-show="drawer-navigation"
                        aria-controls="drawer-navigation"
                        // data-drawer-backdrop="false"
                        className="cursor-pointer"
                        alt="Admin Profile"
                        img={
                          adminInfo
                            ? adminInfo.profileImage
                            : '/images/profile/admin.png'
                        }
                        rounded={true}
                        bordered={true}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 px-2 pb-3 pt-2">
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.to}
                    className={classNames(
                      item.current
                        ? 'bg-gray-600 text-white'
                        : 'text-neutral-600 hover:bg-zinc-300',
                      'block rounded-md px-3 py-2 text-base font-medium'
                    )}
                    aria-current={item.current ? 'page' : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </>
  );
}
