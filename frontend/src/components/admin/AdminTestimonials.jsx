import { useEffect, useState } from "react";
import api from "../../api/axios";
import AdminNavbar from "./AdminNavbar";

export default function AdminTestimonials() {

  const [list, setList] = useState([]);
  const [form, setForm] = useState({
    name: "",
    country: "",
    flag: "",
    reward: "",
    role: ""
  });
  const [video, setVideo] = useState(null);

  const load = () => {
    api.get("/api/testimonials/")
      .then(res => setList(res.data));
  };

  useEffect(load, []);

  const submit = async () => {
    const fd = new FormData();

    Object.keys(form).forEach(k => fd.append(k, form[k]));
    fd.append("video", video);

    await api.post("/api/testimonials/", fd);
    alert("Added!");
    load();
  };

  const remove = async (id) => {
    if (!window.confirm("Delete this testimonial?")) return;

    await api.delete(`/api/testimonials/${id}`);
    load();
  };

  return (
    <>
      <AdminNavbar />

      <div className="p-10 text-white bg-[#0a0614] min-h-screen">

        <h1 className="text-3xl mb-8">Testimonials Manager</h1>

        {/* ADD FORM */}
        <div className="bg-[#1a1033] p-6 rounded-xl mb-10">
          <h2 className="text-xl mb-4">Add New</h2>

          {Object.keys(form).map(key => (
            <input
              key={key}
              placeholder={key}
              className="block w-full p-3 mb-3 bg-[#0f0b2a]"
              onChange={(e)=>setForm({...form,[key]:e.target.value})}
            />
          ))}

          <input
            type="file"
            accept="video/mp4"
            onChange={(e)=>setVideo(e.target.files[0])}
            className="mb-4"
          />

          <button
            onClick={submit}
            className="px-6 py-3 bg-yellow-500 text-black font-bold rounded"
          >
            Upload
          </button>
        </div>

        {/* LIST */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {list.map(t => (
            <div key={t.id} className="bg-[#1a1033] p-4 rounded-xl">
              <video
                src={`http://127.0.0.1:5000${t.video}`}
                controls
                className="w-full h-48 object-cover mb-3"
              />
              <h3 className="font-bold">{t.name}</h3>
              <p>{t.role}</p>

              <button
                onClick={()=>remove(t.id)}
                className="mt-3 px-4 py-2 bg-red-500 rounded"
              >
                Delete
              </button>
            </div>
          ))}
        </div>

      </div>
    </>
  );
}
