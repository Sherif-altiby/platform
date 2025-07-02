"use client"

import { useAuthUser } from "@/store/authStore";
import { useEffect } from "react";
 
const ClientProvider = () => {

    const { checkUser } = useAuthUser();
    useEffect(() => {
         checkUser();  
      }, []);
  return null
}

export default ClientProvider