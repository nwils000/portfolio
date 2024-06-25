import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { FaBars, FaTimes } from 'react-icons/fa';

Modal.setAppElement('#root');

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const navLinks = ['home', 'about', 'skills', 'projects', 'contact'];

  return (
    <nav className="fixed top-0 left-0 z-50 px-2 text-white sm:px-4 md:px-8 lg:px-12 xl:px-16">
      <div className="md:hidden fixed top-0 right-0 p-4 sm:p-8 lg:p-12 xl:p-16">
        <button onClick={toggleModal}>
          {isOpen ? (
            <FaTimes className="text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl" />
          ) : (
            <FaBars className="text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl" />
          )}
        </button>

        <Modal
          isOpen={isOpen}
          onRequestClose={toggleModal}
          style={{
            overlay: {
              backgroundColor: 'rgba(0,0,0,0.85)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 49,
            },
            content: {
              width: '80vw',
              height: '80vh',
              margin: 'auto',
              border: 'none',
              background: 'none',
              overflow: 'hidden',
              borderRadius: '50px',
              outline: 'none',
              padding: '0',
              zIndex: 49,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            },
          }}
        >
          <div className="flex items-center justify-center h-full">
            <ul className="flex flex-col items-center space-y-2 list-none md:space-y-4 lg:space-y-8 xl:space-y-10 2xl:space-y-12">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={`#${link}`}
                    className="text-2xl text-white transition-colors duration-300 hover:text-blue-600 md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl"
                    onClick={toggleModal}
                  >
                    {link.charAt(0).toUpperCase() + link.slice(1)}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Modal>
      </div>

      {!isMobile && (
        <ul className="flex flex-col items-center justify-center h-screen md:flex">
          {navLinks.map((link, index) => (
            <li key={index} className="my-2 md:my-3 lg:my-4 xl:my-5 2xl:my-6">
              <a
                href={`#${link}`}
                className="flex flex-col items-center text-white transition-all duration-300 cursor-pointer group"
              >
                <span className="mb-2 text-sm font-semibold transition-all duration-300 text-slate-300 group-hover:text-white md:text-base lg:text-lg xl:text-xl 2xl:text-2xl">
                  {link.charAt(0).toUpperCase() + link.slice(1)}
                </span>
                <div className="w-6 h-6 transition-all duration-300 transform border-2 border-white rounded-full circle group-hover:scale-110 md:w-7 md:h-7 lg:w-8 lg:h-8 xl:w-9 xl:h-9 2xl:w-10 2xl:h-10"></div>
              </a>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
