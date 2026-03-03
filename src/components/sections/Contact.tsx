import { motion, useScroll, useTransform, useMotionValue } from "framer-motion"
import { useState, useRef } from "react"

export default function Contact() {
  const [focused, setFocused] = useState<string | null>(null)
  const sectionRef = useRef<HTMLDivElement>(null)

  // ===== scroll parallax =====
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const mapY = useTransform(scrollYProgress, [0, 1], [40, -40])

  // ===== 🧊 MAP TILT (Apple style) =====
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)

  const handleMapMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const width = rect.width
    const height = rect.height

    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    rotateX.set(((y - height / 2) / height) * -10)
    rotateY.set(((x - width / 2) / width) * 10)
  }

  const resetTilt = () => {
    rotateX.set(0)
    rotateY.set(0)
  }

  return (
    <section
      id="contact"
      ref={sectionRef}
    className="relative pt-16 pb-24 px-6 overflow-hidden text-white"
      onMouseMove={(e) => {
        const el = e.currentTarget
        const rect = el.getBoundingClientRect()
        el.style.setProperty("--spot-x", `${e.clientX - rect.left}px`)
        el.style.setProperty("--spot-y", `${e.clientY - rect.top}px`)
      }}
    >
      {/* ===== CURSOR SPOTLIGHT ===== */}
      <div className="pointer-events-none absolute inset-0 hidden md:block">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(600px circle at var(--spot-x,50%) var(--spot-y,50%), rgba(255,255,255,0.06), transparent 45%)",
          }}
        />
      </div>

      {/* ambient gradient */}
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-red-500/8 to-transparent" />

      {/* floating orb */}
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-10 top-20 w-40 h-40 rounded-full bg-red-500/20 blur-3xl pointer-events-none"
      />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* ===== TOP GRID ===== */}
        <div className="grid lg:grid-cols-2 gap-10 mb-20 items-center">
          {/* ===== LEFT ===== */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-3xl md:text-4xl font-bold text-[#f3e7c9]">
              Attack On Hunger 
            </h3>

            <p className="text-gray-300 leading-relaxed">
              We are not just serving food — we are launching flavor attacks.
              Our anime-inspired street food truck delivers crispy, fiery,
              and unforgettable bites across the city.
            </p>

            <p className="text-gray-400">
              📍 Bangalore • Evening Deployments  
              🚚 Follow the signal. Catch the truck.
            </p>
          </motion.div>

          {/* ===== RIGHT — PREMIUM TILT MAP ===== */}
          <motion.div
            style={{ y: mapY }}
            className="relative group cursor-pointer"
            onMouseMove={handleMapMove}
            onMouseLeave={resetTilt}
            onClick={() =>
              window.open(
                "https://maps.google.com/?q=Attack+on+Hunger+Bangalore",
                "_blank"
              )
            }
          >
            {/* red back glow */}
            <div className="absolute -inset-6 bg-red-600/20 blur-3xl rounded-3xl opacity-50 group-hover:opacity-70 transition duration-500" />

            {/* status badge */}
            <div className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur border border-red-500/40 text-xs text-red-300">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              AOH LOCATION
            </div>

            {/* glass frame with tilt */}
            <motion.div
              style={{
                rotateX,
                rotateY,
                transformPerspective: 1200,
              }}
              className="relative rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_30px_80px_rgba(0,0,0,0.6)] transition duration-500 group-hover:scale-[1.03]"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3889.0377076498808!2d77.6443649!3d12.905296900000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae15a8a6e4c679%3A0x428b1aea70b09bb3!2sAttack%20on%20hunger!5e0!3m2!1sen!2sin!4v1772517102855!5m2!1sen!2sin"
                className="w-full h-80 md:h-95 border-0 pointer-events-none"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </motion.div>
          </motion.div>
        </div>

        {/* ===== CONTACT FORM ===== */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative max-w-2xl mx-auto"
        >
          <div className="absolute -inset-px rounded-3xl opacity-40 bg-linear-to-r from-red-500/20 via-orange-500/10 to-red-500/20 blur-xl" />

          <div className="relative p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10">
            <form className="space-y-6">
              <Input label="Your Name" placeholder="Enter your name" id="name" focused={focused} setFocused={setFocused} />
              <Input label="Email Address" placeholder="you@domain.com" id="email" type="email" focused={focused} setFocused={setFocused} />

              <motion.button
                whileTap={{ scale: 0.96 }}
                whileHover={{ scale: 1.03 }}
                className="w-full py-3 rounded-xl font-semibold text-white bg-linear-to-r from-red-500 to-orange-500"
              >
                Send Signal ⚡
              </motion.button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

/* ---------- Input ---------- */

type InputProps = {
  label: string
  placeholder: string
  id: string
  type?: string
  focused: string | null
  setFocused: (v: string | null) => void
}

function Input({ label, placeholder, id, type = "text", focused, setFocused }: InputProps) {
  return (
    <div>
      <label className="block text-sm text-gray-300 mb-2">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        onFocus={() => setFocused(id)}
        onBlur={() => setFocused(null)}
        className={`w-full rounded-xl bg-white/5 border px-4 py-3 text-white placeholder-gray-500 outline-none transition-all duration-300 ${
          focused === id ? "border-red-500/60 bg-white/10" : "border-white/10"
        }`}
      />
    </div>
  )
}