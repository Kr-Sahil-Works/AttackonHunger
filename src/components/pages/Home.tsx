import Hero from "@/components/sections/Hero"
import Menu from "@/components/sections/Menu"
import Specials from "@/components/sections/Specials"
import Reviews from "@/components/sections/Reviews"
import Contact from "@/components/sections/Contact"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import Drinks from "../sections/Drinks"


export default function Home() {
  return (
   <main className="relative min-h-screen overflow-x-hidden">
      <Navbar />
      <Hero />
      <Menu />
      <Specials />
      <Drinks />
      <Reviews />
      <Contact />
      <Footer />
    </main>
  )
}