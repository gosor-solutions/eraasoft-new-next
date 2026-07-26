"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { Printer, Calendar, ShieldCheck, Download } from "lucide-react";
import { cairo, redHatDisplay } from "@/lib/font";

export default function CertificateViewer({
  studentName = "اسم الطالب",
  courseName = "اسم الدورة التدريبية",
  serialNumber = "ERA-FC-XXXX-XXXXXXXX",
  issuedDate = "",
}) {
  const certificateRef = useRef(null);

  const handlePrint = () => {
    if (typeof window === "undefined") return;
    const printContent = certificateRef.current?.innerHTML;
    const originalContent = document.body.innerHTML;

    // Open a simple print window
    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
      <html>
        <head>
          <title>طباعة الشهادة - ${studentName}</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;700;900&family=Outfit:wght@200;300;400;500;700;800&family=Red+Hat+Display:wght@300;400;500;700&display=swap');
            body {
              margin: 0;
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100vh;
              background-color: #fff;
              font-family: 'Outfit', system-ui, -apple-system, sans-serif;
            }
            .cert-print-container {
              position: relative;
              width: 100%;
              max-width: 1120px;
              aspect-ratio: 1.414; /* A4 Landscape */
              overflow: hidden;
              font-family: 'Outfit', sans-serif;
              text-transform: uppercase;
            }
            .cert-img {
              width: 100%;
              height: 100%;
              object-fit: contain;
            }
            .cert-text {
              position: absolute;
              text-align: center;
              font-weight: bold;
              color: #1a2a5e;
              font-family: 'Outfit', sans-serif;
            }
            .watermark {
              position: absolute;
              bottom: 10%;
              left: 50%;
              transform: translateX(-50%);
              opacity: 0.5;
              width: 150px;
              height: 150px;
              pointer-events: none;
            }
            .student-name {
              top: 40%;
              left: 0;
              right: 0;
              font-size: 2.5rem;
              font-weight: bold;
              font-family: 'Cairo', sans-serif;
            }
            .completion-msg {
              top: 50%;
              left: 0;
              right: 0;
              font-size: 1.15rem;
              color: #6b7280 !important;
              font-weight: 500;
              font-family: 'Red Hat Display', sans-serif;
            }
            .course-name {
              top: 55%;
              left: 0;
              right: 0;
              font-size: 1.8rem;
              font-weight: bold;
              font-family: 'Cairo', sans-serif;
            }
            .ceo-section {
              position: absolute;
              bottom: 17%;
              right: 21.5%;
              text-align: center;
              font-family: 'Red Hat Display', sans-serif;
            }
            .ceo-title {
              color: #6b7280;
              font-weight: bold;
            }
            .ceo-name {
              font-size: 1.1rem;
              color: #1a2a5e;
              font-weight: bold;
              margin-top: 10px;
            }
            .issue-section {
              position: absolute;
              bottom: 17%;
              left: 25%;
              text-align: center;
              font-family: 'Red Hat Display', sans-serif;
            }
            .issue-title {
              color: #6b7280;
              font-weight: bold;
            }
            .issue-val {
              font-size: 1.1rem;
              color: #1a2a5e;
              font-weight: bold;
              margin-top: 10px;
            }
            .serial-no {
              position: absolute;
              bottom: 7%;
              left: 8%;
              font-size: 0.85rem;
              font-family: 'Red Hat Display', sans-serif;
              color: #9ca3af;
              font-weight: bold;
            }
            @media print {
              @page {
                size: landscape;
                margin: 0;
              }
              body {
                background: none;
              }
            }
          </style>
        </head>
        <body onload="window.print(); window.close();">
          <div class="cert-print-container" dir="ltr">
            <img src="/certificate-base.png" class="cert-img" />
            <img src="/cert-logo.png" class="watermark" />
            <div class="cert-text student-name">${studentName}</div>
            <div class="cert-text completion-msg">for successfully completing the course:</div>
            <div class="cert-text course-name">${courseName}</div>
            <div class="ceo-section">
              <div class="ceo-title">CEO</div>
              <div class="ceo-name">Mostafa Mahfouz</div>
            </div>
            ${
              issuedDate
                ? `
            <div class="issue-section">
              <div class="issue-title">Issue Date</div>
              <div class="issue-val">${issuedDate}</div>
            </div>
            `
                : ""
            }
            <div class="serial-no">Serial: ${serialNumber}</div>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div className="space-y-6 w-full max-w-4xl mx-auto" style={{ fontFamily: "'Outfit', sans-serif" }}>
      {/* Visual representation of the Certificate */}
      <div
        ref={certificateRef}
        className="relative w-full aspect-[1.414] bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 select-none print:shadow-none print:border-none uppercase"
        dir="ltr"
      >
        {/* Certificate base template */}
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="/certificate-base.png"
            alt="Certificate Template"
            fill
            priority
            className="object-contain"
          />
        </div>

        {/* Watermark Logo between Date & CEO */}
        <div className="absolute left-1/2 bottom-[10%] -translate-x-1/2 w-[120px] h-[120px] opacity-[0.55] z-10 pointer-events-none">
          <Image
            src="/cert-logo.png"
            alt="Watermark Logo"
            fill
            className="object-contain"
          />
        </div>

        {/* Dynamic Name Overlay */}
        <div
          className={`absolute left-0 right-0 text-center text-[#1f2d5a] select-text z-10 font-bold ${cairo.className}`}
          style={{ top: "37%", fontSize: "clamp(1.2rem, 3.5vw, 2.5rem)" }}
        >
          {studentName}
        </div>

        {/* Completion Message */}
        <div
          className={`absolute left-0 right-0 text-center select-text z-10 font-medium ${redHatDisplay.className}`}
          style={{ top: "49%", fontSize: "clamp(0.6rem, 1.8vw, 1.15rem)" }}
        >
          for successfully completing the course:
        </div>

        {/* Dynamic Course Overlay */}
        <div
          className={`absolute left-0 right-0 text-center text-[#24356e] select-text z-10 font-bold ${cairo.className}`}
          style={{ top: "55%", fontSize: "clamp(0.9rem, 2.6vw, 1.8rem)" }}
        >
          {courseName}
        </div>

        {/* CEO Section Overlay */}
        <div className={`absolute right-[20%] bottom-[16%] text-center z-10 ${redHatDisplay.className}`}>
          <div
            className="text-[#6b7280] font-bold"
            style={{ fontSize: "clamp(0.5rem, 1.3vw, 0.9rem)" }}
          >
            CEO
          </div>
          <div
            className="text-[#1f2d5a] font-bold mt-2.5"
            style={{ fontSize: "clamp(0.6rem, 1.6vw, 1.1rem)" }}
          >
            Mostafa Mahfouz
          </div>
        </div>

        {/* Issue Date Overlay */}
        {issuedDate && (
          <div className={`absolute left-[25%] bottom-[16%] text-center z-10 ${redHatDisplay.className}`}>
            <div
              className="text-[#6b7280] font-bold"
              style={{ fontSize: "clamp(0.5rem, 1.3vw, 0.9rem)" }}
            >
              Issue Date
            </div>
            <div
              className="text-[#1f2d5a] font-bold mt-2.5"
              style={{ fontSize: "clamp(0.6rem, 1.6vw, 1.1rem)" }}
            >
              {issuedDate}
            </div>
          </div>
        )}

        {/* Serial Number Overlay */}
        <div
          className={`absolute left-[8%] bottom-[6%] text-[#9ca3af] select-text font-bold z-10 ${redHatDisplay.className}`}
          style={{ fontSize: "clamp(0.5rem, 1.3vw, 0.85rem)" }}
        >
          Serial: {serialNumber}
        </div>
      </div>

      {/* Control Buttons */}
      <div className="flex flex-wrap gap-4 justify-center items-center">
        <button
          onClick={handlePrint}
          className="flex items-center gap-2 px-6 py-3 bg-[#2243A4] hover:bg-[#19327D] text-white font-bold rounded-xl transition-all shadow-md hover:shadow-lg"
        >
          <Printer size={18} />
          طباعة أو تحميل PDF
        </button>

        <div className="flex items-center gap-2 text-sm text-gray-500 bg-gray-50 px-4 py-2.5 rounded-lg border border-gray-200">
          <ShieldCheck className="text-emerald-500" size={16} />
          <span>شهادة موثقة من إيراسوفت</span>
        </div>
      </div>
    </div>
  );
}
