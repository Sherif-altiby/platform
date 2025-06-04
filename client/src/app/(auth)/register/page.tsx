"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import Link from "next/link";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  RegisterInputs,
  registerSchema,
} from "@/validations/registerValidation";
import { useAuthUser } from "@/store/authStore";
import ButtonLoader from "@/components/ButtonLoader";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const { userRegister, isRegister } = useAuthUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegisterInputs>({
    mode: "onBlur",
    resolver: zodResolver(registerSchema),
  });

  const onSubmit: SubmitHandler<RegisterInputs> = async (data) => {
    try {
     const res =  await userRegister(
        data.name,
        data.email,
        data.password,
        data.level,
        data.phone
      );

      if(res.status){
        router.push("/login");
      }
      reset();
    } catch (error) {
       toast.error("حاول مرة اخري");
    }
  };

  return (
    <div className="flex items-center justify-center defualt-height">
      <form
        className="w-[90%] shadow-lg max-w-[700px] mt-10 mb-10 p-5 rounded-lg"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="text-2xl text-primary1 mb-5"> انشاء حساب </div>

        <div className="flex items-start flex-col md:flex-row gap-5 mb-5">
          <div className="w-full md:w-1/2">
            <label className="block text-grayColor text-lg mb-2" htmlFor="name">
              {" "}
              الاسم ثلاثي
            </label>
            <input
              type="text"
              id="name"
              className={`border rounded-md p-2 block w-full transition-all duration-300 focus:border-hoverLinkColor ${
                errors.name && "border-red-700"
              } `}
              {...register("name")}
            />
            <span className="text-red-500 text-sm">
              {" "}
              {errors.name?.message}{" "}
            </span>
          </div>

          <div className="w-full md:w-1/2">
            <label
              className="block text-grayColor text-lg mb-2"
              htmlFor="email"
            >
              {" "}
              البريد الالكتروني
            </label>
            <input
              type="text"
              id="email"
              className={`border rounded-md p-2 block w-full transition-all duration-300 focus:border-hoverLinkColor ${
                errors.email && "border-red-700"
              } `}
              {...register("email")}
            />
            <span className="text-red-500 text-sm">
              {" "}
              {errors.email?.message}{" "}
            </span>
          </div>
        </div>

        <div className="flex items-start flex-col md:flex-row gap-5 mb-5">
          <div className="w-full md:w-1/2">
            <label
              className="block text-grayColor text-lg mb-2"
              htmlFor="phone"
            >
              {" "}
              رقم التلفون{" "}
            </label>
            <input
              type="number"
              id="phone"
              className={`border rounded-md p-2 block w-full transition-all duration-300 focus:border-hoverLinkColor ${
                errors.phone && "border-red-700"
              } `}
              {...register("phone")}
            />
            <span className="text-red-500 text-sm">
              {" "}
              {errors.phone?.message}{" "}
            </span>
          </div>

          <div className="w-full md:w-1/2">
            <label
              className="block text-grayColor text-lg mb-2"
              htmlFor="level"
            >
              {" "}
              الصف الدراسي{" "}
            </label>
            <select
              id="level"
              className={`border rounded-md p-2 block w-full transition-all duration-300 focus:border-hoverLinkColor ${
                errors.level && "border-red-700"
              } `}
              {...register("level")}
            >
              <option value="first"> الصف الاول الثانوي </option>
              <option value="second"> الصف الثاني الثانوي </option>
              <option value="third"> الصف الثالث الثانوي </option>
            </select>
            <span className="text-red-500 text-sm">
              {" "}
              {errors.level?.message}{" "}
            </span>
          </div>
        </div>

        <div className="flex items-start flex-col md:flex-row gap-5 mb-5">
          <div className="w-full md:w-1/2">
            <label
              className="block text-grayColor text-lg mb-2"
              htmlFor="password"
            >
              {" "}
              كلمة المرور{" "}
            </label>
            <input
              type="password"
              id="password"
              className={`border rounded-md p-2 block w-full transition-all duration-300 focus:border-hoverLinkColor ${
                errors.password && "border-red-700"
              } `}
              {...register("password")}
            />
            <span className="text-red-500 text-sm">
              {" "}
              {errors.password?.message}{" "}
            </span>
          </div>

          <div className="w-full md:w-1/2">
            <label
              className="block text-grayColor text-lg mb-2"
              htmlFor="pass-confirm"
            >
              {" "}
              تاكيد كلمة المرور{" "}
            </label>
            <input
              type="password"
              id="pass-confirm"
              className={`border rounded-md p-2 block w-full transition-all duration-300 focus:border-hoverLinkColor ${
                errors.confirmPassword && "border-red-700"
              } `}
              {...register("confirmPassword")}
            />
            <span className="text-red-500 text-sm">
              {" "}
              {errors.confirmPassword?.message}{" "}
            </span>
          </div>
        </div>

        {isRegister ? (
          <button
            className="flex items-center justify-center md:text-lg  h-[50px] rounded-xl w-full sm:w-[170px] bg-hoverLinkColor border border-hoverLinkColor text-white transition-all duration-500 hover:rounded-[50px] gap-2"
            disabled
          >
            <p> تسجيل الدخول </p>
            <ButtonLoader />
          </button>
        ) : (
          <button className="flex items-center justify-center md:text-lg   h-[50px] rounded-xl w-full sm:w-[170px] bg-hoverLinkColor border border-hoverLinkColor text-white transition-all duration-500 hover:rounded-[50px] hover:bg-white hover:text-hoverLinkColor">
            تسجيل الدخول
          </button>
        )}
        <div className="flex items-center justify-center gap-1 mt-5 text-lg">
          <p> لديك حساب بالفعل؟ </p>
          <Link href={"/login"} className="text-hoverLinkColor">
            {" "}
            تسجيل الدخول{" "}
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Page;
