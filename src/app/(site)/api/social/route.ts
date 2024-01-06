import { SocialMediaBody } from "@/actions/post/sendToSocialMedia";
import axios from "axios";
import { NextResponse } from "next/server";

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
    return NextResponse.json("Sent to social media");
  } catch (error) {
    return NextResponse.json("Failed to send to social media");
  }
}
