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

  const handles = [
    {
      icon: <i className="bi bi-instagram"></i>,
      text: 'Instagram',
      to: 'https://www.instagram.com/imx.studios?igshid=MzRlODBiNWFlZA',
    },
    {
      icon: <i className="bi bi-envelope-at"></i>,
      text: 'imaginex3dstudio@gmail.com',
      to: 'mailto:imaginex3dstudio@gmail.com',
    },
    {
      icon: <i className="bi bi-telephone-fill"></i>,
      text: '9653295270',
      to: 'tel:+91 9653295270',
    },
    {
      icon: <i className="bi bi-telephone-fill"></i>,
      text: '9527570677',
      to: 'tel:+91 9527570677',
    },
  ];

  const services = [
    {
      icon: <i className="fa-solid fa-car"></i>,
      text: 'Showrooms',
    },
    {
      icon: <i className="fa-solid fa-warehouse"></i>,
      text: 'Hotels and Resorts',
    },
    {
      icon: <i className="fa-solid fa-store"></i>,
      text: 'Retail Spaces',
    },
    {
      icon: <i className="fa-solid fa-house-user"></i>,
      text: 'Home Owners',
    },
    {
      icon: <i className="fa-brands fa-artstation"></i>,
      text: 'Museums & Art galleries',
    },
    {
      icon: <i className="fa-solid fa-warehouse"></i>,
      text: 'Commercial Real Estate',
    },
    {
      icon: <i className="fa-solid fa-building"></i>,
      text: 'Residential Real Estate',
    },
    {
      icon: <i className="fa-solid fa-network-wired"></i>,
      text: 'Offices and CoWorking',
    },
  ];
  return (
    <footer className="mt-auto w-full bg-neutral-900 z-20 px-5 overflow-x-hidden">
      <div className="services-contact | mt-8 mb-5">
        <div className="mx-auto flex flex-col gap-5 sm:flex-row sm:justify-between sm:max-w-7xl 3xl:max-w-[1400px]">
          <div className="services">
            <div className="services-title | mb-3 text-white font-semibold font-serif ">
              BOOK YOUR MATTERPORT SCANNING TODAY
            </div>
            <ul className="services-list | transition-all cursor-default">
              {services.map((item, index) => {
                return (
                  <Fade
                    key={index}
                    left
                    delay={1000 + 150 * index}
                    duration={1500}
                    distance="150px"
                  >
                    <li className="service-item | text-slate-300 hover:text-opacity-70 transition-colors">
                      <span className="service-icon | w-8 inline-block mb-3">
                        {item.icon}
                      </span>
                      <span className="service-text">{item.text}</span>
                    </li>
                  </Fade>
                );
              })}
            </ul>
          </div>
          <div className="contact-detials">
            <div className="get-in-touch | mb-3 uppercase font-serif font-semibold text-white">
              Get In Touch
            </div>

            {handles.map((item, index) => {
              return (
                <Fade
                  key={index}
                  right
                  delay={1000 + 150 * index}
                  duration={1500}
                  distance="150px"
                >
                  <Link to={item.to} target="_blank">
                    <div className="flex text-slate-300 hover:text-opacity-70 transition-colors">
                      <span className="w-8 inline-block mb-3">{item.icon}</span>
                      <span>{item.text}</span>
                    </div>
                  </Link>
                </Fade>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl mb-8 px-2 sm:px-6 lg:px-8 text-slate-50">
        <div className="share-text | text-center font-semibold mb-3">
          <Flip top cascade delay={1500} duration={2000}>
            share with love
          </Flip>
        </div>

        <ul className="share-web | flex justify-center gap-10 mb-8 ">
          {shareWebLinks.map((item, index) => {
            return (
              <Link key={index} to={item.to} target="_blank">
                <Zoom delay={2500 + index * 200}>
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
        <nav>
          <div className="nav-title | text-center mb-3 font-semibold">
            Quick Links
          </div>
          <ul className="footer-nav | flex flex-wrap justify-center items-center gap-5 3xl:text-xl">
            {navigation.map((item, index) => {
              return (
                <NavLink to={item.to} key={index}>
                  <li className="nav-item | transition-colors">{item.name}</li>
                </NavLink>
              );
            })}
          </ul>
        </nav>
      </div>
      <div className="copyrigth | mx-auto sm:max-w-7xl text-white mb-3 3xl:max-w-[1400px] text-xs hover:text-blue-400 transition cursor-pointer sm:text-sm 3xl:text-base">
        &#169;2023.{domainName}.All Rights Reserved.
      </div>
    </footer>
  );
}
