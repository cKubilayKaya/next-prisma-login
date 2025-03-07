"use client";
import { logoutRequest } from "@/services/auth/authService";
import { logoutAuthenticatedUser } from "@/store/userSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

export default function Header() {
  const router = useRouter();
  const authenticatedUser = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const logoutHandler = async () => {
    const res = await logoutRequest();
    if (res.status === 201) {
      dispatch(logoutAuthenticatedUser());
      router.push("/auth/login");
    }
  };

  return (
    <div className="bg-gray-900">
      <div className="container mx-auto flex items-center justify-between py-4">
        <Link href="/">Anasayfa</Link>
        {authenticatedUser?.authenticatedUser?.email?.length >= 1 ? (
          <div className="flex items-center gap-4">
            <p>{authenticatedUser?.authenticatedUser?.email}</p>
            <button className="bg-white text-black px-4 py-2 rounded cursor-pointer" onClick={logoutHandler}>
              Çıkış Yap
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <Link href="/auth/register" className="bg-white text-black px-4 py-2 rounded cursor-pointer">
              Kayıt Ol
            </Link>
            <Link href="/auth/login" className="bg-white text-black px-4 py-2 rounded cursor-pointer">
              Giriş Yap
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
