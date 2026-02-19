import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import AdminNavbar from "./AdminNavbar";
import api from "../../api/axios";

export default function AdminUserDetail() {

  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    api.get(`/admin/users/${id}`).then(res => setUser(res.data));
  }, [id]);

  if (!user) return <div className="text-white p-10">Loading...</div>;

  return (
    <>
      <AdminNavbar />

      <div className="min-h-screen bg-[#0a0614] text-white p-10">
        <h1 className="text-2xl mb-6">{user.email}</h1>

        <h2 className="text-xl mb-3">Orders</h2>
        <div className="space-y-3">
          {user.orders.map(o => (
            <div key={o.order_id} className="bg-[#1a1033] p-4 rounded">
              {o.product} — ₹{o.amount} — {o.status}
            </div>
          ))}
        </div>

        <h2 className="text-xl mt-8 mb-3">Licenses</h2>
        <div className="space-y-3">
          {user.licenses.map((l, i) => (
            <div key={i} className="bg-[#1a1033] p-4 rounded">
              {l.product}  
              <br />
              <span className="text-green-400">{l.key}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
