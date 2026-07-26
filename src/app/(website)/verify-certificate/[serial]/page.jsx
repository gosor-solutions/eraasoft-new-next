"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { verifyCertificate } from "@/services/Certificates";
import CertificateViewer from "@/components/eraaCertificate/CertificateViewer";
import Loading from "@/components/shared/Loading";
import { ShieldCheck, ShieldAlert, Award } from "lucide-react";
import Link from "next/link";

export default function VerifyCertificatePage() {
  const params = useParams();
  const serial = params?.serial;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [certData, setCertData] = useState(null);

  useEffect(() => {
    if (!serial) return;
    setLoading(true);
    verifyCertificate(serial)
      .then((res) => {
        if (res.success && res.data) {
          setCertData(res.data);
          setError(null);
        } else {
          setError("الشهادة غير صحيحة أو غير موجودة");
        }
      })
      .catch((err) => {
        setError(err?.message || "الشهادة غير صحيحة أو غير موجودة");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [serial]);

  if (loading) {
    return <Loading minHeight="min-h-screen bg-gray-50" />;
  }

  return (
    <div dir="rtl" className="bg-[#FAFAFA] min-h-screen py-16 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="text-center space-y-3">
          <div className="inline-flex p-3 bg-blue-50 rounded-full text-[#2243A4] mb-2">
            <Award size={36} />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900">
            التحقق من صحة الشهادة
          </h1>
          <p className="text-gray-500 max-w-md mx-auto text-sm sm:text-base">
            تأكد من موثوقية وصحة الشهادات الصادرة من منصة إيراسوفت التعليمية
          </p>
        </div>

        {error ? (
          /* Error State */
          <div className="bg-white rounded-3xl p-8 border border-red-100 shadow-xl text-center space-y-6 max-w-md mx-auto">
            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto text-red-500">
              <ShieldAlert size={32} />
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-bold text-gray-900">خطأ في التحقق</h2>
              <p className="text-gray-600 text-sm">{error}</p>
            </div>
            <Link
              href="/"
              className="block w-full py-3 bg-[#2243A4] hover:bg-[#19327D] text-white font-bold rounded-2xl text-sm transition-colors text-center"
            >
              العودة للرئيسية
            </Link>
          </div>
        ) : (
          /* Success State - Display Certificate */
          <div className="space-y-8">
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 flex items-center gap-4 text-emerald-800">
              <ShieldCheck className="shrink-0 text-emerald-600" size={24} />
              <div>
                <p className="font-bold text-sm sm:text-base">
                  تم التحقق من هذه الشهادة وهي صالحة وموثقة رسمياً.
                </p>
                <p className="text-xs text-emerald-700 mt-0.5">
                  صادرة لـ: {certData?.student_name} في دورة: {certData?.course?.title}
                </p>
              </div>
            </div>

            <CertificateViewer
              studentName={certData?.student_name}
              courseName={certData?.course?.title}
              serialNumber={certData?.serial_number}
              issuedDate={certData?.formatted_issued_date}
            />
          </div>
        )}
      </div>
    </div>
  );
}
