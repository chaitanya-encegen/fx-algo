import "./FeaturesSection.css";

const features = [
  "Our Philosophy: Top Quality Robots",
  "Genuine Top Quality Robots",
  "Backtested and Verified",
  "Verified Broker Integration",
  "Commitment to Customer Satisfaction"
];

const FeaturesSection = () => {
  return (
    <section className="features-section">

      {/* LEFT SIDE */}
      <div className="features-left">
        {features.map((item, index) => (
          <div
            key={index}
            className={`feature-item ${index === 0 ? "active" : ""}`}
          >
            <span>{item}</span>
            <span className="arrow">⌄</span>
          </div>
        ))}
      </div>

      {/* RIGHT SIDE */}
      <div className="features-right">
        <h3>Join the Fxalgo Community Today</h3>

        <p>
          If you're tired of wasting time and money on ineffective trading
          tools, it's time to experience the Fxalgo difference. Join thousands
          of satisfied traders who have entrusted us with their trading needs
          and see why we're the industry leader in forex trading automation.
          With Fxalgo by your side, the possibilities are endless.
        </p>

        <button>Contact Us</button>
      </div>

    </section>
  );
};

export default FeaturesSection;
