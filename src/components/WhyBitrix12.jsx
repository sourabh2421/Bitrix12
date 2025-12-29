function WhyBitrix12({ onGetStarted }) {
  const features = [
    {
      icon: "✓",
      title: "Free Forever",
      description: "No hidden costs, no credit card required. Get started with our free task checklist app and manage your team without breaking the bank."
    },
    {
      icon: "⚡",
      title: "Lightning Fast",
      description: "Organize tasks in seconds. Our intuitive interface lets you create, assign, and track tasks with minimal effort and maximum efficiency."
    },
    {
      icon: "👥",
      title: "Team Collaboration",
      description: "Work together seamlessly. Share tasks, assign responsibilities, and keep everyone in sync with real-time updates and notifications."
    },
    {
      icon: "📊",
      title: "Visual Kanban Boards",
      description: "See your workflow at a glance. Drag and drop tasks across columns to track progress from start to finish effortlessly."
    },
    {
      icon: "🔔",
      title: "Smart Notifications",
      description: "Never miss a deadline. Get timely reminders and updates about task assignments, due dates, and team activities."
    },
    {
      icon: "🔒",
      title: "Secure & Reliable",
      description: "Your data is safe with us. Enterprise-grade security ensures your tasks and team information remain protected at all times."
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#E8F4F8] dark:from-gray-800 dark:to-gray-900 py-20 px-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-black dark:text-white mb-6">
            Why Choose <span className="text-[#4A90E2] dark:text-blue-400">Bitrix12</span>?
          </h2>
          <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            The ultimate free task checklist app designed to help you and your team stay organized, productive, and in control.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#4A90E2] to-[#357ABD] dark:from-blue-500 dark:to-blue-600 flex items-center justify-center text-white text-3xl font-bold mb-6 shadow-[0_4px_20px_rgba(74,144,226,0.3)]">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Benefits Section */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 md:p-12 shadow-2xl border border-gray-100 dark:border-gray-700 transition-colors duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Everything You Need for <span className="text-[#4A90E2] dark:text-blue-400">Task Management</span>
              </h3>
              <ul className="space-y-4">
                {[
                  "Create unlimited tasks and subtasks",
                  "Assign tasks to team members with due dates",
                  "Track progress with visual Kanban boards",
                  "Set priorities and add detailed descriptions",
                  "Get real-time updates and notifications",
                  "Access from anywhere, on any device"
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-[#4A90E2] dark:text-blue-400 text-xl font-bold mt-1">✓</span>
                    <span className="text-gray-700 dark:text-gray-300 text-lg">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gradient-to-br from-[#E8F4F8] to-white dark:from-gray-700 dark:to-gray-800 rounded-2xl p-8 border-2 border-[#4A90E2]/20 dark:border-blue-500/20 transition-colors duration-300">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#4A90E2] dark:bg-blue-600 flex items-center justify-center text-white font-bold text-xl">
                    1
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white text-lg">Sign Up Free</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">Create your account in seconds</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#4A90E2] dark:bg-blue-600 flex items-center justify-center text-white font-bold text-xl">
                    2
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white text-lg">Create Your First Task</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">Start organizing immediately</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#4A90E2] dark:bg-blue-600 flex items-center justify-center text-white font-bold text-xl">
                    3
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white text-lg">Invite Your Team</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">Collaborate and get things done</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <p className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Ready to transform your task management?
          </p>
          <button 
            type="button"
            onClick={(e) => {
              e.preventDefault()
              if (onGetStarted) {
                onGetStarted()
              }
            }}
            className="bg-[#4A90E2] text-white border-none py-5 px-12 text-xl font-semibold rounded-lg cursor-pointer transition-all duration-300 hover:bg-[#357ABD] hover:shadow-[0_8px_30px_rgba(74,144,226,0.4)] transform hover:-translate-y-1"
          >
            Get Started Free
          </button>
        </div>
      </div>
    </div>
  )
}

export default WhyBitrix12

