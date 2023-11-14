import { SocialMediaBody } from "@/actions/client/sendToSocialMedia";
import axios from "axios";

export async function POST(req: Request) {
  try {
    const body: SocialMediaBody = await req.json();
    await axios.post(
      `https://maker.ifttt.com/trigger/cars/with/key/bA3GfIfHiWa9WnaP3Kq2ea`,
      body,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    return Response.json("Sent to social media");
  } catch (error) {
    return Response.json("Failed to send to social media");
  }
}
