'use client'

import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import CommentUi from "./CommentUi";

const CommentsPost = () => {
    const { data: session } = authClient.useSession()
    // 
    const user = session?.user
    // console.log(user, 'comments user')
    const [comments, setComments] = useState([])
    // GET comments (load first time)
    useEffect(() => {
            fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/comments`)
            .then(res => res.json())
            .then(userComment => setComments(userComment));   
        
    }, []);

    const handleAddComment = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget)
        const commentData = Object.fromEntries(formData.entries());
        const comment = {
            name: user?.name,
            email: user?.email,
            image: user?.image,
            text: commentData.comments
        }
        console.log(comment, 'sestion and comment data')
         if(!commentData.comments?.trim()) return;
         
        try {
            const {data:tokenData} = await authClient.token()
            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/comments`, {
                method: "POST",
                headers: {
                    'content-type': 'application/json',
                    authorization: `Bearer ${tokenData?.token}`
                },
                body: JSON.stringify(comment)
            });
            if (res.ok) {
                const freshComment = await res.json();
                console.log("Database response:", freshComment);
                setComments((prevComments) => [freshComment, ...prevComments]);
                toast.success("Comment added successfully");
                e.target.reset();
            } else {
                toast.error("Something went wrong!");
            }
        } catch (error) {
            console.error("Error adding comment:", error);
            toast.error("Failed to connect to server");
        }
    };
    return (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
            <h2 className="text-xl font-bold text-zinc-950 dark:text-white flex items-center gap-2">
                Discussion Forum <span>: ({comments.length})</span>
            </h2>

            <form onSubmit={handleAddComment} className="space-y-3">
                <div className="relative">
                    <textarea
                        rows="3"
                        name="comments"
                        required
                        placeholder="Share your feedback, suggestions, or ask a question about this idea..."
                        className="w-full p-4 rounded-2xl border border-zinc-300 dark:border-zinc-700 bg-transparent text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none"
                    />
                </div>

                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="h-10 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md active:scale-95 transition-all"
                    >
                        Post Comment
                    </button>
                </div>
            </form>
            {/* comments ui */}
                <CommentUi comments={comments} setComments={setComments}></CommentUi>
        </div>
    );
};

export default CommentsPost;