/* eslint-disable react/prop-types */
import { Dropdown } from 'flowbite-react';
import { HiLogout } from 'react-icons/hi';
import { TiInfoLarge } from 'react-icons/ti';
import { MdAdminPanelSettings } from 'react-icons/md';
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
      <Dropdown.Item icon={BsFillImageFill}>
        <Link to={'/carousellist'}>Carousel</Link>
      </Dropdown.Item>
      <Dropdown.Item icon={BsFillPostcardFill}>
        <Link to={'/blogpostslist'}>Blog Post</Link>
      </Dropdown.Item>

      <Dropdown.Item icon={BsListStars}>
        <Link to={'/featureslist'}>Features</Link>
      </Dropdown.Item>
      <Dropdown.Item icon={TiInfoLarge}>
        <Link to={'/aboutuslist'}>About Us</Link>
      </Dropdown.Item>
      <Dropdown.Divider />
      <Dropdown.Item icon={MdAdminPanelSettings}>
        <Link to={'/adminlist'}>Admins</Link>
      </Dropdown.Item>
      <Dropdown.Item icon={HiLogout} onClick={signOut}>
        Sign out
      </Dropdown.Item>
    </Dropdown>
  );
}
