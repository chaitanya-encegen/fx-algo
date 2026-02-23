import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useCart } from "../context/CartContext";
import ProductCard from "./ProductCard";
import Breadcrumbs from "../components/Breadcrumbs";


export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);

  /* LOAD PRODUCT */
  useEffect(() => {
    const loadProduct = async () => {
      try {
        const res = await api.get(`/products/${id}`);
        setProduct(res.data);

        // LOAD RELATED PRODUCTS
        const all = await api.get("/products");
        const others = all.data.filter(p => p.id !== Number(id));
        setRelated(others.slice(0, 4)); // 4 related items

      } catch (err) {
        console.log("Product not found");
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  /* ADD TO CART */
  const handleAddToCart = () => {
    addToCart(product, qty);
    navigate("/cart");
  };

  if (loading) {
    return <div className="text-center py-20 text-gray-400">Loading product...</div>;
  }

  if (!product) return <div className="text-center py-20">Product not found</div>;

  const imageUrl = product?.image
    ? `${import.meta.env.VITE_API_URL || "http://127.0.0.1:5000"}${product.image}`
    : "/p1.png";

  return (
    <section className="min-h-screen bg-[#0a0614] text-white">
<div className="max-w-7xl mx-auto px-6 pt-10">
    <Breadcrumbs />
  </div>
      {/* MAIN PRODUCT */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-14">

        {/* LEFT IMAGE */}
        <div className="bg-[#160a2b] border-2 border-cyan-500 rounded-2xl p-10 flex justify-center items-center">
          <img
            src={imageUrl}
            alt={product.title}
            className="max-h-[460px] object-contain"
          />
        </div>

        {/* RIGHT DETAILS */}
        <div>

          {/* TITLE */}
          <h1 className="text-4xl font-bold mb-4">
            {product.title}
          </h1>

          {/* PRICE */}
          <div className="flex items-center gap-4 mb-6">
            {product.old_price && (
              <span className="line-through text-gray-500 text-xl">
                ${product.old_price}
              </span>
            )}
            <span className="text-3xl font-bold text-orange-400">
              ${product.price}
            </span>
          </div>

          {/* FEATURES (auto from description) */}
          <div className="text-gray-300 leading-relaxed space-y-2 mb-8">
            {product.description?.split("\n").map((line, i) => (
              <p key={i}>• {line}</p>
            ))}
          </div>

          {/* QTY + ADD */}
          <div className="flex items-center gap-4">

            {/* QUANTITY SELECTOR */}
            <div className="flex items-center bg-[#12061f] rounded-lg overflow-hidden border border-gray-700">
              <button
                onClick={() => setQty(Math.max(1, qty - 1))}
                className="px-4 py-2 hover:bg-gray-800"
              >
                -
              </button>

              <span className="px-6">{qty}</span>

              <button
                onClick={() => setQty(qty + 1)}
                className="px-4 py-2 hover:bg-gray-800"
              >
                +
              </button>
            </div>

            {/* ADD TO CART */}
            <button
              onClick={handleAddToCart}
              className="px-8 py-3 rounded-lg font-bold
              bg-gradient-to-r from-yellow-400 to-orange-500
              text-black hover:scale-105 transition"
            >
              ADD TO CART
            </button>
          </div>

          {/* EXTRA LINKS */}
          <div className="mt-6 text-sm text-gray-400 space-y-2">
            <p>✔ Lifetime Access</p>
            <p>✔ Instant Delivery after Payment</p>
            <p>✔ License Key Generated Automatically</p>
          </div>

        </div>
      </div>

      {/* RELATED PRODUCTS */}
      <div className="max-w-7xl mx-auto px-6 pb-20">
        <h2 className="text-2xl font-bold mb-8">Related Product</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {related.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>

    </section>
  );
}
