import Image from "next/image";
import Link from "next/link";

interface SubjectCardProps {
  link: string;
  name: string;
  length: number;
  avatar: string;
}

const SubjectCard = ({ link, name, length, avatar }: SubjectCardProps) => {
  const imageUrl = `${process.env.NEXT_PUBLIC_IMAGES_URL}/${avatar}`;

  return (
    <Link href={link}>
      <div
        className="
          group relative bg-white border border-gray-200 rounded-2xl p-6 shadow-md 
          hover:shadow-2xl hover:border-blue-300 transition-all duration-500 
          transform hover:-translate-y-2 cursor-pointer overflow-hidden
          animate-fade-in
        "
      >
        {/* Shine Animation Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none [mask-image:linear-gradient(60deg,transparent,white,transparent)] animate-shimmer" />

        <div className="flex flex-col items-center">
          <div className="w-24 h-24 rounded-full border-4 border-blue-200 overflow-hidden shadow-lg transform group-hover:scale-110 transition duration-500">
            <Image
              src={imageUrl}
              alt={`${name} subject`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 96px, 96px"
              loading="lazy"
            />
          </div>

          <h3 className="mt-4 text-xl font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
            {name}
          </h3>

          <p className="mt-2 text-lg text-blue-500 font-medium">
            {length} معلمين
          </p>

          <span className="mt-3 text-sm text-gray-500 group-hover:text-blue-400 transition duration-300">
            عرض التفاصيل →
          </span>
        </div>
      </div>
    </Link>
  );
};

export default SubjectCard;
