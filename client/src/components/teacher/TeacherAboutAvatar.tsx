import Image from "next/image";

const TeacherAboutAvatar = ({
  avatar,
  name,
  subjects,
}: {
  avatar: string;
  name: string;
  subjects: { _id: string; name: string }[];
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-6 -mt-14" >
      <div className="shrink-0">
        <div className="w-28 h-28 rounded-2xl border-4 border-white shadow-lg overflow-hidden bg-indigo-100 rotate-2 hover:rotate-0 transition-transform duration-500">
          {avatar?.startsWith("http") ? (
            <Image
              src={avatar}
              alt={`صورة ${name}`}
              width={112}
              height={112}
              className="object-cover w-full h-full"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-4xl font-bold text-indigo-400">
              {name?.charAt(0)}
            </div>
          )}
        </div>
      </div>
      <div className="pt-16 md:pt-4 flex flex-col gap-2">
        <h2 className="text-2xl font-bold text-gray-900">أ/ {name}</h2>
        <div className="flex flex-wrap gap-2">
          {subjects?.map((sub) => (
            <span
              key={sub._id}
              className="text-xs font-medium bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full border border-indigo-100"
            >
              {sub.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeacherAboutAvatar;
