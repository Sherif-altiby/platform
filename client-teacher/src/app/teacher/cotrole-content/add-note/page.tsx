"use client";

import { IoIosCloudUpload } from "react-icons/io";
import { PiNotepadThin } from "react-icons/pi";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { Axios } from "@/axios/Axios";
import { toast } from "react-toastify";

type Inputs = { title: string; level: string; pdf: FileList };

const inputClass = "border border-gray-200 bg-gray-50 rounded-xl px-4 py-2.5 block w-full text-gray-800 text-sm transition-all duration-200 focus:outline-none focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-50";
const labelClass = "block text-sm font-medium text-gray-600 mb-1.5";

const UploadPage = () => {
  const [loading, setLoading] = useState(false);
  const [pdfName, setPdfName] = useState("");

  const { register, handleSubmit, reset } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("level", data.level);
    formData.append("pdf", data.pdf[0]);
    await uploadNote(formData);
  };

  const uploadNote = async (formData: FormData) => {
    setLoading(true);
    try {
      const res = await Axios.post("teacher/upload-pdf", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success(res.data.message);
      reset();
      setPdfName("");
    } catch {
      toast.error("حدث خطأ");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center py-8">
      <form
        className="w-full max-w-2xl bg-white border border-gray-100 rounded-3xl shadow-sm p-8"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center shadow-md">
            <PiNotepadThin className="text-white text-xl" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">إضافة مذكرة</h2>
            <p className="text-sm text-gray-400">ارفع ملف PDF مع بيانات المذكرة</p>
          </div>
        </div>

        {/* Title + Level */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
          <div>
            <label className={labelClass} htmlFor="title">عنوان المذكرة</label>
            <input type="text" id="title" className={inputClass} {...register("title", { required: true })} />
          </div>
          <div>
            <label className={labelClass} htmlFor="level">الصف الدراسي</label>
            <select id="level" className={inputClass} {...register("level", { required: true })}>
              <option value="first">الصف الأول الثانوي</option>
              <option value="second">الصف الثاني الثانوي</option>
              <option value="third">الصف الثالث الثانوي</option>
            </select>
          </div>
        </div>

        {/* File upload */}
        <div className="mb-8">
          <label className={labelClass}>رفع ملف PDF</label>
          <div className="relative border-2 border-dashed border-gray-200 hover:border-indigo-300 bg-gray-50 hover:bg-indigo-50/30 rounded-2xl h-24 flex items-center justify-center transition-all duration-200 cursor-pointer">
            <input
              type="file"
              id="pdf"
              accept="application/pdf"
              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
              {...register("pdf", { required: true })}
              onChange={(e) => {
                if (e.target.files) setPdfName(e.target.files[0]?.name);
              }}
            />
            <div className="flex flex-col items-center gap-1 text-gray-400 pointer-events-none">
              <IoIosCloudUpload className="text-3xl text-indigo-400" />
              <p className="text-sm">{pdfName || "اضغط أو اسحب الملف هنا"}</p>
            </div>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="flex items-center justify-center gap-2 w-full h-11 rounded-xl bg-amber-500 text-white text-sm font-semibold hover:bg-amber-600 transition-colors duration-200 shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "جاري الرفع..." : "إضافة المذكرة"}
        </button>
      </form>
    </div>
  );
};

export default UploadPage;