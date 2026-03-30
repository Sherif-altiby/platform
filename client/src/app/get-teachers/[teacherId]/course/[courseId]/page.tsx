"use client";

import SectionHeading from "@/components/common/SectionHeading";
import CourseCard from "@/components/course/CourseCard";
import SubHeader from "@/components/SubHeader";
import Image from "next/image";
import Link from "next/link";
import { FaPlay, FaRegClock, FaUsers, FaArrowLeft } from "react-icons/fa";
import { PiGraduationCapLight } from "react-icons/pi";



const CoursesSection = () => {
  // Example Data
  const courses = [
    {
      id: 1,
      title: "مراجعة ليلة الامتحان في الفيزياء",
      subject: "الفيزياء",
      price: 150,
      students: 1200,
      length: "12 ساعة",
      image: "https://images.unsplash.com/photo-1636466484362-ad39d678174a?q=80&w=800",
      link: "#",
    },
    {
      id: 2,
      title: "أساسيات التفاضل والتكامل",
      subject: "الرياضيات",
      price: 180,
      students: 850,
      length: "15 ساعة",
      image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=800",
      link: "#",
    },
    {
      id: 3,
      title: "شرح الكيمياء العضوية بالتفصيل",
      subject: "الكيمياء",
      price: 130,
      students: 940,
      length: "10 ساعات",
      image: "https://images.unsplash.com/photo-1532187875605-7fe3584d0c27?q=80&w=800",
      link: "#",
    },
    {
      id: 4,
      title: "شرح الكيمياء العضوية بالتفصيل",
      subject: "الكيمياء",
      price: 130,
      students: 940,
      length: "10 ساعات",
      image: "https://images.unsplash.com/photo-1532187875605-7fe3584d0c27?q=80&w=800",
      link: "#",
    },
  ];

  return (
    <section className="ctm-height bg-gray-50">
        <SubHeader currentTitle="الكورسات المتاحة" />
      <div className="container py-12 ">
        {/* Section Heading */}
       
        <SectionHeading title="الكورسات المتاحة" description="ابدأ رحلة التعلم مع أفضل المدرسين"  icon={PiGraduationCapLight}/>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {courses.map((course) => (
            <CourseCard key={course.id} {...course} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoursesSection;