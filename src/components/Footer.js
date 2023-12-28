import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-6 -mt-10 text-white ">
      <div className="container mx-auto text-center">
        <p className="mb-4 font-semibold">
          &copy; {currentYear} Nathan Wilson. All rights reserved.
        </p>
        <div className="flex items-center justify-center space-x-4">
          <a
            href="https://github.com/your-github"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-600"
          >
            <i className="fab fa-github fa-lg"></i>
          </a>
          <a
            href="https://linkedin.com/in/your-linkedin"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-600"
          >
            <i className="fab fa-linkedin fa-lg"></i>
          </a>
          <a
            href="https://twitter.com/your-twitter"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-600"
          >
            <i className="fab fa-twitter fa-lg"></i>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
