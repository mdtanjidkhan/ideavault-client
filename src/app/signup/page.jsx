'use client'
import { Form, TextField, Label, Input, FieldError, Button } from "react-aria-components"; 
// import { Check } from "lucide-react"; 
import { Description } from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
     const router = useRouter();
    const onSubmit = async(e)=>{
     e.preventDefault();
     const formData = new FormData(e.currentTarget)
       const user = Object.fromEntries(formData.entries());
       console.log(user,'data users')
       const {data, error} = await authClient.signUp.email({
         name:user.name,
         email: user.email,
         image:user.image,
         password:user.password
       })
       if(error){
        toast.error(error.message || "Something went wrong!")
        return;
       }
       if(data || !error){
        toast.success("Account created successfully! Welcome aboard");
        router.push("/login")
       }
    }
    const handleGoogleSignup = async() =>{
       try{
               await authClient.signIn.social({
               provider: "google",
               callbackURL:"/"
             })
              toast.success("Redirecting to Google...")
             } catch(err){
               console.error("Google login error:", err);
             toast.error("Google login failed. Try again!");
             }
    }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center p-4 transition-colors duration-300">
      <div className="mx-auto my-8 w-full max-w-md">
        
        <div className="space-y-2 mb-6">
          <h2 className="text-center font-bold text-2xl md:text-3xl tracking-tight text-zinc-950 dark:text-white">
            Create Account
          </h2>
          <p className="text-center font-medium text-sm text-zinc-400 dark:text-zinc-500">
            Start your adventure with Wanderlust
          </p>
        </div>
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 md:p-8 shadow-xl space-y-6">
          
          <Form onSubmit={onSubmit} className="flex flex-col gap-4">
            
            <TextField
              isRequired
              name="name"
              type="text"
              className="flex flex-col gap-1.5"
            >
              <Label className="text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
                Name
              </Label>
              <Input 
                placeholder="Enter Your Name" 
                className="w-full h-11 px-4 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
              <FieldError className="text-xs font-semibold text-red-500 mt-1" />
            </TextField>
            <TextField
              isRequired
              name="image"
              type="url"
              className="flex flex-col gap-1.5"
            >
              <Label className="text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
                Image URL
              </Label>
              <Input 
                placeholder="Enter Your Image URL" 
                className="w-full h-11 px-4 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
              <FieldError className="text-xs font-semibold text-red-500 mt-1" />
            </TextField>

            <TextField
              isRequired
              name="email"
              type="email"
              className="flex flex-col gap-1.5"
              validate={(value) => {
                if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                  return "Please enter a valid email address";
                }
                return null;
              }}
            >
              <Label className="text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
                Email
              </Label>
              <Input 
                placeholder="john@example.com" 
                className="w-full h-11 px-4 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
              <FieldError className="text-xs font-semibold text-red-500 mt-1" />
            </TextField>
            <TextField
              isRequired
              minLength={8}
              name="password"
              type="password"
              className="flex flex-col gap-1.5"
              validate={(value) => {
                if (value.length < 8) {
                  return "Password must be at least 8 characters";
                }
                if (!/[A-Z]/.test(value)) {
                  return "Password must contain at least one uppercase letter";
                }
                if (!/[0-9]/.test(value)) {
                  return "Password must contain at least one number";
                }
                return null;
              }}
            >
              <Label className="text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
                Password
              </Label>
              <Input 
                placeholder="Enter your password" 
                className="w-full h-11 px-4 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
              <Description className="text-[11px] text-zinc-400 dark:text-zinc-500 leading-normal">
                Must be at least 8 characters with 1 uppercase and 1 number
              </Description>
              <FieldError className="text-xs font-semibold text-red-500 mt-1" />
            </TextField>
            <div className="flex gap-2 mt-2">
              <Button 
                type="submit" 
                className="w-full h-11 bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 hover:bg-blue-600 dark:hover:bg-blue-600 hover:text-white dark:hover:text-white font-bold text-sm rounded-xl shadow-md transition-all active:scale-98 cursor-pointer flex items-center justify-center gap-2"
              >
                {/* <Check className="w-4 h-4" /> */}
                Create Account
              </Button>
            </div>
          </Form>

          <div className="relative flex py-1 items-center">
            <div className="flex-grow border-t border-zinc-200 dark:border-zinc-800"></div>
            <span className="flex-shrink mx-4 text-zinc-400 dark:text-zinc-500 text-xs font-bold uppercase tracking-wider">
              OR
            </span>
            <div className="flex-grow border-t border-zinc-200 dark:border-zinc-800"></div>
          </div>
          <Button
             onClick={handleGoogleSignup}
            className="w-full h-11 inline-flex items-center justify-center gap-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-sm font-bold text-zinc-700 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-700/50 shadow-sm active:scale-98 transition-all cursor-pointer"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#EA4335"
                d="M5.266 9.765A7.077 7.077 0 0112 4.909c1.69 0 3.218.6 4.418 1.582L19.91 3C17.782 1.145 15.055 0 12 0 7.33 0 3.33 2.69 1.34 6.62l3.926 3.145z"
              />
              <path
                fill="#4285F4"
                d="M23.49 12.275c0-.818-.073-1.609-.21-2.373H12v4.51h6.464a5.53 5.53 0 01-2.4 3.636l3.745 2.9A11.91 11.91 0 0023.49 12.275z"
              />
              <path
                fill="#FBBC05"
                d="M5.266 14.235L1.34 17.38A11.95 11.95 0 0012 24c3.055 0 5.782-1.145 7.91-3l-3.745-2.9a7.04 7.04 0 01-4.165 1.21c-3.145 0-5.836-2.182-6.734-5.075z"
              />
              <path
                fill="#34A853"
                d="M1.34 6.62a11.95 11.95 0 000 10.76l3.926-3.145a7.04 7.04 0 010-4.47L1.34 6.62z"
              />
            </svg>
            <span>Continue with Google</span>
          </Button>

        </div>
      </div>
    </div>
  );
}