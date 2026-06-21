"use client";

import Note from "@/app/notes/Note";
import { useState } from "react";

interface NoteItem {
  _id: string;
  title: string;
  pdf: string;
  lesson: string;
  createdAt: string;
}

interface CourseGroup {
  course: {
    _id: string;
    name: string;
    status: "open" | "pending" | "close";
    notes: NoteItem[];
  };
}

interface NotesAccordionProps {
  data: CourseGroup[];
  teacherId: string;
}

const statusConfig = {
  open: {
    icon: "🔓",
    label: "مفتوح",
    badgeClass: "bg-teal-50 text-teal-800 border border-teal-200",
    headerClass: "hover:bg-slate-50/80 cursor-pointer",
    borderClass: "border-teal-200",
    accentClass: "bg-teal-400",
  },
  pending: {
    icon: "⏳",
    label: "معلق",
    badgeClass: "bg-amber-50 text-amber-800 border border-amber-200",
    headerClass: "cursor-not-allowed",
    borderClass: "border-amber-200",
    accentClass: "bg-amber-400",
  },
  close: {
    icon: "🔒",
    label: "مغلق",
    badgeClass: "bg-slate-100 text-slate-500 border border-slate-200",
    headerClass: "cursor-not-allowed",
    borderClass: "border-slate-200",
    accentClass: "bg-slate-300",
  },
};

const NotesAccordion = ({ data, teacherId }: NotesAccordionProps) => {
  const [openIds, setOpenIds] = useState<string[]>([]);

  const toggle = (id: string, status: string) => {
    if (status !== "open") return;
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <div className="flex flex-col gap-2.5">
      {data.map(({ course }) => {
        const cfg = statusConfig[course.status] ?? statusConfig.close;
        const isExpanded = openIds.includes(course._id);
        const isOpen = course.status === "open";

        return (
            <div
              key={course._id}
              className={`overflow-hidden rounded-3xl border bg-white shadow-sm transition-all duration-300 hover:shadow-md ${cfg.borderClass}`}
            >
              {/* Header */}
              <button
                disabled={!isOpen}
                onClick={() => toggle(course._id, course.status)}
                className={`relative flex w-full items-center gap-4 px-6 py-5 text-right transition-all duration-300
                ${isOpen ? "hover:bg-slate-50" : "cursor-not-allowed"}
                `}
              >
                {/* Accent */}
                <div
                  className={`absolute left-0 top-0 h-full w-1.5 ${cfg.accentClass}`}
                />
          
                {/* Icon */}
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl text-2xl
                  ${
                    course.status === "open"
                      ? "bg-emerald-50"
                      : course.status === "pending"
                      ? "bg-amber-50"
                      : "bg-slate-100"
                  }`}
                >
                  {cfg.icon}
                </div>
          
                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3
                    className={`text-lg font-black truncate
                    ${
                      course.status === "close"
                        ? "text-slate-400 line-through"
                        : "text-slate-800"
                    }
                  `}
                  >
                    {course.name}
                  </h3>
          
                  <div className="mt-2 flex items-center gap-3 flex-wrap">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold ${cfg.badgeClass}`}
                    >
                      {cfg.label}
                    </span>
          
                    <span className="text-xs text-slate-400">
                      {course.notes.length} مذكرة
                    </span>
                  </div>
                </div>
          
                {/* Right Side */}
                <div className="flex flex-col items-end gap-2">
          
                  {course.status === "open" && (
                    <div
                      className={`flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition-transform duration-300
                      ${isExpanded ? "rotate-180" : ""}
                      `}
                    >
                      ▼
                    </div>
                  )}
          
                  {course.status === "pending" && (
                    <span className="text-xs text-amber-600">
                      بانتظار الموافقة
                    </span>
                  )}
          
                  {course.status === "close" && (
                    <span className="text-xs text-slate-400">
                      غير متاح
                    </span>
                  )}
                </div>
              </button>
          
              {/* Body */}
              <div
                className={`grid transition-all duration-500 ease-in-out
                ${isExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}
                `}
              >
                <div className="overflow-hidden">
                  <div className="bg-slate-50/70 p-5 border-t border-slate-100">
          
                    {course.notes.length === 0 ? (
                      <div className="py-8 text-center text-sm text-slate-400">
                        لا توجد مذكرات متاحة
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {course.notes.map((note) => (
                          <Note
                            key={note._id}
                            id={note._id}
                            name={note.title}
                            pdf={note.pdf}
                            teacherId={teacherId}
                            courseId={course._id}
                          />
                        ))}
                      </div>
                    )}
          
                  </div>
                </div>
              </div>
          
              {/* Footer Message */}
              {course.status !== "open" && (
                <div
                  className={`px-6 py-3 text-xs font-medium border-t
                  ${
                    course.status === "pending"
                      ? "bg-amber-50 text-amber-700 border-amber-100"
                      : "bg-slate-50 text-slate-500 border-slate-100"
                  }
                  `}
                >
                  {course.status === "pending"
                    ? "⏳ هذه الدورة قيد المراجعة وستصبح متاحة قريبًا."
                    : "🔒 هذه الدورة مغلقة ولا يمكن الوصول إلى مذكراتها."}
                </div>
              )}
            </div>
          );
      })}
    </div>
  );
};

export default NotesAccordion;