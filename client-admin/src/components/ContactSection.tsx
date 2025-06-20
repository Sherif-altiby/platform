"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ButtonLoader from "@/components/ButtonLoader"; // Assuming you have a button loader component

const Contact = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission logic
    setTimeout(() => {
      router.push("/thank-you");
      setIsSubmitting(false);
    }, 2000);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#F7F8FF]">
      <form
        className="w-[90%] max-w-[700px] mt-10 mb-10 p-8 rounded-lg shadow-xl bg-white"
        onSubmit={handleSubmit}
      >
        <div className="text-2xl font-semibold text-[#5700FF] mb-5">
          تواصل معنا
        </div>

        <div className="flex items-start flex-col gap-5 mb-5">
          <div className="w-full">
            <label className="block text-[#5700FF] text-lg mb-2" htmlFor="name">
              الاسم
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="border rounded-md p-3 block w-full transition-all duration-300 focus:border-[#3B82F6]"
            />
          </div>

          <div className="w-full">
            <label className="block text-[#5700FF] text-lg mb-2" htmlFor="email">
              البريد الالكتروني
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="border rounded-md p-3 block w-full transition-all duration-300 focus:border-[#3B82F6]"
            />
          </div>

          <div className="w-full">
            <label className="block text-[#5700FF] text-lg mb-2" htmlFor="message">
              الرسالة
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="border rounded-md p-3 block w-full transition-all duration-300 focus:border-[#3B82F6]"
            />
          </div>
        </div>

        <button
          type="submit"
          className="flex items-center justify-center md:text-lg h-[50px] rounded-xl w-full sm:w-[170px] bg-[#5700FF] border border-[#5700FF] text-white transition-all duration-500 hover:rounded-[50px] hover:bg-white hover:text-[#5700FF]"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <ButtonLoader />
          ) : (
            "ارسال الرسالة"
          )}
        </button>
      </form>
    </div>
  );
};

export default Contact;
