import { useAuthUser } from "@/store/authStore";
import { FaArrowRight } from "react-icons/fa6";

const ProfileWelcom = () => {
  const user = useAuthUser((s) => s.user);

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100">
      <div className="flex flex-col md:flex-row items-start gap-4">
        <div className=" size-10 md:size-16 bg-indigo-600 rounded-xl flex items-center justify-center text-white md:text-2xl font-black shadow-lg shadow-indigo-100">
         {user?.name[0]}
        </div>
        <div>
          <h1 className="md:text-2xl font-black text-slate-800">
            أهلاً بك يا {user?.name} 👋
          </h1>
          <p className="text-slate-500 text-sm md:text-lg md:font-medium">
            واصل رحلة تعلمك، أنت تبلي بلاءً حسناً اليوم!
          </p>
        </div>
      </div>
      <button className="px-6 py-3 bg-slate-900 text-white  rounded-xl md:font-bold hover:bg-slate-800 transition-all flex items-center gap-2">
        اكتشف كورسات جديدة
        <FaArrowRight size={18} />
      </button>
    </div>
  );
};

export default ProfileWelcom;
