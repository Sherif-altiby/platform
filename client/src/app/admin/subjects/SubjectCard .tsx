import React from "react";

type SubjectProps = {
  name: string;
  image: any;
};

const IMAGE_URL = process.env.NEXT_PUBLIC_IMAGES_URL

const SubjectCard = ({ name, image }: SubjectProps) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-4 flex flex-col items-center transition-transform duration-300 hover:scale-105">
      <img
        src={`${IMAGE_URL}${image}`}
        alt={name}
        className="w-20 h-20 object-cover rounded-full border-2 border-hoverLinkColor mb-3"
      />
      <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
    </div>
  );
};

export default SubjectCard;
