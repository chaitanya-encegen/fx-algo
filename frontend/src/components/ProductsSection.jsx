import "./ProductsSection.css";

const products = [
  { title: "Quality Over Quantity", icon: "🔧" },
  { title: "Genuine Top-Quality Robots", icon: "⚙️" },
  { title: "Transparency and Accountability", icon: "📄" },
  { title: "Customer-Centric Support", icon: "💬" }
];

const ProductsSection = () => {
  return (
    <section className="products-section">

      {/* LEFT SIDE */}
      <div className="products-left">
        {/* <h3>About Products</h3> */}

        <div className="products-grid">
          {products.map((item, index) => (
            <div key={index} className="product-item">
              <div className="product-icon">{item.icon}</div>
              <span>{item.title}</span>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT SIDE IMAGE */}
      <div className="products-right">
        <img src="/About us img/3rd.jpg" alt="Trading Screen" />
      </div>

    </section>
  );
};

export default ProductsSection;
