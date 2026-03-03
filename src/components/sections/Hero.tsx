import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { Silk } from "@/components/animations/Silk"; // ✅ FIXED CASE

export default function Hero() {
  return (
<section id="home" className="relative isolate min-h-screen pt-32 text-white overflow-hidden flex items-center justify-center">
      
      {/* ===== REAL Silk Background ===== */}
      <div className="absolute inset-0 -z-10">
       <Silk
  speed={2.2}
  color="#a1121f"
/>
      </div>
      {/* ===== glass light sweep ===== */}
<motion.div
  aria-hidden
  initial={{ x: "-120%" }}
  animate={{ x: "120%" }}
  transition={{
    duration: 6,
    repeat: Infinity,
    ease: "easeInOut",
    repeatDelay: 2,
  }}
  className="pointer-events-none absolute inset-y-0 left-0 w-[40%]
             bg-linear-to-r from-transparent via-white/12 to-transparent
             blur-2xl"
/>

      {/* ===== cinematic readability overlay ===== */}
      <div className="pointer-events-none absolute inset-0 bg-black/20" />

      {/* ===== Content ===== */}
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center px-6"
      >
        {/* badge */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="uppercase tracking-[0.3em] text-sm text-gray-200 mb-4"
        >
          Premium Street Food
        </motion.p>

        {/* title */}
        <motion.h1
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="font-display text-6xl md:text-8xl leading-none"
        >
          ATTACK ON
          <br />
          <span className="text-[#f3e7c9]">HUNGER</span>
        </motion.h1>

        {/* subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-6 text-lg text-gray-200 max-w-xl mx-auto"
        >
          Crafted to conquer hunger ⚔️
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-10"
        >
          <Button
            size="lg"
            onClick={() =>
              document
                .getElementById("menu")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="bg-[#f3e7c9] text-black hover:bg-white rounded-2xl px-8 py-6 text-lg"
          >
            View Menu
          </Button>
        </motion.div>
      </motion.div>

      {/* scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <ArrowDown className="animate-bounce opacity-70" />
      </motion.div>
    </section>
  );
}