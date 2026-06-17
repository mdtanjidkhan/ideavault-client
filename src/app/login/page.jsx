'use client'
import { authClient } from "@/lib/auth-client";
import { redirect, useRouter } from "next/navigation";
// import { redirect } from "next/dist/server/api-utils";
import { Form, TextField, Label, Input, FieldError, Description, Button } from "react-aria-components";
import toast from "react-hot-toast";

export default function LoginPage() {
      const router = useRouter();
   const handleLoginSubmit = async(e)=>{
     e.preventDefault();
     const formData = new FormData(e.currentTarget)
       const user = Object.fromEntries(formData.entries());
       try{
        const {data,error} = await authClient.signIn.email({
        email:user.email,
        password: user.password
       })
        if(error){
          toast.error(error.message || "Invalid email or password!")
          return;
        }
        if(data){
          toast.success("Welcome back! Login successful");
          setTimeout(()=>{
            router.push("/")
          },1000)
        }
       } catch(err){
        console.error("Loign error",err);
        toast.error("Something went wrong. Please try again.");
       }
   }  
   const handleGoogleLogin = async() =>{
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
      <div className="w-full max-w-md bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 md:p-8 shadow-xl space-y-6">
        
        <div className="text-center space-y-1.5">
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-zinc-950 dark:text-white">
            Welcome Back
          </h2>
          <p className="text-xs md:text-sm text-zinc-500 dark:text-zinc-400">
            Please enter your details to sign in
          </p>
        </div>

        <Form onSubmit={handleLoginSubmit} className="flex flex-col gap-4">
          
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
              Email Address <span className="text-red-500">*</span>
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
              Password <span className="text-red-500">*</span>
            </Label>
            <Input 
              placeholder="Enter your password" 
              className="w-full h-11 px-4 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
            <p className="text-[11px] text-zinc-400 dark:text-zinc-500 leading-normal">
              Must be at least 8 characters with 1 uppercase and 1 number
            </p>
            <FieldError className="text-xs font-semibold text-red-500 mt-1" />
          </TextField>
          <div className="flex gap-2 mt-2">
            <Button 
              type="submit" 
              className="w-full h-11 bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 hover:bg-blue-600 dark:hover:bg-blue-600 hover:text-white dark:hover:text-white font-bold text-sm rounded-xl shadow-md transition-all active:scale-98 cursor-pointer flex items-center justify-center"
            >
              Login
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
        <Button onClick={handleGoogleLogin}
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
  );
}