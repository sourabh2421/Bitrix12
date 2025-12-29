function Footer() {
  return (
    <footer className="bg-gradient-to-t from-[#E8F4F8] to-white border-t border-[#4A90E2]/10 py-8 px-4 mt-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-[#4A90E2] font-extrabold text-xl md:text-2xl">
          <span className="font-sans">Bitrix12</span>
          <span className="text-base align-top font-normal text-[#357abd]">&copy; {new Date().getFullYear()}</span>
        </div>
        <div className="text-gray-500 text-sm md:text-base text-center">
          Crafted with <span className="text-[#4A90E2]">&#10084;&#65039;</span> for teams and makers
        </div>
        <div className="flex items-center space-x-3 text-[#4A90E2] text-lg">
          <a href="#" aria-label="Privacy Policy" className="hover:text-[#357abd] transition">Privacy</a>
          <span className="hidden md:inline">|</span>
          <a href="#" aria-label="Terms of Service" className="hover:text-[#357abd] transition">Terms</a>
        </div>
        {/* Social icons */}
        <div className="flex items-center space-x-4 mt-4 md:mt-0">
          <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="group">
            <svg className="w-6 h-6 text-[#4A90E2] group-hover:text-[#357abd] transition" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22.46 5.97c-.77.35-1.6.58-2.47.69a4.19 4.19 0 0 0 1.85-2.31 8.37 8.37 0 0 1-2.66 1.02 4.17 4.17 0 0 0-7.09 3.8A11.86 11.86 0 0 1 3.14 4.83a4.18 4.18 0 0 0 1.29 5.57c-.7-.02-1.35-.22-1.92-.53v.05a4.19 4.19 0 0 0 3.35 4.09c-.32.09-.65.13-1.01.05.28.89 1.09 1.54 2.05 1.56a8.36 8.36 0 0 1-5.18 1.78c-.33 0-.66-.02-.98-.06A11.78 11.78 0 0 0 8.29 21c7.55 0 11.68-6.26 11.68-11.68 0-.18-.01-.36-.02-.54A8.27 8.27 0 0 0 24 4.59c-.9.39-1.87.66-2.87.79z"/>
            </svg>
          </a>
          <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="group">
            <svg className="w-6 h-6 text-[#4A90E2] group-hover:text-[#357abd] transition" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11.75 20h-3v-10h3v10zm-1.5-11.25a1.75 1.75 0 1 1 0-3.5 1.75 1.75 0 1 1 0 3.5zm15.25 11.25h-3v-5.5c0-1.38-.03-3.16-1.93-3.16-1.93 0-2.23 1.51-2.23 3.06v5.6h-3v-10h2.87v1.36h.04c.4-.76 1.39-1.56 2.87-1.56 3.07 0 3.64 2.02 3.64 4.65v5.55z"/>
            </svg>
          </a>
          <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="group">
            <svg className="w-6 h-6 text-[#4A90E2] group-hover:text-[#357abd] transition" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.2c3.2 0 3.584.012 4.85.07 1.366.06 2.633.318 3.608 1.293.975.974 1.232 2.242 1.292 3.608.059 1.267.07 1.651.07 4.83s-.012 3.563-.07 4.83c-.06 1.366-.317 2.633-1.292 3.608-.975.975-2.242 1.232-3.608 1.292-1.266.059-1.652.07-4.85.07s-3.583-.012-4.85-.07c-1.366-.06-2.633-.317-3.608-1.292-.974-.975-1.231-2.242-1.291-3.608-.059-1.267-.07-1.651-.07-4.83s.011-3.563.07-4.83c.06-1.366.317-2.633 1.291-3.608.975-.975 2.242-1.232 3.608-1.292 1.267-.059 1.652-.07 4.85-.07zm0-2.2c-3.259 0-3.667.014-4.945.072-1.276.058-2.55.322-3.537 1.308-.985.985-1.25 2.259-1.307 3.537-.059 1.278-.073 1.686-.073 4.946s.014 3.667.072 4.945c.058 1.276.322 2.55 1.308 3.537.986.986 2.259 1.25 3.537 1.307 1.277.059 1.686.073 4.945.073s3.667-.014 4.945-.072c1.278-.058 2.55-.322 3.537-1.308.986-.986 1.25-2.259 1.307-3.537.059-1.277.073-1.686.073-4.945s-.014-3.667-.072-4.945c-.058-1.278-.322-2.55-1.308-3.537-.986-.986-2.259-1.25-3.537-1.307-1.278-.059-1.686-.073-4.945-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.181a4.019 4.019 0 1 1 0-8.036 4.019 4.019 0 0 1 0 8.036zm7.966-10.286a1.44 1.44 0 1 1-2.881 0 1.44 1.44 0 0 1 2.881 0z"/>
            </svg>
          </a>
          <a href="https://facebook.com/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="group">
            <svg className="w-6 h-6 text-[#4A90E2] group-hover:text-[#357abd] transition" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22.675 0h-21.35c-.74 0-1.325.585-1.325 1.325v21.351c0 .739.584 1.324 1.325 1.324h11.494v-9.294h-3.122v-3.622h3.122v-2.672c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24h-1.918c-1.505 0-1.797.716-1.797 1.765v2.312h3.587l-.467 3.622h-3.12v9.294h6.105c.738 0 1.324-.584 1.324-1.324v-21.35c0-.74-.586-1.325-1.325-1.325z"/>
            </svg>
          </a>
          <a href="https://github.com/" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="group">
            <svg className="w-6 h-6 text-[#4A90E2] group-hover:text-[#357abd] transition" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 .296c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.744.084-.729.084-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.834 2.809 1.304 3.495.997.108-.774.418-1.304.762-1.605-2.665-.305-5.467-1.334-5.467-5.93 0-1.31.467-2.381 1.236-3.221-.124-.304-.536-1.523.116-3.176 0 0 1.008-.322 3.301 1.23a11.49 11.49 0 0 1 3.003-.404c1.018.004 2.045.138 3.003.404 2.292-1.552 3.297-1.23 3.297-1.23.653 1.653.241 2.872.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.623-5.479 5.921.43.372.824 1.102.824 2.222v3.293c0 .32.218.694.824.576 4.765-1.588 8.198-6.085 8.198-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
