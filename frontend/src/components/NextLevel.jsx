import "./NextLevel.css";

const features = [
  { title: "Expert advisor", sub: "(1280)", icon: "👨‍💼" },
  { title: "Non-Repaint Indicators", sub: "(300)", icon: "🧠" },
  { title: "Best Broker", sub: "", icon: "🏆" },
  { title: "Best Firms", sub: "", icon: "🏢" },
  { title: "24/7 Support", sub: "", icon: "⏱" },
  { title: "Customer 9100+", sub: "", icon: "📈" },
  { title: "Community member", sub: "", icon: "👥" },
  { title: "Risk Management", sub: "", icon: "🛡️" },
];

export default function NextLevel() {
  return (
    <section className="next-section">
      <h2 className="next-title">Next Level Trading</h2>

      <div className="next-grid">
        {features.map((f, i) => (
          <div className="next-card" key={i}>
            <div className="next-icon">{f.icon}</div>
            <h4>{f.title}</h4>
            {f.sub && <span>{f.sub}</span>}
          </div>
        ))}
      </div>

      {/* bottom tech line */}
      <div className="tech-bottom-line">
        <span style={{ left: "10%" }}></span>
        <span style={{ left: "30%" }}></span>
        <span style={{ left: "50%" }}></span>
        <span style={{ left: "70%" }}></span>
        <span style={{ left: "90%" }}></span>
      </div>
    </section>
  );
}
