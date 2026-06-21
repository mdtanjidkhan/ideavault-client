import Link from "next/link";
import { LuLightbulb } from "react-icons/lu";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 text-center">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl border border-gray-100 space-y-6">
        
        {/* 404 & Idea Vault Icon */}
        <div className="relative flex justify-center">
          <h1 className="text-9xl font-extrabold text-blue-100 tracking-widest select-none">
            404
          </h1>
          <div className="absolute text-6xl top-8 animate-bounce">
            <LuLightbulb></LuLightbulb>
          </div>
        </div>

        {/* Text Content Updated for IdeaVault */}
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-gray-800">
            Idea Not Found
          </h2>
          <p className="text-gray-500 text-sm leading-relaxed">
            Oops! The idea or page you are looking for doesn't exist, has been removed, or is temporarily unavailable. 
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <Link
            href="/"
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow transition-all text-sm"
          >
            Back to Home
          </Link>
          <Link
            href="/ideas"
            className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-lg transition-all text-sm border border-gray-200"
          >
            Explore Ideas
          </Link>
        </div>

      </div>
    </div>
  );
}