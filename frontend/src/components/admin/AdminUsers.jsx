import { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";
import api from "../../api/axios";

export default function AdminUsers() {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    api.get("/admin/users").then(res => setUsers(res.data));
  }, []);

  return (
    <>
      <AdminNavbar />

      <div className="min-h-screen bg-[#0a0614] text-white p-10">
        <h1 className="text-3xl font-bold mb-8">Users</h1>

        <div className="space-y-4">
          {users.map(u => (
            <Link
              key={u.id}
              to={`/admin/users/${u.id}`}
              className="block bg-[#1a1033] p-5 rounded-xl hover:bg-[#23124a]"
            >
              <div className="flex justify-between">
                <span>{u.email}</span>
                <span>{u.orders} orders • ₹{u.spent}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
