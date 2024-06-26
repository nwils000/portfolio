import { useEffect, useState, useRef } from 'react';
import { ChevronRightIcon } from '@heroicons/react/outline';

const Project = ({
  title,
  description,
  imageUrl,
  videoUrl,
  liveLink,
  githubLink,
}) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth <= 768);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center max-w-lg p-6 my-6 overflow-hidden rounded-lg shadow-2xl">
      <h2 className="mb-2 text-lg font-semibold text-center text-white sm:text-xl">
        {title}
      </h2>
      <div className="h-[5rem] max-w-[23rem] overflow-auto text-sm text-center text-stone-200 sm:text-base">
        {description}
      </div>
      {isMobile ? (
        <img
          src={imageUrl}
          alt="project"
          className="object-cover mb-4 shadow-lg"
        />
      ) : (
        <video
          src={videoUrl}
          autoPlay
          muted
          loop
          className="object-cover mb-4 shadow-lg"
        />
      )}
      <div className="flex justify-around w-full mt-4">
        <a
          href={liveLink}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 text-white transition-colors duration-300 ease-in-out bg-transparent border-2 border-white rounded-full hover:cursor-pointer hover:bg-white hover:text-black"
        >
          View Live
        </a>
        <a
          href={githubLink}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 text-white transition-colors duration-300 ease-in-out bg-transparent border-2 border-white rounded-full hover:cursor-pointer hover:bg-white hover:text-black"
        >
          View on GitHub
        </a>
      </div>
    </div>
  );
};

