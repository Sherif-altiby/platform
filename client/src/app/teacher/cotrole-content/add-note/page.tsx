"use client";

import MainButton from "@/components/MainButton";
import { IoIosCloudUpload } from "react-icons/io";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { Axios } from "@/axios/Axios";
import { toast } from "react-toastify";
 
type Inputs = {
  title: string;
  level: string;
  pdf: FileList;
};

const UploadPage = () => {
  const [loading, setLoading] = useState(false);
  const [pdfName, setPdfName] = useState("")

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
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success(res.data.message)
      reset();  
    } catch {
        toast.error("حدث خطأ")
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <form
        className="w-[90%] shadow-lg max-w-[700px] p-5 rounded-lg bg-white"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="text-2xl text-hoverLinkColor mb-5">إضافة مذكرة</div>

        <div className="flex items-start flex-col md:flex-row gap-5 mb-5">
          <div className="w-full md:w-1/2">
            <label className="block text-grayColor text-lg mb-2" htmlFor="title">
              عنوان مذكرة
            </label>
            <input
              type="text"
              id="title"
              className="border rounded-md p-2 block w-full transition-all duration-300 focus:border-hoverLinkColor"
              {...register("title", { required: true })}
            />
          </div>

          <div className="w-full md:w-1/2">
            <label className="block text-grayColor text-lg mb-2" htmlFor="level">
              الصف الدراسي
            </label>
            <select
              id="level"
              className="border rounded-md p-2 block w-full transition-all duration-300 focus:border-hoverLinkColor"
              {...register("level", { required: true })}
            >
              <option value="first">الصف الأول الثانوي</option>
              <option value="second">الصف الثاني الثانوي</option>
              <option value="third">الصف الثالث الثانوي</option>
            </select>
          </div>
        </div>

        <div className="flex items-start flex-col md:flex-row gap-5 mb-5">
          <div className="w-full">
            <div className="block text-grayColor text-lg mb-2">
              قم بتحميل المذكرة
            </div>
            <div className="border cursor-pointer relative rounded-md p-2 block w-full h-11 transition-all duration-300 focus:border-hoverLinkColor">
              <input
                type="file"
                id="pdf"
                className="absolute w-full h-full top-0 right-0 opacity-0"
                {...register("pdf", { required: true })}
                accept="application/pdf"
                onChange={(e) => {
                    if(e.target.files){
                        setPdfName(e.target.files[0]?.name)
                    }
                }}
              />
              <label htmlFor="pdf" className="absolute top-0 left-0 pr-3 w-full h-full cursor-pointer  flex items-center gap-4  text-hoverLinkColor">
                  <IoIosCloudUpload />
                  <p className="text-lg" > {pdfName} </p>
              </label>
            </div>
          </div>
        </div>

        <MainButton text={loading ? "جارٍ الرفع..." : "أضف"} />
      </form>
    </div>
  );
};

export default UploadPage;
