import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaShoppingCart } from "react-icons/fa";



export default function Hero() {
  const navigate = useNavigate();
  const { isLoggedIn, isAdmin, logout } = useAuth();

  return (
    <motion.section
      className="relative min-h-screen overflow-hidden bg-no-repeat bg-center bg-cover"
      style={{
        backgroundImage: "url('/bg2.jpg')",
        backgroundSize: "170%",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/20"></div>



      {/* ================= NAVBAR ================= */}
      <motion.div
        className="absolute top-0 left-0 w-full z-20 
        px-6 py-4 flex items-center justify-between text-white"
      >
        {/* LEFT: LOGO */}
        <div className="flex items-center gap-2">
          <img
            src="/logo.png"
            alt="logo"
            className="w-16 h-16 object-contain"
          />
          <span className="font-bold text-lg tracking-wide">
            FX ALGO
          </span>
        </div>

        {/* RIGHT: AUTH SECTION */}
        <div className="hidden md:flex items-center gap-6 text-lg font-medium">

          {!isLoggedIn && (
            <>
              <button
                onClick={() => navigate("/login")}
                className="hover:text-yellow-400 transition duration-300"
              >
                Login
              </button>

              <span className="text-white/60">/</span>

              <button
                onClick={() => navigate("/register")}
                className="hover:text-yellow-400 transition duration-300"
              >
                Register
              </button>

              <button
                onClick={() => navigate("/cart")}
                className="text-xl hover:text-yellow-400 transition duration-300"
              >
                <FaShoppingCart />
              </button>
            </>
          )}

          {isLoggedIn && !isAdmin && (
            <>
              <button
                onClick={() => navigate("/purchases")}
                className="hover:text-yellow-400 transition duration-300"
              >
                My Purchases
              </button>

              <button
                onClick={() => navigate("/cart")}
                className="text-xl hover:text-yellow-400 transition duration-300"
              >
                <FaShoppingCart />
              </button>

              <button
                onClick={() => {
                  logout();
                  navigate("/");
                }}
                className="hover:text-red-400 transition duration-300"
              >
                Logout
              </button>
            </>
          )}

          {isLoggedIn && isAdmin && (
            <>
              <button
                onClick={() => navigate("/admin/dashboard")}
                className="hover:text-purple-400 transition duration-300"
              >
                Admin Panel
              </button>

              <button
                onClick={() => {
                  logout();
                  navigate("/");
                }}
                className="hover:text-red-400 transition duration-300"
              >
                Logout
              </button>
            </>
          )}
        </div>

        {/* MOBILE MENU */}
        <div className="md:hidden text-2xl cursor-pointer">
          ☰
        </div>
      </motion.div>

      {/* ================= HERO CONTENT (FIXED LEFT ALIGN) ================= */}
      <div className="relative z-10 min-h-screen flex items-start">

        {/* Push content away from left edge and below navbar */}
        <div className="w-full pl-6 md:pl-20 pt-32 md:pt-40">

          {/* Animated Glow */}
          <motion.div
            className="hidden md:block absolute right-[-120px] top-1/2 
            w-[520px] h-[520px] bg-cyan-400/40 blur-[220px] rounded-full"
            animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 6, repeat: Infinity }}
          />

          <motion.div className="mb-4 inline-block px-4 py-1 rounded-full bg-white/10 backdrop-blur text-white text-sm border border-white/20 shadow-[0_0_25px_rgba(255,255,255,0.25)]">
            Since – 2017
          </motion.div>

          <motion.h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight text-left">
            <span className="block bg-gradient-to-r from-orange-400 to-yellow-300 bg-clip-text text-transparent">
              The Future of forex
            </span>

            <span className="block bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
              Trading Automation
            </span>
          </motion.h1>

          {/* Animated Line */}
          <div className="mt-6 mb-4 w-72 md:w-[420px] h-[4px] bg-yellow-400/30 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-yellow-400 rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: ["0%", "100%"] }}
              transition={{
                duration: 1.4,
                ease: "easeInOut",
                repeat: Infinity,
                repeatDelay: 1.5,
              }}
            />
          </div>

          <motion.p className="text-white text-base md:text-lg max-w-xl text-left">
            Design For Consistency, Not Promises
          </motion.p>

        </div>
      </div>
    </motion.section>
  );
}
