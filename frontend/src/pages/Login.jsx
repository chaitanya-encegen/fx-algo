import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";
import { Eye, EyeOff, ChevronRight } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async () => {
    setLoading(true);

    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      login({
        token: res.data.token,
        role: res.data.role,
      });

      if (res.data.role === "superadmin") {
        navigate("/admin/dashboard", { replace: true });
      } else {
        navigate("/", { replace: true });
      }

    } catch (err) {
      console.error("Login error:", err);
      alert("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0614] text-white px-4">

      <div className="bg-[#12061f] p-8 rounded-xl w-full max-w-md shadow-xl">

        {/* ===== BREADCRUMB ===== */}
        <div className="flex items-center text-sm text-gray-400 mb-4">
          <Link
            to="/"
            className="hover:text-yellow-400 transition"
          >
            Home
          </Link>

          <ChevronRight size={16} className="mx-2" />

          <span className="text-white">Login</span>
        </div>

        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>

        {/* EMAIL */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 p-3 rounded bg-[#0e061a] focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />

        {/* PASSWORD */}
        <div className="relative mb-6">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 pr-12 rounded bg-[#0e061a] focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {/* LOGIN BUTTON */}
        <button
          type="button"
          onClick={handleLogin}
          disabled={loading}
          className="w-full py-3 bg-yellow-400 text-black font-bold rounded hover:bg-yellow-500 transition"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* REGISTER NAVIGATION */}
        <div className="mt-6 text-center text-sm text-gray-400">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-yellow-400 cursor-pointer hover:underline"
          >
            Register
          </span>
        </div>

      </div>
    </div>
  );
}
