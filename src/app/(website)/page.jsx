import AboutSection from "@/components/aboutSection/AboutSection";
import ArticalsSection from "@/components/articalsSection/ArticalsSection";
import ContactSection from "@/components/contactSection/ContactSection";
import CourcesSection from "@/components/courcesSection/CourcesSection";
import FaqsSection from "@/components/faqsSection/FaqsSection";
import Features from "@/components/featuresSection/Features";
import HeroSection from "@/components/HeroSection/HeroSection";
import TestimonialsCarousel from "@/components/sliders/TestimonialsCarousel";
import FadeInSection from "@/components/shared/FadeInSection";
import GraduationProjectsSection from "@/components/studensProjects/GraduationProjectsSection";
import { getHome } from "@/services/Home";

export default async function HomePage() {
  let data = {};
  try {
    const homeData = await getHome();
    data = homeData?.data || {};
  } catch {}

  const courses = Array.isArray(data?.courses) ? data.courses : [];
  const articles = data?.articles || [];
  const testimonials = data?.testimonials || [];
  const faqs = data?.faqs || [];

  return (
    <>
      <HeroSection />
      <FadeInSection>
        <AboutSection />
      </FadeInSection>
      <FadeInSection>
        <Features />
      </FadeInSection>
      <FadeInSection>
        <CourcesSection courses={courses} />
      </FadeInSection>
      <FadeInSection variant="fadeIn" duration={0.6}>
        <TestimonialsCarousel testimonials={testimonials} />
      </FadeInSection>
      <FadeInSection>
        <ArticalsSection articles={articles} />
      </FadeInSection>
      <FadeInSection>
        <FaqsSection faqs={faqs} />
      </FadeInSection>
      <FadeInSection variant="fadeIn" duration={0.6}>
        <GraduationProjectsSection />
      </FadeInSection>
      <FadeInSection>
        <ContactSection />
      </FadeInSection>
    </>
  );
}
