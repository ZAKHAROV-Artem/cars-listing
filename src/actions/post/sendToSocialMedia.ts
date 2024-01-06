import axios from "axios";

export type SocialMediaBody = {
  value1: string;
  value2: string;
  value3: string;
};

export default async function sendToSocialMedia(body: SocialMediaBody) {
  return await axios.post(
    `https://maker.ifttt.com/trigger/cars/with/key/bA3GfIfHiWa9WnaP3Kq2ea`,
    body,
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
}
