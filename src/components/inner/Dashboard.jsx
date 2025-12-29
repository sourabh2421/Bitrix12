import { useState, useEffect } from 'react'
import API_BASE_URL from '../../config/api.js'

function Dashboard({ onLogout, isDarkMode, onToggleDarkMode }) {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [showTaskModal, setShowTaskModal] = useState(false)
  const [showSettingsModal, setShowSettingsModal] = useState(false)
  const [activeTab, setActiveTab] = useState('profile') // 'profile', 'password', 'account'
  const [user, setUser] = useState(null)
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    status: 'pending'
  })
  const [profileData, setProfileData] = useState({
    name: '',
    email: ''
  })
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
  const [settingsLoading, setSettingsLoading] = useState(false)
  const [alarms, setAlarms] = useState([])
  const [showAlarmModal, setShowAlarmModal] = useState(false)
  const [newAlarm, setNewAlarm] = useState({
    title: '',
    time: ''
  })
  const [triggeredAlarms, setTriggeredAlarms] = useState(new Set()) // Track triggered alarms

  const getAuthToken = () => {
    return localStorage.getItem('token')
  }

  // Request notification permission on mount
  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission()
    }
  }, [])

  // Sync dark mode with document root (only if prop is provided)
  useEffect(() => {
    if (isDarkMode !== undefined && isDarkMode !== null) {
      if (isDarkMode) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    }
  }, [isDarkMode])

  // Create MacBook-style alarm sound using Web Audio API
  const playAlarmSound = () => {
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)()
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)

      // MacBook alarm sound: alternating high and low tones
      oscillator.type = 'sine'
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime)
      oscillator.frequency.setValueAtTime(1000, audioContext.currentTime + 0.1)
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime + 0.2)
      oscillator.frequency.setValueAtTime(1000, audioContext.currentTime + 0.3)
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime + 0.4)
      oscillator.frequency.setValueAtTime(1000, audioContext.currentTime + 0.5)

      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.6)

      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + 0.6)

      // Play multiple times for a longer alarm
      setTimeout(() => {
        const oscillator2 = audioContext.createOscillator()
        const gainNode2 = audioContext.createGain()

        oscillator2.connect(gainNode2)
        gainNode2.connect(audioContext.destination)

        oscillator2.type = 'sine'
        oscillator2.frequency.setValueAtTime(800, audioContext.currentTime)
        oscillator2.frequency.setValueAtTime(1000, audioContext.currentTime + 0.1)
        oscillator2.frequency.setValueAtTime(800, audioContext.currentTime + 0.2)
        oscillator2.frequency.setValueAtTime(1000, audioContext.currentTime + 0.3)

        gainNode2.gain.setValueAtTime(0.3, audioContext.currentTime)
        gainNode2.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.4)

        oscillator2.start(audioContext.currentTime)
        oscillator2.stop(audioContext.currentTime + 0.4)
      }, 700)
    } catch (error) {
      console.error('Error playing alarm sound:', error)
      // Fallback: try using HTML5 Audio with a simple beep
      try {
        const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OSfTQ8MT6fj8LZjHAY4kdfyzHksBSR3x/DdkEAKFF606euoVRQKRp/g8r5sIQUrgc7y2Yk2CBtpvfDkn00PDE+n4/C2YxwGOJHX8sx5LAUkd8fw3ZBAC')
        audio.volume = 0.5
        audio.play().catch(() => {})
      } catch (e) {
        console.error('Fallback audio failed:', e)
      }
    }
  }

  // Check for alarms every second for precise timing
  useEffect(() => {
    const checkAlarms = () => {
      const now = new Date()
      alarms.forEach(alarm => {
        if (alarm.isActive && !triggeredAlarms.has(alarm._id)) {
          const alarmTime = new Date(alarm.time)
          const diff = alarmTime.getTime() - now.getTime()
          
          // Trigger notification when alarm time is reached (within 1 second)
          if (diff <= 1000 && diff >= -1000) {
            triggerAlarm(alarm)
            // Mark as triggered to prevent multiple notifications
            setTriggeredAlarms(prev => new Set([...prev, alarm._id]))
          }
        }
      })
    }

    const interval = setInterval(checkAlarms, 1000) // Check every second for precision
    checkAlarms() // Check immediately

    return () => clearInterval(interval)
  }, [alarms, triggeredAlarms])

  const triggerAlarm = (alarm) => {
    // Show browser notification
    if ('Notification' in window) {
      if (Notification.permission === 'granted') {
        const notification = new Notification(`⏰ Alarm: ${alarm.title}`, {
          body: `It's time for: ${alarm.title}`,
          icon: '/vite.svg',
          badge: '/vite.svg',
          tag: `alarm-${alarm._id}`,
          requireInteraction: true,
          sound: 'default'
        })

        notification.onclick = () => {
          window.focus()
          notification.close()
        }
      } else if (Notification.permission === 'default') {
        Notification.requestPermission().then(permission => {
          if (permission === 'granted') {
            const notification = new Notification(`⏰ Alarm: ${alarm.title}`, {
              body: `It's time for: ${alarm.title}`,
              icon: '/vite.svg',
              badge: '/vite.svg',
              tag: `alarm-${alarm._id}`,
              requireInteraction: true
            })
            notification.onclick = () => {
              window.focus()
              notification.close()
            }
          }
        })
      }
    }

    // Play MacBook-style alarm sound
    playAlarmSound()

    // Also show an alert as fallback
    if (document.hasFocus()) {
      alert(`⏰ ALARM: ${alarm.title}\n\nIt's time for: ${alarm.title}`)
    }
  }

  // Load tasks, alarms and user data from API on component mount
  useEffect(() => {
    fetchTasks()
    fetchUserProfile()
    fetchAlarms()
  }, [])

  const fetchAlarms = async () => {
    try {
      const token = getAuthToken()
      const response = await fetch(`${API_BASE_URL}/alarms`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        const data = await response.json()
        setAlarms(data)
        // Reset triggered alarms when fetching (in case of page refresh)
        setTriggeredAlarms(new Set())
      } else if (response.status === 401) {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        onLogout()
      }
    } catch (error) {
      console.error('Error fetching alarms:', error)
    }
  }

  const handleCreateAlarm = async (e) => {
    e.preventDefault()
    if (!newAlarm.title.trim() || !newAlarm.time) {
      alert('Please enter alarm title and time!')
      return
    }

    try {
      const token = getAuthToken()
      const response = await fetch(`${API_BASE_URL}/alarms`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          title: newAlarm.title,
          time: newAlarm.time
        })
      })

      if (response.ok) {
        const alarm = await response.json()
        setAlarms([...alarms, alarm])
        setNewAlarm({ title: '', time: '' })
        setShowAlarmModal(false)
        // Reset triggered alarms when new alarm is created
        setTriggeredAlarms(new Set())
      } else {
        const data = await response.json()
        alert(data.message || 'Failed to create alarm')
      }
    } catch (error) {
      console.error('Error creating alarm:', error)
      alert('Failed to create alarm. Please check if the server is running.')
    }
  }

  const handleToggleAlarm = async (alarmId) => {
    try {
      const token = getAuthToken()
      const response = await fetch(`${API_BASE_URL}/alarms/${alarmId}/toggle`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        const updatedAlarm = await response.json()
        setAlarms(alarms.map(alarm => 
          alarm._id === alarmId ? updatedAlarm : alarm
        ))
        // If alarm is disabled, remove from triggered list
        if (!updatedAlarm.isActive) {
          setTriggeredAlarms(prev => {
            const newSet = new Set(prev)
            newSet.delete(alarmId)
            return newSet
          })
        }
      } else {
        alert('Failed to toggle alarm')
      }
    } catch (error) {
      console.error('Error toggling alarm:', error)
      alert('Failed to toggle alarm. Please check if the server is running.')
    }
  }

  const handleDeleteAlarm = async (alarmId) => {
    if (!window.confirm('Are you sure you want to delete this alarm?')) {
      return
    }

    try {
      const token = getAuthToken()
      const response = await fetch(`${API_BASE_URL}/alarms/${alarmId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        setAlarms(alarms.filter(alarm => alarm._id !== alarmId))
        // Remove from triggered list when deleted
        setTriggeredAlarms(prev => {
          const newSet = new Set(prev)
          newSet.delete(alarmId)
          return newSet
        })
      } else {
        alert('Failed to delete alarm')
      }
    } catch (error) {
      console.error('Error deleting alarm:', error)
      alert('Failed to delete alarm. Please check if the server is running.')
    }
  }

  const fetchUserProfile = async () => {
    try {
      const token = getAuthToken()
      const response = await fetch(`${API_BASE_URL}/auth/me`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        const data = await response.json()
        setUser(data.user)
        setProfileData({
          name: data.user.name || '',
          email: data.user.email || ''
        })
      }
    } catch (error) {
      console.error('Error fetching user profile:', error)
    }
  }

  const fetchTasks = async () => {
    try {
      setLoading(true)
      const token = getAuthToken()
      const response = await fetch(`${API_BASE_URL}/tasks`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        const data = await response.json()
        setTasks(data)
      } else if (response.status === 401) {
        // Token expired or invalid
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        onLogout()
      }
    } catch (error) {
      console.error('Error fetching tasks:', error)
      alert('Failed to load tasks. Please check if the server is running.')
    } finally {
      setLoading(false)
    }
  }

  const handleCreateTask = async (e) => {
    e.preventDefault()
    if (newTask.title.trim() === '') {
      alert('Please enter a task title!')
      return
    }

    try {
      const token = getAuthToken()
      const response = await fetch(`${API_BASE_URL}/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          title: newTask.title,
          description: newTask.description,
          status: 'pending'
        })
      })

      if (response.ok) {
        const task = await response.json()
        setTasks([task, ...tasks])
        setNewTask({ title: '', description: '', status: 'pending' })
        setShowTaskModal(false)
      } else {
        alert('Failed to create task')
      }
    } catch (error) {
      console.error('Error creating task:', error)
      alert('Failed to create task. Please check if the server is running.')
    }
  }

  const handleToggleStatus = async (taskId) => {
    try {
      const token = getAuthToken()
      const response = await fetch(`${API_BASE_URL}/tasks/${taskId}/toggle`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        const updatedTask = await response.json()
        setTasks(tasks.map(task => 
          task._id === taskId ? updatedTask : task
        ))
      } else {
        alert('Failed to update task status')
      }
    } catch (error) {
      console.error('Error toggling task:', error)
      alert('Failed to update task. Please check if the server is running.')
    }
  }

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm('Are you sure you want to delete this task?')) {
      return
    }

    try {
      const token = getAuthToken()
      const response = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        setTasks(tasks.filter(task => task._id !== taskId))
      } else {
        alert('Failed to delete task')
      }
    } catch (error) {
      console.error('Error deleting task:', error)
      alert('Failed to delete task. Please check if the server is running.')
    }
  }

  const handleUpdateProfile = async (e) => {
    e.preventDefault()
    setSettingsLoading(true)

    try {
      const token = getAuthToken()
      const response = await fetch(`${API_BASE_URL}/auth/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(profileData)
      })

      const data = await response.json()

      if (response.ok) {
        setUser(data.user)
        localStorage.setItem('user', JSON.stringify(data.user))
        alert('Profile updated successfully!')
        setShowSettingsModal(false)
      } else {
        alert(data.message || 'Failed to update profile')
      }
    } catch (error) {
      console.error('Error updating profile:', error)
      alert('Failed to update profile. Please check if the server is running.')
    } finally {
      setSettingsLoading(false)
    }
  }

  const handleChangePassword = async (e) => {
    e.preventDefault()
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('New passwords do not match!')
      return
    }

    if (passwordData.newPassword.length < 6) {
      alert('Password must be at least 6 characters long!')
      return
    }

    setSettingsLoading(true)

    try {
      const token = getAuthToken()
      const response = await fetch(`${API_BASE_URL}/auth/change-password`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword
        })
      })

      const data = await response.json()

      if (response.ok) {
        alert('Password changed successfully!')
        setPasswordData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        })
        setActiveTab('profile')
      } else {
        alert(data.message || 'Failed to change password')
      }
    } catch (error) {
      console.error('Error changing password:', error)
      alert('Failed to change password. Please check if the server is running.')
    } finally {
      setSettingsLoading(false)
    }
  }

  const handleDeleteAccount = async () => {
    if (!window.confirm('Are you sure you want to delete your account? This action cannot be undone and all your tasks will be deleted.')) {
      return
    }

    if (!window.confirm('This will permanently delete your account and all your data. Type DELETE to confirm.')) {
      return
    }

    setSettingsLoading(true)

    try {
      const token = getAuthToken()
      const response = await fetch(`${API_BASE_URL}/auth/account`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        alert('Account deleted successfully')
        onLogout()
      } else {
        const data = await response.json()
        alert(data.message || 'Failed to delete account')
      }
    } catch (error) {
      console.error('Error deleting account:', error)
      alert('Failed to delete account. Please check if the server is running.')
    } finally {
      setSettingsLoading(false)
    }
  }

  const pendingTasks = tasks.filter(task => task.status === 'pending')
  const completedTasks = tasks.filter(task => task.status === 'completed')

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#E8F4F8] to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-[#4A90E2] dark:text-blue-400">Bitrix12®</h1>
              <span className="text-sm text-gray-500 dark:text-gray-400">Dashboard</span>
            </div>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setShowSettingsModal(true)}
                className="text-gray-600 dark:text-gray-300 hover:text-[#4A90E2] dark:hover:text-blue-400 transition-colors"
              >
                Settings
              </button>
              <button 
                onClick={() => {
                  localStorage.removeItem('token')
                  localStorage.removeItem('user')
                  onLogout()
                }}
                className="bg-[#4A90E2] dark:bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-[#357ABD] dark:hover:bg-blue-700 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Welcome to Bitrix12</h2>
          <p className="text-gray-600 dark:text-gray-300">Manage your tasks and projects from here.</p>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-100 dark:border-gray-700 transition-colors duration-300">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Total Tasks</h3>
            <p className="text-3xl font-bold text-[#4A90E2] dark:text-blue-400">{tasks.length}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{tasks.length === 0 ? 'No tasks yet' : `${tasks.length} task${tasks.length !== 1 ? 's' : ''}`}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-100 dark:border-gray-700 transition-colors duration-300">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Pending</h3>
            <p className="text-3xl font-bold text-orange-500 dark:text-orange-400">{pendingTasks.length}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Active tasks</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-100 dark:border-gray-700 transition-colors duration-300">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Completed</h3>
            <p className="text-3xl font-bold text-green-500 dark:text-green-400">{completedTasks.length}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Finished tasks</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-100 dark:border-gray-700 transition-colors duration-300">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Active Alarms</h3>
            <p className="text-3xl font-bold text-purple-500 dark:text-purple-400">{alarms.filter(a => a.isActive).length}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Set alarms</p>
          </div>
        </div>

        {/* Alarms Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-100 dark:border-gray-700 mb-8 transition-colors duration-300">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Your Alarms</h3>
            <button 
              onClick={() => setShowAlarmModal(true)}
              className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              + New Alarm
            </button>
          </div>

          {alarms.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p className="text-lg mb-2">No alarms set</p>
              <p className="text-sm">Create an alarm to get notified at a specific time!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {alarms.map((alarm) => {
                const alarmTime = new Date(alarm.time)
                const now = new Date()
                const isPast = alarmTime < now
                
                return (
                  <div
                    key={alarm._id}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      alarm.isActive
                        ? isPast
                          ? 'bg-red-50 border-red-200'
                          : 'bg-purple-50 border-purple-200'
                        : 'bg-gray-50 border-gray-200 opacity-60'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className={`font-semibold text-gray-900 ${
                            !alarm.isActive ? 'line-through text-gray-500' : ''
                          }`}>
                            {alarm.title}
                          </h4>
                          <span className={`px-2 py-1 rounded text-xs font-semibold ${
                            alarm.isActive
                              ? isPast
                                ? 'bg-red-200 text-red-800'
                                : 'bg-purple-200 text-purple-800'
                              : 'bg-gray-200 text-gray-800'
                          }`}>
                            {alarm.isActive ? (isPast ? 'Past Due' : 'Active') : 'Inactive'}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {alarmTime.toLocaleString()}
                          </span>
                          {!isPast && alarm.isActive && (
                            <span className="text-xs text-gray-500">
                              {Math.floor((alarmTime - now) / (1000 * 60 * 60))}h {Math.floor(((alarmTime - now) % (1000 * 60 * 60)) / (1000 * 60))}m remaining
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        <button
                          onClick={() => handleToggleAlarm(alarm._id)}
                          className={`px-3 py-1.5 rounded text-sm font-semibold transition-colors ${
                            alarm.isActive
                              ? 'bg-gray-500 text-white hover:bg-gray-600'
                              : 'bg-purple-500 text-white hover:bg-purple-600'
                          }`}
                        >
                          {alarm.isActive ? 'Disable' : 'Enable'}
                        </button>
                        <button
                          onClick={() => handleDeleteAlarm(alarm._id)}
                          className="px-3 py-1.5 rounded text-sm font-semibold bg-red-500 text-white hover:bg-red-600 transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Task Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-100 dark:border-gray-700 transition-colors duration-300">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Your Tasks</h3>
            <div className="flex gap-3">
              <button 
                onClick={() => setShowAlarmModal(true)}
                className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Set Alarm
              </button>
              <button 
                onClick={() => setShowTaskModal(true)}
                className="bg-[#4A90E2] text-white px-4 py-2 rounded-lg hover:bg-[#357ABD] transition-colors"
              >
                + New Task
              </button>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-12 text-gray-500">
              <p>Loading tasks...</p>
            </div>
          ) : tasks.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p className="text-lg mb-2">No tasks yet</p>
              <p className="text-sm">Create your first task to get started!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {tasks.map((task) => (
                <div
                  key={task._id}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    task.status === 'completed'
                      ? 'bg-green-50 border-green-200'
                      : 'bg-orange-50 border-orange-200'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className={`font-semibold text-gray-900 mb-1 ${
                        task.status === 'completed' ? 'line-through text-gray-500' : ''
                      }`}>
                        {task.title}
                      </h4>
                      {task.description && (
                        <p className="text-sm text-gray-600 mb-2">{task.description}</p>
                      )}
                      <div className="flex items-center gap-3">
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${
                          task.status === 'completed'
                            ? 'bg-green-200 text-green-800'
                            : 'bg-orange-200 text-orange-800'
                        }`}>
                          {task.status === 'completed' ? 'Completed' : 'Pending'}
                        </span>
                        <span className="text-xs text-gray-500">
                          {new Date(task.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <button
                        onClick={() => handleToggleStatus(task._id)}
                        className={`px-3 py-1.5 rounded text-sm font-semibold transition-colors ${
                          task.status === 'completed'
                            ? 'bg-orange-500 text-white hover:bg-orange-600'
                            : 'bg-green-500 text-white hover:bg-green-600'
                        }`}
                      >
                        {task.status === 'completed' ? 'Mark Pending' : 'Mark Complete'}
                      </button>
                      <button
                        onClick={() => handleDeleteTask(task._id)}
                        className="px-3 py-1.5 rounded text-sm font-semibold bg-red-500 text-white hover:bg-red-600 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Create Task Modal */}
      {showTaskModal && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] flex items-center justify-center p-4"
          onClick={() => setShowTaskModal(false)}
        >
          <div 
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Create New Task</h3>
                <button
                  onClick={() => setShowTaskModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleCreateTask} className="space-y-4">
                <div>
                  <label htmlFor="taskTitle" className="block text-sm font-semibold text-gray-700 mb-2">
                    Task Title *
                  </label>
                  <input
                    type="text"
                    id="taskTitle"
                    value={newTask.title}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                    required
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A90E2] focus:border-transparent transition-all"
                    placeholder="Enter task title"
                  />
                </div>

                <div>
                  <label htmlFor="taskDescription" className="block text-sm font-semibold text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    id="taskDescription"
                    value={newTask.description}
                    onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                    rows="4"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A90E2] focus:border-transparent transition-all resize-none"
                    placeholder="Enter task description (optional)"
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowTaskModal(false)}
                    className="flex-1 px-4 py-2.5 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2.5 bg-[#4A90E2] text-white rounded-lg hover:bg-[#357ABD] transition-colors font-semibold"
                  >
                    Create Task
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Settings Modal */}
      {showSettingsModal && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setShowSettingsModal(false)}
        >
          <div 
            className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl relative my-8 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Settings</h3>
                <button
                  onClick={() => setShowSettingsModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Tabs */}
              <div className="flex gap-2 mb-6 bg-[#F5F7FA] p-1 rounded-lg">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-semibold transition-all ${
                    activeTab === 'profile'
                      ? 'bg-[#4A90E2] text-white shadow-md'
                      : 'text-gray-600 hover:text-[#4A90E2]'
                  }`}
                >
                  Profile
                </button>
                <button
                  onClick={() => setActiveTab('password')}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-semibold transition-all ${
                    activeTab === 'password'
                      ? 'bg-[#4A90E2] text-white shadow-md'
                      : 'text-gray-600 hover:text-[#4A90E2]'
                  }`}
                >
                  Password
                </button>
                <button
                  onClick={() => setActiveTab('account')}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-semibold transition-all ${
                    activeTab === 'account'
                      ? 'bg-[#4A90E2] text-white shadow-md'
                      : 'text-gray-600 hover:text-[#4A90E2]'
                  }`}
                >
                  Account
                </button>
              </div>

              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <form onSubmit={handleUpdateProfile} className="space-y-4">
                  <div>
                    <label htmlFor="profileName" className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="profileName"
                      value={profileData.name}
                      onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A90E2] focus:border-transparent transition-all"
                      placeholder="Enter your name"
                    />
                  </div>

                  <div>
                    <label htmlFor="profileEmail" className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="profileEmail"
                      value={profileData.email}
                      onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                      required
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A90E2] focus:border-transparent transition-all"
                      placeholder="Enter your email"
                    />
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowSettingsModal(false)}
                      className="flex-1 px-4 py-2.5 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={settingsLoading}
                      className="flex-1 px-4 py-2.5 bg-[#4A90E2] text-white rounded-lg hover:bg-[#357ABD] transition-colors font-semibold disabled:opacity-50"
                    >
                      {settingsLoading ? 'Saving...' : 'Save Changes'}
                    </button>
                  </div>
                </form>
              )}

              {/* Password Tab */}
              {activeTab === 'password' && (
                <form onSubmit={handleChangePassword} className="space-y-4">
                  <div>
                    <label htmlFor="currentPassword" className="block text-sm font-semibold text-gray-700 mb-2">
                      Current Password
                    </label>
                    <input
                      type="password"
                      id="currentPassword"
                      value={passwordData.currentPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                      required
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A90E2] focus:border-transparent transition-all"
                      placeholder="Enter current password"
                    />
                  </div>

                  <div>
                    <label htmlFor="newPassword" className="block text-sm font-semibold text-gray-700 mb-2">
                      New Password
                    </label>
                    <input
                      type="password"
                      id="newPassword"
                      value={passwordData.newPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                      required
                      minLength={6}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A90E2] focus:border-transparent transition-all"
                      placeholder="Enter new password (min 6 characters)"
                    />
                  </div>

                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700 mb-2">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      value={passwordData.confirmPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                      required
                      minLength={6}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A90E2] focus:border-transparent transition-all"
                      placeholder="Confirm new password"
                    />
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' })
                        setActiveTab('profile')
                      }}
                      className="flex-1 px-4 py-2.5 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={settingsLoading}
                      className="flex-1 px-4 py-2.5 bg-[#4A90E2] text-white rounded-lg hover:bg-[#357ABD] transition-colors font-semibold disabled:opacity-50"
                    >
                      {settingsLoading ? 'Changing...' : 'Change Password'}
                    </button>
                  </div>
                </form>
              )}

              {/* Account Tab */}
              {activeTab === 'account' && (
                <div className="space-y-6">
                  <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4">
                    <h4 className="font-semibold text-red-900 mb-2">Danger Zone</h4>
                    <p className="text-sm text-red-700 mb-4">
                      Once you delete your account, there is no going back. Please be certain.
                    </p>
                    <button
                      onClick={handleDeleteAccount}
                      disabled={settingsLoading}
                      className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors font-semibold disabled:opacity-50"
                    >
                      {settingsLoading ? 'Deleting...' : 'Delete My Account'}
                    </button>
                  </div>

                  <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-900 mb-2">Account Information</h4>
                    <div className="space-y-2 text-sm">
                      <p><span className="font-semibold">Email:</span> {user?.email || 'Loading...'}</p>
                      <p><span className="font-semibold">Name:</span> {user?.name || 'Not set'}</p>
                      <p><span className="font-semibold">User ID:</span> {user?.id || 'Loading...'}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Create Alarm Modal */}
      {showAlarmModal && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] flex items-center justify-center p-4"
          onClick={() => setShowAlarmModal(false)}
        >
          <div 
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Set New Alarm</h3>
                <button
                  onClick={() => setShowAlarmModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleCreateAlarm} className="space-y-4">
                <div>
                  <label htmlFor="alarmTitle" className="block text-sm font-semibold text-gray-700 mb-2">
                    Alarm Title *
                  </label>
                  <input
                    type="text"
                    id="alarmTitle"
                    value={newAlarm.title}
                    onChange={(e) => setNewAlarm({ ...newAlarm, title: e.target.value })}
                    required
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A90E2] focus:border-transparent transition-all"
                    placeholder="Enter alarm title (e.g., Meeting at 3 PM)"
                  />
                </div>

                <div>
                  <label htmlFor="alarmTime" className="block text-sm font-semibold text-gray-700 mb-2">
                    Alarm Time *
                  </label>
                  <input
                    type="datetime-local"
                    id="alarmTime"
                    value={newAlarm.time}
                    onChange={(e) => setNewAlarm({ ...newAlarm, time: e.target.value })}
                    required
                    min={new Date().toISOString().slice(0, 16)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A90E2] focus:border-transparent transition-all"
                  />
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-800">
                  <p className="font-semibold mb-1">📢 Notification Permission</p>
                  <p>Make sure to allow notifications in your browser for alarms to work.</p>
                  {Notification.permission !== 'granted' && (
                    <button
                      type="button"
                      onClick={async () => {
                        const permission = await Notification.requestPermission()
                        if (permission === 'granted') {
                          alert('Notifications enabled!')
                        }
                      }}
                      className="mt-2 text-blue-600 hover:text-blue-800 underline"
                    >
                      Enable Notifications
                    </button>
                  )}
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAlarmModal(false)}
                    className="flex-1 px-4 py-2.5 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2.5 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-semibold"
                  >
                    Set Alarm
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Dashboard
