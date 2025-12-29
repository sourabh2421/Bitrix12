import { useState, useEffect } from 'react'
import Hero from './components/Hero'
import WhyBitrix12 from './components/WhyBitrix12'
import Signup from './components/Signup'
import Banner from './components/Banner'
import Question from './components/Question'
import Footer from './components/Footer'
import AuthPage from './components/inner/AuthPage'
import Dashboard from './components/inner/Dashboard'
import PrivacyPolicy from './components/PrivacyPolicy'
import TermsAndConditions from './components/TermsAndConditions'

function App() {
  const [showAuthPage, setShowAuthPage] = useState(false)
  const [currentPage, setCurrentPage] = useState('home') // 'home', 'privacy', 'terms'
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Check if user is already logged in
    return !!localStorage.getItem('token')
  })
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check localStorage for saved preference, default to light mode (false)
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('darkMode')
      const shouldBeDark = saved === 'true'
      // Apply immediately on initialization
      if (shouldBeDark) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
      return shouldBeDark
    }
    return false
  })

  // Apply dark mode class when state changes
  useEffect(() => {
    // Apply dark mode class based on current state
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    
    // Save to localStorage
    localStorage.setItem('darkMode', isDarkMode.toString())
  }, [isDarkMode])

  const toggleDarkMode = () => {
    setIsDarkMode(prev => {
      const newValue = !prev
      
      // Immediately update DOM for instant feedback
      if (newValue) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
      
      // Save to localStorage
      localStorage.setItem('darkMode', newValue.toString())
      
      return newValue
    })
  }

  const handleGetStarted = () => {
    setShowAuthPage(true)
  }

  const handleCloseAuth = () => {
    setShowAuthPage(false)
  }

  const handleLoginSuccess = (token, user) => {
    setIsAuthenticated(true)
    setShowAuthPage(false)
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setIsAuthenticated(false)
  }

  const handleNavigateToPrivacy = () => {
    setCurrentPage('privacy')
    // Scroll to top when navigating to privacy page
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleNavigateToTerms = () => {
    setCurrentPage('terms')
    // Scroll to top when navigating to terms page
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleBackToHome = () => {
    setCurrentPage('home')
    // Scroll to top when going back to home
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [currentPage])

  // Show Dashboard if authenticated
  if (isAuthenticated) {
    return (
      <>
        <Dashboard onLogout={handleLogout} isDarkMode={isDarkMode} onToggleDarkMode={toggleDarkMode} />
        {/* Dark Mode Toggle Button - Fixed Position */}
        <button
          type="button"
          onClick={toggleDarkMode}
          className="fixed bottom-6 right-6 z-[10000] bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group"
          aria-label="Toggle dark mode"
          title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {isDarkMode ? (
            // Sun icon for light mode
            <svg 
              className="w-6 h-6 text-yellow-500 group-hover:rotate-180 transition-transform duration-500" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          ) : (
            // Moon icon for dark mode
            <svg 
              className="w-6 h-6 text-gray-700 group-hover:rotate-[-15deg] transition-transform duration-300" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          )}
        </button>
      </>
    )
  }

  // Show Privacy Policy page
  if (currentPage === 'privacy') {
    return (
      <div className="w-full min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
        {/* Dark Mode Toggle Button - Fixed Position */}
        <button
          type="button"
          onClick={toggleDarkMode}
          className="fixed bottom-6 right-6 z-[10000] bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group"
          aria-label="Toggle dark mode"
          title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {isDarkMode ? (
            <svg 
              className="w-6 h-6 text-yellow-500 group-hover:rotate-180 transition-transform duration-500" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          ) : (
            <svg 
              className="w-6 h-6 text-gray-700 group-hover:rotate-[-15deg] transition-transform duration-300" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          )}
        </button>
        <PrivacyPolicy onBack={handleBackToHome} />
      </div>
    )
  }

  // Show Terms and Conditions page
  if (currentPage === 'terms') {
    return (
      <div className="w-full min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
        {/* Dark Mode Toggle Button - Fixed Position */}
        <button
          type="button"
          onClick={toggleDarkMode}
          className="fixed bottom-6 right-6 z-[10000] bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group"
          aria-label="Toggle dark mode"
          title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {isDarkMode ? (
            <svg 
              className="w-6 h-6 text-yellow-500 group-hover:rotate-180 transition-transform duration-500" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          ) : (
            <svg 
              className="w-6 h-6 text-gray-700 group-hover:rotate-[-15deg] transition-transform duration-300" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          )}
        </button>
        <TermsAndConditions onBack={handleBackToHome} />
      </div>
    )
  }

  // Show landing page if not authenticated
  return (
    <div className="w-full min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Dark Mode Toggle Button - Fixed Position */}
      <button
        type="button"
        onClick={toggleDarkMode}
        className="fixed bottom-6 right-6 z-[10000] bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group"
        aria-label="Toggle dark mode"
        title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        {isDarkMode ? (
          // Sun icon for light mode
          <svg 
            className="w-6 h-6 text-yellow-500 group-hover:rotate-180 transition-transform duration-500" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        ) : (
          // Moon icon for dark mode
          <svg 
            className="w-6 h-6 text-gray-700 group-hover:rotate-[-15deg] transition-transform duration-300" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        )}
      </button>

      <Hero onGetStarted={handleGetStarted} />
      <WhyBitrix12 onGetStarted={handleGetStarted} />
      <Banner />
      <Signup onLoginSuccess={handleLoginSuccess} />
      <Question />
      <Footer onPrivacyClick={handleNavigateToPrivacy} onTermsClick={handleNavigateToTerms} />
      {showAuthPage && <AuthPage onClose={handleCloseAuth} onLoginSuccess={handleLoginSuccess} />}
    </div>
  )
}

export default App
