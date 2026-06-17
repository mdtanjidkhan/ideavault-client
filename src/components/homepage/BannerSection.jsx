// "use client";

// import Link from "next/link";
// import { Button } from "@heroui/react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay, EffectFade } from "swiper/modules";

// // Swiper এর স্টাইলসমূহ
// import "swiper/css";
// import "swiper/css/effect-fade";

// export default function BannerSection() {
//   // ব্যাকগ্রাউন্ড ইমেজের অ্যারে সোনা
//   const bgImages = [
//     "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070",
//     "https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=1974",
//     "https://images.unsplash.com/photo-1522071823991-b9671f43c4b9?q=80&w=2070"
//   ];

//   return (
//     <section className="relative w-full h-[550px] md:h-[650px] overflow-hidden bg-black">
      
//       {/* 🖼️ পার্ট ১: ব্যাকগ্রাউন্ড ইমেজ স্লাইডার (Moving Part) */}
//       <div className="absolute inset-0 z-0">
//         <Swiper
//           modules={[Autoplay, EffectFade]}
//           effect={"fade"} // এক ইমেজ থেকে অন্য ইমেজে যাওয়ার সময় ফেড হবে সোনা
//           speed={1500} // ফেড হওয়ার গতি
//           autoplay={{ delay: 4000, disableOnInteraction: false }}
//           loop={true}
//           className="h-full w-full"
//         >
//           {bgImages.map((img, index) => (
//             <SwiperSlide key={index}>
//               <div className="relative w-full h-full">
//                 {/* ইমেজের ওপর কালো আবছা লেয়ার জাতে টেক্সট পরিষ্কার বোঝা যায় লক্ষ্মীটি */}
//                 <div className="absolute inset-0 bg-black/50 md:bg-black/40 z-10"></div>
//                 <img 
//                   src={img} 
//                   alt={`Slide ${index}`} 
//                   className="w-full h-full object-cover"
//                 />
//               </div>
//             </SwiperSlide>
//           ))}
//         </Swiper>
//       </div>

//       {/* 🎯 পার্ট ২: ফিক্সড টেক্সট কন্টেন্ট (Static Part - Fixed on top) */}
//       <div className="relative z-20 h-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16 flex items-center">
//         <div className="max-w-3xl flex flex-col gap-6 items-start text-left">
          
//           {/* অ্যানিমেশন সহ ছোট ট্যাগ সোনা */}
//           <span className="text-xs font-bold tracking-[0.2em] text-primary bg-primary/20 backdrop-blur-md border border-primary/30 px-4 py-2 rounded-full uppercase animate-in fade-in zoom-in duration-1000">
//             Next-Gen Innovation
//           </span>

//           {/* প্রধান টাইটেল যা সব স্লাইডে ফিক্সড থাকবে */}
//           <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1] animate-in fade-in slide-in-from-left-8 duration-1000">
//             Shape the <span className="text-primary">Future</span> of Startups
//           </h1>

//           {/* বর্ণনা */}
//           <p className="text-lg md:text-xl text-white/80 leading-relaxed max-w-2xl animate-in fade-in slide-in-from-left-12 duration-1000 delay-150">
//             Ideavault is where visionary founders and strategic investors collide to build industry-disrupting solutions. Explore, pitch, and scale.
//           </p>

//           {/* সিটিএ বাটন */}
//           <div className="flex flex-wrap gap-4 mt-2 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
//             <Button
//               as={Link}
//               href="/ideas"
//               color="primary"
//               size="lg"
//               className="font-bold px-10 h-14 text-md shadow-xl shadow-primary/30 rounded-xl"
//             >
//               Explore Ideas
//             </Button>
            
//             <Button
//               as={Link}
//               href="/categories"
//               variant="bordered"
//               size="lg"
//               className="font-bold px-10 h-14 text-md text-white border-white/30 hover:bg-white/10 rounded-xl backdrop-blur-sm"
//             >
//               Categories
//             </Button>
//           </div>
          
