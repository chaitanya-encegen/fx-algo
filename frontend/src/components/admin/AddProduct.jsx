import { useState } from "react";

export default function AddProductForm({ onSubmit }) {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [oldPrice, setOldPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [description, setDescription] = useState("");
  const [mainImage, setMainImage] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const productData = {
      title,
      price,
      oldPrice,
      discount,
      description,
      mainImage,
      galleryImages,
    };

    // API call yahan kar sakte ho
    console.log("PRODUCT DATA 👉", productData);

    onSubmit && onSubmit(productData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#1a1033] rounded-2xl p-6 w-[340px] space-y-4"
    >
      <h2 className="text-lg font-semibold mb-2 text-white">
        Add Product
      </h2>

      {/* TITLE */}
      <input
        type="text"
        placeholder="Product title (e.g. FX KING KONG 4.1 EA)"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full bg-[#2a1a4a] p-3 rounded-lg text-sm outline-none text-white placeholder-white/50"
        required
      />

      {/* PRICE ROW */}
      <div className="flex gap-3">
        <input
          type="number"
          placeholder="Price $799"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-1/2 bg-[#2a1a4a] p-3 rounded-lg text-sm outline-none text-white placeholder-white/50"
          required
        />

        <input
          type="number"
          placeholder="Old Price $4100"
          value={oldPrice}
          onChange={(e) => setOldPrice(e.target.value)}
          className="w-1/2 bg-[#2a1a4a] p-3 rounded-lg text-sm outline-none text-white placeholder-white/50"
        />
      </div>

      {/* DISCOUNT */}
      <input
        type="number"
        placeholder="Discount % (optional)"
        value={discount}
        onChange={(e) => setDiscount(e.target.value)}
        className="w-full bg-[#2a1a4a] p-3 rounded-lg text-sm outline-none text-white placeholder-white/50"
      />

      {/* DESCRIPTION */}
      <textarea
        placeholder="Short description (features, usage, etc.)"
        rows={3}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full bg-[#2a1a4a] p-3 rounded-lg text-sm outline-none resize-none text-white placeholder-white/50"
        required
      />

      {/* MAIN IMAGE */}
      <div className="text-sm text-white/70">
        <p className="mb-1">Main Image</p>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setMainImage(e.target.files[0])}
          className="block w-full text-xs text-white"
          required
        />
      </div>

      {/* GALLERY IMAGES */}
      <div className="text-sm text-white/70">
        <p className="mb-1">Gallery Images</p>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => setGalleryImages([...e.target.files])}
          className="block w-full text-xs text-white"
        />
      </div>

      {/* SAVE BUTTON */}
      <button
        type="submit"
        className="w-full bg-yellow-400 text-black font-bold py-3 rounded-xl mt-2 hover:scale-[1.02] transition"
      >
        Save Product
      </button>
    </form>
  );
}
