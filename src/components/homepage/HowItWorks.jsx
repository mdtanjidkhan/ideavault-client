
import { LuUserPlus, LuLightbulb, LuChevronRight } from "react-icons/lu"; // 🎯 রিয়্যাক্ট আইকনস সোনা

const HowItWorks = () => {
  const steps = [
    {
      step: '01',
      title: 'Create Account',
      desc: 'Join our growing community using email or Google authentication to start sharing.',
      icon: <LuUserPlus className="w-6 h-6 text-blue-500" />
    },
    {
      step: '02',
      title: 'Submit Your Idea',
      desc: 'Fill out a simple form with your innovative title, category, description and goals.',
      icon: <LuLightbulb className="w-6 h-6 text-purple-500" />
    },
    {
      step: '03',
      title: 'Gather Feedback & Build',
      desc: 'Get votes, interact through comments, track your application, and bring ideas to life.',
      icon: <LuChevronRight className="w-6 h-6 text-emerald-500" />
    }
  ];

  return (
    <section className="py-16 bg-zinc-50 dark:bg-zinc-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white"> How IdeaVault Works</h2>
          <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-400">
            From a tiny spark in your mind to a fully completed project. Follow these simple steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((item, index) => (
            <div key={index} className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-8 rounded-2xl shadow-sm relative group hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-300">
              <div className="absolute top-4 right-6 text-4xl font-black font-mono text-zinc-100 dark:text-zinc-800/40 select-none transition-colors group-hover:text-blue-500/10">
                {item.step}
              </div>
              <div className="w-12 h-12 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center mb-6">
                {item.icon}
              </div>
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-2">{item.title}</h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default HowItWorks;