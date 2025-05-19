"use client"

import { useAuthUser } from "@/store/authStore";
import Aboutus from "../components/Aboutus";
import Featuers from "../components/Featuers";
import Hero from "../components/Hero";
import Tesmonils from "../components/Tesmonils";
import { useEffect } from "react";
import Loader from "@/components/Loader";
import StatsSection from "@/components/StatsSection";
import Contact from "@/components/ContactSection";

export default function Home() {

   const { checkUser, isChecking, user  } = useAuthUser();

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
