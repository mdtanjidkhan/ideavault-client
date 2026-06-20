'use client'
import IdeaAllCard from "@/components/ideas/IdeaAllCard";
import { authClient } from "@/lib/auth-client";
import { Button } from "@heroui/react";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
const IdeaPage = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState("all");

  useEffect(() => {
    loadUsers();
  }, [selectedCategory]);

  const loadUsers = async () => {

    let url = (`http://localhost:5000/users`);
    const queryParams = [];

    // category
    if (selectedCategory !== "all") {
      queryParams.push(
        `category=${selectedCategory}`
      );
    }

    // search
    if (search) {
      queryParams.push(`search=${search}`);
    }

    if (queryParams.length > 0) {
      url += `?${queryParams.join("&")}`;
    }
    const { data: tokenData } = await authClient.token();
    const res = await fetch(url, {
      headers: {
        authorization: `Bearer ${tokenData?.token}`
      }
    });
    const data = await res.json();
    setUsers(data);
    console.log(data)
  };

  return (
    <div>
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          {/* header section */}
          <div className="mb-10 text-left">
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-zinc-950 dark:text-white">
              Explore Visionary <span className="text-blue-600">Ideas</span>
            </h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2">
              Discover and filter through industry-disrupting startup solutions.
            </p>
          </div>
          {/*  */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 sm:p-5 rounded-2xl shadow-sm mb-10 flex flex-col md:flex-row gap-4">

            <div className="w-full flex items-center gap-2">

              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Search ideas by title..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full h-11 pl-10 pr-4 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                />

                <span className="absolute left-3.5 top-3 text-zinc-400 dark:text-zinc-500 text-sm"><FaSearch />
                </span>
              </div>
              <Button onClick={loadUsers}
                type="button"
                className="h-11 px-5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-md shadow-blue-500/10 hover:shadow-blue-500/20 active:scale-95 transition-all flex items-center justify-center gap-1.5 whitespace-nowrap"
              >
                <span>Search</span>
              </Button>
            </div>
            <div className="">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="h-11 px-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white text-zinc-900  text-sm cursor-pointer focus:outline-none focus:border-blue-500 transition-all"
              >
                <option value="all">All Categories</option>
                <option value="tech">Tech</option>
                <option value="health">Health</option>
                <option value="ai">AI</option>
                <option value="education">Education</option>
                <option value="finance">Finance</option>
                <option value="environment">Environment</option>
              </select>
            </div>
          </div>
          {
            users.length === 0 ? (
              <div className="text-center py-20 text-zinc-500">
                No ideas found matching your criteria..
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {
                  users.map(user => <IdeaAllCard key={user._id} user={user}></IdeaAllCard>)
                }

              </div>
            )
          }
          {/*  */}
        </div>
      </div>

    </div>
  );
};

export default IdeaPage;