"use client";
import { useQuery } from "@tanstack/react-query";
import { checkUser } from "@/app/utils/userFeatuers";

const ClientProvider = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await checkUser();
      return res.user; 
    },
    retry: false,
  });

  if (isLoading) return null;
  if (error) return null;

  return null;
};

export default ClientProvider;
