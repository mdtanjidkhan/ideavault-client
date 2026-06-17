import { ThumbsUp, ArrowUpRight, Bulb, Rocket } from "@gravity-ui/icons";

const TrendingIdea = async () => {
    const res = await fetch(`http://localhost:5000/trending-ideas`);
    const ideas = await res.json();
    console.log(ideas, 'no ideas')
    return (
        <section className="py-16 bg-zinc-50 dark:bg-zinc-950 transition-colors">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="mb-10 text-center sm:text-left">
                    <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
                        🔥 Trending Ideas
                    </h2>
                    <p className="mt-3 text-lg text-zinc-500 dark:text-zinc-400">
                        Explore the most upvoted and innovative thoughts from our creative community.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {ideas.map((idea) => (
                        <div
                            key={idea._id}
                            className="flex flex-col justify-between p-6 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 hover:border-blue-500 dark:hover:border-blue-500 shadow-sm hover:shadow-md transition-all duration-300 group"
                        >
                            <div className="w-full h-36 rounded-xl mb-4 overflow-hidden bg-gradient-to-br from-blue-500/10 via-indigo-500/5 to-purple-500/10 dark:from-blue-500/20 dark:via-transparent dark:to-purple-500/20 flex items-center justify-center border border-zinc-100 dark:border-zinc-800/50 relative group-hover:from-blue-500/20 group-hover:to-purple-500/20 transition-all duration-300">
                                {idea.imageUrl ? (
                                    <img
                                        src={idea.imageUrl}
                                        alt={idea.title}
                                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                                    />
                                ) : (
                                    <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                                        <span className="text-4xl filter drop-shadow-md mb-1 animate-pulse">
                                            {idea.category === "Tech" ? "" : idea.category === "Business" ? <Rocket></Rocket> : <Bulb></Bulb>}
                                        </span>
                                        <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500 block mt-1">
                                            IdeaVault Abstract #{idea._id?.slice(-4)}
                                        </span>
                                    </div>
                                )}
                            </div>


                            <div>
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                                    {idea.category}
                                </span>

                                <h3 className="mt-4 text-xl font-semibold text-zinc-900 dark:text-white group-hover:text-blue-500 transition-colors line-clamp-1">
                                    {idea.title}
                                </h3>

                                <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400 line-clamp-2">
                                    {idea.shortDesc
                                    }
                                </p>
                            </div>


                            <div className="mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
                                <div className="flex items-center gap-1.5 text-zinc-600 dark:text-zinc-400">
                                    <ThumbsUp className="text-blue-500" style={{ width: '16px', height: '16px' }} />
                                    <span className="text-sm font-medium">{idea.upvotes || 0} Votes</span>
                                </div>

                                <button
                                    //   onClick={() => router.push(`/ideas/${idea._id}`)}
                                    className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-all active:scale-95"
                                >
                                    <span>View Details</span>
                                    <ArrowUpRight className="transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" style={{ width: '14px', height: '14px' }} />
                                </button>

                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default TrendingIdea;

