import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function AdminNavbar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="bg-[#0f0720] text-white px-10 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">FX SQUID • Admin Panel</h1>

      <div className="flex gap-6">
        <NavLink to="/admin/dashboard">Dashboard</NavLink>
        <NavLink to="/admin/products">Products</NavLink>
        <NavLink to="/admin/orders">Orders</NavLink>

        <button
          onClick={handleLogout}
          className="bg-red-600 px-4 py-1 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
