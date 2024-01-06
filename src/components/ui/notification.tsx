"use client";
import { useEffect, useState } from "react";
import toast, { Toast } from "react-hot-toast";
import useFcmToken from "@/hooks/useFcmToken";
import { onMessage, getMessaging } from "firebase/messaging";
import { useEffectOnce } from "usehooks-ts";
import { cn } from "@/lib/utils";
import firebaseApp from "@/lib/firebase";
import { SendToTopicNotification } from "@/actions/post/sendToTopic";
import Link from "next/link";

export default function Notification() {
  const [notification, setNotification] =
    useState<SendToTopicNotification | null>(null);
  const notify = () => {
    toast.custom((t) => <ToastDisplay1 t={t} />, {
      duration: 3000,
      position: "top-right",
    });
  };

  function ToastDisplay1({ t }: { t: Toast }) {
    return (
      <Link
        href={`/cars/${
          typeof notification?.body !== "string" ? notification?.body.id : ""
        }`}
        className={cn(
          `min-w-[240px] cursor-pointer rounded-sm bg-green-500 px-3 py-2 duration-300`,
          {
            "opacity-1": t.visible,
            "opacity-0": !t.visible,
          },
        )}
      >
        <p>
          <b>
            {typeof notification?.body === "string"
              ? notification?.body
              : "New car published"}
          </b>
        </p>
        {typeof notification?.body !== "string" && (
          <p>
            {notification?.body?.brand || " "}
            {notification?.body?.model || " "}
            {notification?.body?.year || ""}
          </p>
        )}
      </Link>
    );
  }

  useFcmToken();

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffectOnce(() => {
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      const messaging = getMessaging(firebaseApp);
      const unsubscribe = onMessage(messaging, (payload) => {
        console.log("Foreground push notification received:", payload);
        // Handle the received push notification while the app is in the foreground
        // You can display a notification or update the UI based on the payload
        setNotification({
          title: payload.notification?.title || "",
          body:
            typeof payload.notification?.body === "string"
              ? payload.notification?.body
              : JSON.parse(payload.notification?.body || ""),
        });
      });
      return () => {
        unsubscribe(); // Unsubscribe from the onMessage event
      };
    }
  });
  useEffect(() => {
    if (notification?.title) {
      notify();
    }
  }, [notification]);

  return null;
}
