import { LuLayers, LuUsers, LuLayoutGrid, LuTrophy } from "react-icons/lu"; 

const PlatformStats = () => {
  const stats = [
    { id: 1, name: 'Total Ideas Shared', value: '1,240+', icon: <LuLayers className="w-6 h-6 text-blue-500" /> },
    { id: 2, name: 'Active Innovators', value: '3,500+', icon: <LuUsers className="w-6 h-6 text-purple-500" /> },
    { id: 3, name: 'Project Prototypes', value: '420+', icon: <LuLayoutGrid className="w-6 h-6 text-amber-500" /> },
    { id: 4, name: 'Success Stories', value: '85+', icon: <LuTrophy className="w-6 h-6 text-emerald-500" /> },
  ];

  return (
    <section className="py-12 bg-white dark:bg-zinc-900 border-t border-b border-zinc-100 dark:border-zinc-800/50 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div key={stat.id} className="flex items-center gap-4 p-6 bg-zinc-50 dark:bg-zinc-950 rounded-2xl border border-zinc-200 dark:border-zinc-800/60 shadow-sm">
              <div className="p-3 bg-white dark:bg-zinc-900 rounded-xl shadow-sm">
                {stat.icon}
              </div>
              <div>
                <p className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">{stat.value}</p>
                <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 mt-0.5">{stat.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlatformStats;
