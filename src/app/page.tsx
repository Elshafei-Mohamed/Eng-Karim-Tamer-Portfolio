import { HeroSection } from "@/components/sections/hero-section";
import { ProofSection } from "@/components/sections/proof-section";
import { WorkSection } from "@/components/sections/work-section";
import { ExperienceSection } from "@/components/sections/experience-section";
import { TeachingSection } from "@/components/sections/teaching-section";
import { AboutSection } from "@/components/sections/about-section";
import { ContactSection } from "@/components/sections/contact-section";


const RHYTHM = "mt-[72px] md:mt-[96px] lg:mt-[160px]";

export default function HomePage(): React.ReactElement {
  return (
    <main id="main-content" className="page-enter flex-1">
      <HeroSection />
      <ProofSection className={RHYTHM} />
      <WorkSection className={RHYTHM} />
      <ExperienceSection className={RHYTHM} />
      <TeachingSection className={RHYTHM} />
      <AboutSection className={RHYTHM} />
      <ContactSection className={RHYTHM} />
    </main>
  );
}
