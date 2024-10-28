import React from "react";
import { useNavigate } from "react-router-dom";
import "./Tourist.css";
import Grid from "@mui/material/Grid";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";

const LandingPage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/touristform");
  };

  return (
    <div className="background-container">
      <nav className="navbar">
        <div className="navItem">Home</div>
        <div className="navItem">Gallery</div>
      </nav>
      <div className="landingContent">
        {/* <div className='landingCard'> */}
        <div>
          <div className="LandMainSection">
            <Grid container spacing={2}>
              <Grid xs={8} style={{ display: "flex", textAlign: "left" }}>
                <div className="landing_text landTopic">
                  Welcome to Explore with us and make your journey ease and
                  awesome
                </div>
                <div className="landing_text landbody"></div>
              </Grid>

              <Grid item xs={4}>
                <div
                  className="social"
                  style={{
                    display: "flex",
                    justifyContent: "end",
                    flexDirection: "column",
                    alignItems: "end",
                  }}
                >
                  <div className="social-icon">
                    <InstagramIcon />
                  </div>
                  <div className="social-icon">
                    <InstagramIcon />
                  </div>
                  <div className="social-icon">
                    <TwitterIcon />
                  </div>
                </div>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid xs={8}>
                <button className="landButton" onClick={handleGetStarted}>
                  Get Started
                </button>
              </Grid>
              <Grid
                item
                xs={4}
                style={{
                  display: "flex",
                  justifyContent: "end",
                  alignItems: "end",
                }}
              >
                <div className="LandBtmSection">Explore More</div>
              </Grid>
            </Grid>
          </div>
        </div>
        {/* </div> */}
      </div>
    </div>
  );
};

export default LandingPage;
