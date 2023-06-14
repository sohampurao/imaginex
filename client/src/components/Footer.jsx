import { Link, NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Fade, Zoom } from 'react-reveal';
import Flash from 'react-reveal/Flash';

export default function Footer() {
  const [domainName, setDomainName] = useState('');

  useEffect(() => {
    const getDomainName = () => {
      const { hostname } = window.location;
      setDomainName(hostname);
    };

    getDomainName();
  }, []);

  const shareWebLinks = [
    {
      platformIcon: <i className="bi bi-facebook"></i>,
      to: `https://www.facebook.com/sharer/sharer.php?u=${domainName}`,
    },
    {
      platformIcon: <i className="bi bi-linkedin"></i>,
      to: `https://twitter.com/intent/tweet?url=${domainName}&text=Check out this amazing content!`,
    },
    {
      platformIcon: <i className="bi bi-twitter"></i>,
      to: `https://www.linkedin.com/sharing/share-offsite/?url=${domainName}`,
    },
    { platformIcon: <i className="bi bi-instagram"></i>, to: '#' },
  ];

  const navigation = [
    { name: 'Home', to: '/' },
    { name: 'Our Work', to: '/ourwork' },
    { name: 'Features', to: '/features' },
    { name: 'Virtual Tours', to: '/virtualtours' },
    { name: 'Contact Us', to: '/contactus' },
    { name: 'About Us', to: '/aboutus' },
  ];

  const socialLinks = [
    {
      platformIcon: <i className="bi bi-facebook"></i>,
      to: '#',
      bg: 'hover:bg-[#1877F2]',
    },
    {
      platformIcon: <i className="bi bi-linkedin"></i>,
      to: '#',
      bg: 'hover:bg-[#0A66C2]',
    },
    {
      platformIcon: <i className="bi bi-twitter"></i>,
      to: '#',
      bg: 'hover:bg-[#1DA1F2]',
    },
    {
      platformIcon: <i className="bi bi-instagram"></i>,
      to: '#',
      bg: 'hover:bg-gradient-to-r from-[#FEDA75] to-[#F58529]',
    },
  ];

  return (
    <footer className="mt-auto w-full bg-[#333333] z-50">
      <div className="services-contact | py-8">
        <div className="mx-auto flex flex-col  px-5 gap-5 sm:flex-row sm:justify-center">
          <div className="services sm:w-7/12">
            <div className="services-title | mb-3 text-white font-semibold font-serif ">
              BOOK YOUR MATTERPORT SCANNING TODAY
            </div>
            <Fade left duration={1800} distance="150px" cascade>
              <ul className="services-list | transition-all cursor-default">
                <li className="service-item | text-[#b53836] hover:text-[#8e2c2a]">
                  <span className="service-icon | w-8 inline-block mb-3">
                    <i className="fa-solid fa-car"></i>
                  </span>
                  <span className="service-text">Showrooms</span>
                </li>
                <li className="service-item | text-[#b53836] hover:text-[#8e2c2a]">
                  <span className="service-icon | w-8 inline-block mb-3">
                    <i className="fa-solid fa-warehouse"></i>
                  </span>
                  <span className="service-text">Hotels and Resorts</span>
                </li>
                <li className="service-item | text-[#b53836] hover:text-[#8e2c2a]">
                  <span className="service-icon | w-8 inline-block mb-3">
                    <i className="fa-solid fa-store"></i>
                  </span>
                  <span className="service-text">Retail Spaces</span>
                </li>
                <li className="service-item | text-[#b53836] hover:text-[#8e2c2a]">
                  <span className="service-icon | w-8 inline-block mb-3">
                    <i className="fa-solid fa-house-user"></i>
                  </span>
                  <span className="service-text">Home Owners</span>
                </li>

                <li className="service-item | text-[#b53836] hover:text-[#8e2c2a]">
                  <span className="service-icon | w-8 inline-block mb-3">
                    <i className="fa-brands fa-artstation"></i>
                  </span>
                  <span className="service-text">Museums & Art galleries</span>
                </li>
                <li className="service-item | text-[#b53836] hover:text-[#8e2c2a]">
                  <span className="service-icon | w-8 inline-block mb-3">
                    <i className="fa-solid fa-warehouse"></i>
                  </span>
                  <span className="service-text">Commercial Real Estate</span>
                </li>
                <li className="service-item | text-[#b53836] hover:text-[#8e2c2a]">
                  <span className="service-icon | w-8 inline-block mb-3">
                    <i className="fa-solid fa-building"></i>
                  </span>
                  <span className="service-text">Residential Real Estate</span>
                </li>

                <li className="service-item | text-[#b53836] hover:text-[#8e2c2a]">
                  <span className="service-icon | w-8 inline-block mb-3">
                    <i className="fa-solid fa-network-wired"></i>
                  </span>
                  <span className="service-text">Offices and CoWorking</span>
                </li>
              </ul>
            </Fade>
          </div>
          <div className="contact-detials | sm:5/12">
            <div className="contact-title | mb-3 uppercase font-serif font-semibold text-white">
              contact us on
            </div>
            <Fade right duration={1500} distance="150px" cascade>
              <div className="mail | flex text-[#b53836] hover:text-[#8e2c2a]">
                <span className="mail-icon | w-8 inline-block mb-3">
                  <i className="bi bi-envelope-at"></i>
                </span>
                <Link to="mailto:example@gmail.com">example@gmail.com</Link>
              </div>
              <div className="telephone | flex text-[#b53836] hover:text-[#8e2c2a]">
                <span className="phone-icon | w-8 inline-block mb-3">
                  <i className="bi bi-telephone-fill"></i>
                </span>
                <Link to="tel:+9518556937">9518556937</Link>
              </div>
            </Fade>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 text-slate-50">
        <div className="share-text | text-center py-2 font-semibold">
          <Zoom top cascade delay={1500}>
            share with love
          </Zoom>
        </div>

        <ul className="share-web | flex justify-center gap-10 pt-5">
          {shareWebLinks.map((item, index) => {
            return (
              <Link key={index} to={item.to}>
                <Flash delay={2500} duration={2000}>
                  <li className="share-web-item | text-base h-[50px] w-[50px] rounded-full bg-[rgb(255,83,109)]   flex justify-center items-center transition-colors hover:bg-white hover:text-[rgb(255,83,109)]">
                    {item.platformIcon}
                  </li>
                </Flash>
              </Link>
            );
          })}
        </ul>
        <nav className="mt-5">
          <div className="nav-title | text-center py-2 font-semibold mt-8">
            Quick Links
          </div>
          <ul className="footer-nav | flex flex-wrap justify-center items-center gap-8 py-4">
            {navigation.map((item, index) => {
              return (
                <NavLink to={item.to} key={index}>
                  <li className="nav-item | transition-colors hover:text-neutral-400">
                    {item.name}
                  </li>
                </NavLink>
              );
            })}
          </ul>
        </nav>
        <div className="other-detials | flex justify-between items-center my-5 max-w-4xl mx-auto">
          <div className="copy-rigth | text-xs hover:text-blue-400 transition cursor-pointer sm:text-sm">
            &#169;2023.example.com.All Rights Reserved.
          </div>
          <div className="social-links | flex flex-col justify-center">
            <div className="social-link-header | text-center">Get In Touch</div>
            <ul className="share-web | flex gap-1">
              {socialLinks.map((item, index) => {
                return (
                  <Link key={index} to={item.to}>
                    <li
                      className={`social-link-item | transition-colors flex justify-center items-center h-8 w-8 ${item.bg} rounded-lg`}
                    >
                      {item.platformIcon}
                    </li>
                  </Link>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
