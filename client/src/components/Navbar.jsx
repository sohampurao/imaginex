import { Disclosure } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Slide, ToastContainer } from 'react-toastify';
import { Avatar, Badge, Dropdown, Tooltip } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { Store } from '../Store';

const navigation = [
  { name: 'Our Work', href: '#', current: true },
  { name: 'Features', href: '#', current: false },
  { name: 'About Us', href: '#', current: false },
  { name: 'Contact', href: '#', current: false },
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
      <ToastContainer transition={Slide} />
      <Disclosure as="nav" className="bg-zinc-100 z-40 shadow-lg">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
              <div className="relative flex h-16 items-center justify-between">
                <div className="block sm:ml-6 sm:hidden">
                  {adminInfo ? (
                    <Dropdown
                      arrowIcon={false}
                      inline={true}
                      label={
                        <Avatar
                          alt="User settings"
                          img={`${
                            adminInfo.profileImage
                              ? adminInfo.profileImage
                              : '/images/profile/profile-picture.webp'
                          }`}
                          rounded={true}
                          bordered={true}
                        />
                      }
                    >
                      <Dropdown.Header>
                        <span className="full-name | text-sm flex items-center gap-2 capitalize py-1">
                          {adminInfo.firstName + ' ' + adminInfo.lastName}
                          <Badge color="success">
                            {adminInfo.isAdmin ? (
                              <>
                                <span>Admin</span>
                                <img
                                  src="/images/profile/crown.png"
                                  className="float-right align-middle h-4 ms-[2px]"
                                />
                              </>
                            ) : (
                              'Unknown'
                            )}
                          </Badge>
                        </span>
                        <span className="email | block truncate text-sm font-medium py-1">
                          {adminInfo.email}
                        </span>
                      </Dropdown.Header>
                      <Dropdown.Item>Dashboard</Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item onClick={signOutHandler}>
                        Sign out
                      </Dropdown.Item>
                    </Dropdown>
                  ) : (
                    <Tooltip
                      content="Admin Login"
                      animation="duration-150"
                      arrow={false}
                      style="light"
                    >
                      <Link to="/signin">
                        <Avatar
                          alt="User settings"
                          img="/images/profile/admin.png"
                          rounded={true}
                          bordered={true}
                        />
                      </Link>
                    </Tooltip>
                  )}
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
                        <a
                          key={item.name}
                          href={item.href}
                          className={classNames(
                            item.current
                              ? 'bg-gray-600 text-white'
                              : 'text-neutral-600 hover:bg-zinc-300',
                            'rounded-md px-3 py-2 text-sm font-medium'
                          )}
                          aria-current={item.current ? 'page' : undefined}
                        >
                          {item.name}
                        </a>
                      ))}
                      {adminInfo ? (
                        <Dropdown
                          arrowIcon={false}
                          inline={true}
                          label={
                            <Avatar
                              alt="User settings"
                              img={`${
                                adminInfo.profileImage
                                  ? adminInfo.profileImage
                                  : '/images/profile/profile-picture.webp'
                              }`}
                              rounded={true}
                              bordered={true}
                            />
                          }
                        >
                          <Dropdown.Header>
                            <span className="full-name | text-sm gap-2 capitalize py-1">
                              {adminInfo.firstName + ' ' + adminInfo.lastName}
                              <Badge color="success" className="w-[75px]">
                                {adminInfo.isAdmin ? (
                                  <>
                                    <span>Admin</span>
                                    <img
                                      src="/images/profile/crown.png"
                                      className="float-right align-middle h-4 ms-[2px]"
                                    />
                                  </>
                                ) : (
                                  'Unknown'
                                )}
                              </Badge>
                            </span>
                            <span className="email | block truncate text-sm font-medium py-1">
                              {adminInfo.email}
                            </span>
                          </Dropdown.Header>
                          <Dropdown.Item>Dashboard</Dropdown.Item>
                          <Dropdown.Divider />
                          <Dropdown.Item onClick={signOutHandler}>
                            Sign out
                          </Dropdown.Item>
                        </Dropdown>
                      ) : (
                        <Tooltip
                          content="Admin Login"
                          animation="duration-150"
                          arrow={false}
                          style="light"
                        >
                          <Link to="/signin">
                            <Avatar
                              alt="User settings"
                              img="/images/profile/admin.png"
                              rounded={true}
                              bordered={true}
                            />
                          </Link>
                        </Tooltip>
                      )}
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
                    href={item.href}
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
