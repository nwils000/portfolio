import React, { useEffect, useState } from 'react';
import { FaCode, FaLaptopCode, FaTools } from 'react-icons/fa';

const Skills = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth <= 768);
    }

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if (isMobile === null) {
    return <div>Loading...</div>;
  }

  const skills = [
    {
      category: 'Languages',
      items: ['HTML', 'CSS', 'JavaScript', 'Python', 'SQL'],
      icon: <FaCode className="mb-4 text-6xl text-white" />,
      color: 'from-blue-500 to-blue-700',
    },
    {
      category: 'Frameworks & Libraries',
      items: ['React', 'Django', 'Express', 'Bootstrap', 'Tailwind'],
      icon: <FaLaptopCode className="mb-4 text-6xl text-white" />,
      color: 'from-green-500 to-green-700',
    },
    {
      category: 'Tools & Technologies',
      items: [
        'Git',
        'VSCode',
        'Netlify',
        'Vercel',
        'Fly',
        'Firebase',
        'MongoDB',
        'Docker',
      ],
      icon: <FaTools className="mb-4 text-6xl text-white" />,
      color: 'from-purple-500 to-purple-700',
    },
  ];

  return (
    <section
      id="skills"
      className="container flex flex-col items-center justify-center min-h-screen gap-10 p-4 py-20 mx-auto text-left text-white font-roboto "
    >
      <h1 className="mt-12 mb-5 text-4xl font-semibold text-white">Skills</h1>
      <div className={`flex ${isMobile ? 'flex-col' : ''}`}>
        {skills.map((skill, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center w-64 p-4 m-4 text-center text-white transition-transform duration-500 ease-in-out transform rounded-lg shadow-2xl bg-gradient-to-br hover:scale-105"
          >
            {skill.icon}
            <h2 className="mb-2 text-2xl font-semibold sm:text-3xl">
              {skill.category}
            </h2>
            <p className="text-sm sm:text-base">{skill.items.join(', ')}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
