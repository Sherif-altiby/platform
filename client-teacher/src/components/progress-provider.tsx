"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import NProgress from "nprogress";
import "nprogress/nprogress.css"; 


export default function ProgressProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();  
  const router = useRouter();  

  useEffect(() => {
    const handleStart = () => NProgress.start();
    const handleStop = () => NProgress.done();

    router.prefetch(pathname);  
    
    handleStart();
    handleStop();

  }, [pathname]);

  return <>{children}</>;
}
