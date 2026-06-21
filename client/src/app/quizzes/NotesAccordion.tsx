"use client";

import { useState } from "react";
import QuizRow from "./QuizRow";

interface QuizGroup {
  course: {
    _id: string;
    name: string;
    status: "open" | "pending" | "close";
    quizzes: any[];
  };
}

interface Props {
  data: QuizGroup[];
}

const statusConfig = {
  open: {
    label: "مفتوح",
    badge: "bg-teal-50 text-teal-800 border border-teal-200",
    border: "border-teal-300",
    stripe: "bg-teal-400",
    footer: "",
  },
  pending: {
    label: "معلق",
    badge: "bg-amber-50 text-amber-800 border border-amber-200",
    border: "border-amber-300",
    stripe: "bg-amber-400",
    footer: "bg-amber-50 text-amber-800 border-t border-amber-100",
  },
  close: {
    label: "مغلق",
    badge: "bg-slate-100 text-slate-500 border border-slate-200",
    border: "border-slate-200",
    stripe: "bg-slate-300",
    footer: "bg-slate-50 text-slate-400 border-t border-slate-100",
  },
};

const QuizAccordion = ({ data }: Props) => {
  const [openIds, setOpenIds] = useState<string[]>([]);

  const toggle = (id: string, status: string) => {
    if (status !== "open") return;
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <div className="flex flex-col gap-2">
      {data.map(({ course }) => {
        const cfg = statusConfig[course.status] ?? statusConfig.close;
        const isOpen = course.status === "open";
        const isExpanded = openIds.includes(course._id);

        return (
          <div
            key={course._id}
            className={`rounded-xl border bg-white overflow-hidden transition-opacity ${cfg.border} ${
              course.status === "close" ? "opacity-60" : ""
            }`}
          >
            {/* Header */}
            <button
              disabled={!isOpen}
              onClick={() => toggle(course._id, course.status)}
              className={`flex w-full items-center gap-3 px-5 py-4 text-right transition-colors ${
                isOpen ? "hover:bg-slate-50 cursor-pointer" : "cursor-not-allowed"
              }`}
            >
              {/* Stripe */}
              <div className={`w-1 h-5 rounded-full flex-shrink-0 ${cfg.stripe}`} />

              {/* Title + badge */}
              <div className="flex items-center gap-2.5 flex-1 min-w-0">
                <span
                  className={`text-sm font-medium truncate ${
                    course.status === "close"
                      ? "line-through text-slate-400"
                      : "text-slate-800"
                  }`}
                >
                  {course.name}
                </span>
                <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full flex-shrink-0 ${cfg.badge}`}>
                  {cfg.label}
                </span>
              </div>

              {/* Right */}
              <div className="flex items-center gap-2 ml-auto flex-shrink-0">
                <span className="text-xs text-slate-400">
                  {course.quizzes.length} اختبار
                </span>
                {isOpen ? (
                  <span
                    className={`text-slate-400 text-base transition-transform duration-300 inline-block ${
                      isExpanded ? "rotate-180" : ""
                    }`}
                  >
                    ▾
                  </span>
                ) : (
                  <span className="text-slate-300 text-sm">🔒</span>
                )}
              </div>
            </button>

            {/* Body */}
            <div
              className={`grid transition-all duration-300 ${
                isExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <div className="bg-slate-50/60">
                  {course.quizzes.length === 0 ? (
                    <p className="text-sm text-slate-400 text-center py-5 border-t border-slate-100">
                      لا يوجد اختبارات
                    </p>
                  ) : (
                    course.quizzes.map((quiz) => (
                      <QuizRow key={quiz._id} quiz={quiz} />
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* Status footer */}
            {course.status === "pending" && (
              <div className="flex items-center gap-2 px-5 py-2.5 text-xs bg-amber-50 text-amber-800 border-t border-amber-100">
                <span>⏳</span> قيد المراجعة — ستُتاح الاختبارات بعد الموافقة عليها
              </div>
            )}
            {course.status === "close" && (
              <div className="flex items-center gap-2 px-5 py-2.5 text-xs bg-slate-50 text-slate-400 border-t border-slate-100">
                <span>🔒</span> هذه الدورة مغلقة ولا يمكن الوصول إلى محتواها
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default QuizAccordion;