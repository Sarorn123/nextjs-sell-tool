import React, { useEffect } from "react";
import Pusher from "pusher-js";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { setAllNotification } from "../../redux/slice/admin/notificationSlice";
import { addNotification } from "../../api_service/admin/notification";

interface Notificate {
  title: string;
  message: string;
}

function Notify() {
  const router = useRouter();
  const dispatch = useDispatch();

  const notify = (title: string, body: string) => {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        const notify = new Notification(title, {
          body: body,
        });

        notify.addEventListener("click", () => {
          router.push("/admin/buy");
        });
      }
    });
  };

  const handleCreateNotification = async (data: Notificate) => {
    const res = await addNotification({
      title: data.title,
      body: data.message,
    });
    if (res?.status == 201) {
      dispatch(setAllNotification(res?.data));
    }
    return res;
  };

  useEffect(() => {
    const pusher = new Pusher(
      process.env.NEXT_PUBLIC_PUSHER_KEY
        ? process.env.NEXT_PUBLIC_PUSHER_KEY
        : "",
      {
        cluster: "ap1",
      }
    );
    const channel1 = pusher.subscribe("buyChannel");
    channel1.bind("buy", async function (data: any) {
      const res = await handleCreateNotification(data);
      if (res?.status === 201) {
        notify(data.title, data.message);
      }
    });

    return () => {
      pusher.unsubscribe("buyChannel");
    };
  }, []);
  return <></>;
}

export default Notify;
