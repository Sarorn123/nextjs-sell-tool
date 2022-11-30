import React from "react";
import { useAppSelector } from "../../redux/hook";
import { getAuthData } from "../../redux/slice/authSlice";
import AdminLayout from "./AdminLayout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import UserLayout from "./UserLayout";
import { AiOutlineSetting } from "react-icons/ai";
import Setting from "../utils/Setting";

type props = {
  children: JSX.Element;
};
export default function Layout({ children }: props) {
  const { user, loading } = useAppSelector(getAuthData);
  const [setting, setSetting] = useState(false);
  const router = useRouter();

  // theme 
  useEffect(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const handleSetting = () => {
    setSetting((pre) => !pre);
  };

  useEffect(() => {
    if(user && user?.role?.name === "Admin"){
      router.push("/admin/dashboard")
    }
  },[]);

  return (
    <>
      {!loading && (
        <>
          <div
            className="z-[100000] shadow-gray-500 shadow-md bg-cyan-500 p-2 rounded-full text-white fixed bottom-10 right-10 group"
            onClick={handleSetting}
          >
            <AiOutlineSetting className="text-md md:text-2xl group-hover:rotate-90 transition duration-300 ease-in-out" />
          </div>
          <Setting open={setting} />
          {user && user.role?.name === "Admin" ? (
            <AdminLayout>{children}</AdminLayout>
          ) : (
            <UserLayout>{children}</UserLayout>
          )}
        </>
      )}
    </>
  );
}
