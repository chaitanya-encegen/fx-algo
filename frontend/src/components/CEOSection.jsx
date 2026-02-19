import "./CEOSection.css";

export default function CEOSection() {
  return (
    <section className="ceo-section">

      {/* TOP STRIP */}
      <div className="ceo-top-strip"></div>

      <div className="ceo-container">

        {/* LEFT CONTENT */}
        <div className="ceo-left">
          <h2>Listen From Our CEO</h2>

          <h4>My name is Jack.</h4>

          <p>
            I started trading with big dreams, but I faced heavy losses and was
            scammed multiple times. Instead of quitting, I decided to build my
            own honest trading system.
          </p>

          <p>
            In 2017, I began studying forex and algorithmic trading. After two
            years of hard work, I created my first successful robot. Today,
            that journey has grown into FXALGO, trusted by traders worldwide.
            Our mission is simple: real strategies, honest systems, and reliable
            results.
          </p>

          <button className="read-btn">
            Read more <span>➜</span>
          </button>
        </div>

        {/* RIGHT SIDE BOX */}
        <div className="ceo-right">
          <div className="video-box">
            <img src="/ceo.png" alt="CEO" className="ceo-image" />

          </div>
        </div>

      </div>
    </section>
  );
}
