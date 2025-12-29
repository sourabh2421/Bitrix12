import { useState } from "react";

const faqs = [
  {
    question: "What is Bitrix12 and who should use it?",
    answer:
      "Bitrix12 is a free online task and checklist management app designed for individuals and teams who want to stay organized and boost productivity. Anyone needing to manage tasks, projects, or workflows can benefit from using Bitrix12. With an easy-to-use interface and robust features, Bitrix12 suits both beginners and professionals. Whether you're managing personal errands or collaborating with a large remote team, Bitrix12 adapts to your workflow and grows with your needs.",
  },
  {
    question: "Is Bitrix12 really free?",
    answer:
      "Yes! Bitrix12 offers a free plan with core features available to everyone. There are no hidden charges or surprise fees for the standard to-do and checklist functions. Advanced integrations and premium customer support might be available in paid plans, but our free version includes everything you need for basic task and project management forever. You can try all features risk-free!",
  },
  {
    question: "How do I add team members to my workspace?",
    answer:
      "Simply invite your teammates using their email addresses from your workspace dashboard. They’ll get an invitation link and can join your team instantly. You can assign permissions, segment teams into groups or projects, and collaborate in real time. Bitrix12 ensures a smooth onboarding process so your team is up and running quickly with no learning curve.",
  },
  {
    question: "Which integrations does Bitrix12 support?",
    answer:
      "Bitrix12 supports popular tools like Google Drive, Slack, Microsoft Teams, Dropbox, Trello, PayPal, WhatsApp, Asana, Notion, Zoom, Salesforce, and GitHub. More integrations are being added regularly! Integration is easy—connect each app with a few clicks and sync tasks, files, and updates automatically so your workflow stays unified across platforms.",
  },
  {
    question: "Is my data secure and private?",
    answer:
      "Absolutely. We use enterprise-grade encryption and follow strict privacy standards to make sure your data is safe and never shared with third parties without your permission. Bitrix12 operates on secure infrastructure, with daily backups, account protection features like two-factor authentication, and transparent privacy policies. Your trust and security are our highest priorities.",
  }
];

function Question() {
  const [openIdx, setOpenIdx] = useState(null);

  const toggle = (idx) => {
    setOpenIdx(idx === openIdx ? null : idx);
  };

  return (
    <section className="bg-gradient-to-b from-white to-[#E8F4F8] dark:from-gray-800 dark:to-gray-900 py-16 px-4 transition-colors duration-300">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#4A90E2] dark:text-blue-400 mb-10 text-center">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map(({ question, answer }, idx) => (
            <div
              key={idx}
              className="border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 overflow-hidden transition-all duration-200 shadow hover:border-[#4A90E2]/60 dark:hover:border-blue-500/60 hover:shadow-xl hover:scale-[1.015]"
            >
              <button
                className="w-full flex justify-between items-center p-5 text-left hover:bg-[#e8f4f8] dark:hover:bg-gray-700 transition font-semibold text-lg text-gray-800 dark:text-gray-200 focus:outline-none"
                onClick={() => toggle(idx)}
                aria-expanded={openIdx === idx}
                aria-controls={`faq${idx}`}
              >
                {question}
                <span className={`text-2xl ml-2 transition-transform duration-200 ${openIdx === idx ? 'rotate-180' : ''}`}>⌄</span>
              </button>
              {openIdx === idx && (
                <div id={`faq${idx}`} className="px-5 pb-5 text-gray-700 dark:text-gray-300 animate-fade-in">
                  {answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Question;
