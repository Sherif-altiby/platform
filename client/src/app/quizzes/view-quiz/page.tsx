import Spiner from '@/components/Spiner';
import React, { Suspense } from 'react'
import QuizContent from './QuizContent';

const page = () => {
  return (
    <Suspense 
      fallback={
        <div className="flex justify-center items-center min-h-[60vh]">
          <Spiner />
        </div>
      }
    >
      <QuizContent />
    </Suspense>
  );
}

export default page