'use client'

import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import { useEffect, useState } from "react";

const MyInterractions = () => {
    const [myInterractions , setMyInterractions] = useState([]);
    const [loading, setLoading] = useState(true);
     const { data: session, isPending } = authClient.useSession();
       console.log(session)
      const userEmail = session?.user?.email;
       useEffect(()=>{
        if (userEmail) {
      fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/my-interactions/${userEmail}`)
        .then((res) => res.json())
        .then((data) => {
          setMyInterractions(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
        console.log(myInterractions, setMyInterractions)
    }

 }, [userEmail]);
 if (isPending || loading) {
     return (
       <div className="flex justify-center items-center min-h-[50vh]">
        <p>Loading...</p>
       </div>
     );
   }
 
    return (
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8font-sans transition-colors duration-200 mt-8">
      <div className="w-full mb-6">
        <h3 className="text-lg sm:text-xl font-bold tracking-wide text-slate-800 dark:text-slate-100 flex items-center gap-2">
          Comments 
          <span className="text-xs sm:text-sm font-normal text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/60 px-2.5 py-0.5 rounded-full border border-slate-200 dark:border-slate-800">
            {myInterractions.length}
          </span>
        </h3>
        
       
        <div className="w-full h-[1px] bg-gradient-to-r from-blue-500/50 via-slate-200 dark:via-slate-800 to-transparent mt-3" />
      </div>

      {/* Comments List */}
      <div className="space-y-4">
        {myInterractions.map((i) => (
          <div 
            key={i._id} 
            className="flex  sm:flex-row items-start gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-900 hover:border-slate-300 dark:hover:border-slate-800/80 transition-all duration-200"
          >
            
            <div className="flex-shrink-0 relative w-45 h-44 sm:w-40 sm:h-35">
              <Image 
                src={i.imageUrl} 
                alt="User Profile" 
                fill
                sizes="() 200px, 180px"
                className="rounded-xl object-cover ring-2 ring-slate-200 dark:ring-slate-800 bg-slate-100 dark:bg-slate-800"
                unoptimized 
              />
               
            </div>

            {/* Comment Content */}
            <div className="flex-1 min-w-0 w-full space-y-1.5">
              
              {/* User Gmail */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-slate-500 dark:text-slate-400 truncate hover:text-blue-500 dark:hover:text-slate-300 transition-colors cursor-pointer block max-w-full">
                  {i.userEmail}
                </span>
              </div>
                <span className=" px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                                Category: {i.category}
                                </span>
              {/* Comment Title */}
              <h4 className="text-sm sm:text-base font-semibold text-slate-800 dark:text-slate-200 tracking-tight leading-snug truncate sm:whitespace-normal">
                {i.title}
              </h4>

              {/* Short Description */}
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-4xl break-words">
                {i.targetAudience}
              </p>
            </div>
          </div>
        ))}
      </div>

    </div>
    );
};

export default MyInterractions;