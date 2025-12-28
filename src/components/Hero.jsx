function Hero() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#E8F4F8] to-white relative overflow-hidden flex items-center p-8">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center w-full z-[2] relative">
        <div className="flex flex-col gap-6">
          <div className="text-2xl font-bold text-[#4A90E2] mb-4">Bitrix12®</div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-tight text-black m-0 flex flex-col gap-2">
            <span className="flex items-center gap-4 relative">
              <span className="relative">FREE</span>
              <span className="w-[120px] h-[120px] md:w-[100px] md:h-[100px] lg:w-[120px] lg:h-[120px] rounded-full bg-gradient-to-br from-[#4A90E2] to-[#357ABD] flex items-center justify-center flex-shrink-0 shadow-[0_4px_20px_rgba(74,144,226,0.3)] ml-4">
                <img 
                  src="https://via.placeholder.com/120x120/4A90E2/FFFFFF?text=👩" 
                  alt="Woman with laptop" 
                  className="w-full h-full object-cover rounded-full"
                />
              </span>
            </span>
            <span className="flex items-center gap-4 relative">
              TASK CHECKLIST
            </span>
            <span className="flex items-center gap-4 relative">
              <span className="relative">APP</span>
              <span className="w-[120px] h-[120px] md:w-[100px] md:h-[100px] lg:w-[120px] lg:h-[120px] rounded-full bg-gradient-to-br from-[#4A90E2] to-[#357ABD] flex items-center justify-center flex-shrink-0 shadow-[0_4px_20px_rgba(74,144,226,0.3)] ml-4">
                <img 
                  src="https://via.placeholder.com/120x120/4A90E2/FFFFFF?text=👨" 
                  alt="Man with glasses" 
                  className="w-full h-full object-cover rounded-full"
                />
              </span>
            </span>
          </h1>
          <p className="text-lg leading-relaxed text-gray-700 max-w-[500px] mt-4">
            Organize and manage your team like a boss with Bitrix24, a free online task checklist app packing more capabilities than you can imagine.
          </p>
          <button className="bg-[#4A90E2] text-white border-none py-4 px-10 text-lg font-semibold rounded-lg cursor-pointer transition-colors duration-300 w-fit mt-4 hover:bg-[#357ABD]">
            Get Started
          </button>
        </div>
        <div className="relative flex justify-center items-center">
          <div className="[transform:perspective(1000px)_rotateY(-15deg)_rotateX(5deg)] [transform-style:preserve-3d] shadow-[0_20px_60px_rgba(0,0,0,0.2)] rounded-[20px] overflow-hidden bg-white lg:[transform:perspective(1000px)_rotateY(-15deg)_rotateX(5deg)] md:[transform:none]">
            <div className="w-full lg:w-[600px] bg-white rounded-[20px] overflow-hidden">
              <div className="bg-[#F5F7FA] p-4 px-6 flex items-center gap-4 border-b border-gray-300">
                <div className="font-bold text-[#4A90E2] text-sm">Bitrix 12</div>
                <div className="flex-1 bg-white py-2 px-4 rounded-md text-gray-500 text-xs">Search</div>
                <div className="text-xs text-gray-600">12:53</div>
                <div className="text-xs text-gray-600">Adam Ryder</div>
                <button className="py-1.5 px-4 rounded-md border border-[#4A90E2] bg-white text-[#4A90E2] text-xs cursor-pointer">Upgrade</button>
                <button className="py-1.5 px-4 rounded-md border-none bg-[#4A90E2] text-white text-xs cursor-pointer">Invite</button>
              </div>
              <div className="py-3 px-6 flex gap-6 border-b border-gray-300 bg-white">
                <span className="text-sm text-[#4A90E2] cursor-pointer pb-2 border-b-2 border-[#4A90E2] font-semibold">Tasks</span>
                <span className="text-sm text-gray-600 cursor-pointer pb-2">Projects</span>
                <span className="text-sm text-gray-600 cursor-pointer pb-2">Scrum</span>
                <span className="text-sm text-gray-600 cursor-pointer pb-2">Set by me</span>
                <span className="text-sm text-gray-600 cursor-pointer pb-2">Efficiency</span>
                <span className="text-sm text-gray-600 cursor-pointer pb-2">Supervising</span>
              </div>
              <div className="p-4 px-6 flex items-center gap-6 bg-white border-b border-gray-300">
                <button className="bg-[#4A90E2] text-white border-none py-2.5 px-5 rounded-md text-xs font-semibold cursor-pointer">NEW TASK</button>
                <div className="flex gap-4">
                  <span className="text-xs text-gray-600 cursor-pointer">List</span>
                  <span className="text-xs text-gray-600 cursor-pointer">Planner</span>
                  <span className="text-xs text-gray-600 cursor-pointer">Gantt</span>
                  <span className="text-xs text-gray-600 cursor-pointer">Deadline</span>
                  <span className="text-xs text-gray-600 cursor-pointer">Calendar</span>
                  <span className="text-xs text-gray-600 cursor-pointer">Reports</span>
                </div>
              </div>
              <div className="flex gap-4 p-6 bg-[#F5F7FA] min-h-[400px]">
                <div className="flex-1 bg-white rounded-lg p-4 min-h-[300px]">
                  <h3 className="text-sm font-semibold text-gray-800 m-0 mb-4 uppercase">New tasks</h3>
                  <div className="bg-[#F9F9F9] rounded-md p-3 mb-3 cursor-pointer">
                    <div className="w-full h-20 bg-gray-300 rounded mb-2"></div>
                    <div className="text-xs text-gray-800 mb-1 leading-tight">Apartment renovation, planning and blueprints</div>
                    <div className="text-[10px] text-gray-500">2h ago</div>
                  </div>
                  <div className="bg-[#F9F9F9] rounded-md p-3 mb-3 cursor-pointer">
                    <div className="w-full h-20 bg-gray-300 rounded mb-2"></div>
                    <div className="text-xs text-gray-800 mb-1 leading-tight">City building committee, get permits</div>
                    <div className="text-[10px] text-gray-500">3h ago</div>
                  </div>
                </div>
                <div className="flex-1 bg-white rounded-lg p-4 min-h-[300px]">
                  <h3 className="text-sm font-semibold text-gray-800 m-0 mb-4 uppercase">In progress</h3>
                  <div className="bg-[#F9F9F9] rounded-md p-3 mb-3 cursor-pointer">
                    <div className="w-full h-20 bg-gray-300 rounded mb-2"></div>
                    <div className="text-xs text-gray-800 mb-1 leading-tight">Living room lighting, electrical layout</div>
                    <div className="text-[10px] text-gray-500">1h ago</div>
                  </div>
                  <div className="bg-[#F9F9F9] rounded-md p-3 mb-3 cursor-pointer">
                    <div className="w-full h-20 bg-gray-300 rounded mb-2"></div>
                    <div className="text-xs text-gray-800 mb-1 leading-tight">Kitchen - redesigned interior, finalize the blueprint</div>
                    <div className="text-[10px] text-gray-500">4h ago</div>
                  </div>
                </div>
                <div className="flex-1 bg-white rounded-lg p-4 min-h-[300px]">
                  <h3 className="text-sm font-semibold text-gray-800 m-0 mb-4 uppercase">Completed</h3>
                  <div className="bg-[#F9F9F9] rounded-md p-3 mb-3 cursor-pointer">
                    <div className="w-full h-20 bg-gray-300 rounded mb-2"></div>
                    <div className="text-xs text-gray-800 mb-1 leading-tight">New interior plan + furniture layout</div>
                    <div className="text-[10px] text-gray-500">5h ago</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div 
        className="absolute bottom-0 left-0 right-0 h-[100px] opacity-30 z-[1]"
        style={{
          background: 'linear-gradient(to top, rgba(0, 0, 0, 0.1), transparent), repeating-linear-gradient(90deg, transparent, transparent 20px, rgba(0, 0, 0, 0.05) 20px, rgba(0, 0, 0, 0.05) 40px)'
        }}
      ></div>
    </div>
  )
}

export default Hero
