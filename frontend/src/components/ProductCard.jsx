import { Heart, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isLoggedIn } = useAuth();

  const handleAdd = (e) => {
    e.stopPropagation();

    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    addToCart(product, 1);
  };

  const imageUrl = product?.image
    ? `${import.meta.env.VITE_API_URL || "http://127.0.0.1:5000"}${product.image}`
    : "/p1.png";

  return (
    <div
      onClick={() => {
        if (!isLoggedIn) {
          navigate("/login");
          return;
        }
        navigate(`/product/${product.id}`);
      }}
      className="group cursor-pointer bg-[] rounded-xl p-5 
      hover:-translate-y-1 transition duration-300"
    >
      {/* IMAGE BOX */}
      <div className="bg-[#3b2a63] rounded-lg p-5 relative flex items-center justify-center h-[210px]">

{/* Discount Badge */}
{product?.discount > 0 && (
  <div className="absolute top-3 right-3 w-10 h-10 bg-orange-500 text-white text-[11px] font-semibold flex items-center justify-center rounded-full">
    {product.discount}%
  </div>
)}


        <img
          src={imageUrl}
          alt={product.title}
          className="h-[150px] object-contain group-hover:scale-105 transition duration-300"
        />
      </div>

      {/* CONTENT */}
      <div className="mt-4 text-left">

     {/* TITLE */}
<h3 className="text-[14px] font-semibold text-white leading-snug text-center">
  {product.title}
</h3>

{/* PRICE */}
<div className="mt-2 text-[14px] text-center">
  {product.old_price && (
    <span className="line-through text-gray-400 mr-2">
      ${product.old_price}
    </span>
  )}
  <span className="text-orange-400 font-bold">
    ${product.price}
  </span>
</div>

{/* ACTION LINKS */}
<div className="flex items-center justify-center gap-4 mt-3 text-[13px] text-gray-300">
  <button
    onClick={(e) => e.stopPropagation()}
    className="flex items-center gap-2 hover:text-white transition"
  >
    <Heart size={14} />
    Add to wishlist
  </button>


        </div>
      </div>
    </div>
  );
}
