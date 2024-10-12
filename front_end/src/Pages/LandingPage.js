import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./Tourist.css";

const LandingPage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/touristform');
  };

  return (
    <div className="background-container">
      <nav className="navbar">
        <div className='navItem'>Home</div>
      </nav>
      <div className="landingContent">
        <div className='landingCard'>
          <div></div>
          <div className='LandMainSection'>
            <div className='landing_text landTopic'>Welcome to Explore with us</div>
            <div className='landing_text landbody'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi lobortis maximus nunc,
              ac rhoncus odio congue quis. Sed ac semper orci, eu porttitor lacus.
            </div>
            <button className="landButton" onClick={handleGetStarted}>
              Get Started
            </button>
          </div>
          <div className='LandBtmSection'>
            © 2024 ALL RIGHTS RESERVED
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
