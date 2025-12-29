import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Preloader from './components/Preloader'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import './App.css'

// Pages
import Home from './pages/Home'
import AboutUs from './pages/AboutUs'
import OurJourney from './pages/OurJourney'
import ProjectReachPortfolio from './pages/ProjectReachPortfolio'
import Leadership from './pages/Leadership'
import Technology from './pages/Technology'
import Resources from './pages/Resources'
import ExecutionProcess from './pages/ExecutionProcess'
import OurProjects from './pages/OurProjects'
import Career from './pages/Career'
import ContactUs from './pages/ContactUs'

function App() {
  const [isLoading, setIsLoading] = useState(true)

  const handleLoadingComplete = () => {
    setIsLoading(false)
  }

  return (
    <>
      {isLoading && <Preloader onLoadingComplete={handleLoadingComplete} />}

      <Router>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/our-journey" element={<OurJourney />} />
          <Route path="/project-reach-portfolio" element={<ProjectReachPortfolio />} />
          <Route path="/leadership" element={<Leadership />} />
          <Route path="/technology" element={<Technology />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/execution-process" element={<ExecutionProcess />} />
          <Route path="/our-projects" element={<OurProjects />} />
          <Route path="/career" element={<Career />} />
          <Route path="/contact-us" element={<ContactUs />} />
        </Routes>

        <Footer />
      </Router>
    </>
  )
}

export default App
