import { Link, NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';

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
    { name: 'Our Work', to: '/ourwork' },
    { name: 'Features', to: '/features' },
    { name: 'Virtual Tours', to: '/virtualtours' },
    { name: 'Contact', to: '/contact' },
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
    <footer className="w-full bg-[#333333] text-slate-50 mt-auto">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="share-text | text-center py-2 font-light">
          share with love <i className="bi bi-heart-fill text-red-600"></i>
        </div>
        <ul className="share-web | flex justify-center gap-10 mt-2 mb-4">
          {shareWebLinks.map((item, index) => {
            return (
              <Link key={index} to={item.to}>
                <li className="share-web-item | text-base h-[50px] w-[50px] rounded-full bg-[#22b3a4] flex justify-center items-center transition-colors hover:bg-white hover:text-neutral-800">
                  {item.platformIcon}
                </li>
              </Link>
            );
          })}
        </ul>
        <nav>
          <ul className="footer-nav | flex justify-center items-center gap-8 py-4">
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
        <div className="other-detials | flex justify-between items-center my-5 max-w-4xl mx-auto  ">
          <div className="copy-rigth | text-sm font-semibold hover:text-blue-400 transition cursor-pointer">
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
