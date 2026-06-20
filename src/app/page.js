import BannerSection from "@/components/homepage/BannerSection";
import HowItWorks from "@/components/homepage/HowItWorks";
import PlatformStats from "@/components/homepage/PlatformStats";
import TrendingIdea from "@/components/homepage/TrendingIdea";


export default function Home() {
  return (
   <>
     <BannerSection></BannerSection>
     <TrendingIdea></TrendingIdea>
     <PlatformStats></PlatformStats>
    <HowItWorks></HowItWorks>
   </>
  );
}
