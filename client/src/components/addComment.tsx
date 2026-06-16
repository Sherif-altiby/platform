import { Axios } from '@/axios/Axios';
import MainButton from '@/components/MainButton';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { FaStar } from 'react-icons/fa';
import { FaRegCommentDots } from 'react-icons/fa';

const AddComment = () => {
  const [loading, setLoading] = useState(false);
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState<number | null>(null);
  const [hovered, setHovered] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment || rating === null) {
      toast.error('يرجى كتابة تعليق وتحديد تقييم.');
      return;
    }
    setLoading(true);
    try {
      await Axios.post('user/add-comment', { comment, rate: rating });
      toast.success('تم إرسال تعليقك بنجاح');
      setComment('');
      setRating(null);
    } catch {
      toast.error('حدث خطأ ما');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full max-w-[700px] bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden mb-10">
      {/* Card header */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-gray-100">
        <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center shadow-md">
          <FaRegCommentDots className="text-white text-sm" />
        </div>
        <h2 className="text-lg font-bold text-gray-900">تقييم المنصة</h2>
      </div>

      <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-5">

        {/* Stars */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">التقييم</label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar
                key={star}
                className={`cursor-pointer text-2xl transition-colors duration-200 ${
                  (hovered ?? rating ?? 0) >= star ? "text-amber-400" : "text-gray-200"
                }`}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHovered(star)}
                onMouseLeave={() => setHovered(null)}
              />
            ))}
          </div>
        </div>

        {/* Comment */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1.5">التعليق</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="border border-gray-200 bg-gray-50 rounded-xl px-4 py-3 block w-full text-gray-800 text-sm transition-all duration-300 focus:outline-none focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-50 resize-none"
            rows={4}
            placeholder="اكتب تعليقك هنا..."
          />
        </div>

        <div className="pt-1">
          <MainButton loading={loading} text="إرسال التقييم" />
        </div>
      </form>
    </div>
  );
};

export default AddComment;