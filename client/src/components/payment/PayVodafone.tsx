"use client";

import { PayWithVodafone } from "@/app/utils/PaymentFeatures";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { FaFileUpload, FaInfoCircle, FaCheckCircle } from "react-icons/fa";
import { FaCopy, FaSpinner } from "react-icons/fa6";
import { toast } from "react-toastify";

const handleCopy = (text: any) => {
  if (!text) return;
  navigator.clipboard.writeText(text);
  toast.success("تم نسخ الرقم بنجاح");
};

const PayVodafone = ({ phone, name, courseId, teacherId }: { phone: string; name: string, courseId: string, teacherId: string }) => {
  const [file, setFile] = useState<File | null>(null);

  const mutation = useMutation({
    mutationFn: () => PayWithVodafone(courseId , teacherId  , file as File, "vCash"),
    onError: (error: any) => {
      toast.error(error.message || "حدث خطأ ما أثناء الإرسال");
    },
     
  });

  return (
    <div className="space-y-5 font-kufi" dir="rtl">
      {/* Information Box */}
      <div className="bg-amber-50 border border-amber-100 p-4 rounded-xl flex items-start gap-3 text-amber-800">
        <FaInfoCircle className="shrink-0 text-amber-500 mt-0.5" size={16} />
        <p className="text-xs font-medium leading-relaxed">
          يرجى تحويل قيمة الاشتراك بالكامل للرقم الموجود بالأسفل، ثم قم برفع
          لقطة شاشة (Screenshot) أو صورة واضحة للإيصال لتأكيد عملية الدفع وتفعيل
          الكورس.
        </p>
      </div>

      {/* Number Card */}
      <div className="bg-slate-50/60 p-4 rounded-xl border border-slate-100 flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-[11px] text-slate-400 font-bold mb-1">
            رقم محفظة فودافون كاش للتحويل
          </span>
          <span className="text-xl font-black text-slate-800 tracking-wide select-all">
            {phone}
          </span>
        </div>
        <button
          type="button"
          onClick={() => handleCopy(phone)}
          className="bg-white border border-slate-200 text-[#0066FF] p-2.5 rounded-xl hover:bg-[#0066FF] hover:text-white hover:border-[#0066FF] transition-all active:scale-95 shadow-sm"
          title="نسخ الرقم"
        >
          <FaCopy size={16} />
        </button>
      </div>

      <div className="bg-slate-50/60 p-4 rounded-xl border border-slate-100 flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-[11px] text-slate-400 font-bold mb-1">
            اسم محفظة فودافون كاش
          </span>
          <span className="text-xl font-black text-slate-800 tracking-wide select-all">
            {name}
          </span>
        </div>
      </div>

      {/* Upload Box */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-600 pr-1">
          إرفاق صورة الإيصال أو التحويل
        </label>

        <div className="relative group">
          <input
            type="file"
            className="absolute inset-0 w-full h-full opacity-0 z-20 cursor-pointer"
            accept="image/*"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />

          <div
            className={`w-full py-6 border-2 border-dashed rounded-xl flex flex-col items-center justify-center gap-2 transition-all ${
              file
                ? "bg-green-50/50 border-green-300"
                : "bg-slate-50/30 border-slate-200 group-hover:border-[#0066FF] group-hover:bg-slate-50/80"
            }`}
          >
            {file ? (
              <>
                <FaCheckCircle size={22} className="text-green-500" />
                <span className="text-xs font-bold text-green-700 truncate max-w-[250px]">
                  {file.name}
                </span>
              </>
            ) : (
              <>
                <FaFileUpload
                  size={22}
                  className="text-slate-400 group-hover:text-[#0066FF] transition-colors"
                />
                <span className="text-xs font-bold text-slate-500 group-hover:text-[#0066FF] transition-colors">
                  اضغط هنا لاختيار الصورة
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Action Button */}
      <button
        type="button"
        disabled={mutation.isPending || !file}
        onClick={() => mutation.mutate()}
        className="w-full bg-[#0066FF] text-white py-4 rounded-xl font-bold text-base shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all active:scale-[0.99] disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2"
      >
        {mutation.isPending ? (
          <>
            <FaSpinner className="animate-spin" size={16} /> جاري رفع الإيصال...
          </>
        ) : (
          "تأكيد وإرسال طلب التفعيل"
        )}
      </button>
    </div>
  );
};

export default PayVodafone;
