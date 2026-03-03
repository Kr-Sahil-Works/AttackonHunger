import {
  motion,
  useScroll,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion"
import { useState } from "react"
import { Menu, X } from "lucide-react"

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
  const [mobileOpen, setMobileOpen] = useState(false)

  // ⭐ detect scroll direction
  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = scrollY.getPrevious() ?? 0

    setScrolled(latest > 40)

    if (latest > prev && latest > 120) {
      setHidden(true)
      setMobileOpen(false)
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

            {/* desktop nav */}
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

            {/* ===== MOBILE HAMBURGER ===== */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setMobileOpen((p) => !p)}
              className="md:hidden relative z-60 flex items-center justify-center w-10 h-10 rounded-xl bg-white/5 border border-white/10 backdrop-blur"
              aria-label="Toggle Menu"
            >
              <AnimatePresence mode="wait">
                {mobileOpen ? (
                  <motion.div
                    key="x"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-5 h-5 text-white" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-5 h-5 text-white" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>

          {/* ===== MOBILE DROPDOWN ===== */}
          <AnimatePresence>
            {mobileOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.98 }}
                transition={{ duration: 0.25 }}
                className="md:hidden absolute left-4 right-4 top-[calc(100%+10px)] rounded-2xl border border-white/10 bg-black/70 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.6)] overflow-hidden"
              >
                <div className="flex flex-col divide-y divide-white/10">
                  {navItems.map((item) => (
                    <MobileNavLink
                      key={item.label}
                      {...item}
                      onClick={() => setMobileOpen(false)}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </motion.header>
  )
}

/* ---------- Desktop Nav Link ---------- */

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

/* ---------- Mobile Nav Link ---------- */

function MobileNavLink({
  label,
  href,
  onClick,
}: {
  label: string
  href: string
  onClick: () => void
}) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()

    const id = href.replace("#", "")
    const el = document.getElementById(id)
    if (!el) return

    el.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })

    onClick()
  }

  return (
    <motion.a
      href={href}
      onClick={handleClick}
      whileTap={{ scale: 0.97 }}
      className="px-6 py-4 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition"
    >
      {label}
    </motion.a>
  )
}