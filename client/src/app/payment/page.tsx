"use client";

import PayCridet from "@/components/payment/PayCridet";
import PaymentHeader from "@/components/payment/PaymentHeader";
import PaymenWay from "@/components/payment/PaymenWay";
import PayVodafone from "@/components/payment/PayVodafone";
import { useState } from "react";
import { CiCreditCard1 } from "react-icons/ci";
import { FaChevronRight, FaCopy } from "react-icons/fa6";
import { GiSmartphone } from "react-icons/gi";
import { handlePayment } from "../utils/PaymentFeatures";
import { usePaymentStore } from "@/store/PaymentStore";

export default function PaymentPage() {
  const [method, setMethod] = useState<"vodafone" | "card" | null>(null);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false)
  const course = usePaymentStore(s => s.courseToPay)

  return (
    <div className="min-h-screen bg-slate-50 p-6 flex   justify-center">
      <div className="max-w-2xl w-full">
        <div className="bg-white/50 rounded-xl shadow-xl shadow-slate-200/60 overflow-hidden">
          <PaymentHeader />

          <div className="p-8">
            {step === 1 ? (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-slate-800 mb-4 text-center"> اختر وسيلة الدفع </h2>

                <PaymenWay
                  title="فودافون كاش "
                  method={method || ""}
                  setMethod={setMethod}
                  icon={GiSmartphone}
                  way="vodafone"
                  des="تحويل يدوي وتأكيد الطلب "
                />

                {/* <PaymenWay
                  title=" بطاقة بنكية "
                  method={method || ""}
                  setMethod={setMethod}
                  icon={CiCreditCard1}
                  way="card"
                  des=" دفع إلكتروني فوري"
                /> */}

                <button
                  disabled={loading}
                  onClick={() => {
                    if (method === "vodafone") {
                      setStep(2)
                    } else {
                      handlePayment(course?.price as number)
                      setLoading(true)
                    }
                  }}
                  className="w-full bg-[#0066FF] text-white py-5 rounded-2xl font-black mt-4 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-100"
                >
                  <span> {loading ? ' يتم تحويلك الب بوابة الدفع ..... ' : 'استمرار'} </span>
                  <FaChevronRight size={20} className="rotate-180" />
                </button>
              </div>
            ) : (
              <div className="animate-in fade-in slide-in-from-left-4 duration-500">
                <PayVodafone />
                <button
                  onClick={() => setStep(1)}
                  className="w-full text-slate-400 font-bold text-sm mt-6 hover:text-slate-600 transition-colors"
                >
                  العودة لتغيير الوسيلة
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
