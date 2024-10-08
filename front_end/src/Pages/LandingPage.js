import React from 'react';
import "./Tourist.css";
import Link from '@mui/material/Link';


const LandingPage = () => {
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
            <button className="landButton">
              <a href="/touristform" style={{ color: 'white', textDecoration: 'none' }}>
                Get Started
              </a>
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
