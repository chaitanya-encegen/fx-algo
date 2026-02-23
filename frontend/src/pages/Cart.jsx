import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Breadcrumbs from "../components/Breadcrumbs";


export default function Cart() {
  const {
    cart,
    updateQty,
    removeFromCart,
    cartTotal,
  } = useCart();

  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!isLoggedIn) {
      navigate("/login?redirect=/checkout");
    } else {
      navigate("/checkout");
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0614] text-white px-10 py-12">
  

  <Breadcrumbs />


      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

      {cart.length === 0 ? (
        <p className="text-gray-400">Your cart is empty.</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* LEFT: ITEMS */}
          <div className="lg:col-span-2 space-y-6">
            {cart.map((item) => {

              const imageUrl = item.image
                ? `${import.meta.env.VITE_API_URL || "http://127.0.0.1:5000"}${item.image}`
                : "/p1.png";

              return (
                <div
                  key={item.id}
                  className="flex items-center gap-6 bg-[#12061f] p-5 rounded-xl"
                >
                  {/* IMAGE */}
                  <img
                    src={imageUrl}
                    alt={item.title}
                    className="w-24 h-24 object-contain bg-[#0e061a] rounded-lg"
                  />

                  {/* INFO */}
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{item.title}</h3>
                    <p className="text-sm text-gray-400">
                      ${item.price} each
                    </p>

                    {/* QTY CONTROLS */}
                    <div className="flex items-center gap-3 mt-3">
                      <button
                        onClick={() =>
                          updateQty(item.id, Math.max(1, item.qty - 1))
                        }
                        className="w-8 h-8 rounded border border-gray-600 hover:bg-gray-700"
                      >
                        −
                      </button>

                      <span className="w-6 text-center">{item.qty}</span>

                      <button
                        onClick={() => updateQty(item.id, item.qty + 1)}
                        className="w-8 h-8 rounded border border-gray-600 hover:bg-gray-700"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* PRICE + REMOVE */}
                  <div className="text-right space-y-2">
                    <div className="text-yellow-400 font-bold text-lg">
                      ${item.price * item.qty}
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-sm text-red-500 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* RIGHT: SUMMARY */}
          <div className="bg-[#12061f] p-6 rounded-xl h-fit">
            <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

            <div className="flex justify-between mb-4">
              <span>Total</span>
              <span className="text-yellow-400 font-bold">
                ${cartTotal}
              </span>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full mt-4 py-3 rounded-lg
              bg-gradient-to-r from-yellow-400 to-orange-500
              text-black font-bold hover:scale-[1.02] transition"
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
