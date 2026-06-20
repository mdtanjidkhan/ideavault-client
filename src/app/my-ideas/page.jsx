'use client'

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { LuPencilLine, LuTrash2, LuFolderOpen, LuDollarSign } from "react-icons/lu";
import toast from "react-hot-toast";
import { IdeaEditModal } from "@/components/myideas/IdeaEditModal";
import { Spinner } from "@heroui/react";

const MyIdeasPage = () => {
  const [myIdeas, setMyIdeas] = useState([]);
  const [loading, setLoading] = useState(true);

  console.log(myIdeas, 'my ideas ok', setMyIdeas, 'ok')
  const { data: session, isPending } = authClient.useSession();
  const loggedInUserEmail = session?.user?.email;
  useEffect(() => {
    const loadMyIdeas = async () => {
    if (!loggedInUserEmail) return;

    try {
      setLoading(true);
      const { data: tokenData } = await authClient.token(); 
      const res = await fetch(`http://localhost:5000/my-ideas/${loggedInUserEmail}`, {
        headers: {
          "Authorization": `Bearer ${tokenData?.token}` 
        }
      });

      const data = await res.json();
      if (Array.isArray(data)) {
        setMyIdeas(data);
      } else {
        console.error("server no", data);
        setMyIdeas([]);
      }

    } catch (err) {
      console.error(err);
      setMyIdeas([]);
    } finally {
      setLoading(false);
    }
  };
  loadMyIdeas();


  }, [loggedInUserEmail]);
  const handleDeleteIdea = async (id) => {
     const {data:tokenData} = await authClient.token();
    const res = await fetch(`http://localhost:5000/ideas/${id}`, {
      method: "DELETE",
      headers: { 'content-type': 'application/json',
        authorization: `Bearer ${tokenData?.token}`,
       }
    });
    const data = await res.json();

    if (data.deletedCount > 0) {
      toast.success("Idea removed successfully!");
      setMyIdeas(prev => prev.filter(idea => idea._id !== id));
    }
  };

  const handleUpdateState = (id, updatedData) => {
    setMyIdeas(prev => prev.map(item => item._id === id ? { ...item, ...updatedData } : item));
  };

  if (isPending || loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 max-w-4xl mx-auto bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200/80 dark:border-zinc-800/80 mt-10 shadow-sm transition-colors">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-blue-50 dark:bg-blue-950/40 rounded-xl text-blue-500">
          <LuFolderOpen className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-zinc-950 dark:text-white ">My Created Ideas</h2>
          <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-2">Manage or edit the ideas you shared with the world.</p>
        </div>
      </div>

      {myIdeas.length === 0 ? (
        <div className="text-center py-12 border border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl">
          <p className="text-zinc-500 text-xs">You haven't created any ideas yet. Light up your brain!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {myIdeas.map((idea) => (
            <div
              key={idea._id}
              className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200/60 dark:border-zinc-800/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all"
            >
              <div className="flex items-start sm:items-center gap-4 min-w-0 flex-1">

                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-zinc-200 dark:bg-zinc-800 shrink-0 border border-zinc-200/50 dark:border-zinc-700/50">
                  <img
                    src={idea.imageUrl}
                    alt={idea.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-1 min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-sm sm:text-base font-bold text-zinc-950 dark:text-white truncate max-w-[180px] sm:max-w-md">
                      {idea.title}
                    </h3>
                    <span className="px-2 py-0.5 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 text-[10px] font-bold uppercase tracking-wider rounded-md">
                      {idea.category}
                    </span>
                    {idea.budget && (
                      <span className="inline-flex items-center text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 px-2 py-0.5 rounded-md">
                        <LuDollarSign className="w-3 h-3 mr-0.5" /> {idea.budget.replace('$', '')}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2 sm:line-clamp-1 leading-relaxed">
                    {idea.shortDesc}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 self-end sm:self-auto border-t sm:border-none border-zinc-200/50 dark:border-zinc-800/50 pt-2 sm:pt-0 w-full sm:w-auto justify-end">
                <IdeaEditModal idea={idea} onUpdate={handleUpdateState} />
                <button
                  onClick={() => handleDeleteIdea(idea._id)}
                  className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-xl transition-all active:scale-95"
                >
                  <LuTrash2 className="w-4 h-4" />
                </button>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyIdeasPage;