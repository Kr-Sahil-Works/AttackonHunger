import { motion, useScroll } from "framer-motion"
import { useEffect, useState } from "react"
import { ArrowUp } from "lucide-react"

export default function ScrollToTop() {
  const { scrollY } = useScroll()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    return scrollY.on("change", (y) => {
      setVisible(y > 400)
    })
  }, [scrollY])

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <motion.button
      onClick={scrollTop}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: visible ? 1 : 0,
        scale: visible ? 1 : 0.8,
        y: visible ? 0 : 20,
      }}
      transition={{ duration: 0.25 }}
      className="fixed bottom-6 right-6 z-60 group"
      aria-label="Scroll to top"
    >
      {/* glow */}
      <span className="absolute inset-0 rounded-full bg-red-500/20 blur-md opacity-0 group-hover:opacity-100 transition duration-300" />

      {/* button */}
      <span className="relative flex items-center justify-center w-12 h-12 rounded-full bg-black/50 backdrop-blur-xl border border-white/15 text-white shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:border-white/30 transition">
        <ArrowUp className="w-5 h-5" />
      </span>
    </motion.button>
  )
}