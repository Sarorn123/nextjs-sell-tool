import { useRouter } from "next/router";
import { GoPrimitiveDot } from "react-icons/go";
import {
  getNotification,
  setAllNotification,
} from "../../redux/slice/admin/notificationSlice";
import { useEffect, useState } from "react";
import { get10Notification } from "../../api_service/admin/notification";
import { useDispatch } from "react-redux";
import { updateNotification } from "../../api_service/admin/notification/index";

// animation
import { motion as m } from "framer-motion";
import moment from 'moment';

interface Props {
  closeDropBox: any;
}

const NotificationBox = ({ closeDropBox }: Props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { notifications } = getNotification();

  useEffect(() => {
    const getNotification = async () => {
      const res = await get10Notification();
      if (res?.status == 200) {
        dispatch(setAllNotification(res?.data));
      }
    };
    getNotification();
  }, []);

  const handleView = async (id: number) => {
    const res = await updateNotification(id);
    if (res?.status == 200) {
      dispatch(setAllNotification(res?.data));
      router.push("/admin/buy");
      closeDropBox(false);
    }
  };

  return (
    <m.div
      initial={{
        opacity: 0.2,
        y: -10,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      exit={{
        opacity: 1,
        y: -10,
      }}
      className="shadow-lg border z-40 w-[20rem] h-[25rem] overflow-auto absolute top-10 right-10 rounded-lg p-4 bg-gradient-to-t bg-white dark:shadow-slate-500 dark:bg-gray-800"
      onClick={closeDropBox}
    >
      {notifications?.map((notification: any, index: number) => (
        <div key={index} onClick={() => handleView(notification.id)}>
          <div
            className={`flex px-4 py-2 hover:bg-cyan-500 rounded-lg border-b-[1px] group transition-all dark:text-white ${
              !notification.saw && "bg-cyan-900 text-white"
            }`}
          >
            {notification.saw ? (
              <GoPrimitiveDot className="text-gray-400 group-hover:text-white" />
            ) : (
              <GoPrimitiveDot className="text-green-500 " />
            )}
            <div className="ml-4">
              <p className="text-gray-400 text-[0.7rem] group-hover:text-white">
                {moment(notification.date).fromNow(true)}
              </p>
              <h2 className="font-bold  group-hover:text-white text-sm">
                {notification.title}
              </h2>
              <p className="group-hover:text-white text-sm">
                {notification.body}
              </p>
            </div>
          </div>
        </div>
      ))}
    </m.div>
  );
};

export default NotificationBox;
