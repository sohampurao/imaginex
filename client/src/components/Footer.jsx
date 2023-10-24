import { Link, NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Fade, Flip, Zoom } from 'react-reveal';

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
      bg: '#1877F2',
    },

    {
      platformIcon: <i className="fa-brands fa-x-twitter"></i>,
      to: `https://twitter.com/intent/tweet?text=Imaginex%20-%20Matterport%20360%20Virtual%20Tours%20Service%20Providers%0A%0ACheckout%20Now:%20https://${domainName}`,
      bg: 'black',
    },
    {
      platformIcon: <i className="bi bi-linkedin"></i>,
      to: `https://www.linkedin.com/sharing/share-offsite/?url=${domainName}&title=Imaginex%20-%20Matterport%20360%20Virtual%20Tours%20Service%20Providers`,
      bg: '#0A66C2',
    },
    {
      platformIcon: <i className="bi bi-whatsapp"></i>,
      to: `https://api.whatsapp.com/send?text=Imaginex%20-%20Matterport%20360%20Virtual%20Tours%20Service%20Providers%0A%0A*Checkout%20Now:*%20https://${domainName}`,
      bg: '#25D366',
    },
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
    <footer className="mt-auto w-full bg-neutral-900 z-20 px-5 overflow-x-hidden">
      <div className="services-contact | py-8 max-w">
        <div className="mx-auto flex flex-col gap-5 sm:flex-row sm:justify-between sm:max-w-7xl 3xl:max-w-[1400px]">
          <div className="services">
            <div className="services-title | mb-3 text-white font-semibold font-serif ">
              BOOK YOUR MATTERPORT SCANNING TODAY
            </div>
            <Fade left duration={1800} distance="150px" cascade>
              <ul className="services-list | transition-all cursor-default">
                <li className="service-item | text-slate-300 hover:text-opacity-70 transition-colors">
                  <span className="service-icon | w-8 inline-block mb-3">
                    <i className="fa-solid fa-car"></i>
                  </span>
                  <span className="service-text">Showrooms</span>
                </li>
                <li className="service-item | text-slate-300 hover:text-opacity-70 transition-colors">
                  <span className="service-icon | w-8 inline-block mb-3">
                    <i className="fa-solid fa-warehouse"></i>
                  </span>
                  <span className="service-text">Hotels and Resorts</span>
                </li>
                <li className="service-item | text-slate-300 hover:text-opacity-70 transition-colors">
                  <span className="service-icon | w-8 inline-block mb-3">
                    <i className="fa-solid fa-store"></i>
                  </span>
                  <span className="service-text">Retail Spaces</span>
                </li>
                <li className="service-item | text-slate-300 hover:text-opacity-70 transition-colors">
                  <span className="service-icon | w-8 inline-block mb-3">
                    <i className="fa-solid fa-house-user"></i>
                  </span>
                  <span className="service-text">Home Owners</span>
                </li>

                <li className="service-item | text-slate-300 hover:text-opacity-70 transition-colors">
                  <span className="service-icon | w-8 inline-block mb-3">
                    <i className="fa-brands fa-artstation"></i>
                  </span>
                  <span className="service-text">Museums & Art galleries</span>
                </li>
                <li className="service-item | text-slate-300 hover:text-opacity-70 transition-colors">
                  <span className="service-icon | w-8 inline-block mb-3">
                    <i className="fa-solid fa-warehouse"></i>
                  </span>
                  <span className="service-text">Commercial Real Estate</span>
                </li>
                <li className="service-item | text-slate-300 hover:text-opacity-70 transition-colors">
                  <span className="service-icon | w-8 inline-block mb-3">
                    <i className="fa-solid fa-building"></i>
                  </span>
                  <span className="service-text">Residential Real Estate</span>
                </li>

                <li className="service-item | text-slate-300 hover:text-opacity-70 transition-colors">
                  <span className="service-icon | w-8 inline-block mb-3">
                    <i className="fa-solid fa-network-wired"></i>
                  </span>
                  <span className="service-text">Offices and CoWorking</span>
                </li>
              </ul>
            </Fade>
          </div>
          <div className="contact-detials">
            <div className="contact-title | mb-3 uppercase font-serif font-semibold text-white">
              contact us on
            </div>
            <Fade right duration={1500} distance="150px" cascade>
              <div className="mail | flex text-slate-300 hover:text-opacity-70 transition-colors">
                <span className="mail-icon | w-8 inline-block mb-3">
                  <i className="bi bi-envelope-at"></i>
                </span>
                <Link to="mailto:imaginex3dstudio@gmail.com">
                  imaginex3dstudio@gmail.com
                </Link>
              </div>
              <div className="telephone | flex text-slate-300 hover:text-opacity-70 transition-colors">
                <span className="phone-icon | w-8 inline-block mb-3">
                  <i className="bi bi-telephone-fill"></i>
                </span>
                <Link to="tel:+91 9527570677">9527570677</Link>
              </div>
              <div className="telephone | flex text-slate-300 hover:text-opacity-70 transition-colors">
                <span className="phone-icon | w-8 inline-block mb-3">
                  <i className="bi bi-telephone-fill"></i>
                </span>
                <Link to="tel:+91 9653295270">9653295270</Link>
              </div>
            </Fade>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 text-slate-50">
        <div className="share-text | text-center py-2 font-semibold">
          <Flip top cascade delay={2000} duration={2000}>
            share with love
          </Flip>
        </div>

        <ul className="share-web | flex justify-center gap-10 pt-5">
          {shareWebLinks.map((item, index) => {
            return (
              <Link key={index} to={item.to} target="_blank">
                <Zoom delay={3500 + index * 200}>
                  <li
                    className={`share-web-item | text-base h-[40px] w-[40px] rounded-full bg-[${
                      item.bg == 'black' ? '#000000' : item.bg
                    }]   flex justify-center items-center transition-colors`}
                  >
                    {item.platformIcon}
                  </li>
                </Zoom>
              </Link>
            );
          })}
        </ul>
        <nav className="mt-5">
          <div className="nav-title | text-center py-2 font-semibold mt-8">
            Quick Links
          </div>
          <ul className="footer-nav | flex flex-wrap justify-center items-center gap-8 py-4 3xl:text-xl">
            {navigation.map((item, index) => {
              return (
                <NavLink to={item.to} key={index}>
                  <li className="nav-item | transition-colors">{item.name}</li>
                </NavLink>
              );
            })}
          </ul>
        </nav>
        <div className="other-detials | flex justify-between items-center my-5 max-w-4xl mx-auto">
          <div className="copy-rigth | text-xs hover:text-blue-400 transition cursor-pointer sm:text-sm 3xl:text-base">
            &#169;2023.imaginex.in.All Rights Reserved.
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
