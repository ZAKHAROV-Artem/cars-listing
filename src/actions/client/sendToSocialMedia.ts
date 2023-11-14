import axios from "axios";

export type SocialMediaBody = {
  value1: string;
  value2: string;
  value3: string;
};

export default async function sendToSocialMedia(body: SocialMediaBody) {
  return await axios.post(`/api/social`, body, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
