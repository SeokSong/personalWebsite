import car from './pixil-frame-0.png';
import './App.css';
import React, { useEffect, useState } from 'react';

const GreenDot = () => {
  const dotRef = React.useRef(null);
  let top = 50;
  let left = 50;
  let rotation = 0;

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  });

  const handleKeyPress = (e) => {
    switch (e.code) {
      case 'KeyW':
        if (top > 0) top -= 10;
        rotation = 0;
        break;
      case 'KeyA':
        if (left > 0) left -= 10;
        rotation = 90;
        break;
      case 'KeyS':
        if (top < window.innerHeight - 10) top += 10;
        rotation = 180;
        break;
      case 'KeyD':
        if (left < window.innerWidth - 10) left += 10;
        rotation = 270;
        break;
      default:
        break;
    }
    dotRef.current.style.top = `${top}px`;
    dotRef.current.style.left = `${left}px`;
    dotRef.current.style.transform = `rotate(${rotation}deg)`;
  };

  const getLocation = () => {
    return { top, left };
  };

  return (
    <div id="green-dot" ref={dotRef} style={{
      width: '10px',
      height: '10px',
      backgroundColor: 'transparent',
      position: 'absolute',
      top: `${top}px`,
      left: `${left}px`,
      transform: `rotate(${rotation}deg)`
    }}>
      <img src={car} alt="car" />
    </div>
  );
};

const App = () => {
  const [location, setLocation] = useState(null);
  const greenDotRef = React.useRef(null);

  const handleGetLocation = () => {
    setLocation(greenDotRef.current.getLocation());
  };

  return (
    <div>
      <GreenDot ref={greenDotRef} />
      <button onClick={handleGetLocation}>Get Location</button>
      {location && (
        <div>
          Top: {location.top}px
          Left: {location.left}px
        </div>
      )}
      {location && location.top > 100 && (
        <div>You moved the green dot down by 100 pixels!</div>
      )}
    </div>
  );
};

export default App;