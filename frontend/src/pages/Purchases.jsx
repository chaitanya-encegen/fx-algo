import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Purchases() {

  const [licenses, setLicenses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadLicenses = async () => {
      try {
        const res = await api.get("/licenses/my");
        setLicenses(res.data);
      } catch (err) {
        console.log("Failed to load purchases");
      } finally {
        setLoading(false);
      }
    };

    loadLicenses();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0614] text-white p-10 text-center">
        Loading your purchases...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0614] text-white p-10">
      <h1 className="text-3xl font-bold mb-8">My Purchases</h1>

      {licenses.length === 0 ? (
        <p className="text-gray-400">You have not bought any bots yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-8">
          {licenses.map((license) => {

            const imageUrl = license.product?.image
              ? `${import.meta.env.VITE_API_URL || "http://127.0.0.1:5000"}${license.product.image}`
              : "/p1.png";

            const downloadUrl = license.product?.file_url
              ? `${import.meta.env.VITE_API_URL || "http://127.0.0.1:5000"}${license.product.file_url}`
              : null;

            return (
              <div
                key={license.license_key}
                className="bg-[#1a1033] p-6 rounded-xl space-y-4"
              >

                {/* PRODUCT INFO */}
                <div className="flex gap-5 items-center">
                  <img
                    src={imageUrl}
                    className="w-24 h-24 object-contain bg-[#0e061a] rounded-lg"
                  />

                  <div>
                    <h2 className="text-lg font-semibold">
                      {license.product?.title || "Unknown Product"}
                    </h2>

                    <p className={`text-sm mt-1 ${
                      license.status === "active"
                        ? "text-green-400"
                        : "text-red-400"
                    }`}>
                      Status: {license.status}
                    </p>
                  </div>
                </div>

                {/* LICENSE KEY */}
                <div className="bg-[#0e061a] p-4 rounded-lg">
                  <p className="text-sm text-gray-400">License Key</p>
                  <p className="font-mono text-green-400 break-all">
                    {license.license_key}
                  </p>
                </div>

                {/* DOWNLOAD */}
                {downloadUrl && (
                  <a
                    href={downloadUrl}
                    target="_blank"
                    className="block text-center py-3 rounded-lg
                    bg-gradient-to-r from-yellow-400 to-orange-500
                    text-black font-bold hover:scale-105 transition"
                  >
                    Download EA Bot
                  </a>
                )}

              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
