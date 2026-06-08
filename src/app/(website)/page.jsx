import AboutSection from "@/components/aboutSection/AboutSection";
import ArticalsSection from "@/components/articalsSection/ArticalsSection";
import ContactSection from "@/components/contactSection/ContactSection";
import CourcesSection from "@/components/courcesSection/CourcesSection";
import FaqsSection from "@/components/faqsSection/FaqsSection";
import Features from "@/components/featuresSection/Features";
import HeroSection from "@/components/HeroSection/HeroSection";
import TestimonialsCarousel from "@/components/sliders/TestimonialsCarousel";
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
      <AboutSection />
      <Features />
      <CourcesSection courses={courses} />
      <TestimonialsCarousel testimonials={testimonials} />
      <ArticalsSection articles={articles} />
      <FaqsSection faqs={faqs} />
      <ContactSection />
    </>
  );
}
