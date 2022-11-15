import Image from "next/image";
import React from "react";
import Logo from "../../images/logo.png";
import { BsSearch } from "react-icons/bs";
import { AiOutlineBell } from "react-icons/ai";
import { CgMenuMotion } from "react-icons/cg";
import NoAvatar from "../../images/noAvatar.png";
import { useState, useEffect } from "react";
import Dropbox from "../utils/Dropbox";
import DropboxForAdmin from "../utils/DropboxForAdmin";
import { getAuthData } from "../../redux/slice/authSlice";
import { useAppSelector } from "../../redux/hook";
import { getNotification } from "../../redux/slice/admin/notificationSlice";
import NotificationBox from "../utils/NotificationBox";

type Props = {
  setSidebar: any;
};

function Header({ setSidebar }: Props) {
  const [openDropbox, setOpenDropbox] = useState(false);
  const [openNotification, setOpenNotification] = useState(false);
  const [unSawNotificationCount, setUnSawNotificationCount] = useState<any>();
  const { user } = useAppSelector(getAuthData);
  const { notifications } = getNotification();

  useEffect(() => {
    const count = notifications.filter(
      (notice: any) => notice.saw !== true
    ).length;
    setUnSawNotificationCount(count);
  }, [notifications]);

  return (
    <>
      <div className="h-[4rem] w-full shadow-xl dark:bg-gray-800 border-b">
        <div className="container mx-auto flex items-center justify-between h-full relative">
          {openDropbox && <DropboxForAdmin closeDropBox={setOpenDropbox} />}
          {openNotification && (
            <NotificationBox closeDropBox={setOpenNotification} />
          )}
          <div className="h-10 w-10 relative">
            <Image src={Logo} />
          </div>
          <div className="flex items-center text-gray-500 dark:text-white ">
            <BsSearch className="mx-2 transition-all duration-300 ease-in-out cursor-pointer  text-2xl hover:text-black dark:hover:text-gray-400 " />
            <div
              className="relative"
              onClick={() => setOpenNotification((pre) => !pre)}
            >
              {unSawNotificationCount ? (
                <div className="bg-red-500 text-white absolute right-0 -top-2 rounded-full h-5 w-5 flex justify-center items-center">
                  {unSawNotificationCount}
                </div>
              ) : (
                ""
              )}
              <AiOutlineBell className="mx-2 transition-all duration-300 ease-in-out cursor-pointer  text-2xl hover:text-black dark:hover:text-gray-400 " />
            </div>
            <div
              className="w-8 h-8 rounded-full overflow-hidden mx-2 transition-all duration-300 ease-in-out cursor-pointer "
              onClick={() => setOpenDropbox((pre: any) => !pre)}
            >
              {user && user.image_url ? (
                <img src={user.image_url} />
              ) : (
                <Image src={NoAvatar} />
              )}
            </div>
            <CgMenuMotion
              className="mx-2 transition-all duration-300 ease-in-out cursor-pointer  text-2xl hover:text-black dark:hover:text-gray-400 "
              onClick={() => setSidebar((pre: any) => !pre)}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
