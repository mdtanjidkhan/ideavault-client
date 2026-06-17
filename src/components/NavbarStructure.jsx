'use client'

import { useState } from "react";
import { Link, Button, Avatar } from "@heroui/react";
import ThemeToggle from "./ThemeToggle";
import { usePathname } from "next/navigation";
import { authClient } from "@/lib/auth-client";


const NavbarStructure = () => {
  const { data: session } = authClient.useSession()

  const user = session?.user
  // console.log(user, 'navber user')
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathName = usePathname();
  const [isOpen, setIsOpen] = useState(false);


  return (

    <nav className="sticky top-0 z-40 w-full border-b border-separator bg-background/70 backdrop-blur-lg">
      <header className=" flex h-16  items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <span className="sr-only">Menu</span>
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
          <div className="flex items-center gap-3">

            <Link href="/" className="font-bold text-2xl  tracking-wide">
              <span className="text-blue-500">IdeaVault</span>
            </Link>
          </div>
        </div>
        <ul className="hidden items-center gap-4 md:flex">
          <li><Link href="/" className={pathName === "/" ? "text-blue-500" : ""}>Home</Link></li>
          <li><Link href="/ideas" className={pathName === "/ideas" ? "text-blue-500" : ""}>Ideas</Link></li>
          {user && (<>
            <li><Link href="/add-idea" className={pathName === "/add-idea" ? "text-blue-500" : ""}>Add Idea</Link></li>
            <li><Link href="/my-ideas" className={pathName === "/my-ideas" ? "text-blue-500" : ""}>My Ideas</Link></li>
            <li><Link href="/my-interactions" className={pathName === "/my-interactions" ? "text-blue-500" : ""}>My Interactions</Link></li>
          </>)}
        </ul>
        <div className=" items-center gap-4 md:flex">
          <ThemeToggle></ThemeToggle>

          {user ? (
            <div className="relative">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 p-0.5 rounded-full hover:ring-4 hover:ring-foreground/5 transition-all focus:outline-none cursor-pointer"
              >

                <Avatar>
                  <Avatar.Image alt="John Doe" src={session?.image
                  } />
                  <Avatar.Fallback >{user.name.charAt(0)}</Avatar.Fallback>
                </Avatar>
              </button>


              {isOpen && (
                <>

                  <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)}></div>

                  <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-xl border border-separator bg-background p-1.5 shadow-xl z-50">
                    <Link
                      href="/my-profile"
                      onClick={() => setIsOpen(false)}
                      className="flex w-full items-center px-3 py-2 text-sm font-medium rounded-lg text-foreground hover:bg-foreground/5 transition-all"
                    >
                      My Profile
                    </Link>


                    <button
                      onClick={async () => await authClient.signOut()}
                      className="flex w-full items-center px-3 py-2 text-sm font-bold rounded-lg text-red-500 hover:bg-red-500/10 transition-all cursor-pointer text-left"
                    >
                      Logout
                    </button>

                  </div>
                </>
              )}
            </div>
          ) : (
            <>
              <div className="mx-3 flex gap-3 items-center">
                <Link href="/login" className="text-foreground font-medium text-sm hover:text-blue-500">Login</Link>
              <Link href="/signup"><Button size="sm" color="primary" className="rounded-md font-medium hover:text-black">Sign Up</Button></Link>
              </div>
            </>
          )}
        </div>
      </header>
      {isMenuOpen && (
        <div className="border-t border-separator md:hidden">
          <ul className="flex flex-col gap-2 p-4">
            <li><Link href="/" className={pathName === "/" ? "text-blue-500" : ""}>Home</Link></li>
            <li><Link href="/ideas" className="hover:text-primary transition-colors">Ideas</Link></li>
            {user && (<>
            <li><Link href="/add-idea" className={pathName === "/add-idea" ? "text-blue-500" : ""}>Add Idea</Link></li>
            <li><Link href="/my-ideas" className={pathName === "/my-ideas" ? "text-blue-500" : ""}>My Ideas</Link></li>
            <li><Link href="/my-interactions" className={pathName === "/my-interactions" ? "text-blue-500" : ""}>My Interactions</Link></li>
          </>)}

          </ul>
        </div>
      )}
    </nav>
  );
};

export default NavbarStructure;