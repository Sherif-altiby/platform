"use client";

import PaymentHeader from "@/components/payment/PaymentHeader";
import PayVodafone from "@/components/payment/PayVodafone";
import PayInstapay from "@/components/payment/PayInstapay"; // 1. Imported the component here
import { useState } from "react";
import { GiSmartphone } from "react-icons/gi";
import { FaChevronDown } from "react-icons/fa6"; 
import { useQuery } from "@tanstack/react-query";
import { getPaymentInfo } from "../utils/PaymentFeatures";
import { useSearchParams } from "next/navigation";
import PaymentSkeleton from "./PaymentSkeleton";

export default function PaymentPage() {
  const searchParams = useSearchParams();

  const q = searchParams.get("q") || "";

  const [activeAccordion, setActiveAccordion] = useState<"vodafone" | "instapay" | null>("vodafone");

  const toggleAccordion = (type: "vodafone" | "instapay") => {
    setActiveAccordion(activeAccordion === type ? null : type);
  };

  const { data: paymenInfo, isLoading } = useQuery({
    queryKey: ["paymenInfo"],
    queryFn: async () => {
      const res = await getPaymentInfo(q);
      return res.data ;
    },
  });

  return (
    <div className="min-h-screen bg-slate-50 p-6 flex justify-center" dir="rtl">
      <div className="max-w-2xl w-full">
        {isLoading ? (<PaymentSkeleton />) : (
           <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-100 overflow-hidden">
           <PaymentHeader title={paymenInfo?.courseTitle}  price={paymenInfo?.coursePrice}/>
 
           <div className="p-6 md:p-8 space-y-4">
             <h2 className="text-xl font-bold text-slate-800 mb-6 text-center">اختر وسيلة الدفع</h2>
 
             {/* --- Vodafone Cash Accordion Item --- */}
             <div className="border border-slate-100 rounded-2xl overflow-hidden shadow-sm bg-white">
               <button
                 onClick={() => toggleAccordion("vodafone")}
                 className={`w-full p-5 flex items-center justify-between text-right transition-colors ${activeAccordion === "vodafone" ? "bg-slate-50/80" : "hover:bg-slate-50/50"
                   }`}
               >
                 <div className="flex items-center gap-4">
                   <div className={`p-3 rounded-xl transition-colors ${activeAccordion === "vodafone" ? "bg-red-50 text-red-600" : "bg-slate-100 text-slate-600"
                     }`}>
                     <GiSmartphone size={24} />
                   </div>
                   <div>
                     <h3 className="font-bold text-slate-800 text-base">فودافون كاش</h3>
                     <p className="text-xs text-slate-400 mt-0.5">تحويل يدوي وتأكيد الطلب</p>
                   </div>
                 </div>
                 <FaChevronDown
                   size={16}
                   className={`text-slate-400 transition-transform duration-300 ${activeAccordion === "vodafone" ? "rotate-180 text-slate-700" : ""
                     }`}
                 />
               </button>
 
               <div
                 className={`grid transition-all duration-300 ease-in-out ${activeAccordion === "vodafone" ? "grid-rows-[1fr] opacity-100 border-t border-slate-100" : "grid-rows-[0fr] opacity-0"
                   }`}
               >
                 <div className="overflow-hidden">
                   <div className="p-6 bg-white">
                     <PayVodafone phone={paymenInfo.vCash.number} name={paymenInfo.vCash.walletName} courseId={paymenInfo.courseId} />
                   </div>
                 </div>
               </div>
             </div>
 
             {/* --- InstaPay Accordion Item --- */}
             <div className="border border-slate-100 rounded-2xl overflow-hidden shadow-sm bg-white">
               <button
                 onClick={() => toggleAccordion("instapay")}
                 className={`w-full p-5 flex items-center justify-between text-right transition-colors ${activeAccordion === "instapay" ? "bg-slate-50/80" : "hover:bg-slate-50/50"
                   }`}
               >
                 <div className="flex items-center gap-4">
                   {/* Styled with native active pink shades */}
                   <div className={`p-3 rounded-xl transition-colors ${activeAccordion === "instapay" ? "bg-pink-50 text-pink-600" : "bg-slate-100 text-slate-600"
                     }`}>
                     <GiSmartphone size={24} />
                   </div>
                   <div>
                     <h3 className="font-bold text-slate-800 text-base">انستا باي (InstaPay)</h3>
                     <p className="text-xs text-slate-400 mt-0.5">تحويل يدوي فوري وتأكيد الطلب</p>
                   </div>
                 </div>
                 <FaChevronDown
                   size={16}
                   className={`text-slate-400 transition-transform duration-300 ${activeAccordion === "instapay" ? "rotate-180 text-slate-700" : ""
                     }`}
                 />
               </button>
 
               <div
                 className={`grid transition-all duration-300 ease-in-out ${activeAccordion === "instapay" ? "grid-rows-[1fr] opacity-100 border-t border-slate-100" : "grid-rows-[0fr] opacity-0"
                   }`}
               >
                 <div className="overflow-hidden">
                   <div className="p-6 bg-white">
                     {/* 2. Embedded the new PayInstapay component inside the container */}
                     <PayInstapay phone={paymenInfo.instaPay.number} name={paymenInfo.instaPay.instaPayName} courseId={paymenInfo.courseId}/>
                   </div>
                 </div>
               </div>
             </div>
 
           </div>
         </div>
        )}
      </div>
    </div>
  );
}