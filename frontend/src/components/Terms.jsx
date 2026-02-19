export default function Terms() {
  return (
    <section className="bg-black border-t border-cyan-500/30">

      <div className="max-w-7xl mx-auto grid md:grid-cols-2">

        {/* LEFT SIDE - MAP */}
        <div className="w-full h-[450px]">
          <iframe
            title="map"
            src="https://www.google.com/maps?q=Pune,India&output=embed"
            className="w-full h-full"
            loading="lazy"
          ></iframe>
        </div>

        {/* RIGHT SIDE - CONTACT INFO */}
        <div className="bg-gradient-to-b from-[#0b0f19] to-black p-12 text-gray-300">

          {/* LOGO + TITLE */}
          <div className="flex items-center gap-4 mb-6">
            <img src="/logo.png" alt="logo" className="w-12 h-12" />
            <div>
              <h3 className="text-white text-xl font-semibold">FX ALGO</h3>
              <div className="w-16 h-1 bg-cyan-400 mt-2 rounded"></div>
            </div>
          </div>

          <p className="text-gray-400 text-sm leading-relaxed max-w-md mb-10">
            FX ALGO: Where innovative trading solutions meet expert guidance.
            We believe in quality trading tools.
          </p>

          {/* CONTACT SECTION */}
          <h4 className="text-white font-semibold mb-4">CONTACT US</h4>
          <div className="w-16 h-1 bg-cyan-400 mb-6 rounded"></div>

          <div className="space-y-6 text-sm">

            <div>
              <p className="text-gray-400">Email</p>
              <p className="text-white">hello@algotrading.com.au</p>
            </div>

            <div>
              <p className="text-gray-400">Call us</p>
              <p className="text-white">98454656515</p>
            </div>

            <div>
              <p className="text-gray-400">Text</p>
              <p className="text-white">98454656515</p>
            </div>

          </div>
        </div>

      </div>

      {/* BOTTOM STRIP */}
      <div className="bg-gradient-to-r from-purple-900 via-black to-cyan-900 text-gray-400 text-xs py-4 text-center border-t border-white/10">
        © 2026 Algo Trading &nbsp; | &nbsp;
        <span className="hover:text-white cursor-pointer">Terms and conditions</span>
        &nbsp; • &nbsp;
        <span className="hover:text-white cursor-pointer">Privacy policy</span>
      </div>

    </section>
  );
}
