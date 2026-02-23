import { useEffect, useState } from "react";
import api from "../../api/axios";
import AdminNavbar from "./AdminNavbar";

export default function AdminSettings() {

  const [text, setText] = useState("");

  useEffect(() => {
    api.get("/settings/announcement")
      .then(res => setText(res.data.announcement))
      .catch(() => alert("Failed to load announcement"));
  }, []);

  const save = async () => {
    try {
      await api.put("/settings/announcement", {
        announcement: text
      });

      alert("Saved! Refresh homepage to see changes.");
    } catch (err) {
      alert("You are not authorized (admin login required)");
    }
  };

  return (
    <>
      <AdminNavbar />

      <div className="p-10 text-white bg-[#0a0614] min-h-screen">
        <h1 className="text-3xl font-bold mb-8">Website Settings</h1>

        <label className="block mb-3 text-gray-300">
          Announcement Bar Text
        </label>

        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full p-4 rounded bg-[#1a1033] border border-purple-600 mb-6"
        />

        <button
          onClick={save}
          className="px-8 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold rounded-lg"
        >
          Save Changes
        </button>
      </div>
    </>
  );
}
