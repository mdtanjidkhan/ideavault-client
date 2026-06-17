import Link from "next/link";
import { Button } from "@heroui/react";
import { LogoFacebook } from "@gravity-ui/icons";

export default function Footer() {
  return (
    <footer className="w-full bg-background border-t border-divider py-12 px-6 md:px-12 lg:px-16 mt-auto">
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
        
   
        <div className="flex flex-col gap-3">
          <Link href="/" className="font-bold text-2xl text-primary tracking-wide">
            IdeaVault
          </Link>
          <p className="text-sm text-default-500 leading-relaxed max-w-xs">
            Share, explore, and cultivate groundbreaking ideas with a global community of innovators. Your vault of endless possibilities.
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <h4 className="font-semibold text-sm tracking-wider uppercase text-default-400">
            Platform
          </h4>
          <div className="flex flex-col gap-2 font-medium text-sm text-default-600">
            <Link href="/ideas" className="hover:text-primary transition-colors w-fit">Browse Ideas</Link>
            <Link href="/categories" className="hover:text-primary transition-colors w-fit">Categories</Link>
            <Link href="/add-idea" className="hover:text-primary transition-colors w-fit">Add New Idea</Link>
            <Link href="/trending" className="hover:text-primary transition-colors w-fit">Trending Ideas</Link>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <h4 className="font-semibold text-sm tracking-wider uppercase text-default-400">
            Contact Info
          </h4>
          <div className="flex flex-col gap-2 font-medium text-sm text-default-600">
            <p className="flex items-center gap-2">
              📧 <span>support@ideavault.com</span>
            </p>
            <p className="flex items-center gap-2">
               <span>Sirajganj, Bangladesh</span>
            </p>
            <p className="text-xs text-default-400 mt-1">
              Available: Mon - Fri, 9AM - 6PM
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <h4 className="font-semibold text-sm tracking-wider uppercase text-default-400">
            Follow Us
          </h4>
          <p className="text-sm text-default-500 mb-1">
            Stay connected with our latest updates.
          </p>
          
          <div className="flex items-center gap-2">
            <Button isIconOnly variant="flat" size="sm" color="primary" className="text-lg">
              <LogoFacebook></LogoFacebook>
            </Button>
            <Button isIconOnly variant="flat" size="sm" color="primary" className="text-lg">
              
            </Button>
            <Button isIconOnly variant="flat" size="sm" color="primary" className="text-lg">
              
            </Button>
            <Button isIconOnly variant="flat" size="sm" color="primary" className="text-lg">
              
            </Button>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto border-t border-divider pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-default-400">
        <p>
          &copy; {new Date().getFullYear()} IdeaVault. All rights reserved.
        </p>
        <div className="flex gap-4">
          <Link href="/privacy" className="hover:underline">Privacy Policy</Link>
          <Link href="/terms" className="hover:underline">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}


