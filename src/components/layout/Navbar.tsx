import { motion, useScroll, useMotionValueEvent } from "framer-motion"
import { useState } from "react"

const navItems = [
  { label: "Home", href: "#home" },
  { label: "Menu", href: "#menu" },
  { label: "Specials", href: "#specials" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#contact" },
]

export default function Navbar() {
  const { scrollY } = useScroll()

  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // ⭐ detect scroll direction
  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = scrollY.getPrevious() ?? 0

    // shrink trigger
    setScrolled(latest > 40)

    // hide on scroll down, show on scroll up
    if (latest > prev && latest > 120) {
      setHidden(true)
    } else {
      setHidden(false)
    }
  })

  return (
    <motion.header
      variants={{
        visible: { y: 0 },
        hidden: { y: -120 },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="fixed top-0 inset-x-0 z-50 pointer-events-none"
    >
      <motion.div
        animate={{
          paddingTop: scrolled ? "8px" : "16px",
        }}
        className="mx-auto max-w-7xl px-6"
      >
        <motion.div
          animate={{
            scale: scrolled ? 0.96 : 1,
            backgroundColor: scrolled
              ? "rgba(0,0,0,0.65)"
              : "rgba(0,0,0,0.45)",
          }}
          transition={{ type: "spring", stiffness: 200, damping: 22 }}
          className="relative rounded-2xl border border-white/10 backdrop-blur-xl pointer-events-auto"
        >
          {/* shine */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/30 to-transparent" />

          <div className="flex items-center justify-between px-6 py-4">
            {/* logo */}
            <motion.a
              href="#home"
              whileHover={{ scale: 1.05 }}
              className="text-xl md:text-2xl font-bold text-white tracking-wider cursor-pointer"
            >
              AOH
            </motion.a>

            {/* nav */}
            <nav className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <NavLink key={item.label} {...item} />
              ))}
            </nav>

            {/* CTA */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden md:block px-4 py-2 rounded-lg bg-linear-to-r from-red-500 to-orange-500 text-white text-sm font-semibold"
            >
              Order Now
            </motion.button>

            <div className="md:hidden text-white text-sm font-semibold">
              Menu
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.header>
  )
}

/* ---------- Nav Link ---------- */

function NavLink({ label, href }: { label: string; href: string }) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()

    const id = href.replace("#", "")
    const el = document.getElementById(id)

    if (!el) return

    el.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
  }

  return (
    <motion.a
      href={href}
      onClick={handleClick}
      whileHover={{ y: -2 }}
      className="group relative text-sm text-gray-300 hover:text-white transition"
    >
      {label}
      <span className="absolute left-0 -bottom-1 h-px w-0 bg-red-500 transition-all duration-300 group-hover:w-full" />
    </motion.a>
  )
}