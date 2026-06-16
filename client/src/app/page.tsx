"use client"

import { useAuthUser } from "@/store/authStore";
import Aboutus from "../components/Aboutus";
import Hero from "../components/Hero";
import Tesmonils from "../components/Tesmonils";
import { useEffect } from "react";
import StatsSection from "@/components/StatsSection";
import TeachersSection from "@/components/home/TeachersSection";
import { useLevelStore } from "@/store/levelStore";

export default function Home() {

  const { fetchLevels } = useLevelStore()

  useEffect(() => {
    fetchLevels();
  }, []);

  return (
     <div>
         <Hero /> 
         <Aboutus />
         <TeachersSection />
         <Tesmonils />
         <StatsSection />
         {/* <Contact /> */}
     </div>
  );
}
