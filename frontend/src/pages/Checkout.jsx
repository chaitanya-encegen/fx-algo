import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Breadcrumbs from "../components/Breadcrumbs";
import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Checkout() {

  const { cart, cartTotal, clearCart } = useCart();
  const { user, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  /* ---------------- FORM STATE ---------------- */

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    country: "India",
    city: "",
    address: "",
    postal_code: "",
    coupon: "",
    paymentMethod: "razorpay",
    agreeTerms: false,
  });

  /* PROTECT PAGE */
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login?redirect=/checkout");
    }
  }, [isLoggedIn, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  /* ---------------- SUBMIT ORDER ---------------- */

  const handleSubmit = async () => {

    if (cart.length === 0) {
      alert("Cart empty");
      return;
    }

    // FULL BILLING VALIDATION
    if (
      !form.first_name ||
      !form.last_name ||
      !form.email ||
      !form.phone ||
      !form.address ||
      !form.city ||
      !form.postal_code
    ) {
      alert("Please fill all billing details");
      return;
    }

    if (!form.agreeTerms) {
      alert("Accept Terms & Conditions");
      return;
    }

    try {

      /* 1️⃣ CREATE ORDER IN DATABASE */
      const orderRes = await api.post("/orders", {
        payment_method: form.paymentMethod,
        billing: {
          first_name: form.first_name,
          last_name: form.last_name,
          email: form.email,
          phone: form.phone,
          country: form.country,
          city: form.city,
          address: form.address,
          postal_code: form.postal_code,
          coupon: form.coupon
        },
        items: cart.map(item => ({
          product_id: item.id,
          quantity: item.qty
        }))
      });

      const orderId = orderRes.data.order_id;

      /* BANK TRANSFER */
      if (form.paymentMethod === "bank") {
        clearCart();
        navigate("/purchases");
        return;
      }

      /* 2️⃣ CREATE RAZORPAY ORDER */
      const payRes = await api.post("/payment/create-order", {
        order_id: orderId,
        amount: Math.round(cartTotal * 100) // paise
      });

      const payData = payRes.data;

      /* 3️⃣ RAZORPAY OPTIONS */
      const options = {
        key: payData.key,
        amount: payData.amount,
        currency: "INR",
        name: "FX ALGO",
        description: "Digital Product Purchase",
        order_id: payData.razorpay_order_id,

        /* AUTO-FILL CUSTOMER DETAILS */
        prefill: {
          name: form.first_name + " " + form.last_name,
          email: form.email,
          contact: form.phone,
        },

        notes: {
          address: form.address,
          city: form.city,
          postal_code: form.postal_code
        },

        theme: {
          color: "#facc15",
        },

        modal: {
          ondismiss: function () {
            alert("Payment cancelled");
          }
        },

        retry: {
          enabled: true,
          max_count: 3
        },

        /* PAYMENT SUCCESS */
        handler: async function (response) {
          try {

            await api.post("/payment/verify", {
              order_id: orderId,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            clearCart();
            navigate("/purchases");

          } catch (err) {
            console.log(err);
            alert("Payment verification failed");
          }
        },
      };

      /* LOAD CHECK */
      if (!window.Razorpay) {
        alert("Razorpay SDK failed to load. Refresh page.");
        return;
      }

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (err) {
      console.log(err);
      alert("Payment failed");
    }
  };

  /* ---------------- UI ---------------- */

  return (
    <div className="min-h-screen bg-[#0a0614] text-white px-10 py-12">
      <Breadcrumbs />

      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

        {/* LEFT SIDE */}
        <div className="lg:col-span-2 space-y-8">

          <div className="bg-[#12061f] p-6 rounded-xl">
            <h2 className="text-xl font-semibold mb-2">Account</h2>
            <p className="text-sm text-gray-400">
              Logged in as <b>{user?.email}</b>
            </p>
          </div>

          {/* BILLING DETAILS */}
          <div className="bg-[#12061f] p-6 rounded-xl">
            <h2 className="text-xl font-semibold mb-6">Billing Details</h2>

            <div className="grid grid-cols-2 gap-4">
              <input name="first_name" placeholder="First Name *"
                className="p-3 rounded bg-[#0e061a]" onChange={handleChange} />

              <input name="last_name" placeholder="Last Name *"
                className="p-3 rounded bg-[#0e061a]" onChange={handleChange} />
            </div>

            <input name="email" placeholder="Email *"
              className="p-3 rounded bg-[#0e061a] w-full mt-4"
              onChange={handleChange} />

            <input name="phone" placeholder="Phone with country code *"
              className="p-3 rounded bg-[#0e061a] w-full mt-4"
              onChange={handleChange} />

            <textarea name="address" placeholder="Billing Address *"
              className="w-full p-3 rounded bg-[#0e061a] mt-4"
              onChange={handleChange} />

            <div className="grid grid-cols-2 gap-4 mt-4">
              <input name="city" placeholder="City *"
                className="p-3 rounded bg-[#0e061a]" onChange={handleChange} />

              <input name="postal_code" placeholder="Postal Code *"
                className="p-3 rounded bg-[#0e061a]" onChange={handleChange} />
            </div>

            <input name="coupon" placeholder="Coupon Code (optional)"
              className="p-3 rounded bg-[#0e061a] w-full mt-4"
              onChange={handleChange} />
          </div>

          {/* PAYMENT */}
          <div className="bg-[#12061f] p-6 rounded-xl">
            <h2 className="text-xl font-semibold mb-4">Payment Method</h2>

            <label className="flex items-center gap-2 mb-2">
              <input
                type="radio"
                name="paymentMethod"
                value="razorpay"
                checked={form.paymentMethod === "razorpay"}
                onChange={handleChange}
              />
              UPI / Cards / Netbanking
            </label>

            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="paymentMethod"
                value="bank"
                onChange={handleChange}
              />
              Bank Transfer
            </label>

            <label className="flex items-center gap-2 mt-4 text-sm">
              <input
                type="checkbox"
                name="agreeTerms"
                onChange={handleChange}
              />
              I agree to Terms & Conditions
            </label>
          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="bg-[#12061f] p-6 rounded-xl h-fit">
          <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

          {cart.map((item) => (
            <div key={item.id} className="flex justify-between text-sm mb-2">
              <span>{item.title} × {item.qty}</span>
              <span>${item.price * item.qty}</span>
            </div>
          ))}

          <hr className="my-4 border-gray-700" />

          <div className="flex justify-between font-bold text-yellow-400">
            <span>Total</span>
            <span>${cartTotal}</span>
          </div>

          <button
            onClick={handleSubmit}
            className="w-full mt-6 py-3 rounded-lg
            bg-gradient-to-r from-yellow-400 to-orange-500
            text-black font-bold hover:scale-105 transition"
          >
            Pay Now →
          </button>
        </div>

      </div>
    </div>
  );
}
