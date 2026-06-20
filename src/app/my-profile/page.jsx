'use client'

import { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import { LuUser, LuMail, LuPencilLine, LuCheck, LuX, LuSparkles } from "react-icons/lu";
import toast from "react-hot-toast";
import { Spinner } from "@heroui/react";
import { BiUser } from "react-icons/bi";

const MyProfilePage = () => {
    const { data: session, isPending } = authClient.useSession();

    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    // Session load hole state set hobe
    useEffect(() => {
        if (session?.user) {
            setName(session.user.name);
            setEmail(session.user.email);
        }
    }, [session]);

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        const {data:tokenData} = await authClient.token()
        const res = await fetch(`http://localhost:5000/user-update/${session?.user?.email}`, {
            method: "PATCH",
            headers: { "content-type": "application/json",
                authorization: `Bearer ${tokenData?.token}`,
             },
            
            body: JSON.stringify({ name })
        });
        const data = await res.json();

        if (data.acknowledged) {
            toast.success("Profile Updated Successfully! ");
            setIsEditing(false);
        }
    };
    if (isPending) {
        return (
            <div className="flex justify-center items-center min-h-[50vh]">
                <Spinner />
            </div>
        );
    }

    return (
        <div className="p-4 sm:p-6 max-w-2xl mx-auto mt-10">
            <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200/80 dark:border-zinc-800/80 p-6 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 p-6 text-zinc-100 dark:text-zinc-800/40 pointer-events-none">
                    <LuSparkles className="w-24 h-24" />
                </div>
                <h2 className="text-xl font-bold text-zinc-950 dark:text-white mb-6 flex items-center gap-1"><BiUser className="text-purple-600"></BiUser> My Profile</h2>
                <div className="flex flex-col sm:flex-row items-center gap-6">
                    <div className="w-24 h-24 rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-800 shrink-0 border-2 border-blue-500/20 shadow-inner">
                        <img
                            src={session?.user?.image || "https://api.dicebear.com/7.x/adventurer/svg?seed=Tanzid"}
                            alt="Profile"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    {/* Name & Email Details  */}
                    <form onSubmit={handleUpdateProfile} className="flex-1 w-full space-y-4">
                        <div>
                            <label className="block text-xs font-semibold mb-1 text-zinc-400 uppercase tracking-wider flex items-center gap-1">
                                <LuUser className="w-3 h-3" /> Full Name
                            </label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    className="w-full p-2.5 border border-zinc-200 dark:border-zinc-800 bg-transparent rounded-xl text-sm text-zinc-950 dark:text-white focus:outline-none focus:border-blue-500"
                                />
                            ) : (
                                <p className="text-base font-bold text-zinc-950 dark:text-white py-1">{name}</p>
                            )}
                        </div>
                        <div>
                            <label className="block text-xs font-semibold mb-1 text-zinc-400 uppercase tracking-wider flex items-center gap-1">
                                <LuMail className="w-3 h-3" /> Email Address
                            </label>
                            <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400 py-1">{email}</p>
                        </div>
                        <div className="flex items-center justify-end gap-2 pt-2">
                            {isEditing ? (
                                <>
                                    <button
                                        type="button"
                                        onClick={() => setIsEditing(false)}
                                        className="p-2 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-xl transition-all"
                                    >
                                        <LuX className="w-5 h-5" />
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 text-xs font-bold bg-blue-600 text-white rounded-xl hover:bg-blue-700 flex items-center gap-1.5 transition-all shadow-sm shadow-blue-500/10"
                                    >
                                        <LuCheck className="w-3.5 h-3.5" /> Save Changes
                                    </button>
                                </>
                            ) : (
                                <button
                                    type="button"
                                    onClick={() => setIsEditing(true)}
                                    className="px-4 py-2 text-xs font-bold border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800 flex items-center gap-1.5 transition-all"
                                >
                                    <LuPencilLine className="w-3.5 h-3.5" /> Edit Profile
                                </button>
                            )}
                        </div>
                    </form>
                </div>

            </div>
        </div>
    );
};

export default MyProfilePage;