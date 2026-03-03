import { motion, useScroll } from "framer-motion"
import { useEffect, useState } from "react"
import { MessageCircle } from "lucide-react"

export default function WhatsAppFloat() {
  const { scrollY } = useScroll()
  const [visible, setVisible] = useState(false)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    return scrollY.on("change", (y) => {
      setVisible(y > 200)
    })
  }, [scrollY])

  // ✅ 👉 ADD YOUR WHATSAPP NUMBER BELOW (with country code, no + or spaces)
  const phoneNumber = "8670764082"

  const handleClick = () => {
    window.open(`https://wa.me/${phoneNumber}`, "_blank")
  }

  return (
    <motion.button
      onClick={handleClick}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{
        opacity: visible ? 1 : 0,
        scale: visible ? 1 : 0.85,
        y: visible ? 0 : 20,
      }}
      whileHover={{
        scale: 1.08,
        rotate: -4,
      }}
      whileTap={{
        scale: 0.92,
        rotate: 0,
      }}
      transition={{ duration: 0.22 }}
      className="fixed bottom-24 right-6 z-60 group"
      aria-label="Chat on WhatsApp"
    >
      {/* ===== TOOLTIP ===== */}
      <motion.div
        initial={{ opacity: 0, x: 10 }}
        animate={{
          opacity: hovered ? 1 : 0,
          x: hovered ? 0 : 10,
        }}
        transition={{ duration: 0.18 }}
        className="pointer-events-none absolute right-14 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-lg bg-black/80 backdrop-blur-md px-3 py-1.5 text-xs text-white border border-white/10"
      >
        Chat with us
      </motion.div>

      {/* ===== BUTTON ===== */}
      <span className="relative flex items-center justify-center w-12 h-12 rounded-full bg-black/55 backdrop-blur-xl border border-white/15 text-white shadow-[0_10px_30px_rgba(0,0,0,0.45)] transition">
        <MessageCircle className="w-5 h-5 text-green-400" />
      </span>
    </motion.button>
  )
}