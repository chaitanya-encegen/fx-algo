import "./about.css";
import { Link } from "react-router-dom";

import FeaturesSection from "../components/FeaturesSection";
import ProductsSection from "../components/ProductsSection";



const About = () => {
  return (
    <div className="about-page">

      {/* HERO SECTION */}
      <div className="hero-container">

        <div className="hero-image">
          <div className="breadcrumb">
  <Link to="/" className="crumb-link">Home</Link>
  <span className="crumb-separator"> / </span>
  <span className="crumb-current">About</span>
</div>
        </div>

        <div className="hero-band">
          <h3>FX ALGO</h3>
          <p>Your Trusted Partner in Forex Trading Automation</p>
          <div className="band-underline"></div>
        </div>

      </div>

      {/* MAIN CONTENT */}
      <section className="content-section">

        <div className="content-left">
          <h3>What we do</h3>

          <p>
            At Fxalgo, we pride ourselves on being at the forefront of the forex
            trading industry for the past several years. Our journey began with a
            simple yet ambitious goal: to revolutionize the way traders interact
            with the market by providing cutting-edge trading tools and robots.
          </p>

          <ul>
            <li>Innovative Approach</li>
            <li>Commitment to Integrity</li>
            <li>Proven Track Record</li>
          </ul>
        </div>

        <div className="content-right">
          <img
            src="/About us img/2nd bg.jpg"
            alt="Robot Trading"
          />
        </div>

      </section>

      

      {/* FEATURES (WHY CHOOSE US) */}
      <FeaturesSection />

      {/* PRODUCT PREVIEW */}
      <ProductsSection />

    </div>
  );
};

export default About;
