import { useState } from 'react'
import Hero from './components/Hero'
import WhyBitrix12 from './components/WhyBitrix12'
import Signup from './components/Signup'
import Banner from './components/Banner'
import Question from './components/Question'
import Footer from './components/Footer'
import AuthPage from './components/inner/AuthPage'
import Dashboard from './components/inner/Dashboard'

function App() {
  const [showAuthPage, setShowAuthPage] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const handleGetStarted = () => {
    setShowAuthPage(true)
  }

  const handleCloseAuth = () => {
    setShowAuthPage(false)
  }

  const handleLoginSuccess = () => {
    setIsAuthenticated(true)
    setShowAuthPage(false)
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
  }

  // Show Dashboard if authenticated
  if (isAuthenticated) {
    return <Dashboard onLogout={handleLogout} />
  }

  // Show landing page if not authenticated
  return (
    <div className="w-full min-h-screen">
      <Hero onGetStarted={handleGetStarted} />
      <WhyBitrix12 onGetStarted={handleGetStarted} />
      <Banner />
      <Signup />
      <Question />
      <Footer />
      {showAuthPage && <AuthPage onClose={handleCloseAuth} onLoginSuccess={handleLoginSuccess} />}
    </div>
  )
}

export default App
