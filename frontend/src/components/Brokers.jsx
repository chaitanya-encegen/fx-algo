import "./Brokers.css";

const brokers = [
  "/logos/5ers.png",
  "/logos/Ctrader.png",
   "/logos/MT4.png",
  "/logos/FTMO.png",
  "/logos/Fundingpips.png",
 
  "/logos/MT5.png",
  "/logos/Vantage.png",
];

export default function Brokers() {
  return (
    <section className="brokers-section">
      <h2 className="brokers-title">
        Our Recommended Brokerage <br /> Firms & Platforms
      </h2>

      {/* Slider 1 */}
      <div className="logo-loop">
        <div className="logo-track">
          {[...brokers, ...brokers, ...brokers].map((img, i) => (
            <div className="logo-item" key={`a-${i}`}>
              <img src={img} alt="logo" />
            </div>
          ))}
        </div>
      </div>

      {/* Slider 2 (reverse) */}
      <div className="logo-loop reverse">
        <div className="logo-track">
          {[...brokers, ...brokers, ...brokers].map((img, i) => (
            <div className="logo-item" key={`b-${i}`}>
              <img src={img} alt="logo" />
            </div>
          ))}
        </div>
      </div>

      {/* Bottom decorative line */}
      <div className="bottom-line"></div>
    </section>
  );
}
