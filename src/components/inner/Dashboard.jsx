function Dashboard({ onLogout }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#E8F4F8] to-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-[#4A90E2]">Bitrix12®</h1>
              <span className="text-sm text-gray-500">Dashboard</span>
            </div>
            <div className="flex items-center gap-4">
              <button className="text-gray-600 hover:text-[#4A90E2] transition-colors">
                Settings
              </button>
              <button 
                onClick={onLogout}
                className="bg-[#4A90E2] text-white px-4 py-2 rounded-lg hover:bg-[#357ABD] transition-colors"
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
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome to Bitrix12</h2>
          <p className="text-gray-600">Manage your tasks and projects from here.</p>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Total Tasks</h3>
            <p className="text-3xl font-bold text-[#4A90E2]">0</p>
            <p className="text-sm text-gray-500 mt-2">No tasks yet</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">In Progress</h3>
            <p className="text-3xl font-bold text-[#4A90E2]">0</p>
            <p className="text-sm text-gray-500 mt-2">Active tasks</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Completed</h3>
            <p className="text-3xl font-bold text-[#4A90E2]">0</p>
            <p className="text-sm text-gray-500 mt-2">Finished tasks</p>
          </div>
        </div>

        {/* Task Section */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">Your Tasks</h3>
            <button className="bg-[#4A90E2] text-white px-4 py-2 rounded-lg hover:bg-[#357ABD] transition-colors">
              + New Task
            </button>
          </div>
          <div className="text-center py-12 text-gray-500">
            <p className="text-lg mb-2">No tasks yet</p>
            <p className="text-sm">Create your first task to get started!</p>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Dashboard

