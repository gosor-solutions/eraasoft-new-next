import AboutSection from "@/components/aboutSection/AboutSection";
import SyndicateSection from "@/components/syndicateSection/SyndicateSection";
import ArticalsSection from "@/components/articalsSection/ArticalsSection";
import ContactSection from "@/components/contactSection/ContactSection";
import CourcesSection from "@/components/courcesSection/CourcesSection";
import HomeFreeCourses from "@/components/freeCourses/HomeFreeCourses";
import FaqsSection from "@/components/faqsSection/FaqsSection";
import HeroSection from "@/components/HeroSection/HeroSection";
import TestimonialsCarousel from "@/components/sliders/TestimonialsCarousel";
import FadeInSection from "@/components/shared/FadeInSection";
import GraduationProjectsSection from "@/components/studensProjects/GraduationProjectsSection";
import { getHome } from "@/services/Home";
import Parteners from "@/components/partners/Parteners";
import EducationalPartners from "@/components/partners/EducationalPartners";


export default async function HomePage() {
  let data = {};
  try {
    const homeData = await getHome();
    data = homeData?.data || {};
  } catch {}

  const courses = Array.isArray(data?.courses) ? data.courses : [];
  const freeCourses = Array.isArray(data?.freeCourses) ? data.freeCourses : [];
  const articles = data?.articles || [];
  const testimonials = data?.testimonials || [];
  const faqs = data?.faqs || [];
  const studentProjects = data?.studentProjects || [];

  return (
    <>
      <HeroSection />
      <FadeInSection>
        <CourcesSection courses={courses} />
      </FadeInSection>
      <FadeInSection>
        <HomeFreeCourses freeCourses={freeCourses} />
      </FadeInSection>
      <FadeInSection>
        <AboutSection />
      </FadeInSection>
      <FadeInSection>
        <SyndicateSection />
      </FadeInSection>
      <FadeInSection variant="fadeIn" duration={0.6}>
        <GraduationProjectsSection projects={studentProjects} />
      </FadeInSection>
      <FadeInSection variant="fadeIn" duration={0.6}>
        <Parteners />
      </FadeInSection>
      <FadeInSection variant="fadeIn" duration={0.6}>
        <EducationalPartners />
      </FadeInSection>

      {/* <FadeInSection>
        <Features />
      </FadeInSection> */}

      <FadeInSection variant="fadeIn" duration={0.6}>
        <TestimonialsCarousel testimonials={testimonials} />
      </FadeInSection>
      <FadeInSection>
        <ArticalsSection articles={articles} />
      </FadeInSection>
      <FadeInSection>
        <FaqsSection faqs={faqs} />
      </FadeInSection>

      <FadeInSection>
        <ContactSection />
      </FadeInSection>
    </>
  );
}
