import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { menuData } from "@/data/menu"
import { Silk } from "@/components/animations/Silk"

export default function Menu() {
  const ref = useRef<HTMLDivElement | null>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const yBg = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"])

  return (
    <section
      ref={ref}
      id="menu"
      className="relative py-20 md:py-24 text-white overflow-hidden"
    >
      {/* ===== SILK BACKGROUND PARALLAX ===== */}
      <motion.div style={{ y: yBg }} className="absolute inset-0 -z-10">
        <Silk speed={1.4} color="#7a0c14" />
      </motion.div>

      {/* seamless blend overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/25 -z-10" />

      {/* ===== FLOATING SPICE PARTICLES (LUXURY) ===== */}
      {[...Array(14)].map((_, i) => (
        <motion.span
          key={i}
          className="pointer-events-none absolute rounded-full bg-[#f3e7c9]/40 blur-sm"
          style={{
            width: 4 + (i % 3) * 2,
            height: 4 + (i % 3) * 2,
            left: `${(i * 7) % 100}%`,
            top: `${(i * 13) % 100}%`,
          }}
          animate={{
            y: [0, -30 - (i % 5) * 10, 0],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: 6 + (i % 5),
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.2,
          }}
        />
      ))}

      {/* ===== FLOATING CHARACTERS ===== */}
      <motion.img
        src="/src/assets/images/characters/goku.png"
        alt=""
        className="hidden md:block absolute left-6 top-32 w-28 z-10 pointer-events-none select-none opacity-90"
        animate={{ y: [0, -18, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.img
        src="/src/assets/images/characters/luffy.png"
        alt=""
        className="hidden md:block absolute right-10 top-40 w-32 z-10 pointer-events-none select-none opacity-90"
        animate={{ y: [0, -22, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* ===== TITLE ===== */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-gang text-5xl md:text-7xl text-[#f3e7c9]"
        >
          MENU
        </motion.h2>
      </div>

      {/* ===== GRID ===== */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10">
        {/* LEFT PANEL */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-black/40 backdrop-blur-xl text-white rounded-[28px] p-8 border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.6)] hover:scale-[1.02] transition-all duration-300"
        >
          <h3 className="font-gang text-3xl mb-6">SIDE QUEST</h3>

          <div className="space-y-6">
            {menuData.sides.map((item, i) => (
              <div key={i} className="border-b border-white/15 pb-4">
                <div className="flex justify-between gap-4">
                  <h4 className="font-semibold leading-snug">
                    {item.name}
                  </h4>
                  <span className="font-bold text-[#f3e7c9]">
                    {item.price}
                  </span>
                </div>
                <p className="text-sm text-gray-300 mt-1">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* RIGHT PANEL */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-black/40 backdrop-blur-xl text-white rounded-[28px] p-8 border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.6)] hover:scale-[1.02] transition-all duration-300"
        >
          <h3 className="font-gang text-3xl mb-6">
            THE CHICKEN COMBAT CORPS
          </h3>

          <div className="space-y-6">
            {menuData.mains.map((item, i) => (
              <div key={i} className="border-b border-white/15 pb-4">
                <div className="flex justify-between gap-4">
                  <h4 className="font-semibold leading-snug">
                    {item.name}
                  </h4>
                  <span className="font-bold text-[#f3e7c9]">
                    {item.price}
                  </span>
                </div>
                <p className="text-sm text-gray-300 mt-1">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}