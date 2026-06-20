'use client'

import { authClient } from "@/lib/auth-client";
import { Button } from "@heroui/react";
import { useState } from "react";
import toast from "react-hot-toast";
import { LuPencilLine } from "react-icons/lu";

export const IdeaEditModal = ({ idea, onUpdate }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const updatedData = Object.fromEntries(formData.entries());
    const {data:tokenData} = await authClient.token()
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/ideas/${idea._id}`, {
      method: "PATCH",
      headers: { 'content-type': 'application/json',
        authorization: `Bearer ${tokenData?.token}`

       },
      body: JSON.stringify(updatedData)
    });
    const data = await res.json();

    if (data.modifiedCount > 0 || data.acknowledged) {
      onUpdate(idea._id, updatedData);
      toast.success("Idea updated successfully!");
      setIsOpen(false);
    }
  };

  return (
    <>
      <button onClick={() => setIsOpen(true)} className="p-2 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-xl transition-all active:scale-95">
        <LuPencilLine className="w-4 h-4" />
         
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-zinc-900 w-full max-w-md p-6 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-xl text-left">
            <h3 className="text-lg font-bold text-zinc-950 dark:text-white mb-4"> Edit Idea</h3>
            <form onSubmit={handleUpdateSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold mb-1.5 text-zinc-500">Title</label>
                <input type="text" name="title" defaultValue={idea.title} required className="w-full p-3 border border-zinc-200 dark:border-zinc-800 bg-transparent rounded-xl text-sm" />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1.5 text-zinc-500">Category</label>
                <input type="text" name="category" defaultValue={idea.category} required className="w-full p-3 border border-zinc-200 dark:border-zinc-800 bg-transparent rounded-xl text-sm" />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1.5 text-zinc-500">Short Description</label>
                <textarea name="shortDesc" rows="3" defaultValue={idea.shortDesc} required className="w-full p-3 border border-zinc-200 dark:border-zinc-800 bg-transparent rounded-xl text-sm"></textarea>
              </div>
              <div className="flex items-center justify-end gap-3 pt-2">
                <button type="button" onClick={() => setIsOpen(false)} className="px-4 py-2 text-sm font-medium border border-zinc-200 dark:border-zinc-800 rounded-xl">Cancel</button>
                <button type="submit" className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-xl">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
