"use client";

import { PayWithVodafone } from "@/app/utils/PaymentFeatures";
import { usePaymentStore } from "@/store/PaymentStore";
import {  useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaFileUpload, FaInfoCircle, FaCheckCircle } from "react-icons/fa";
import { FaCopy, FaSpinner } from "react-icons/fa6";
import { toast } from "react-toastify";

const handleCopy = (text: any) => {
  if (!text) return;
  navigator.clipboard.writeText(text);
  toast.success("تم نسخ الرقم");
};

const PayVodafone = () => {

  const router = useRouter();

  const course = usePaymentStore((s) => s.courseToPay);
  const [file, setFile] = useState<File | null>(null);

  const mutation = useMutation({
    mutationFn: () => PayWithVodafone(course?._id as string, file as File),
    onError: (error: any) => {
      toast.error(error.message || "حدث خطأ ما");
    },
  });

  return (
    <div className="space-y-5 font-kufi" dir="rtl">
      {/* 1. Simple Alert */}
      <div className="bg-amber-50 border border-amber-100 p-4 rounded-2xl flex items-center gap-3 text-amber-800">
        <FaInfoCircle className="shrink-0 text-amber-500" size={18} />
        <p className="text-xs font-bold leading-relaxed">
          حول المبلغ للرقم أدناه وارفع صورة الإيصال لتأكيد طلبك.
        </p>
      </div>

      {/* 2. Minimalist Number Card */}
      <div className="bg-white p-5 rounded-2xl border border-slate-100 flex items-center justify-between shadow-sm">
        <div className="flex flex-col">
          <span className="text-[10px] text-slate-400 font-bold mb-1">
            رقم التحويل (فودافون كاش)
          </span>
          <span className="text-xl font-black text-slate-800 tracking-wider">
            {/* Fallback number if course object doesn't have one */}
            {course?.phone || "010XXXXXXXX"}
          </span>
        </div>
        <button
          onClick={() => handleCopy(course?.phone)}
          className="bg-blue-50 text-[#0066FF] p-3 rounded-xl hover:bg-[#0066FF] hover:text-white transition-all active:scale-95"
        >
          <FaCopy size={18} />
        </button>
      </div>

      {/* 3. Simple Upload Section */}
      <div className="space-y-3">
        <label className="text-sm font-black text-slate-700 pr-1"> 
          إرفاق الإيصال
        </label>

        <div className="relative group">
          <input
            type="file"
            className="absolute inset-0 w-full h-full opacity-0 z-20 cursor-pointer"
            accept="image/*"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />

          <div
            className={`w-full py-8 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center gap-2 transition-colors ${
              file
                ? "bg-green-50 border-green-300"
                : "bg-slate-50 border-slate-200 group-hover:border-[#0066FF]"
            }`}
          >
            {file ? (
              <>
                <FaCheckCircle size={24} className="text-green-500" />
                <span className="text-sm font-bold text-green-700 truncate max-w-[200px]">
                  {file.name}
                </span>
              </>
            ) : (
              <>
                <FaFileUpload
                  size={24}
                  className="text-slate-400 group-hover:text-[#0066FF]"
                />
                <span className="text-sm font-bold text-slate-500 group-hover:text-[#0066FF]">
                  اضغط هنا لرفع الصورة
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* 4. Action Button */}
      <button
        disabled={mutation.isPending}
        onClick={() => {
          mutation.mutate()
        }}
        className="w-full bg-[#0066FF] text-white py-4 rounded-2xl font-black text-lg shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all active:scale-[0.98] disabled:bg-blue-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {mutation.isPending ? (
          <>
            <FaSpinner className="animate-spin" /> جاري الإرسال...
          </>
        ) : (
          "تأكيد الإرسال"
        )}
      </button>
    </div>
  );
};

export default PayVodafone;
