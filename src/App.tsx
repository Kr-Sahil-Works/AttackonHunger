import Home from "@/components/pages/Home"
import SmoothScroll from "@/components/animations/SmoothScroll"
import WhatsAppFloat from "@/components/ui/WhatsAppFloat"
import ScrollToTop from "@/components/ui/ScrollToTop"


function App() {
  return (
    <SmoothScroll>
   
<Home />
<WhatsAppFloat />
<ScrollToTop />
    </SmoothScroll>
  )
}

export default App