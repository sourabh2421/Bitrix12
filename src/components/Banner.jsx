// Integration logos from reliable CDN sources
const integrations = [
  {
    name: "Google Drive",
    logo: "https://www.gstatic.com/images/branding/product/1x/drive_48dp.png",
  },
  {
    name: "Microsoft Teams",
    logo: "https://cdn.worldvectorlogo.com/logos/microsoft-teams-1.svg",
  },
  {
    name: "Slack",
    logo: "https://cdn.worldvectorlogo.com/logos/slack-new-logo.svg",
  },
  {
    name: "Dropbox",
    logo: "https://cdn.worldvectorlogo.com/logos/dropbox-3.svg",
  },
  {
    name: "Trello",
    logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/trello/trello-plain.svg",
  },
  {
    name: "Salesforce",
    logo: "https://cdn.worldvectorlogo.com/logos/salesforce-2.svg",
  },
  {
    name: "Github",
    logo: "https://cdn.worldvectorlogo.com/logos/github-icon-1.svg",
  },
  {
    name: "PayPal",
    logo: "https://cdn.worldvectorlogo.com/logos/paypal-3.svg",
  },
  {
    name: "WhatsApp",
    logo: "https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg",
  },
  {
    name: "Zoom",
    logo: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%232D8CFF' d='M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22c-5.514 0-10-4.486-10-10S6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z'/%3E%3Cpath fill='%232D8CFF' d='M12 6c3.314 0 6 2.686 6 6s-2.686 6-6 6-6-2.686-6-6 2.686-6 6-6zm0 10c2.206 0 4-1.794 4-4s-1.794-4-4-4-4 1.794-4 4 1.794 4 4 4z'/%3E%3C/svg%3E",
  },
  {
    name: "Asana",
    logo: "https://cdn.worldvectorlogo.com/logos/asana-1.svg",
  },
  {
    name: "Notion",
    logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/notion/notion-original.svg",
  }
]

function Banner() {
  // Zoom SVG as inline component
  const ZoomIcon = () => (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22c-5.514 0-10-4.486-10-10S6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z" fill="#2D8CFF"/>
      <path d="M12 6c3.314 0 6 2.686 6 6s-2.686 6-6 6-6-2.686-6-6 2.686-6 6-6zm0 10c2.206 0 4-1.794 4-4s-1.794-4-4-4-4 1.794-4 4 1.794 4 4 4z" fill="#2D8CFF"/>
    </svg>
  )

  return (
    <section className="w-full bg-gradient-to-r from-[#E8F4F8] to-white dark:from-gray-800 dark:to-gray-900 py-9 px-1 md:px-0 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <h3 className="text-center text-2xl md:text-3xl font-bold text-[#4A90E2] dark:text-blue-400 mb-6 tracking-wide">
          Bitrix12 integrates with your favorite tools:
        </h3>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {integrations.map(({ name, logo }) => (
            <div
              key={name}
              className="bg-white dark:bg-gray-800 rounded-xl shadow dark:shadow-lg p-4 flex flex-col items-center min-w-[100px] max-w-[120px] transition-colors duration-300"
            >
              {name === 'Zoom' ? (
                <div className="h-10 md:h-12 mb-2 mx-auto flex items-center justify-center">
                  <ZoomIcon />
                </div>
              ) : (
                <img
                  src={logo}
                  alt={name + ' logo'}
                  className="h-10 md:h-12 mb-2 mx-auto w-auto max-w-[80px]"
                  style={{ 
                    objectFit: 'contain'
                  }}
                  loading="lazy"
                  onError={(e) => {
                    // Fallback to a placeholder if image fails to load
                    e.target.src = `https://via.placeholder.com/80x80/4A90E2/FFFFFF?text=${name.charAt(0)}`
                  }}
                />
              )}
              <span className="text-sm md:text-base font-semibold text-gray-700 dark:text-gray-300">
                {name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Banner
