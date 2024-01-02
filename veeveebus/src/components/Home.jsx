import React, { useState, useEffect, useMemo } from 'react';
import image1 from '../assets/veevee2.jpg';
import image2 from '../assets/veevee3.jpg';
import image3 from '../assets/veevee4.jpg';
import './Home.css';

const Home = () => {
  const [currentImage, setCurrentImage] = useState(image1);
  const intervalTime = 3000;

  const images = useMemo(() => [image1, image2, image3], []);

  useEffect(() => {
    const interval = setInterval(() => {
      const currentIndex = images.indexOf(currentImage);
      const nextIndex = (currentIndex + 1) % images.length;
      setCurrentImage(images[nextIndex]);
    }, intervalTime);

    return () => clearInterval(interval);
  }, [currentImage, images, intervalTime]);

  return (
    <div className="home">
    <h2>Welcome to VeeVee Holiday</h2>
    <p>Journey With You</p>
    <div className="carousel">
      <img src={currentImage} alt="Carousel" />
      <h1 className="slogan">Your Perfect Holiday Destination</h1>
    </div>
  </div>
  );
};

export default Home;