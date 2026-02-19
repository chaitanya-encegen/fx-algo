import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";
import { Eye, EyeOff, ChevronRight } from "lucide-react";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post("/auth/register", {
        email,
        password,
      });

      alert("Registered successfully. Please login.");
      navigate("/login");

    } catch (err) {
      if (err.response?.data?.error) {
        alert(err.response.data.error);
      } else {
        alert("Registration failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0614] px-4">

      <form
        onSubmit={handleSubmit}
        className="bg-[#12061f] p-8 rounded-xl w-full max-w-md text-white shadow-xl"
      >

        {/* ===== BREADCRUMB ===== */}
        <div className="flex items-center text-sm text-gray-400 mb-4">
          <Link
            to="/"
            className="hover:text-yellow-400 transition"
          >
            Home
          </Link>

          <ChevronRight size={16} className="mx-2" />

          <span className="text-white">Register</span>
        </div>

        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

        {/* EMAIL */}
        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 p-3 rounded bg-[#0e061a] focus:outline-none focus:ring-2 focus:ring-yellow-400"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {/* PASSWORD */}
        <div className="relative mb-6">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full p-3 pr-12 rounded bg-[#0e061a] focus:outline-none focus:ring-2 focus:ring-yellow-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {/* REGISTER BUTTON */}
        <button
          disabled={loading}
          className="w-full py-3 bg-yellow-400 text-black font-bold rounded hover:bg-yellow-500 transition"
        >
          {loading ? "Registering..." : "Register"}
        </button>

        {/* LOGIN NAVIGATION */}
        <div className="mt-6 text-center text-sm text-gray-400">
          Already registered?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-yellow-400 cursor-pointer hover:underline"
          >
            Go to Login
          </span>
        </div>

      </form>
    </div>
  );
}
