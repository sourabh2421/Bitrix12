// Example logos: Swap these URLs with real ones if available
const integrations = [
  {
    name: "Google Drive",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg",
  },
  {
    name: "Microsoft Teams",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoft/microsoft-original.svg",
  },
  {
    name: "Slack",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/slack/slack-original.svg",
  },
  {
    name: "Dropbox",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dropbox/dropbox-plain.svg",
  },
  {
    name: "Trello",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/trello/trello-plain.svg",
  },
  {
    name: "Salesforce",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/salesforce/salesforce-original.svg",
  },
  {
    name: "Github",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
  },
  {
    name: "PayPal",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/paypal/paypal-original.svg",
  },
  {
    name: "WhatsApp",
    logo: "https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg",
  },
  {
    name: "Zoom",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/zoom/zoom-original.svg",
  },
  {
    name: "Asana",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/asana/asana-original.svg",
  },
  {
    name: "Notion",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/notion/notion-original.svg",
  }
]

function Banner() {
  return (
    <section className="w-full bg-gradient-to-r from-[#E8F4F8] to-white py-9 px-1 md:px-0">
      <div className="max-w-6xl mx-auto">
        <h3 className="text-center text-2xl md:text-3xl font-bold text-[#4A90E2] mb-6 tracking-wide">
          Bitrix12 integrates with your favorite tools:
        </h3>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {integrations.map(({ name, logo }) => (
            <div
              key={name}
              className="bg-white rounded-xl shadow p-4 flex flex-col items-center min-w-[100px] max-w-[120px]"
            >
              <img
                src={logo}
                alt={name + ' logo'}
                className="h-10 md:h-12 mb-2 mx-auto"
                style={{ objectFit: 'contain', filter: 'grayscale(10%)' }}
                loading="lazy"
              />
              <span className="text-sm md:text-base font-semibold text-gray-700">
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
