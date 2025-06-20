import React from 'react';

const BlockedPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 fixed top-0 left-0 w-full z-50">
      <div className="bg-white shadow-lg rounded-2xl p-10 text-center max-w-md">
        <div className="text-red-600 text-5xl mb-4">🚫</div>
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">  لقد تم حظر هذا الحساب  </h1>
        <p className="text-gray-600 mb-6">
        تم حظر حسابك لمخالفة شروطنا.  يُرجى التواصل مع الدعم.
        </p>
        <a
          href="https://wa.me/01017143343"
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition duration-200"
        >
          تواصل معنا
        </a>
      </div>
    </div>
  );
};

export default BlockedPage;
