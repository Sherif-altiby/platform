"use client";

import Spiner from "@/components/Spiner";
import QuizContent from "./QuizContent";
import { Suspense } from "react";

const Page = () => {
  <Suspense 
      fallback={
        <div className="flex justify-center items-center min-h-screen bg-[#eee]">
          <Spiner />
        </div>
      }
    >
      <QuizContent />
    </Suspense>
};

export default Page;
