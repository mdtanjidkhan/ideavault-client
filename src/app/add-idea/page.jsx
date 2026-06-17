'use client'

const AddIdeaForm = () => {
     
     const handleSubmit = async(e)=>{
        e.preventDefault();

        const formData = new FormData(e.currentTarget)
        const ideaData = Object.fromEntries(formData.entries());
        const tagsString = ideaData.tags; 
  if (tagsString && typeof tagsString === "string") {
    ideaData.tags = tagsString.split(",").map(tag => tag.trim());
  } else {
    ideaData.tags = []; 
  }
        console.log("Submitted Idea Data", ideaData);
        
        const res = await fetch('http://localhost:5000/users',{
            method:'POST',
            headers:{
                'content-type': 'application/json'
            },
            body:JSON.stringify(ideaData)
        });
        const data = await res.json();
        console.log(data);

     }



    const categories = ["Tech", "Health", "AI", "Education", "Finance", "Environment"];
    return (
        <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 md:p-8 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xl my-10">

            <div className="mb-8 text-left border-b border-zinc-100 dark:border-zinc-800 pb-4">
                <h2 className="text-2xl md:text-3xl font-extrabold text-zinc-950 dark:text-white tracking-tight">
                    Light Up Your <span className="text-blue-600">Idea</span>
                </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
                    {/* Idea Title */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Idea Title *</label>
                        <input
                            type="text"
                            name="title" 
                            required
                            placeholder="e.g., Smart Agri-Tech Solution"
                            className="w-full px-4 h-11 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
                        />
                    </div>

                    {/* Category Dropdown */}
                    <div className="flex flex-col gap-1.5 ">
                        <label className="text-sm font-semibold text-zinc-700  dark:text-zinc-300">Category *</label>
                        <select
                            name="category"
                            required
                            defaultValue=""
                            className="w-full px-4 h-11 rounded-xl border border-zinc-300  focus:border-blue-500 transition-all text-sm cursor-pointer"
                        >
                            <option value="" disabled className=" text-zinc-400">
                                Select a category
                            </option>
                            {categories.map((cat) => (
                                <option
                                    key={cat}
                                    value={cat.toLowerCase()}
                                    className=" text-zinc-900  py-2"
                                >
                                    {cat}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Short Description */}
                    <div className="flex flex-col gap-1.5 md:col-span-2">
                        <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Short Description *</label>
                        <input
                            type="text"
                            name="shortDesc"
                            required
                            placeholder="A brief one-liner summary of your innovation"
                            className="w-full px-4 h-11 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
                        />
                    </div>

                    {/* Problem Statement */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Problem Statement *</label>
                        <textarea
                            name="problemStatement"
                            required
                            rows="3"
                            placeholder="What exact problem are you trying to solve?"
                            className="w-full p-4 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm resize-none"
                        />
                    </div>

                    {/* Proposed Solution */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Proposed Solution *</label>
                        <textarea
                            name="proposedSolution"
                            required
                            rows="3"
                            placeholder="How does your idea solve this particular problem?"
                            className="w-full p-4 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm resize-none"
                        />
                    </div>

                    {/* Target Audience */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Target Audience *</label>
                        <input
                            type="text"
                            name="targetAudience"
                            required
                            placeholder="e.g., Small farmers, University students"
                            className="w-full px-4 h-11 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
                        />
                    </div>

                    {/* Estimated Budget */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Estimated Budget <span className="text-xs opacity-50">(Optional)</span></label>
                        <input
                            type="text"
                            name="budget"
                            placeholder="e.g., $5,000 - $10,000"
                            className="w-full px-4 h-11 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
                        />
                    </div>

                    {/* Image URL */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Image URL</label>
                        <input
                            type="url"
                            name="imageUrl"
                            placeholder="https://example.com/banner.jpg"
                            className="w-full px-4 h-11 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
                        />
                    </div>

                    {/* Tags */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Tags <span className="text-xs opacity-50">(Optional)</span></label>
                        <input
                            type="text"
                            name="tags"
                            placeholder="e.g., agritech, ai, software"
                            className="w-full px-4 h-11 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
                        />
                    </div>

                    {/* Detailed Description */}
                    <div className="flex flex-col gap-1.5 md:col-span-2">
                        <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Detailed Description *</label>
                        <textarea
                            name="detailedDesc"
                            required
                            rows="5"
                            placeholder="Explain your entire startup idea, roadmap, and implementation strategy..."
                            className="w-full p-4 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
                        />
                    </div>

                </div>

              
                <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 flex justify-end">
                    <button
                        type="submit"
                        className="w-full sm:w-auto px-8 h-12 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl transition-all shadow-lg shadow-blue-600/20 active:scale-98 flex items-center justify-center"
                    >
                        Submit Idea →
                    </button>
                </div>

            </form>
        </div>
    );
};

export default AddIdeaForm;