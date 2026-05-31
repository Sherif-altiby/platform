"use client";

import { PayWithVodafone } from "@/app/utils/PaymentFeatures"; // Make sure this function exists in your utils
import { usePaymentStore } from "@/store/PaymentStore";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { FaFileUpload, FaInfoCircle, FaCheckCircle } from "react-icons/fa";
import { FaCopy, FaSpinner } from "react-icons/fa6";
import { toast } from "react-toastify";

const handleCopy = (text: any) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    toast.success("تم نسخ عنوان الدفع بنجاح");
};

const PayInstapay = () => {
    const course = usePaymentStore((s) => s.courseToPay);
    const [file, setFile] = useState<File | null>(null);

    const mutation = useMutation({
        // Make sure to adapt this utility function to handle your instapay endpoint payload if needed
        mutationFn: () => PayWithVodafone(course?._id as string, file as File),
        onError: (error: any) => {
            toast.error(error.message || "حدث خطأ ما أثناء الإرسال");
        },
        onSuccess: () => {
            toast.success("تم إرسال إيصال الدفع للمراجعة بنجاح");
        }
    });

    return (
        <div className="space-y-5 font-kufi" dir="rtl">
            {/* Information Box */}
            <div className="bg-pink-50 border border-pink-100 p-4 rounded-xl flex items-start gap-3 text-pink-900">
                <FaInfoCircle className="shrink-0 text-pink-500 mt-0.5" size={16} />
                <p className="text-xs font-medium leading-relaxed">
                    يرجى تحويل قيمة الاشتراك بالكامل عبر تطبيق انستا باي (InstaPay) إلى العنوان الموضح أدناه، ثم قم برفع صورة الإيصال لتأكيد عملية الدفع وتفعيل الكورس.
                </p>
            </div>

            {/* Payment Address Card (IPA Handle / Number) */}
            <div className="bg-slate-50/60 p-4 rounded-xl border border-slate-100 flex items-center justify-between">
                <div className="flex flex-col">
                    <span className="text-[11px] text-slate-400 font-bold mb-1">
                        عنوان الدفع أو الحساب (InstaPay Address)
                    </span>
                    <span className="text-base font-black text-slate-800 tracking-wide select-all">
                        {course?.phone || "example@instapay"}
                    </span>
                </div>
                <button
                    type="button"
                    onClick={() => handleCopy(course?.phone || "example@instapay")}
                    className="bg-white border border-slate-200 text-pink-600 p-2.5 rounded-xl hover:bg-pink-600 hover:text-white hover:border-pink-600 transition-all active:scale-95 shadow-sm"
                    title="نسخ العنوان"
                >
                    <FaCopy size={16} />
                </button>
            </div>

            {/* Upload Box */}
            <div className="space-y-2">
                <label className="text-xs font-bold text-slate-600 pr-1">
                    إرفاق صورة إيصال التحويل الناجح
                </label>

                <div className="relative group">
                    <input
                        type="file"
                        className="absolute inset-0 w-full h-full opacity-0 z-20 cursor-pointer"
                        accept="image/*"
                        onChange={(e) => setFile(e.target.files?.[0] || null)}
                    />

                    <div
                        className={`w-full py-6 border-2 border-dashed rounded-xl flex flex-col items-center justify-center gap-2 transition-all ${file
                            ? "bg-green-50/50 border-green-300"
                            : "bg-slate-50/30 border-slate-200 group-hover:border-pink-500 group-hover:bg-slate-50/80"
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
                                    className="text-slate-400 group-hover:text-pink-500 transition-colors"
                                />
                                <span className="text-xs font-bold text-slate-500 group-hover:text-pink-500 transition-colors">
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
                className="w-full bg-pink-600 text-white py-4 rounded-xl font-bold text-base shadow-lg shadow-pink-100 hover:bg-pink-700 transition-all active:scale-[0.99] disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2"
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

export default PayInstapay;