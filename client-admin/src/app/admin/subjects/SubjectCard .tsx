import Image from "next/image";
import React from "react";

type SubjectProps = {
  name: string;
  image: string;
};

const SubjectCard = ({ name, image }: SubjectProps) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-4 flex flex-col items-center transition-transform duration-300 hover:scale-105">
      <Image
        src={image}
        alt={name}
        className="w-20 h-20 object-cover rounded-full border-2 border-hoverLinkColor mb-3"
        width={80}
        height={80}
      />
      <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
    </div>
  );
};

export default SubjectCard;
