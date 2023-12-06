import { useState } from "react";
import { getMessaging, getToken } from "firebase/messaging";
import firebaseApp from "@/lib/firebase";
import { useEffectOnce } from "usehooks-ts";
import subscribeFcmToken from "@/actions/client/subscribeFcmToken";

const useFcmToken = () => {
  const [token, setToken] = useState("");
  const [notificationPermissionStatus, setNotificationPermissionStatus] =
    useState("");

  useEffectOnce(() => {
    const retrieveToken = async () => {
      try {
        if (typeof window !== "undefined" && "serviceWorker" in navigator) {
          const messaging = getMessaging(firebaseApp);

          // Retrieve the notification permission status
          const permission = await Notification.requestPermission();
          setNotificationPermissionStatus(permission);

          // Check if permission is granted before retrieving the token
          if (permission === "granted") {
            const currentToken = await getToken(messaging, {
              vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
            });
            if (currentToken) {
              setToken(currentToken);
              subscribeFcmToken({ token: currentToken, topic: "all-users" })
                .then((response) => {
                  if (response.status < 200 || response.status >= 400) {
                    throw (
                      "Error subscribing to topic: " + response.status + " - "
                    );
                  }
                  console.log(`Subscribed to "new-cars"`);
                })
                .catch((error) => {
                  console.error(error);
                });
            } else {
              console.log(
                "No registration token available. Request permission to generate one.",
              );
            }
          }
        }
      } catch (error) {
        console.log("An error occurred while retrieving token:", error);
      }
    };

    retrieveToken();
  });

  return { fcmToken: token, notificationPermissionStatus };
};

export default useFcmToken;
