import axios from "axios";

export default async function subscribeFcmToken({
  token,
  topic,
}: {
  token: string;
  topic: string;
}) {
  return await axios.post(
    `https://iid.googleapis.com/iid/v1/${token}/rel/topics/${topic}`,
    {},
    {
      headers: {
        Authorization: `key=${process.env.NEXT_PUBLIC_FIREBASE_SERVER_KEY}`,
      },
    },
  );
}
