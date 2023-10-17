/* eslint-disable react/prop-types */
import { Dropdown } from 'flowbite-react';
import { HiLogout } from 'react-icons/hi';
import { TiInfoLarge } from 'react-icons/ti';
import { RiLockPasswordFill } from 'react-icons/ri';
import { FaUserCircle } from 'react-icons/fa';
import { BiPhotoAlbum } from 'react-icons/bi';

import { MdAdminPanelSettings, MdHomeWork } from 'react-icons/md';
import {
  BsFillPostcardFill,
  BsFillImageFill,
  BsListStars,
} from 'react-icons/bs';
import { NavLink } from 'react-router-dom';

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
      <NavLink to={'/albumslist'}>
        <Dropdown.Item icon={BiPhotoAlbum}>Albums</Dropdown.Item>
      </NavLink>
      <NavLink to={'/carousellist'}>
        <Dropdown.Item icon={BsFillImageFill}>Carousel</Dropdown.Item>
      </NavLink>
      <NavLink to={'/blogpostslist'}>
        <Dropdown.Item icon={BsFillPostcardFill}>Blog Post</Dropdown.Item>
      </NavLink>
      <NavLink to={'/ourworklist'}>
        <Dropdown.Item icon={MdHomeWork}>Our Work</Dropdown.Item>
      </NavLink>
      <NavLink to={'/featureslist'}>
        <Dropdown.Item icon={BsListStars}>Features</Dropdown.Item>
      </NavLink>
      <NavLink to={'/aboutuslist'}>
        <Dropdown.Item icon={TiInfoLarge}>About Us</Dropdown.Item>
      </NavLink>
      <Dropdown.Divider />

      {adminInfo.isAdmin == adminInfo.isOwner && (
        <NavLink to={'/adminlist'}>
          <Dropdown.Item icon={MdAdminPanelSettings}>Admins</Dropdown.Item>
        </NavLink>
      )}

      <NavLink to={'/profileedit'}>
        <Dropdown.Item icon={FaUserCircle}>Profile</Dropdown.Item>
      </NavLink>

      <NavLink to={'/changepassword'}>
        <Dropdown.Item icon={RiLockPasswordFill}>Change Password</Dropdown.Item>
      </NavLink>
      <Dropdown.Item icon={HiLogout} onClick={signOut}>
        Sign out
      </Dropdown.Item>
    </Dropdown>
  );
}