const Projects = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoCycle, setAutoCycle] = useState(true);
  const projectsRef = useRef([]);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth <= 980);
    }

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const projectsData = [
    {
      title: 'Portfolio',
      description:
        'A personal showcase of my skills and projects, built with Next.js and TypeScript.',
      imageUrl:
        'https://res.cloudinary.com/dwonrd0xx/image/upload/v1686259301/Portfolio/Screenshot_138_on6erl.png',
      videoUrl:
        'https://res.cloudinary.com/dwonrd0xx/video/upload/v1686259321/Portfolio/Nathan_Wilson_-_Portfolio_-_AVG_Secure_Browser_2023-06-08_17-18-59_aejpbx.mp4',
      liveLink: 'https://nathanwilson.dev',
      githubLink: 'https://github.com/nwils000/portfolio',
    },
    {
      title: 'Web Design Agency',
      description:
        'A web design agency site featuring a contact form and an active blog.',
      imageUrl:
        'https://res.cloudinary.com/dwonrd0xx/image/upload/c_scale/v1/Portfolio/Screenshot_136_ubecz7.png',
      videoUrl:
        'https://res.cloudinary.com/dwonrd0xx/video/upload/c_scale/v1/Portfolio/ignite_qv6vwk.webm',
      liveLink: 'https://igniteky.com',
      githubLink: 'https://github.com',
    },
    {
      title: 'Amazon.com Clone',
      description: 'An e-commerce platform clone designed with React and CSS.',
      imageUrl:
        'https://res.cloudinary.com/dwonrd0xx/image/upload/c_scale/v1/Portfolio/Screenshot_133_pg7id1.png',
      videoUrl:
        'https://res.cloudinary.com/dwonrd0xx/video/upload/c_scale/v1/Portfolio/amzin_sdnkk6.webm',
      liveLink: 'https://amzin-clone.netlify.app/',
      githubLink: 'https://github.com/nwils000/amazon-clone-app',
    },
    {
      title: 'Social Media',
      description:
        'Full-stack social media app built with Django and React, offering standard features like profiles, posts, and interactions.',
      imageUrl:
        'https://res.cloudinary.com/dwonrd0xx/image/upload/v1719325690/Screenshot_2024-06-25_102637_cndweq.png',
      videoUrl:
        'https://res.cloudinary.com/dwonrd0xx/video/upload/v1719325173/Screen_Recording_2024-06-25_100158_alwrgx.mp4',
      liveLink: 'https://social-media-client-snowy.vercel.app/',
      githubLink: 'https://github.com/nwils000/social-media-client',
    },
    {
      title: 'Kid Kapital',
      description:
        'Bootcamp capstone project: a full-stack app designed for families to manage children’s allowances."',
      imageUrl:
        'https://res.cloudinary.com/dwonrd0xx/image/upload/v1719325677/Screenshot_2024-06-25_102701_ifmir7.png',
      videoUrl:
        'https://res.cloudinary.com/dwonrd0xx/video/upload/v1719325133/Screen_Recording_2024-06-25_094747_soduqq.mp4',
      liveLink: 'https://kid-kapital.vercel.app/',
      githubLink: 'https://github.com/nwils000/kid-kapital',
    },
    {
      title: 'Site Scout - SEO Tool',
      description:
        'Site Scout is a tool I contributed to that is designed to scrape websites and display relevant code that requires fixes for SEO optimization.',
      imageUrl:
        'https://res.cloudinary.com/dwonrd0xx/image/upload/v1705006359/Portfolio/Screenshot_158_jd8k6y.png',
      videoUrl:
        'https://res.cloudinary.com/dwonrd0xx/video/upload/v1705006013/Portfolio/App_Site_Scout_-_Google_Chrome_2024-01-11_15-42-27_tihkre.mp4',
      liveLink: 'https://sitescout.pro',
      githubLink: 'https://github.com/',
    },
  ];

  useEffect(() => {
    if (autoCycle) {
      const interval = setInterval(() => {
        setCurrentSlide((currentSlide + 1) % projectsData.length);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [currentSlide, projectsData.length, autoCycle]);

  const handleProjectSelection = (index) => {
    setAutoCycle(false);
    setCurrentSlide(index);
  };

  return (
    <div>
      {isMobile ? (
        <div
          className="flex flex-col items-center justify-center h-screen gap-10 mb-44 "
          id="projects"
        >
          <h1 className="mt-64 mb-5 text-4xl font-semibold text-white ">
            Projects
          </h1>
          <div className="flex flex-col items-center gap-10 ">
            <div className="flex flex-col items-center justify-center -mb-16">
              <div className="flex pt-6 flex-col justify-start w-full md:w-[18rem] p-4 rounded-lg  shadow-2xl ">
                {projectsData.map((project, index) => (
                  <button
                    key={index}
                    className={`flex items-center justify-start space-x-2 p-2 rounded-lg ${
                      index === currentSlide
                        ? 'text-blue-500 font-semibold'
                        : 'text-white hover:font-semibold'
                    }`}
                    onClick={() => handleProjectSelection(index)}
                  >
                    <ChevronRightIcon
                      className={`w-5 h-5 ${
                        index === currentSlide
                          ? 'text-blue-500'
                          : 'text-white hover:text-blue-500'
                      }`}
                    />
                    {project.title}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex flex-col items-center justify-center md:flex-row md:gap-10">
              {projectsData.map((project, index) => (
                <div
                  key={index}
                  className={`${
                    index === currentSlide
                      ? 'block transition-all duration-1000'
                      : 'hidden'
                  }`}
                  ref={(el) => (projectsRef.current[index] = el)}
                >
                  <Project {...project} />
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div
          className="flex flex-col items-center justify-center h-screen gap-10 "
          id="projects"
        >
          <h1 className="mb-5 text-4xl font-semibold text-white">Projects</h1>
          <div className="flex flex-row items-center gap-10">
            <div className="flex flex-col items-center justify-center">
              <div className="flex pt-6 flex-col justify-start w-full md:w-[18rem] p-4 rounded-lg  shadow-2xl">
                {projectsData.map((project, index) => (
                  <button
                    key={index}
                    className={`flex items-center justify-start space-x-2 p-2 rounded-lg ${
                      index === currentSlide
                        ? 'text-blue-500 font-semibold'
                        : 'text-white hover:font-semibold'
                    }`}
                    onClick={() => handleProjectSelection(index)}
                  >
                    <ChevronRightIcon
                      className={`w-5 h-5 ${
                        index === currentSlide
                          ? 'text-blue-500'
                          : 'text-white hover:text-blue-500'
                      }`}
                    />
                    {project.title}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex flex-col items-center justify-center md:flex-row md:gap-10">
              {projectsData.map((project, index) => (
                <div
                  key={index}
                  className={`${index === currentSlide ? 'block' : 'hidden'}`}
                  ref={(el) => (projectsRef.current[index] = el)}
                >
                  <Project {...project} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;
