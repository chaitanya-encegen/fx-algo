export default function SectionDivider() {
  return (
    <div className="w-full h-20 relative overflow-hidden mt-16">

      {/* Base gradient */}
      <div className="absolute inset-0 
      bg-gradient-to-r from-purple-900 via-fuchsia-800 to-pink-600" />

      {/* diagonal highlight */}
      <div className="absolute right-0 top-0 h-full w-1/3 
      bg-gradient-to-r from-pink-500/80 to-red-500/80 
      skew-x-[-30deg] translate-x-20" />

      {/* dotted pattern */}
      <div className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px)",
          backgroundSize: "14px 14px",
        }}
      />
    </div>
  );
}
