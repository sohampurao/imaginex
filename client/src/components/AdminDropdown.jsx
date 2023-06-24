/* eslint-disable react/prop-types */
import { Dropdown } from 'flowbite-react';
import { HiLogout } from 'react-icons/hi';
import { TiInfoLarge } from 'react-icons/ti';
import { RiLockPasswordFill } from 'react-icons/ri';
import { FaUserCircle } from 'react-icons/fa';

import { MdAdminPanelSettings, MdHomeWork } from 'react-icons/md';
import {
  BsFillPostcardFill,
  BsFillImageFill,
  BsListStars,
} from 'react-icons/bs';
import { Link } from 'react-router-dom';

export default function AdminDropdown({ adminInfo, signOut }) {
  return (
    <Dropdown inline placement="bottom" label="Admin" size="lg">
      <Dropdown.Header>
        <span className="block text-sm">
          {adminInfo.firstName + ' ' + adminInfo.lastName}
        </span>
        <span className="block truncate text-sm font-medium">
          {adminInfo.email}
        </span>
      </Dropdown.Header>
      <Link to={'/carousellist'}>
        <Dropdown.Item icon={BsFillImageFill}>Carousel</Dropdown.Item>
      </Link>
      <Link to={'/blogpostslist'}>
        <Dropdown.Item icon={BsFillPostcardFill}>Blog Post</Dropdown.Item>
      </Link>
      <Link to={'/ourworklist'}>
        <Dropdown.Item icon={MdHomeWork}>Our Work</Dropdown.Item>
      </Link>
      <Link to={'/featureslist'}>
        <Dropdown.Item icon={BsListStars}>Features</Dropdown.Item>
      </Link>
      <Link to={'/aboutuslist'}>
        <Dropdown.Item icon={TiInfoLarge}>About Us</Dropdown.Item>
      </Link>
      <Dropdown.Divider />

      {adminInfo.isAdmin == adminInfo.isOwner && (
        <Link to={'/adminlist'}>
          <Dropdown.Item icon={MdAdminPanelSettings}>Admins</Dropdown.Item>
        </Link>
      )}

      <Link to={'/profileedit'}>
        <Dropdown.Item icon={FaUserCircle}>Profile</Dropdown.Item>
      </Link>

      <Link to={'/changepassword'}>
        <Dropdown.Item icon={RiLockPasswordFill}>Change Password</Dropdown.Item>
      </Link>
      <Dropdown.Item icon={HiLogout} onClick={signOut}>
        Sign out
      </Dropdown.Item>
    </Dropdown>
  );
}
