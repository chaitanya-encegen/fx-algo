import { NavLink } from "react-router-dom";

export default function HeroNav() {
  const linkStyle =
    "px-6 py-2 text-white/80 transition duration-300 hover:text-white";

  const activeStyle =
    "px-6 py-2 text-white font-semibold";

  return (
    <div className="absolute top-6 left-1/2 -translate-x-1/2 z-30">
      <div className="flex items-center gap-2 px-2 py-2 rounded-full 
      bg-[#0c2c44]/80 backdrop-blur-md border border-cyan-400/30 shadow-lg">

        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? activeStyle : linkStyle
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/products"
          className={({ isActive }) =>
            isActive ? activeStyle : linkStyle
          }
        >
          Shop
        </NavLink>

        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive ? activeStyle : linkStyle
          }
        >
          about us
        </NavLink>

      </div>
    </div>
  );
}
