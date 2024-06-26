import React from 'react';
import { FaLinkedin, FaGithub, FaFacebook, FaInstagram } from 'react-icons/fa';

const About = () => {
  const socialLinks = [
    {
      href: 'https://www.linkedin.com/in/nathan-wilson-1b3715265',
      icon: <FaLinkedin className="text-2xl text-white hover:text-blue-600" />,
      color: 'from-blue-500 to-blue-700',
    },
    {
      href: 'https://github.com/nwils000',
      icon: <FaGithub className="text-2xl text-white hover:text-gray-400" />,
      color: 'from-gray-500 to-gray-700',
    },
    {
      href: 'https://www.facebook.com/nathan.wilson.5648/',
      icon: <FaFacebook className="text-2xl text-white hover:text-blue-600" />,
      color: 'from-blue-600 to-blue-800',
    },
    {
      href: 'https://www.instagram.com/nathan_wilsonn/',
      icon: (
        <FaInstagram className="text-2xl text-white hover:text-purple-500" />
      ),
      color: 'from-purple-500 to-purple-700',
    },
  ];

  return (
    <section
      id="about"
      className="container flex flex-col items-center justify-center min-h-screen gap-10 p-4 mx-auto text-left text-white font-roboto"
    >
      <h2 className="mt-12 mb-5 text-4xl font-semibold text-white">About Me</h2>
      <div
        className="container m-4 mx-auto text-center transition-transform duration-500 ease-in-out transform rounded-lg shadow-2xl bg-gradient-to-br "
        style={{
          backgroundImage: `linear-gradient(from-blue-500 to-blue-700)`,
        }}
      >
        <p className="p-6 text-lg leading-10 lg:leading-10 lg:text-2xl">
          I specialize in React and Django, having graduated from the Awesome
          Inc full stack web development bootcamp in June 2024. My background in
          leadership roles, including cheer coaching and missionary work, has
          given me skills in team collaboration and project management.
          Additionally, my experience in developing software like a family
          allowance system, as well as managing a Web Development Agency, gives
          me a unique set of capabilities that enhance my effectiveness as a
          developer.
        </p>
      </div>
      <div className="flex justify-center mt-6 space-x-2 md:space-x-4">
        {socialLinks.map((link, index) => (
          <a
            key={index}
            href={link.href}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center w-12 h-12 text-center text-white transition-transform duration-500 ease-in-out transform rounded-lg shadow-2xl md:w-20 md:h-20 bg-gradient-to-br hover:scale-110"
            style={{ backgroundImage: `linear-gradient(${link.color})` }}
          >
            {link.icon}
          </a>
        ))}
      </div>
    </section>
  );
};

export default About;
