import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";

export default function Navbar() {

  const [announcement, setAnnouncement] = useState("Loading...");

  useEffect(() => {
    api.get("/settings/announcement")
      .then(res => setAnnouncement(res.data.announcement))
      .catch(() => setAnnouncement("✨ Welcome to FX Algo"));
  }, []);

  return (
    <header className="w-full">

      {/* OFFER BAR */}
      <a
        href="#products"
        className="block h-10 bg-[#6b3f14] text-yellow-300 flex items-center justify-center text-sm font-medium
                   cursor-pointer hover:bg-[#7a4a1c] transition"
      >
        {announcement}
      </a>

      {/* WHITE BAR */}
      <div className="bg-white h-10 flex items-center justify-between px-10 border-b border-gray-200">

        {/* LEFT */}
        <Link
          to="/about"
          className="text-sm font-semibold px-1 py-2 rounded-full
                     hover:scale-105 hover:shadow-lg transition-all duration-300"
        >
          About Us
        </Link>

        {/* RIGHT: SOCIAL ICONS */}
        <div className="flex gap-4 items-center">
          <a href="https://www.facebook.com/share/1AYLJsFUxz/" target="_blank" rel="noopener noreferrer">
            <img src="/fb.png" alt="Facebook" className="w-8 h-8 cursor-pointer hover:scale-110 transition" />
          </a>

          <a href="https://www.instagram.com/fxalgo1?igsh=MThtczE5eDJmZ2Z0aA==" target="_blank" rel="noopener noreferrer">
            <img src="/insta.png" alt="Instagram" className="w-8 h-8 cursor-pointer hover:scale-110 transition" />
          </a>

          <a href="https://youtube.com/@fxalgo-g2o?si=TEMhTZ3b1fd0m_ZB" target="_blank" rel="noopener noreferrer">
            <img src="/yt.png" alt="YouTube" className="w-10 h-10 cursor-pointer hover:scale-110 transition" />
          </a>

          <a href="https://whatsapp.com/channel/0029VbAOm4b0gcfO8W7d7l2J" target="_blank" rel="noopener noreferrer">
            <img src="/whatsapp.png" alt="WhatsApp" className="w-8 h-8 cursor-pointer hover:scale-110 transition" />
          </a>
        </div>

      </div>
    </header>
  );
}
