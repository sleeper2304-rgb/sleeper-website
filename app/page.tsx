import { HomeCTA } from "@/components/sections/home/HomeCTA";
import { HomeFeaturedProjects } from "@/components/sections/home/HomeFeaturedProjects";
import { HomeHero } from "@/components/sections/home/HomeHero";
import { HomeProcessPreview } from "@/components/sections/home/HomeProcessPreview";
import { HomeStudioIntro } from "@/components/sections/home/HomeStudioIntro";
import { SectionTransition } from "@/components/ui/SectionTransition";

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <SectionTransition />
      <HomeStudioIntro />
      <SectionTransition />
      <HomeFeaturedProjects />
      <SectionTransition />
      <HomeProcessPreview />
      <SectionTransition />
      <HomeCTA />
    </>
  );
}
