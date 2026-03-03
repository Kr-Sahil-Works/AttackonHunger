import { motion, useScroll, useTransform } from "framer-motion"
import { specialsData } from "@/data/specials"
import { useRef } from "react"
import { Silk } from "@/components/animations/Silk"

export default function Specials() {
  const ref = useRef<HTMLDivElement>(null)

  // 🔥 scroll parallax
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const yFloat = useTransform(scrollYProgress, [0, 1], [60, -60])
  const yBg = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"])

  return (
    <section
    id="specials"
      ref={ref}
      className="relative py-20 md:py-24 overflow-hidden text-white"
    >
      {/* ===== SILK BACKGROUND ===== */}
      <motion.div style={{ y: yBg }} className="absolute inset-0 -z-10">
        <Silk speed={1.3} color="#7a0c14" />
      </motion.div>

      {/* seamless dark blend */}
      <div className="absolute inset-0 bg-linear-to-b from-black/28 via-black/18 to-black/38 -z-10" />

      {/* ===== FLOATING SPICE PARTICLES ===== */}
      {[...Array(10)].map((_, i) => (
        <motion.span
          key={i}
          className="pointer-events-none absolute rounded-full bg-[#f3e7c9]/40 blur-sm"
          style={{
            width: 4 + (i % 3) * 2,
            height: 4 + (i % 3) * 2,
            left: `${(i * 11) % 100}%`,
            top: `${(i * 17) % 100}%`,
          }}
          animate={{
            y: [0, -25 - (i % 4) * 10, 0],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: 6 + (i % 4),
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.25,
          }}
        />
      ))}

      {/* 🔥 FLOATING ANIME CHARACTER */}
      <motion.img
        src="/src/assets/images/characters/levi.png"
        alt=""
        style={{ y: yFloat }}
        className="hidden lg:block absolute right-6 top-10 w-40 z-10 pointer-events-none select-none opacity-95"
      />

      {/* ===== CONTENT ===== */}
      <div className="relative z-20 max-w-7xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-gang text-5xl md:text-7xl text-[#f3e7c9] mb-12"
        >
          LIMITED EDITION
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.4 }}
          className="bg-black/40 backdrop-blur-xl text-white rounded-[32px] p-10 border border-white/10 shadow-[0_30px_90px_rgba(0,0,0,0.65)]"
        >
          <h3 className="font-gang text-3xl mb-8">
            ANIME SPECIALS
          </h3>

          <div className="space-y-7">
            {specialsData.map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ x: 6 }}
                transition={{ duration: 0.25 }}
                className="border-b border-white/15 pb-5"
              >
                <div className="flex justify-between gap-4">
                  <h4 className="font-semibold leading-snug">
                    {item.name}
                  </h4>
                  <span className="font-bold text-[#f3e7c9]">
                    {item.price}
                  </span>
                </div>

                <p className="text-sm text-gray-300 mt-1 max-w-xl">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}