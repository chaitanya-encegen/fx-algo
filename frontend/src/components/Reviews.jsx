import "./Reviews.css";

const reviews = [
  {
    name: "Ashik Bansode",
    time: "A day ago",
    title: "FX Prime Wolf is a powerful crypto…",
    text: "FX Prime Wolf is a powerful crypto trading robot that works 24x7 it handles volatility very well and gives stable weekly profits Good option for crypto automation",
  },
  {
    name: "Leukes Morne",
    time: "4 days ago",
    title: "I passed my prop firm challenge within…",
    text: "I passed my prop firm challenge within 5 days using FX prop Firm passer The robot follows proper risk management and respect prop firm rules highly recommend for funded account traders",
  },
  {
    name: "Vicky Sarkar",
    time: "4 days ago",
    title: "FX King Kong 4.1 uses smart ICT takeout…",
    text: "FX King Kong 4.1 uses smart ICT takeout logic which works very well on gold",
  },
  {
    name: "Suresh Gade",
    time: "Jan 10, 2026",
    title: "verry good robot",
    text: "verry good robot",
  },
  {
    name: "Divyam Shelar",
    time: "Jan 9, 2026",
    title: "Support team at fxalgo is very helpful…",
    text: "Support team at fxalgo is very helpful they replied to my queries quickly and helped me with installation and settings",
  },
  {
    name: "Krishna Devangaon",
    time: "Sep 21, 2025",
    title: "Hello friends im connected with them…",
    text: "Hello friends im connected with them before 3 months everything is really smooth their results & transparency Thanks to this company",
  },
  {
    name: "Amit",
    time: "Sep 18, 2025",
    title: "I only want to say",
    text: "It's the best Website I have ever seen they are really good & Genuine Automation tools provider",
  },
  {
    name: "FitCoach Ajay",
    time: "Sep 18, 2025",
    title: "At first I was not confident to join…",
    text: "I joined after seeing results. Everything is great, working good. Happy with Fxalgo community",
  },
];

export default function Reviews() {
  return (
    <section className="reviews-section">
      <h2 className="reviews-title">
        Showing Our 4 & 5 ⭐ Star Reviews
      </h2>

      <div className="reviews-grid">
        {reviews.map((r, i) => (
          <div className="review-card" key={i}>
            <div className="stars-row">
              <div className="stars">
                ★★★★★
              </div>
              <span className="verified">Verified</span>
            </div>

            <p className="user-line">
              <strong>{r.name}</strong>, {r.time}
            </p>

            <h4>{r.title}</h4>
            <p className="text">{r.text}</p>
          </div>
        ))}
      </div>

      {/* Button */}
      <div className="trustpilot-btn-wrap">
        <a
          href="https://www.trustpilot.com/review/fxalgo.net"
          target="_blank"
          rel="noreferrer"
          className="trustpilot-btn"
        >
          Show more on Trustpilot
        </a>
      </div>

      {/* Bottom Gradient Line */}
      <div className="bottom-gradient"></div>
    </section>
  );
}