import Image from "next/image";
import Link from "next/link";
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

function GearIcon() {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <path
        d="M50 62.5C56.9036 62.5 62.5 56.9036 62.5 50C62.5 43.0964 56.9036 37.5 50 37.5C43.0964 37.5 37.5 43.0964 37.5 50C37.5 56.9036 43.0964 62.5 50 62.5Z"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M80.7 62.4C80.1 63.6 79.9 64.9 80.2 66.2L82.3 76.5C82.6 78.1 82 79.7 80.8 80.8L75.2 86.4C74.1 87.5 72.6 88.1 71 87.9L60.7 86.8C59.4 86.6 58.1 87 57 87.8L48.4 93.8C47.1 94.7 45.4 94.7 44.1 93.8L35.5 87.8C34.4 87 33.1 86.6 31.8 86.8L21.5 87.9C19.9 88.1 18.4 87.5 17.3 86.4L11.7 80.8C10.6 79.7 10 78.1 10.2 76.5L11.3 66.2C11.5 64.9 11.2 63.6 10.4 62.5L4.4 53.9C3.5 52.6 3.5 50.9 4.4 49.6L10.4 41C11.2 39.9 11.5 38.6 11.3 37.3L10.2 27C10 25.4 10.6 23.8 11.7 22.7L17.3 17.1C18.4 16 19.9 15.4 21.5 15.6L31.8 16.7C33.1 16.9 34.4 16.5 35.5 15.7L44.1 9.7C45.4 8.8 47.1 8.8 48.4 9.7L57 15.7C58.1 16.5 59.4 16.9 60.7 16.7L71 15.6C72.6 15.4 74.1 16 75.2 17.1L80.8 22.7C81.9 23.8 82.5 25.4 82.3 27L81.2 37.3C81 38.6 81.3 39.9 82.1 41L88.1 49.6C89 50.9 89 52.6 88.1 53.9L80.7 62.4Z"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function WrenchIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <path
        d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function MaintenancePage({ settings, message }) {
  const logo = "/logo.png";
  const social = settings?.social_links ?? {};
  const siteName = settings?.site_name ?? "إيراسوفت";
  const contactPhone = "201099796489";

  const mainMessage = message ?? "الموقع حالياً تحت الصيانة، سنعود قريباً.";

  const socialIcons = [
    { href: social.facebook, icon: <FaFacebook />, label: "فيسبوك" },
    { href: social.youtube, icon: <FaYoutube />, label: "يوتيوب" },
    { href: social.linkedin, icon: <FaLinkedin />, label: "لينكدإن" },
    { href: social.instagram, icon: <FaInstagram />, label: "إنستجرام" },
    { href: social.x, icon: <FaXTwitter />, label: "إكس" },
  ].filter((s) => Boolean(s.href));

  return (
    <main
      className="min-h-screen flex flex-col items-center justify-between relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #0C1739 0%, #0d1f4a 50%, #0C1739 100%)" }}
      dir="rtl">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute rounded-full opacity-10"
          style={{
            width: 600,
            height: 600,
            top: -200,
            right: -150,
            background: "radial-gradient(circle, #2243a4 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute rounded-full opacity-10"
          style={{
            width: 500,
            height: 500,
            bottom: -150,
            left: -100,
            background: "radial-gradient(circle, #2243a4 0%, transparent 70%)",
          }}
        />
        {/* نقاط شبكية */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <header className="w-full px-6 py-6 flex justify-center relative z-10">
        <Image src={logo} alt={`شعار ${siteName}`} width={150} height={50} className="h-12 w-auto" unoptimized={logo.startsWith("http")} />
      </header>

      <section className="flex-1 flex flex-col items-center justify-center px-6 py-12 relative z-10 text-center max-w-2xl mx-auto w-full">
        <div className="relative flex items-center justify-center mb-10">
          <div
            className="text-[#2243a4] opacity-80"
            style={{
              width: 120,
              height: 120,
              animation: "spin 8s linear infinite",
            }}>
            <GearIcon />
          </div>

          <div
            className="absolute text-[#E6C238] opacity-90"
            style={{
              width: 60,
              height: 60,
              top: -10,
              left: -10,
              animation: "spin 5s linear infinite reverse",
            }}>
            <GearIcon />
          </div>

          <div className="absolute text-white" style={{ width: 40, height: 40 }}>
            <WrenchIcon />
          </div>
        </div>

        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-6"
          style={{ background: "rgba(34, 67, 164, 0.25)", border: "1px solid rgba(34, 67, 164, 0.4)", color: "#93b4ff" }}>
          <span className="w-2 h-2 rounded-full bg-[#E6C238]" style={{ animation: "pulse 2s ease-in-out infinite" }} />
          جارٍ العمل على تحسين الموقع
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
          الموقع تحت
          <span className="relative inline-block mx-3">
            <span className="text-[#E6C238]">الصيانة</span>
            <svg className="absolute -bottom-2 left-0 right-0 w-full" height="6" viewBox="0 0 100 6" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 5 Q25 0 50 3 Q75 6 100 1" stroke="#E6C238" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.7" />
            </svg>
          </span>
        </h1>

        <p className="text-base sm:text-lg leading-relaxed mb-10 max-w-xl" style={{ color: "#a8bbd4" }}>
          {mainMessage}
        </p>

        <div className="w-full max-w-sm h-1.5 rounded-full mb-10 overflow-hidden" style={{ background: "rgba(255,255,255,0.1)" }}>
          <div
            className="h-full rounded-full"
            style={{
              background: "linear-gradient(90deg, #2243a4, #E6C238, #2243a4)",
              backgroundSize: "200% 100%",
              animation: "shimmer 2s linear infinite",
              width: "60%",
            }}
          />
        </div>

        {contactPhone && (
          <a
            href={`https://wa.me/${contactPhone.replace(/\D/g, "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-3.5 rounded-2xl font-semibold text-white transition-transform hover:scale-105 active:scale-95"
            style={{ background: "linear-gradient(135deg, #2243a4, #1a35a0)" }}>
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            تواصل معنا على واتساب
          </a>
        )}
      </section>

      {/* الفوتر */}
      <footer className="w-full px-6 py-8 relative z-10" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        <div className="max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm" style={{ color: "#5a7a9e" }}>
            © {new Date().getFullYear()} {siteName}. جميع الحقوق محفوظة.
          </p>

          {socialIcons.length > 0 && (
            <div className="flex items-center gap-3">
              {socialIcons.map(({ href, icon, label }) => (
                <Link
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-full flex items-center justify-center text-sm transition-all hover:scale-110"
                  style={{
                    background: "rgba(34, 67, 164, 0.2)",
                    color: "#93b4ff",
                    border: "1px solid rgba(34, 67, 164, 0.3)",
                  }}>
                  {icon}
                </Link>
              ))}
            </div>
          )}
        </div>
      </footer>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.8); }
        }
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </main>
  );
}
