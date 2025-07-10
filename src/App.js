import React, { useEffect } from "react";
import "./App.css";

function getRandomColor() {
  const colors = [
    '#FF6B6B', '#FFB3F1', '#6A5ACD', '#FFA07A',
    '#DA70D6', '#FF7F50', '#87CEFA', '#FFB347',
    '#FFD700', '#B0E0E6'
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

function getRandomShapeType(shape) {
  const isLine = Math.random() < 0.7;
  if (isLine) {
    shape.style.width = `${Math.floor(Math.random() * 200) + 100}px`;
    shape.style.height = '4px';
    shape.style.borderRadius = '4px';
    shape.style.transform = `rotate(${Math.random() * 360}deg)`;
  } else {
    shape.style.borderRadius = '50%';
  }
}

function getRandomShapeSize() {
  return Math.floor(Math.random() * 50) + 20;
}

export default function App() {
  useEffect(() => {
    const shapes = 20;
    const centerX = 1440 / 2;
    const centerY = 350;
    const screenWidth = 1440;
    const screenHeight = 2700;

    for (let i = 0; i < shapes; i++) {
      const shape = document.createElement('div');
      shape.classList.add('shape');
      shape.style.backgroundColor = getRandomColor();

      const size = getRandomShapeSize();
      shape.style.width = `${size}px`;
      shape.style.height = `${size}px`;

      getRandomShapeType(shape);
      document.body.appendChild(shape);

      shape.style.left = `${centerX}px`;
      shape.style.top = `${centerY}px`;

      const angle = (Math.random() * 80 + 250) * (Math.PI / 180); // 250°–330°
      let distance = Math.random() * 2000 + 1000;

      let x = centerX + distance * Math.cos(angle);
      let y = centerY + distance * Math.sin(angle);

      if (x < 0 || x > screenWidth - size) {
        x = x < 0 ? -x : 2 * (screenWidth - size) - x;
      }
      if (y < 0 || y > screenHeight - size) {
        y = y < 0 ? -y : 2 * (screenHeight - size) - y;
      }

      setTimeout(() => {
        shape.style.opacity = 1;
        shape.style.transform += ` translate(${x - centerX}px, ${y - centerY}px)`;
      }, 10);

      setTimeout(() => {
        shape.style.transition = 'transform 4s ease-out';
        shape.style.transform += ` translate(${Math.random() * 30}px, ${Math.random() * 30 + 20}px)`;
      }, 500);
    }

    setTimeout(() => {
      document.getElementById('introText').style.opacity = 1;
    }, 800);

    setTimeout(() => {
      document.getElementById('description').style.opacity = 1;
    }, 1100);

    // Cleanup shapes on unmount
    return () => {
      const shapes = document.querySelectorAll('.shape');
      shapes.forEach(shape => shape.remove());
    };
  }, []);

  // Letter hover & click handlers in React way
  const handleMouseEnter = e => {
    e.target.style.transform = "scale(1.3)";
    e.target.style.color = getRandomColor();
  };

  const handleMouseLeave = e => {
    e.target.style.transform = "scale(1)";
    e.target.style.color = "black";
  };

  const handleClick = e => {
    e.target.style.transition = "transform 0.3s ease";
    e.target.style.transform = "scale(0.9)";
    setTimeout(() => {
      e.target.style.transform = "scale(1)";
    }, 300);
  };

  const nameLetters = "Seang Hengsrun".split("");
  const descriptionLetters = "Visual Designer".split("");

  return (
    <>
      <div className="intro" id="introText">
        <div className="name" id="name">
          {nameLetters.map((letter, i) => (
            <span
              key={i}
              className="letter"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onClick={handleClick}
            >
              {letter === " " ? "\u00A0" : letter}
            </span>
          ))}
        </div>
        <div className="description" id="description">
          {descriptionLetters.map((letter, i) => (
            <span
              key={i}
              className="letter"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onClick={handleClick}
            >
              {letter === " " ? "\u00A0" : letter}
            </span>
          ))}
        </div>
      </div>

      <footer className="footer">
        All rights reserved © Seang Hengsrun | 2025
      </footer>
    </>
  );
}
