import { useEffect, useState } from "react";
import AdminNavbar from "../components/admin/AdminNavbar";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:5000/api/orders", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setOrders(Array.isArray(data) ? data : []));
  }, []);

  return (
    <>
      <AdminNavbar />

      <div className="min-h-screen bg-[#0a0614] text-white px-10 py-10">
        <h1 className="text-3xl font-bold mb-8">Admin Orders</h1>

        <div className="overflow-x-auto">
          <table className="w-full border border-gray-700">
            <thead className="bg-[#12061f]">
              <tr>
                <th className="p-3 border">ID</th>
                <th className="p-3 border">User</th>
                <th className="p-3 border">Total</th>
                <th className="p-3 border">Status</th>
                <th className="p-3 border">Date</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((o) => (
                <tr key={o.id} className="text-center">
                  <td className="p-2 border">{o.id}</td>
                  <td className="p-2 border">{o.userId}</td>
                  <td className="p-2 border text-yellow-400">₹{o.total}</td>
                  <td className="p-2 border">
                    <span className="px-3 py-1 rounded bg-yellow-600">
                      {o.status}
                    </span>
                  </td>
                  <td className="p-2 border">{o.createdAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
