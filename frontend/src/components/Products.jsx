import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import api from "../api/axios";
import SectionDivider from "../components/SectionDivider";


export default function Products() {
  const [products, setProducts] = useState([]);

  const loadProducts = async () => {
    const res = await api.get("/products");
    setProducts(res.data);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <section className="px-10 py-14 bg-[#0a0614] text-white">
      
    <h2 className="text-4xl md:text-5xl text-center mb-12 golden-title">
  Our Top Rated Bots
</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
      
    </section>
    
  );
}
