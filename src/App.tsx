import { Nav } from "@/components/sections/nav"
import { Hero } from "@/components/sections/hero"
import { Bento } from "@/components/sections/bento"
import { Projects } from "@/components/sections/projects"
import { Contact } from "@/components/sections/contact"
import { Footer } from "@/components/sections/footer"

function App() {
  return (
    <div className="min-h-screen bg-bg text-ink">
      <Nav />
      <main>
        <Hero />
        <Bento />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