//         </div>
//       </div>

//       {/* ব্যানারের নিচে একটা সুন্দর গ্রাডিয়েন্ট ফেড ইফেক্ট লক্ষ্মীটি */}
//       <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent z-30"></div>
//     </section>
//   );
// }


"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@heroui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-fade";

export default function BannerSection() {
  const [isLightMode, setIsLightMode] = useState(false);

  useEffect(() => {
    // ২. নেববার যখন HTML ট্যাগে 'dark' বা 'light' ক্লাস চেঞ্জ করবে, ব্যানার সেটা ট্র্যাক করবে লক্ষ্মীটি
    const observer = new MutationObserver(() => {
      const isLight = document.documentElement.classList.contains("light") || 
                      !document.documentElement.classList.contains("dark");
      setIsLightMode(isLight);
    });

    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    // শুরুতে একবার চেক করে নেওয়ার জন্য
    const isInitiallyLight = document.documentElement.classList.contains("light") ||  !document.documentElement.classList.contains("dark");
    setIsLightMode(isInitiallyLight);

    return () => observer.disconnect();
  }, []);

  const bgImages = [
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070",
    "https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=1974",
    // "https://images.unsplash.com/photo-1531535934207-95f4cd426223?q=80&w=2070"
    
  ];

  return (
    <section className="relative w-full h-[520px] md:h-[620px] overflow-hidden bg-background transition-colors duration-300">
      
     
      <div className="absolute inset-0 z-0">
        <Swiper
          modules={[Autoplay, EffectFade]}
          effect={"fade"}
          speed={1500}
          autoplay={{ delay: 4500, disableOnInteraction: false }}
          loop={true}
          className="h-full w-full"
        >
          {bgImages.map((img, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full h-full">
                
                <div className={`absolute inset-0 z-10 transition-colors duration-500 ${
                  isLightMode ? "bg-black/65" : "bg-black/45"
                }`}></div>
                
                <img 
                  src={img} 
                  alt={`Startup Slide ${index + 1}`} 
                  className="w-full h-full object-cover"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="relative z-20 h-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16 flex items-center">
        <div className="max-w-3xl flex flex-col gap-5 md:gap-6 items-start text-left">
          
          <span className="text-xs font-bold tracking-[0.2em] text-blue-500 bg-primary/20 backdrop-blur-md border border-primary/30 px-4 py-2 rounded-full uppercase animate-in fade-in zoom-in duration-1000">
            Next-Gen Innovation
          </span>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1] drop-shadow-md animate-in fade-in slide-in-from-left-8 duration-1000">
            Shape the <span  className="text-blue-500">Future</span> of Startups
          </h1>

          <p className="text-base md:text-xl text-zinc-200 leading-relaxed max-w-2xl drop-shadow-sm animate-in fade-in slide-in-from-left-12 duration-1000 delay-150">
            Ideavault is where visionary founders and strategic investors collide to build industry-disrupting solutions. Explore, pitch, and scale.
          </p>

          <div className="flex flex-wrap gap-4 mt-2 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
            <Button
              as={Link}
              href="/ideas"
              color="primary"
              size="lg"
              className="font-bold px-10 h-14 text-md shadow-xl shadow-primary/30 rounded-xl"
            >
              Explore Ideas
            </Button>
            
            <Button
              as={Link}
              href="/categories"
              variant="bordered"
              size="lg"
              className="font-bold px-10 h-14 text-md text-white border-white/40 hover:bg-white/10 rounded-xl backdrop-blur-sm transition-all"
            >
              Categories
            </Button>
          </div>
          
        </div>
      </div>
      <div className={`absolute bottom-0 left-0 w-full h-28 z-30 transition-all duration-500 bg-gradient-to-t to-transparent ${
        isLightMode ? "from-content1" : "from-background"
      }`}></div>
    </section>
  );
}