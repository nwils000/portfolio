import React, { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import Home from './Home';
import FadeInWhenVisible from './FadeInWhenVisible';

const getNumShapes = () => {
  if (typeof window === 'undefined') return 10;
  const screenWidth = window.innerWidth;
  if (screenWidth <= 640) return 5;
  if (screenWidth <= 1024) return 7;
  return 10;
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
  const [position, setPosition] = useState(getRandomPosition(size));
  const [velocity, setVelocity] = useState({
    x: getRandomVelocity(),
    y: getRandomVelocity(),
  });
  const [opacity, setOpacity] = useState(getRandomOpacity);

  useEffect(() => {
    const updatePosition = () => {
      const newX = position.x + velocity.x * speed;
      const newY = position.y + velocity.y * speed;
      const maxX = window.innerWidth - size;
      const maxY = window.innerHeight - size;
      const newVelocity = { x: velocity.x, y: velocity.y };

      if (newX < 0 || newX > maxX) {
        newVelocity.x *= -1;
      }
      if (newY < 0 || newY > maxY) {
        newVelocity.y *= -1;
      }

      // Oscillate opacity between 0.3 and 1 using a sine function
      const minOpacity = 0.3;
      const maxOpacity = 1;
      const opacityRange = maxOpacity - minOpacity;
      const oscillationSpeed = 0.005;
      const oscillationValue = Math.sin(
        newX * oscillationSpeed + newY * oscillationSpeed
      );
      const newOpacity =
        minOpacity + (oscillationValue + 1) * 0.5 * opacityRange;

      setOpacity(newOpacity);
      setVelocity(newVelocity);
      setPosition({ x: newX, y: newY });
    };

    const animation = gsap.to(
      {},
      {
        repeat: -1,
        duration: 1 / 60,
        onUpdate: updatePosition,
      }
    );

    return () => {
      animation.kill();
    };
  }, [position, velocity, size, speed]);

  return (
    <svg
      width={size}
      height={size}
      className="absolute top-0 left-0 bg-purple-600 border-none"
      style={{ top: position.y, left: position.x, opacity: opacity }}
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
  // State for sliders
  const [squareSize, setSquareSize] = useState(5);
  const [squareSpeed, setSquareSpeed] = useState(0.5);
  const [squareAmount, setSquareAmount] = useState(NUM_SHAPES);

  // State for window width
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
        {squares}
        <div className="relative z-10 flex flex-col w-screen h-screen gap-20 overflow-auto">
          {windowWidth > 767 && (
            <div className="absolute top-0 right-0 z-50 p-4">
              <Slider
                label="Size"
                min={5}
                max={40}
                value={squareSize}
                onChange={handleSizeChange}
                step={0}
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
                max={20}
                value={squareAmount}
                onChange={handleAmountChange}
                step={0}
              />
            </div>
          )}

          <FadeInWhenVisible>
            <Home />
          </FadeInWhenVisible>
        </div>
      </div>
    </>
  );
};

export default Background;
