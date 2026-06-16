"use client";

import { Suspense, useRef, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useAuthUser } from "@/store/authStore";

function VerificationForm() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const { setUser } = useAuthUser();

  const email = searchParams.get("email");

  const [data, setData] = useState<string[]>(Array(6).fill(""));

  const inputRef = useRef<HTMLInputElement[]>([]);

  const verifyMutation = useMutation({
    mutationFn: async ({ email, code }: { email: string; code: string }) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}user/verify-code`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            code,
          }),
        },
      );

      const result = await response.json();

      if (!response.ok) {
        toast.error("حدث خطأ");
        throw new Error(result.message || "حدث خطأ");
      }

      return result;
    },

    onSuccess: (data) => {
      setUser(data.user)
      toast.success(data.message);

      setTimeout(() => {
        router.push("/");
      }, 1000);
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const handleInputChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;

    const newData = [...data];
    newData[index] = value;

    setData(newData);

    if (value && index < 5) {
      inputRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace" && !data[index] && index > 0) {
      inputRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();

    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6)
      .split("");

    const newData = Array(6).fill("");

    pasted.forEach((value, index) => {
      newData[index] = value;
    });

    setData(newData);

    const nextIndex = Math.min(pasted.length, 5);
    inputRef.current[nextIndex]?.focus();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const code = data.join("");

    if (code.length !== 6) {
      return;
    }

    if (!email) {
      return;
    }

    verifyMutation.mutate({
      email,
      code,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md"
      >
        <h1 className="text-center text-2xl font-bold mb-6">
          يرجى إدخال كود التحقق
        </h1>

        <div className="flex flex-row-reverse items-center justify-center gap-3 ltr">
          {data.map((item, index) => (
            <input
              key={index}
              ref={(ref) => {
                if (ref) {
                  inputRef.current[index] = ref;
                }
              }}
              type="text"
              maxLength={1}
              value={item}
              inputMode="numeric"
              onPaste={handlePaste}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onChange={(e) => handleInputChange(index, e.target.value)}
              className="w-12 h-12 border rounded-full text-center text-lg font-semibold outline-none focus:border-[#5700FF]"
            />
          ))}
        </div>

        {email && (
          <p className="text-center text-gray-600 mt-4 text-sm">
            تم إرسال الكود إلى <span className="font-semibold">{email}</span>
          </p>
        )}

        <button
          type="submit"
          disabled={verifyMutation.isPending}
          className={`w-full mt-6 py-3 rounded-xl text-white font-semibold transition ${
            verifyMutation.isPending
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#5700FF] hover:opacity-90"
          }`}
        >
          {verifyMutation.isPending ? "جارٍ التحقق..." : "إرسال"}
        </button>
      </form>
    </div>
  );
}

export default function VerificationCodePage() {
  return (
    <Suspense fallback={<div>جارٍ تحميل الصفحة...</div>}>
      <VerificationForm />
    </Suspense>
  );
}
