import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function AddProductModal({ onClose, onAdded }) {
  const { authHeader } = useAuth();
  const [form, setForm] = useState({
    name: "",
    price: "",
    old_price: "",
    discount: "",
  });
  const [image, setImage] = useState(null);

  const submit = async () => {
    const fd = new FormData();
    Object.keys(form).forEach((k) => fd.append(k, form[k]));
    if (image) fd.append("image", image);

    const res = await fetch("http://127.0.0.1:5000/api/products", {
      method: "POST",
      headers: authHeader(),
      body: fd,
    });

    if (res.ok) {
      onAdded();
      onClose();
    } else {
      alert("Failed to add product");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-[#1a1033] p-6 rounded-xl w-96 space-y-3">
        <h3 className="text-xl font-bold">Add Product</h3>

        <input placeholder="Name" onChange={e => setForm({...form, name:e.target.value})}/>
        <input placeholder="Price" onChange={e => setForm({...form, price:e.target.value})}/>
        <input placeholder="Old Price" onChange={e => setForm({...form, old_price:e.target.value})}/>
        <input placeholder="Discount %" onChange={e => setForm({...form, discount:e.target.value})}/>
        <input type="file" onChange={e => setImage(e.target.files[0])}/>

        <div className="flex justify-end gap-3 pt-3">
          <button onClick={onClose}>Cancel</button>
          <button onClick={submit} className="bg-green-600 px-4 py-2 rounded">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
