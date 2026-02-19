import AdminNavbar from "./AdminNavbar";
import { Link } from "react-router-dom";

/* ===== STAT CARD ===== */
function StatCard({ title, value }) {
  return (
    <div className="bg-[#1a1033] p-6 rounded-xl text-center shadow-md">
      <p className="text-gray-400 text-sm">{title}</p>
      <h2 className="text-2xl font-bold mt-2">{value}</h2>
    </div>
  );
}

/* ===== ACTION CARD (IMPORTANT FIX) ===== */
/* Using Link instead of <a> to prevent logout */
function ActionCard({ title, link }) {
  return (
    <Link
      to={link}
      className="
        bg-gradient-to-r from-purple-700 to-indigo-700
        p-6 rounded-xl text-center font-bold
        hover:scale-105 transition block
      "
    >
      {title}
    </Link>
  );
}

export default function AdminDashboard() {
  return (
    <>
      <AdminNavbar />

      <div className="p-10 text-white bg-[#0a0614] min-h-screen">

        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

        {/* ===== STATS (Static for now) ===== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Total Products" value="—" />
          <StatCard title="Orders" value="—" />
          <StatCard title="Revenue" value="—" />
          <StatCard title="Users" value="—" />
        </div>

        {/* ===== ACTIONS ===== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 mt-12">

          <ActionCard title="➕ Manage Products" link="/admin/products" />

          <ActionCard title="📦 View Orders" link="/admin/orders" />
          <ActionCard title="⚙️ Website Settings" link="/admin/settings" />
          <ActionCard title="🎥 Testimonials" link="/admin/testimonials" />



         {/* Users management */}
<ActionCard title="👤 Users" link="/admin/users" />

         

        </div>

      </div>
    </>
  );
}
