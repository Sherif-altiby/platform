import { IoClose } from "react-icons/io5";
import { SubmitHandler, useForm } from "react-hook-form";
import { Dispatch, SetStateAction } from "react";
import MainButton from "@/components/MainButton";
import { Axios } from "@/axios/Axios";
import { toast } from "react-toastify";

type AddSubjectTypes = {
  subjectName: string;
  avatar: FileList;
};

const AddSubject = ({ closeModal }: { closeModal: Dispatch<SetStateAction<boolean>> }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AddSubjectTypes>({
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<AddSubjectTypes> = async (data) => {
      const formData = new FormData();
 
      formData.append("subjectName", data.subjectName);
      formData.append("avatar", data.avatar[0]);

    try {
      const res = await Axios.post('admin/add-subject', formData,{
        headers: {
            "Content-Type": "multipart/form-data",
          },
      })

      toast.success(res.data.message)
      reset();
      closeModal(false);
    } catch  {
      console.error("Error");
    }
  };

  return (
    <div className="fixed top-0 left-0 p-5 min-h-[100vh] w-full z-50 bg-[rgba(223,223,223,0.32)] flex items-center justify-center">
      <div className="bg-white shadow-xl w-[95%] max-w-[500px] p-3 rounded-md relative">
        <div className="absolute top-2 right-2 text-3xl text-gray-700 cursor-pointer" onClick={() => closeModal(false)}>
          <IoClose />
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="text-2xl text-hoverLinkColor mb-5 text-center">اضف مادة</div>

          <div className="mb-4">
            <label htmlFor="subjectName" className="block text-grayColor text-lg mb-2">
              اسم المادة
            </label>
            <input
              type="text"
              id="subjectName"
              className="border rounded-md p-2 block w-full transition-all duration-300 focus:border-hoverLinkColor"
              {...register("subjectName", { required: "اسم المادة مطلوب" })}
            />
            {errors.subjectName && <p className="text-red-500 text-sm mt-1">{errors.subjectName.message}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="avatar" className="block text-grayColor text-lg mb-2">
              صورة المادة
            </label>
            <input
              type="file"
              id="avatar"
              className="border rounded-md p-2 block w-full transition-all duration-300 focus:border-hoverLinkColor"
              accept="image/*"
              {...register("avatar", { required: "الصورة مطلوبة" })}
            />
            {errors.avatar && <p className="text-red-500 text-sm mt-1">{errors.avatar.message}</p>}
          </div>

          <MainButton text="اضف المادة" />
        </form>
      </div>
    </div>
  );
};

export default AddSubject;
