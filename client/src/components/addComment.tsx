import { Axios } from '@/axios/Axios';
import MainButton from '@/components/MainButton';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { FaStar } from 'react-icons/fa';

const AddComment = () => {
  const [loading, setLoading] = useState(false);
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!comment || rating === null) {
      toast.error('يرجى كتابة تعليق وتحديد تقييم.');
      return;
    }

    setLoading(true);
    try {
        await Axios.post('user/add-comment', {
        comment,
        rate: rating,
      });

      toast.success('تم إرسال تعليقك بنجاح');
      setComment('');
      setRating(null);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'حدث خطأ ما');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-[90%] shadow-lg max-w-[700px] mt-10 mb-10 p-5 rounded-lg ml-auto mr-auto"
    >
      <p className="text-xl text-center border-b pb-3 text-gray-500 mb-4">
        قم بتقييم هذة المنصة
      </p>

      <div className="mb-5">
        <label className="block text-grayColor text-lg mb-2">التعليق</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="border rounded-md p-3 block w-full transition-all duration-300 focus:border-hoverLinkColor"
          rows={4}
          placeholder="اكتب تعليقك هنا..."
        />
      </div>

      <div className="mb-5">
        <label className="block text-grayColor text-lg mb-2">التقييم</label>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <FaStar
              key={star}
              className={`cursor-pointer text-2xl ${
                rating && star <= rating ? 'text-yellow-400' : 'text-gray-300'
              }`}
              onClick={() => setRating(star)}
            />
          ))}
        </div>
      </div>

      {loading ? (
        <MainButton loading text="إرسال" />
      ) : (
        <MainButton text="إرسال" />
      )}
    </form>
  );
};

export default AddComment;
