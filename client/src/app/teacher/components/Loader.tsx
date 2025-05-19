import React from "react";

const Loader = () => {
  return (
    <div>
      <div className="flex justify-center items-center h-[300px]">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
    </div>
  );
};

export default Loader;
