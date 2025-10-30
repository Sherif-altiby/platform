"use client";

import { Suspense, useState, useRef } from "react";
import { useSearchParams } from "next/navigation";

function VerificationForm() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email"); // لو بتمرر الإيميل في الرابط
  const [data, setData] = useState(Array(6).fill(""));
  const [isVerifyingCode, setIsVerifyingCode] = useState(false);
  const inputRef = useRef<HTMLInputElement[]>([]);

  const handleInputChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return; // قبول رقم واحد فقط
    const newData = [...data];
    newData[index] = value;
    setData(newData);

    // التنقل التلقائي بين الحقول
    if (value && index < data.length - 1) {
      inputRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !data[index] && index > 0) {
      inputRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pastedData = e.clipboardData.getData("Text").slice(0, data.length).split("");
    setData(pastedData);
    pastedData.forEach((val, i) => {
      if (inputRef.current[i]) inputRef.current[i].value = val;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const code = data.join("");
    if (code.length < 6) return alert("من فضلك أدخل الكود بالكامل");

    setIsVerifyingCode(true);
    console.log("Email:", email);
    console.log("Code:", code);

    // مثال على تحقق بسيط
    setTimeout(() => {
      alert("تم التحقق بنجاح!");
      setIsVerifyingCode(false);
    }, 1500);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <form
        className="w-[90%] shadow-lg max-w-[500px] mt-10 mb-10 p-6 rounded-lg bg-white"
        onSubmit={handleSubmit}
      >
        <h2 className="text-center text-xl text-[#5700FF] mb-4">يرجى إدخال كود التحقق</h2>

        <div className="flex items-center justify-center gap-3 ltr-dir">
          {data.map((item, index) => (
            <input
              key={index}
              type="text"
              className="border w-12 h-12 rounded-full text-center focus:border-[#5700FF] block"
              ref={(ref) => {
                if (ref) inputRef.current[index] = ref;
              }}
              maxLength={1}
              value={item}
              onChange={(e) => handleInputChange(index, e.target.value)}
              onPaste={handlePaste}
              onKeyDown={(e) => handleKeyDown(index, e)}
              inputMode="numeric"
              aria-label={`Verification code digit ${index + 1}`}
            />
          ))}
        </div>

        <div className="flex items-center justify-center mt-6">
          <button
            type="submit"
            disabled={isVerifyingCode}
            className={`px-6 py-2 rounded-full text-white font-semibold transition ${
              isVerifyingCode ? "bg-gray-400" : "bg-[#5700FF] hover:opacity-90"
            }`}
          >
            {isVerifyingCode ? "جارٍ الإرسال..." : "إرسال"}
          </button>
        </div>

        {email && (
          <p className="text-center text-gray-600 mt-4 text-sm">
            تم إرسال الكود إلى <span className="font-semibold">{email}</span>
          </p>
        )}
      </form>
    </div>
  );
}

export default function VerificationCodePage() {
  return (
    <Suspense fallback={<div className="text-center py-10">جارٍ تحميل الصفحة...</div>}>
      <VerificationForm />
    </Suspense>
  );
}
