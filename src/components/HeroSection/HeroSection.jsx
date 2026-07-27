"use client";
import { useState, useEffect, useRef } from "react";
import Styles from "./HeroSection.module.css";
import HeroImage from "./HeroImage";
import LineSvg from "../shared/LineSvg";
import MainButton from "../mainBtn/MainButton";
import { BookOpen, Users } from "lucide-react";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className={`${Styles.heroSec} lg:min-h-screen`}>
      <div className="px-5 sm:px-8 max-w-350 mx-auto">
        <div className="grid grid-cols-12 lg:min-h-screen">
          <div className="col-span-12 lg:col-span-6 order-1 lg:order-2 flex flex-col justify-center text-right pt-20 sm:pt-24 lg:pt-0 pb-12 sm:pb-16 lg:pb-0" dir="rtl">
            <div className={`${Styles.hero_head} mb-4 sm:mb-6`}>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[56px] text-white font-bold leading-[1.4] lg:leading-[1.3]">
                خطوتك الأولى نحو النجاح <br /> تبدأ مع{" "}
                <span className="relative inline-block pb-5">
                  EraaSoft
                  <span className="absolute bottom-0 left-0 right-0">
                    <LineSvg colorOne={"#E6C238"} colorTwo={"#806C1F"} svgId={"paint0_linear"} svgWidth="160" svgHeight="18" strokeWidth="6" />
                  </span>
                </span>
              </h1>
            </div>

            <div className={`${Styles.description} mb-6 sm:mb-8 md:mb-10`}>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-200 max-w-2xl leading-relaxed">
                ابدأ رحلتك في البرمجة، تحليل البيانات، والذكاء الاصطناعي مع مسارات تعليمية متخصصة ومشاريع عملية تؤهلك لسوق العمل.
              </p>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-yellow-400 mt-4 font-bold  max-w-2xl">#بنساعدك_توصل _لحلمك</p>
            </div>

            <div className={`${Styles.hero_buttons} flex flex-wrap items-center gap-3 sm:gap-4 mb-6 sm:mb-9`}>
              <MainButton text={"ابدأ التعلم الآن"} />
              <Link href="/training-services">
                <button className="bg-transparent border border-gray-400 hover:border-white hover:bg-white/5 text-white font-medium py-3 sm:py-3.5 px-6 sm:px-8 rounded-full transition-all flex items-center gap-3 text-sm sm:text-base lg:text-lg cursor-pointer">
                  تدريب الشركات
                </button>
              </Link>
            </div>

            <div className="flex flex-wrap items-center gap-5 sm:gap-8 md:gap-10 lg:gap-16 py-4 sm:py-6 md:py-8">
              <StatItem icon={<BookOpen size={18} />} value="+200" label="كورس" />
              <StatItem icon={<Users size={18} />} value="+10,000" label="طالب نشط" />
              <StatItem icon={<Users size={18} />} value="+50" label="مدرب" />
            </div>
          </div>

          {/* ── Hero image ── */}
          <HeroImage />
        </div>
      </div>
    </section>
  );
}

function StatItem({ icon, value, label }) {
  const prefix = value.match(/^[^0-9]*/)[0];
  const target = parseInt(value.replace(/[^0-9]/g, ""), 10);

  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    const duration = 2000;
    const startTime = performance.now();
    let rafId;

    const step = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) {
        rafId = requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };

    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [started, target]);

  return (
    <div ref={ref} className="flex items-center gap-3 sm:gap-4">
      <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-full bg-[#161e31] border border-[#2a344a] flex items-center justify-center text-[#cfa856] shadow-lg shrink-0">{icon}</div>
      <div className="flex flex-col">
        <span className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-0.5" dir="ltr">
          {prefix}
          {count.toLocaleString("en-US")}
        </span>
        <span className="text-xs sm:text-sm md:text-base text-gray-400">{label}</span>
      </div>
    </div>
  );
}
