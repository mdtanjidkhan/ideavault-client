import CommentsPost from "@/components/comments/CommentsPost";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";


const IdeaDetailsPage = async ({ params }) => {
  const { id } = await params;
  const {token }= await auth.api.getToken({
     headers: await headers()
  })
  // console.log(token);
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/${id}`,{
    headers:{
      authorization: `Bearer ${token}`
    }
  })
  const users = await res.json();
  console.log(users)
  console.log('id data', id);
  return (
    <div className=" bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-5xl mx-auto space-y-10">
        <Link
          href="/ideas"
          className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-500 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          ← Back to All Ideas
        </Link>
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-sm overflow-hidden">
          <div className="relative h-64 md:h-96 w-full bg-zinc-100 dark:bg-zinc-800">
            <img
              src={users.imageUrl || "https://images.pexels.com/photos/7089020/pexels-photo-7089020.jpeg"}
              alt={users.title}
              className="w-full h-full object-cover"
            />
            <span className="absolute top-4 left-4 text-xs font-extrabold uppercase tracking-wider bg-blue-600 text-white px-3 py-1.5 rounded-full shadow-md">
              {users.category || "General"}
            </span>
          </div>

          <div className="p-6 md:p-8 space-y-6">
            <div className="flex flex-wrap justify-between items-center gap-4 border-b border-zinc-100 dark:border-zinc-800 pb-5">
              <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight text-zinc-950 dark:text-white">
                {users.title}
              </h1>
              <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 dark:bg-emerald-500/5 px-3 py-1 rounded-xl border border-emerald-500/20">
                Est. Budget: {users.budget || "N/A"}
              </span>
            </div>

            <div className="flex gap-4 text-xs font-medium text-zinc-400 dark:text-zinc-500">
              <span>📅 Created: {new Date(users.createdAt).toLocaleDateString()}</span>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-bold text-zinc-950 dark:text-white">Detailed Description</h3>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm md:text-base leading-relaxed">
                {users.shortDesc}
              </p>
              <div className="space-y-2">
                <h2 className="font-bold text-xl">problemStatement:</h2>
                <p className="text-zinc-600 dark:text-zinc-400 text-sm md:text-base leading-relaxed">{users.problemStatement}</p>
              </div>
              <div>
                <h3 className="font-bold md:text-xl">proposedSolution:</h3>
                <p className="text-zinc-600 dark:text-zinc-400 text-sm md:text-base leading-relaxed">{users.proposedSolution}</p>
              </div>

            </div>
          </div>
        </div>
        {/*  */}
        <CommentsPost></CommentsPost>

      </div>
    </div>
  );
};

export default IdeaDetailsPage;