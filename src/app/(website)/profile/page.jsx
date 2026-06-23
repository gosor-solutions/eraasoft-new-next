"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";
import {
  User,
  Camera,
  LogOut,
  AlertCircle,
  Save,
  BookOpen,
  Edit2,
} from "lucide-react";
import Image from "next/image";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ProfilePage() {
  const { client, isLoading, updateProfile, logout } = useAuth();
  const router = useRouter();

  const fileInputRef = useRef(null);

  const [activeTab, setActiveTab] = useState("personal"); // "personal" | "courses"

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    bio: "",
  });

  const [passwordData, setPasswordData] = useState({
    password: "",
    password_confirmation: "",
  });

  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [generalError, setGeneralError] = useState(null);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && !client) {
      router.push("/login");
    }
  }, [client, isLoading, router]);

  // Sync client data when loaded
  useEffect(() => {
    if (client) {
      setFormData({
        first_name: client?.first_name || "",
        last_name: client?.last_name || "",
        email: client?.email || "",
        phone: client?.phone || "",
        bio: client?.bio || "",
      });
      setAvatarPreview(client?.avatar);
    }
  }, [client]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("حجم الصورة يجب أن لا يتجاوز 5 ميجابايت", { position: "top-center" });
        return;
      }
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFieldErrors({});
    setGeneralError(null);

    try {
      const data = new FormData();
      data.append("first_name", formData.first_name);
      data.append("last_name", formData.last_name);
      data.append("email", formData.email);
      if (formData.phone) data.append("phone", formData.phone);
      if (formData.bio) data.append("bio", formData.bio);

      if (avatarFile) {
        data.append("avatar", avatarFile);
      }

      if (passwordData.password) {
        if (passwordData.password !== passwordData.password_confirmation) {
          toast.error("تأكيد كلمة المرور غير متطابق", { position: "top-center" });
          setIsSubmitting(false);
          return;
        }
        data.append("password", passwordData.password);
        data.append("password_confirmation", passwordData.password_confirmation);
      }

      // Laravel expects POST with _method=PUT for multipart updates
      data.append("_method", "PUT");

      await updateProfile(data);
      toast.success("تم تحديث الملف الشخصي بنجاح!", { position: "top-center" });
      setPasswordData({ password: "", password_confirmation: "" });
      setAvatarFile(null);
    } catch (err) {
      console.error(err);
      if (err?.errors) {
        setFieldErrors(err.errors);
      }
      setGeneralError(err?.message || "حدث خطأ أثناء تحديث البيانات.");
      toast.error(err?.message || "فشل تحديث البيانات.", { position: "top-center" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50/50 pb-20 relative overflow-hidden" dir="rtl">
      <ToastContainer rtl />

      {/* Decorative Swirl Background Shapes */}
      <div className="absolute top-[21%] right-25 w-75 h-75 z-10 pointer-events-none select-none hidden md:block">
        <Image src="/swirl.png" alt="" width={300} height={300} className="w-full h-full object-contain" />
      </div>
      <div className="absolute bottom-[5%] rotate-45 -left-4 w-75 h-75 z-10 pointer-events-none select-none hidden md:block">
        <Image src="/swirl.png" alt="" width={300} height={300} className="w-full h-full object-contain" />
      </div>

      {/* Digital Network Cover Photo */}
      <div className="relative h-56 md:h-72 w-full overflow-hidden">
        {/* Cyber Network Grid Pattern overlay */}
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/profile_banner.png')" }}></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Overlapping Avatar Profile Block */}
        <div className="relative -mt-20 md:-mt-24 flex flex-col items-center text-center">
          <div className="relative group cursor-pointer" onClick={triggerFileInput}>
            <div className="relative w-36 h-36 md:w-44 md:h-44 rounded-full overflow-hidden bg-slate-200 border-4 border-white shadow-xl flex items-center justify-center">
              {avatarPreview ? (
                <Image src={avatarPreview} alt={client?.full_name} fill className="object-cover" />
              ) : (
                <User size={64} className="text-slate-400" />
              )}
            </div>
            {/* Camera Overlay Icon */}
            <div className="absolute bottom-1.5 right-1.5 md:bottom-2 md:right-2 bg-[#2243a4] hover:bg-blue-800 text-white p-2.5 rounded-full shadow-lg border-2 border-white transition-all duration-200">
              <Camera size={18} />
            </div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleAvatarChange}
              accept="image/*"
              className="hidden"
            />
          </div>

          <h1 className="mt-4 text-2xl md:text-3xl font-bold text-[#2243a4]">
            {client?.full_name}
          </h1>
          <p className="text-gray-400 text-sm md:text-base mt-1 font-medium">
            {client?.email}
          </p>
        </div>

        {/* Mobile Navigation Tabs */}
        <div className="mt-8 md:hidden flex justify-center gap-2 max-w-sm mx-auto">
          <button
            onClick={() => setActiveTab("personal")}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-0 rounded-full text-xs font-semibold transition-all duration-200 ${activeTab === "personal"
              ? "bg-[#2243a4] text-white shadow-md shadow-blue-500/20"
              : "text-slate-600 hover:bg-slate-50"
              }`}
          >
            <User size={16} />
            <span>البيانات الشخصية</span>
          </button>
          <button
            onClick={() => setActiveTab("courses")}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-0 rounded-full text-xs font-semibold transition-all duration-200 ${activeTab === "courses"
              ? "bg-[#2243a4] text-white shadow-md shadow-blue-500/20"
              : "text-slate-600 hover:bg-slate-50"
              }`}
          >
            <BookOpen size={16} />
            <span>الكورسات المسجلة</span>
          </button>
        </div>

        {/* Desktop Layout Grid */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {/* Main Content Area (Left/Center in LTR, Left in RTL) */}
          <div className="md:col-span-2 order-2 md:order-1">
            {activeTab === "personal" && (
              <div className="bg-[#F8FAFC] p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm">
                <div className="flex items-center justify-between border-b border-slate-200/60 pb-5 mb-6">
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-800">
                    البيانات الشخصية
                  </h2>
                </div>

                {generalError && (
                  <div className="bg-red-50 border-r-4 border-red-500 p-4 rounded-xl flex items-start gap-3 mb-6">
                    <AlertCircle className="text-red-500 shrink-0 mt-0.5" size={18} />
                    <div className="text-sm text-red-700 font-medium">{generalError}</div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name Fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">الاسم الأول</label>
                      <input
                        type="text"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleInputChange}
                        required
                        className="block w-full px-5 py-3 bg-white border border-slate-200 rounded-full text-slate-800 text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-[#2243a4] focus:outline-none transition-all duration-150 shadow-sm"
                        placeholder="الاسم الأول"
                      />
                      {fieldErrors.first_name && (
                        <p className="mt-1.5 text-xs text-red-600 font-medium pr-3">{fieldErrors.first_name[0]}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">اسم العائلة</label>
                      <input
                        type="text"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleInputChange}
                        required
                        className="block w-full px-5 py-3 bg-white border border-slate-200 rounded-full text-slate-800 text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-[#2243a4] focus:outline-none transition-all duration-150 shadow-sm"
                        placeholder="اسم العائلة"
                      />
                      {fieldErrors.last_name && (
                        <p className="mt-1.5 text-xs text-red-600 font-medium pr-3">{fieldErrors.last_name[0]}</p>
                      )}
                    </div>
                  </div>

                  {/* Email Field */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">البريد الالكتروني</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="block w-full px-5 py-3 bg-white border border-slate-200 rounded-full text-slate-800 text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-[#2243a4] focus:outline-none transition-all duration-150 shadow-sm"
                      placeholder="البريد الالكتروني"
                    />
                    {fieldErrors.email && (
                      <p className="mt-1.5 text-xs text-red-600 font-medium pr-3">{fieldErrors.email[0]}</p>
                    )}
                  </div>

                  {/* Phone Field */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">رقم التليفون</label>
                    <div className="relative flex items-center bg-white border border-slate-200 rounded-full shadow-sm overflow-hidden focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-[#2243a4] transition-all duration-150">
                      {/* Custom Country flag/code mockup inside input */}
                      <div className="flex items-center gap-1.5 px-4 border-l border-slate-200 bg-slate-50/50 h-full py-3 select-none">
                        <span className="text-sm font-bold text-slate-600">+20</span>
                        <span className="text-lg">🇪🇬</span>
                      </div>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="block w-full px-5 py-3 text-slate-800 text-sm bg-transparent outline-none border-none text-left"
                        placeholder="رقم التليفون"
                        dir="ltr"
                      />
                    </div>
                    {fieldErrors.phone && (
                      <p className="mt-1.5 text-xs text-red-600 font-medium pr-3">{fieldErrors.phone[0]}</p>
                    )}
                  </div>

                  {/* Bio Area */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">السيرة الذاتية (Bio)</label>
                    <textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleInputChange}
                      rows={3}
                      className="block w-full px-5 py-3 bg-white border border-slate-200 rounded-2xl text-slate-800 text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-[#2243a4] focus:outline-none transition-all duration-150 shadow-sm"
                      placeholder="اكتب نبذة عن نفسك..."
                    />
                  </div>

                  {/* Security / Password section built directly in form */}
                  <div className="border-t border-slate-200/60 pt-6 mt-6">
                    <h3 className="text-lg font-bold text-slate-800 mb-4">تغيير كلمة المرور</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">كلمة المرور الجديدة</label>
                        <input
                          type="password"
                          name="password"
                          value={passwordData.password}
                          onChange={handlePasswordChange}
                          className="block w-full px-5 py-3 bg-white border border-slate-200 rounded-full text-slate-800 text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-[#2243a4] focus:outline-none transition-all duration-150 shadow-sm"
                          placeholder="••••••••"
                        />
                        {fieldErrors.password && (
                          <p className="mt-1.5 text-xs text-red-600 font-medium pr-3">{fieldErrors.password[0]}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">تأكيد كلمة المرور</label>
                        <input
                          type="password"
                          name="password_confirmation"
                          value={passwordData.password_confirmation}
                          onChange={handlePasswordChange}
                          className="block w-full px-5 py-3 bg-white border border-slate-200 rounded-full text-slate-800 text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-[#2243a4] focus:outline-none transition-all duration-150 shadow-sm"
                          placeholder="••••••••"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Save Changes Button */}
                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-full font-bold text-white bg-[#2243a4] hover:bg-blue-800 shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-150 cursor-pointer"
                    >
                      {isSubmitting ? (
                        <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <>
                          <Save size={18} />
                          <span>حفظ التغييرات</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {activeTab === "courses" && (
              <div className="rounded-3xl min-h-[300px] flex flex-col items-center justify-center text-center">
                <Image
                  src={"/no_courses.png"}
                  alt="no courses"
                  className="object-cover w-full h-full"
                  width={800}
                  height={500}
                />
              </div>
            )}
          </div>

          {/* Desktop Navigation Sidebar (Right in RTL, Order 1 to align properly) */}
          <div className="hidden md:block md:col-span-1 order-1 md:order-2">
            <div className="bg-white min-h-60 p-4 rounded-3xl border border-slate-100 shadow-sm space-y-2 sticky top-6">
              <button
                onClick={() => setActiveTab("personal")}
                className={`w-full flex items-center gap-3 py-3 px-5 rounded-full text-sm font-bold transition-all duration-150 ${activeTab === "personal"
                  ? "bg-[#2243a4] text-white shadow-md shadow-blue-500/10"
                  : "text-slate-700 hover:bg-slate-50"
                  }`}
              >
                <User size={18} />
                <span>البيانات الشخصية</span>
              </button>
              <button
                onClick={() => setActiveTab("courses")}
                className={`w-full flex items-center gap-3 py-3 px-5 rounded-full text-sm font-bold transition-all duration-150 ${activeTab === "courses"
                  ? "bg-[#2243a4] text-white shadow-md shadow-blue-500/10"
                  : "text-slate-700 hover:bg-slate-50"
                  }`}
              >
                <BookOpen size={18} />
                <span>الكورسات المسجلة</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

