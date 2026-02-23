import { useEffect, useState } from "react";
import AdminNavbar from "./AdminNavbar";
import api from "../../api/axios";

export default function AdminProducts() {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    title: "",
    price: "",
    old_price: "",
    discount: "",
    description: "",
    image: null,
    botFile: null,
  });

  /* ================= LOAD PRODUCTS ================= */

  const loadProducts = async () => {
    try {
      const res = await api.get("/products");
      setProducts(res.data);
    } catch (err) {
      console.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  /* ================= FORM INPUT ================= */

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  /* ================= ADD PRODUCT ================= */

  const handleSubmit = async () => {
    try {

      const fd = new FormData();

      fd.append("title", form.title);
      fd.append("price", form.price);
      fd.append("old_price", form.old_price || 0);
      fd.append("discount", form.discount || 0);
      fd.append("description", form.description || "");

      if (form.image) {
        fd.append("image", form.image);
      }

      if (form.botFile) {
        fd.append("file", form.botFile);
      }

      await api.post("/products", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("✅ Product added successfully");

      setForm({
        title: "",
        price: "",
        old_price: "",
        discount: "",
        description: "",
        image: null,
        botFile: null,
      });

      loadProducts();

    } catch (err) {
      console.log(err.response?.data);
      alert("❌ Failed to add product");
    }
  };

  /* ================= DELETE PRODUCT ================= */

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/products/${id}`);
      alert("🗑 Product deleted successfully");
      loadProducts();
    } catch (err) {
      console.error(err.response?.data);
      alert("❌ Failed to delete product");
    }
  };

  /* ================= UI ================= */

  return (
    <>
      <AdminNavbar />

      <div className="min-h-screen bg-[#0a0614] text-white px-10 py-10">
        <h1 className="text-3xl font-bold mb-8">Manage Products</h1>

        <div className="grid grid-cols-3 gap-8">

          {/* ========= ADD PRODUCT FORM ========= */}
          <div className="bg-[#1a1033] p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-bold mb-6 border-b border-white/10 pb-3">
              Add New Product
            </h2>

            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Product Title"
              className="w-full px-4 py-2 rounded bg-[#0e061a] mb-4"
            />

            <div className="grid grid-cols-2 gap-4 mb-4">
              <input
                name="price"
                value={form.price}
                onChange={handleChange}
                placeholder="Price"
                className="px-4 py-2 rounded bg-[#0e061a]"
              />

              <input
                name="old_price"
                value={form.old_price}
                onChange={handleChange}
                placeholder="Old Price"
                className="px-4 py-2 rounded bg-[#0e061a]"
              />
            </div>

            <input
              name="discount"
              value={form.discount}
              onChange={handleChange}
              placeholder="Discount %"
              className="w-full px-4 py-2 rounded bg-[#0e061a] mb-4"
            />

            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Product description..."
              className="w-full px-4 py-2 rounded bg-[#0e061a] h-24 resize-none mb-4"
            />

            <div className="mb-4">
              <label className="text-sm text-gray-300 block mb-1">
                Product Image
              </label>
              <input
                type="file"
                onChange={(e) =>
                  setForm({ ...form, image: e.target.files[0] })
                }
              />
            </div>

            <button
              onClick={handleSubmit}
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 rounded transition"
            >
              💾 Save Product
            </button>
          </div>

          {/* ========= PRODUCT LIST ========= */}
          <div className="col-span-2">
            {loading ? (
              <p className="text-gray-400">Loading products...</p>
            ) : products.length === 0 ? (
              <p className="text-gray-400">No products yet</p>
            ) : (
              <div className="grid grid-cols-2 gap-6">
                {products.map((p) => (
                  <div
                    key={p.id}
                    className="bg-[#1a1033] p-4 rounded-xl relative shadow-lg hover:scale-105 transition"
                  >
                    {/* DELETE BUTTON TOP RIGHT */}
                    <button
                      onClick={() => handleDelete(p.id)}
                      className="absolute top-3 right-3 bg-red-600 hover:bg-red-700 text-xs px-3 py-1 rounded"
                    >
                      Delete
                    </button>

                    <img
                      src={`${import.meta.env.VITE_API_URL || "http://127.0.0.1:5000"}${p.image}`}
                      alt={p.title}
                      className="h-40 mx-auto object-contain"
                    />

                    <h3 className="mt-3 font-semibold text-center">
                      {p.title}
                    </h3>

                    <div className="flex justify-center gap-2 mt-1 text-sm">
                      {p.old_price > 0 && (
                        <span className="line-through text-gray-500">
                          ${p.old_price}
                        </span>
                      )}
                      <span className="text-orange-400 font-bold">
                        ${p.price}
                      </span>
                    </div>

                    {p.discount > 0 && (
                      <p className="text-center text-xs text-green-400 mt-1">
                        {p.discount}% OFF
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </>
  );
}
