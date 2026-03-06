"use client";
import { useQuery } from "@tanstack/react-query";
import { checkUser } from "@/app/utils/userFeatuers";
import { useAuthUser } from "@/store/authStore";
import { useEffect } from "react";

const ClientProvider = () => {
  const { setUser } = useAuthUser();

  const { data, isLoading, error } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await checkUser();
      return res.user;
    },
    retry: false,
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    if (data) setUser(data);
    if (error) setUser(null);
  }, [data, error]);

  if (isLoading) return null;

  return null;
};

export default ClientProvider;