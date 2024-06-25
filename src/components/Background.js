import React, { useState, useEffect, useRef } from 'react';
import Navbar from './Navbar';
import Home from './Home';
import About from './About';
import Skills from './Skills';
import Projects from './Projects';
import Contact from './Contact';
import Footer from './Footer';
import FadeInWhenVisible from './FadeInWhenVisible';

const getNumShapes = () => {
  return 5;
};

const NUM_SHAPES = getNumShapes();

const getRandomPosition = (size) => {
  let maxX = 1000;
  let maxY = 1000;
  if (typeof window !== 'undefined') {
    maxX = window.innerWidth;
    maxY = window.innerHeight;
  }
  const x = Math.max(0, Math.floor(Math.random() * (maxX - size)));
  const y = Math.max(0, Math.floor(Math.random() * (maxY - size)));
  return { x, y };
};

const getRandomVelocity = () => {
  return Math.random() * 10 - 5;
};

const getRandomOpacity = () => {
  return 0.3 + Math.random() * 0.7;
};

const Square = ({ backgroundColor, size, speed }) => {
  const [squareState, setSquareState] = useState({
    position: getRandomPosition(size),
    velocity: { x: getRandomVelocity(), y: getRandomVelocity() },
    opacity: getRandomOpacity(), // Initialize opacity
  });
  const requestRef = useRef();

  const updatePosition = () => {
    const { position, velocity } = squareState;
    const newX = position.x + velocity.x * speed;
    const newY = position.y + velocity.y * speed;
    const maxX = window.innerWidth - size;
    const maxY = window.innerHeight - size;

    const newVelocity = { ...velocity };
    if (newX < 0 || newX > maxX) {
      newVelocity.x *= -1;
    }
    if (newY < 0 || newY > maxY) {
      newVelocity.y *= -1;
    }

    // Update position and velocity only, keep opacity stable
    setSquareState((prevState) => ({
      position: { x: newX, y: newY },
      velocity: newVelocity,
      opacity: prevState.opacity, // Maintain existing opacity
    }));
  };

  useEffect(() => {
    const animate = () => {
      updatePosition();
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, [squareState, size, speed]);

  return (
    <svg
      width={size}
      height={size}
      className="absolute top-0 left-0 bg-purple-600 border-none"
      style={{
        top: squareState.position.y,
        left: squareState.position.x,
        opacity: squareState.opacity,
        transition: 'opacity 0.5s', // Smooth transition for opacity changes
      }}
    >
      <rect className="fill-none" x="0" y="0" width={size} height={size} />
    </svg>
  );
};

const Slider = ({ label, min, max, step, value, onChange }) => {
  const handleSliderChange = (event) => {
    const newValue = Number(event.target.value);
    onChange(newValue);
  };

  return (
    <div className="p-4">
      <label className="block mb-2 text-sm font-medium text-gray-400">
        {label}
      </label>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleSliderChange}
        className="w-full h-8 rounded-full outline-none appearance-none bg-gradient-to-r from-gray-700 to-gray-800 opacity-70 hover:opacity-100 slider-horizontal"
      />
    </div>
  );
};

const Background = () => {
  const [squareSize, setSquareSize] = useState(5);
  const [squareSpeed, setSquareSpeed] = useState(0.5);
  const [squareAmount, setSquareAmount] = useState(NUM_SHAPES);

  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWindowWidth(window.innerWidth);

      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  const handleSizeChange = (newValue) => {
    setSquareSize(newValue);
  };

  const handleSpeedChange = (newValue) => {
    setSquareSpeed(newValue);
  };

  const handleAmountChange = (newValue) => {
    setSquareAmount(newValue);
  };

  const squares =
    windowWidth > 767
      ? Array.from({ length: squareAmount }).map((_, index) => (
          <Square
            key={index}
            backgroundColor="purple"
            size={squareSize}
            speed={squareSpeed}
          />
        ))
      : null;

  return (
    <>
      <div className="fixed inset-0 z-0 bg-gradient-to-r from-gray-800 to-gray-900">
        {/* {squares} */}
        <div className="relative z-10 flex flex-col w-screen h-screen gap-20 overflow-auto">
          {/* {windowWidth > 767 && (
            <div className="absolute top-0 right-0 z-50 p-4">
              <Slider
                label="Size"
                min={5}
                max={40}
                value={squareSize}
                onChange={handleSizeChange}
                step={5}
              />
              <Slider
                label="Speed"
                min={0.3}
                max={3}
                step={0.1}
                value={squareSpeed}
                onChange={handleSpeedChange}
              />
              <Slider
                label="Square Amount"
                min={0}
                max={10}
                value={squareAmount}
                onChange={handleAmountChange}
                step={1}
              />
            </div>
          )} */}
          <Navbar />
          <FadeInWhenVisible>
            <Home />
          </FadeInWhenVisible>
          <FadeInWhenVisible>
            <About />
          </FadeInWhenVisible>
          <FadeInWhenVisible>
            <Skills />
          </FadeInWhenVisible>
          <FadeInWhenVisible>
            <Projects />
          </FadeInWhenVisible>
          <FadeInWhenVisible>
            <Contact />
          </FadeInWhenVisible>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Background;
