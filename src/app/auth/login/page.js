"use client";

import { loginRequest, meRequest } from "@/services/auth/authService";
import { setAuthenticatedUser } from "@/store/slices/userSlice";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";

export default function Login() {
  const dispatch = useDispatch();

  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const changeHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    const loginRes = await loginRequest(user);
    const meRes = await meRequest();
    meRes?.status === 201 && dispatch(setAuthenticatedUser(meRes?.data));
    loginRes?.status === 201 && router?.push("/");
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="bg-gray-900 p-16 rounded-2xl">
          <h3 className="text-2xl mb-8 text-center">Login</h3>
          <input
            type="text"
            className="border block mb-2 p-2 rounded border-gray-600 outline-0"
            placeholder="Email"
            value={user?.email}
            name="email"
            onChange={changeHandler}
          />
          <input
            type="password"
            className="border block mb-2 p-2 rounded border-gray-600 outline-0"
            placeholder="Password"
            value={user?.password}
            name="password"
            onChange={changeHandler}
          />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full mt-4 cursor-pointer transition-colors"
            onClick={loginHandler}
          >
            Login
          </button>
        </div>
      </main>
    </div>
  );
}
