import { motion } from "framer-motion";

const reviews = [
  {
    id: 1,
    name: "Paul",
    country: "USA",
    flag: "🇺🇸",
    reward: "$50.00",
    role: "Swing Trader",
    video: "/videos/video1.mp4",
  },
  {
    id: 2,
    name: "Maik",
    country: "USA",
    flag: "🇺🇸",
    reward: "$50.00",
    role: "Day Trader",
   video: "/videos/video2.mp4",
  },
  {
    id: 3,
    name: "Anna",
    country: "UK",
    flag: "🇬🇧",
    reward: "$80.00",
    role: "Forex Trader",
   video: "/videos/video3.mp4",
  },
  {
    id: 4,
    name: "Alex",
    country: "Canada",
    flag: "🇨🇦",
    reward: "$100.00",
    role: "Crypto Trader",
    video: "/videos/video4.mp4",
  },
];

export default function Testimonials() {
  return (
    <section className="relative bg-[#0a0614] text-white py-20 overflow-hidden">
{/* Title */}
<div className="text-center mb-12">
  <h3 className="text-lg font-semibold flex items-center justify-center gap-2">
    Excellent 

    {/* Stars */}
    <span className="flex items-center">
      {/* 4 Full Stars */}
      {[1, 2, 3, 4].map((star) => (
        <svg
          key={star}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="#facc15"
          className="w-5 h-5"
        >
          <path d="M12 .587l3.668 7.431 8.2 1.193-5.934 5.787 1.401 8.168L12 18.896l-7.335 3.87 1.401-8.168L.132 9.211l8.2-1.193z" />
        </svg>
      ))}

      {/* Half Star */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className="w-5 h-5"
      >
        <defs>
          <linearGradient id="halfGradient">
            <stop offset="50%" stopColor="#facc15" />
            <stop offset="50%" stopColor="#e5e7eb" />
          </linearGradient>
        </defs>
        <path
          fill="url(#halfGradient)"
          d="M12 .587l3.668 7.431 8.2 1.193-5.934 5.787 1.401 8.168L12 18.896l-7.335 3.87 1.401-8.168L.132 9.211l8.2-1.193z"
        />
      </svg>
    </span>

   | 1,000+ reviews on{" "}
    <span className="text-green-500 font-semibold">Trustpilot</span>
  </h3>
</div>


      {/* Slider */}
      <div className="overflow-hidden">
        <motion.div
          className="flex gap-6"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            duration: 35,
            ease: "linear",
          }}
        >
          {[...reviews, ...reviews].map((item, i) => (
            <VideoCard key={i} item={item} />
          ))}
        </motion.div>
      </div>

      {/* Bottom gradient line */}
      <div className="absolute bottom-0 left-0 w-full h-[4px] bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600" />
    </section>
  );
}

function VideoCard({ item }) {
  return (
    <div className="min-w-[320px] bg-[#0f0b2a] rounded-2xl overflow-hidden shadow-lg border border-white/10">

      {/* Video */}
      <video
        src={item.video}
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-56 object-cover"
      />

      {/* Info */}
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <span>{item.flag}</span>
          <span className="font-semibold">{item.name}</span>
        </div>

        <p className="text-sm text-white/70">
          Rewards earned <span className="text-white">{item.reward}</span>
        </p>

        <p className="text-sm font-medium">{item.role}</p>
      </div>
    </div>
  );
}
