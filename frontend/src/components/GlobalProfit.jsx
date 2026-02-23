import "./GlobalProfit.css";

const countries = [
  { code: "CN", name: "China", flag: "cn", amount: "$41,678" },
  { code: "AM", name: "America", flag: "am", amount: "$38,678" },
  { code: "IN", name: "India", flag: "in", amount: "$39,678" },
  { code: "CA", name: "cannda", flag: "ca", amount: "$45,678" },
  { code: "RU", name: "Russia", flag: "ru", amount: "$39,678" },
  { code: "IN", name: "India", flag: "in", amount: "$37,678" },
];

export default function GlobalProfit() {
  return (
    <section className="global-section">
      {/* TOP BAR */}
      <div className="top-bar"></div>

      <div className="global-container">
        {/* ROBOT IMAGE */}
        <img src="/robot.png" alt="robot" className="robot-img" />

        {/* TEXT */}
        <h1 className="global-amount">$31+ Million</h1>
        <p className="global-sub">Benefit made by Robot Globally</p>

        {/* GLOW TRIANGLE */}
        <div className="glow-triangle"></div>

        {/* COUNTRY SLIDER */}
        <div className="slider-wrap">
          <div className="slider-track">
            {[...countries, ...countries].map((c, i) => (
              <div className="country-box" key={i}>
                <div className="country-top">
                  <img
                    src={`https://flagcdn.com/w40/${c.flag}.png`}
                    alt={c.name}
                  />
                  <span>{c.name}</span>
                </div>
                <h3>{c.amount}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="bottom-bar"></div>
    </section>
  );
}