import { motion } from "framer-motion";
import { Instagram, Twitter, Youtube, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-black overflow-hidden">
      {/* subtle top divider glow */}
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-red-500/40 to-transparent" />

      {/* ambient glow */}
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-white/2 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 py-16 relative z-10">
        {/* main grid */}
        <div className="grid gap-12 md:grid-cols-4">
          {/* brand */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-4">
              AOH
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Crafted to conquer hunger. Anime energy meets
              street flavor.
            </p>

            {/* social */}
            <div className="flex gap-4 mt-6">
              <Social icon={<Instagram size={18} />} />
              <Social icon={<Twitter size={18} />} />
              <Social icon={<Youtube size={18} />} />
              <Social icon={<Mail size={18} />} />
            </div>
          </div>

          {/* quick links */}
          <FooterCol
            title="Quick Links"
            links={[
              "Home",
              "Menu",
              "Specials",
              "Reviews",
              "Contact",
            ]}
          />

          {/* legal */}
          <FooterCol
            title="Legal"
            links={[
              "Privacy Policy",
              "Terms of Service",
              "Refund Policy",
              "Shipping",
            ]}
          />

          {/* newsletter */}
          <div>
            <h4 className="text-white font-semibold mb-4">
              Stay in the Loop
            </h4>

            <p className="text-gray-400 text-sm mb-4">
              Get spicy drops and offers.
            </p>

            <div className="flex gap-2">
              <input
                placeholder="Your email"
                className="flex-1 rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm text-white placeholder-gray-500 outline-none focus:border-red-500/60 transition"
              />

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 rounded-lg bg-linear-to-r from-red-500 to-orange-500 text-white text-sm font-semibold"
              >
                Join
              </motion.button>
            </div>
          </div>
        </div>

        {/* bottom bar */}
        <div className="mt-14 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} AOH. All rights reserved.
          </p>

          <p className="text-gray-500 text-xs">
            Built with 🔥 for food warriors
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ---------- Social Icon ---------- */

function Social({ icon }: { icon: React.ReactNode }) {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 hover:text-white hover:border-white/20 transition cursor-pointer"
    >
      {icon}
    </motion.div>
  );
}

/* ---------- Footer Column ---------- */

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: string[];
}) {
  return (
    <div>
      <h4 className="text-white font-semibold mb-4">
        {title}
      </h4>

      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link}>
            <a
              href="#"
              className="text-gray-400 text-sm hover:text-white transition"
            >
              {link}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}