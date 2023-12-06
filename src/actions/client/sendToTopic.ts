import axios from "axios";
import { NotificationPayload } from "firebase/messaging";

export type SendToTopicNotification = {
  title: string;
  body:
    | {
        id: string | number;
        brand: string;
        model?: string;
        year?: string;
      }
    | string;
};
type SendToTopicBody = {
  to: string;
  notification: SendToTopicNotification;
};
export default async function sendToTopic(body: SendToTopicBody) {
  return await axios.post(`https://fcm.googleapis.com/fcm/send`, body, {
    headers: {
      Authorization: `key=${process.env.NEXT_PUBLIC_FIREBASE_SERVER_KEY}`,
    },
  });
}
