"use client"

import { useAuthUser } from "@/store/authStore";
import Aboutus from "../components/Aboutus";
import Hero from "../components/Hero";
import Tesmonils from "../components/Tesmonils";
import { useEffect } from "react";
import StatsSection from "@/components/StatsSection";

export default function Home() {

   const { checkUser  } = useAuthUser();

   useEffect(() => {
      checkUser()
   }, [])

  return (
     <div>
         <Hero /> 
         <Aboutus />
         <Tesmonils />
         <StatsSection />
         {/* <Contact /> */}
     </div>
  );
}
