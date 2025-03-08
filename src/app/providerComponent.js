"use client";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { meRequest } from "@/services/auth/authService";
import { setAuthenticatedUser } from "@/store/slices/userSlice";

export default function ProviderComponent({ children }) {
  const [loading, setLoading] = useState(true); // Yükleniyor durumu
  const dispatch = useDispatch();

  useEffect(() => {
    const getMe = async () => {
      try {
        const meRes = await meRequest();
        if (meRes?.status === 201) {
          dispatch(setAuthenticatedUser(meRes?.data));
        }
      } catch (error) {
        console.error("Kullanıcı bilgileri alınamadı:", error);
      } finally {
        setLoading(false); // Yükleme bittiğinde durumu false yap
      }
    };

    getMe();
  }, [dispatch]);

  if (loading) {
    return "";
  }

  return <>{children}</>;
}
