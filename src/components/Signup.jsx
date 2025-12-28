import { useState } from 'react'

function Signup() {
  const [isLogin, setIsLogin] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (isLogin) {
      console.log('Login:', { email: formData.email, password: formData.password })
    } else {
      if (formData.password !== formData.confirmPassword) {
        alert('Passwords do not match!')
        return
      }
      console.log('Signup:', formData)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#E8F4F8] to-white py-20 px-8">
      <div className="max-w-md mx-auto">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[#4A90E2] mb-2">Bitrix12®</h1>
          <p className="text-gray-600">
            {isLogin ? 'Welcome back!' : 'Start organizing your tasks today'}
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10 border border-gray-100">
          {/* Toggle Buttons */}
          <div className="flex gap-4 mb-8 bg-[#F5F7FA] p-1 rounded-lg">
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-3 px-4 rounded-md font-semibold transition-all duration-300 ${
                !isLogin
                  ? 'bg-[#4A90E2] text-white shadow-md'
                  : 'text-gray-600 hover:text-[#4A90E2]'
              }`}
            >
              Sign Up
            </button>
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-3 px-4 rounded-md font-semibold transition-all duration-300 ${
                isLogin
                  ? 'bg-[#4A90E2] text-white shadow-md'
                  : 'text-gray-600 hover:text-[#4A90E2]'
              }`}
            >
              Login
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required={!isLogin}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A90E2] focus:border-transparent transition-all"
                  placeholder="Enter your full name"
                />
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A90E2] focus:border-transparent transition-all"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A90E2] focus:border-transparent transition-all"
                placeholder="Enter your password"
              />
            </div>

            {!isLogin && (
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700 mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required={!isLogin}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A90E2] focus:border-transparent transition-all"
                  placeholder="Confirm your password"
                />
              </div>
            )}

            {isLogin && (
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input type="checkbox" className="w-4 h-4 text-[#4A90E2] border-gray-300 rounded focus:ring-[#4A90E2]" />
                  <span className="ml-2 text-sm text-gray-600">Remember me</span>
                </label>
                <a href="#" className="text-sm text-[#4A90E2] hover:text-[#357ABD] font-semibold">
                  Forgot password?
                </a>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-[#4A90E2] text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-[#357ABD] transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              {isLogin ? 'Login' : 'Create Account'}
            </button>
          </form>

          {/* Divider */}
          <div className="my-8 flex items-center">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="px-4 text-sm text-gray-500">or</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          {/* Social Login */}
          <div className="space-y-3">
            <button className="w-full flex items-center justify-center gap-3 py-3 px-4 border-2 border-gray-300 rounded-lg hover:border-[#4A90E2] hover:bg-[#E8F4F8] transition-all duration-300">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <span className="font-semibold text-gray-700">
                Continue with Google
              </span>
            </button>
            <button className="w-full flex items-center justify-center gap-3 py-3 px-4 border-2 border-gray-300 rounded-lg hover:border-[#4A90E2] hover:bg-[#E8F4F8] transition-all duration-300">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              <span className="font-semibold text-gray-700">
                Continue with GitHub
              </span>
            </button>
          </div>

          {/* Footer */}
          <p className="mt-8 text-center text-sm text-gray-600">
            {isLogin ? (
              <>
                Don't have an account?{' '}
                <button
                  onClick={() => setIsLogin(false)}
                  className="text-[#4A90E2] hover:text-[#357ABD] font-semibold"
                >
                  Sign up
                </button>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <button
                  onClick={() => setIsLogin(true)}
                  className="text-[#4A90E2] hover:text-[#357ABD] font-semibold"
                >
                  Login
                </button>
              </>
            )}
          </p>
        </div>

        {/* Terms */}
        {!isLogin && (
          <p className="mt-6 text-center text-xs text-gray-500">
            By signing up, you agree to our{' '}
            <a href="#" className="text-[#4A90E2] hover:underline">Terms of Service</a>
            {' '}and{' '}
            <a href="#" className="text-[#4A90E2] hover:underline">Privacy Policy</a>
          </p>
        )}
      </div>
    </div>
  )
}

export default Signup

