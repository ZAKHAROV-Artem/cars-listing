import axios from "axios";

type SocialMediaBody = {
  value1: string;
  value2: string;
  value3: string;
};

export default async function sendToSocialMedia(body: SocialMediaBody) {
  console.log(body);
  return await axios.post(
    `https://maker.ifttt.com/trigger/cars/with/key/bA3GfIfHiWa9WnaP3Kq2ea`,
    {
      "value1": "Value1",
      "value2": "Value1",
      "value3": "Value3",
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
}
