"use client";

import { profileRequest, registerRequest } from "@/services/auth/authService";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Profile() {
  const authUser = useSelector((state) => state?.user);
  const [user, setUser] = useState({
    fullName: "",
    userName: "",
    email: "",
  });

  useEffect(() => {
    if (authUser) {
      setUser({
        fullName: authUser?.authenticatedUser?.fullName || "",
        userName: authUser?.authenticatedUser?.userName || "",
        email: authUser?.authenticatedUser?.email || "",
      });
    }
  }, [authUser]);

  const changeHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const profileHandler = async (e) => {
    e.preventDefault();
    const res = await profileRequest(user);
    console.log("res", res);
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="bg-gray-900 p-16 rounded-2xl">
          <h3 className="text-2xl mb-8 text-center">Profile</h3>
          <input
            type="text"
            className="border block mb-2 p-2 rounded border-gray-600 outline-0"
            placeholder="Email"
            value={user?.email}
            name="email"
            onChange={changeHandler}
          />
          <input
            type="text"
            className="border block mb-2 p-2 rounded border-gray-600 outline-0"
            placeholder="Username"
            value={user?.userName}
            name="userName"
            onChange={changeHandler}
          />
          <input
            type="text"
            className="border block mb-2 p-2 rounded border-gray-600 outline-0"
            placeholder="fullName"
            value={user?.fullName}
            name="fullName"
            onChange={changeHandler}
          />

          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full mt-4 cursor-pointer transition-colors"
            onClick={profileHandler}
          >
            Change
          </button>
        </div>
      </main>
    </div>
  );
}
