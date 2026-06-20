import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";
import { GiLoveMystery } from "react-icons/gi";
import { SlCalender } from "react-icons/sl"; 

const IdeaAllCard = ({user}) => {
    return (
        <div>
            <div className="group flex flex-col justify-between bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-md hover:shadow-xl hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-300 overflow-hidden">
      <div>
        <div className="relative h-48 w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800 ">
          <img 
            src={user.imageUrl || "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg"} 
            alt={user.title || "User Image"}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <span className="absolute top-3 left-3 text-[11px] font-extrabold uppercase tracking-wider bg-blue-600 text-white px-3 py-1 rounded-full shadow-md">
            {user.category || "General"}
          </span>
          <button className="absolute top-3 right-3 p-2 rounded-full bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm text-zinc-700 dark:text-zinc-300 hover:text-red-500 shadow-sm transition-all active:scale-90">
            <GiLoveMystery />
          </button>
        </div>
        <div className="p-5 sm:p-6 flex flex-col gap-3">
          <div className="flex justify-between items-center text-xs font-medium text-zinc-400 dark:text-zinc-500">
            <span className="flex items-center gap-1"><SlCalender /></span>
            <span className="text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-500/10 dark:bg-emerald-500/5 px-2 py-0.5 rounded-md">
              Est. Budget: {user.budget || "N/A"}
            </span>
          </div>
          <h3 className="text-lg md:text-xl font-bold text-zinc-950 dark:text-white line-clamp-1 group-hover:text-blue-600 transition-colors">
            {user.title || "Untitled"}
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2 leading-relaxed">
            {user.shortDesc || "No description available."}
          </p>
        </div>
      </div>
      <div className="p-5 sm:p-6 pt-0 border-t border-zinc-100 dark:border-zinc-800/50 mt-2">
        <Link
          href={`/ideas/${user._id}`} 
          className="w-full h-11 inline-flex items-center justify-center font-bold text-sm text-blue-600 dark:text-blue-400 border border-blue-600/20 dark:border-blue-400/20 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white rounded-xl transition-all active:scale-98 gap-2"
        >
          View Details <FaArrowRightLong />
        </Link>
      </div>

    </div>
        </div>
    );
};

export default IdeaAllCard;