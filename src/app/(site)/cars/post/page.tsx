import { getServerAuth } from "@/lib/getServerAuth";
import PostCarForm from "./components/post-car-form";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXTAUTH_URL as string),
  title: "Post car for sale in Ethiopia",
  applicationName: "Mekina.net",
  robots: "index, follow",
  keywords: "sell car, ethiopia, used cars, toyota, mekina, mekinanet",
  description:
    "Fill out the form to sell you car in Ethiopia on www.mekina.net ",
  twitter: {
    card: "summary_large_image",
    title:
      "Post car for sale in Ethiopia",
    site: "@mekinanet",
    creator: "@mekinanet",
    description:
      "Buy, Sell or rent cars in Ethiopia on www.mekina.net",
  },
  openGraph: {
    title: `${process.env.DOMAIN} - Fill the form to sell your car in Ethiopia`,
    description:
      "በኢትዮጵያ የኢንተርኔት የመኪና መገበያያ ድረገጽ - Ethiopian online cars marketplace - Used cars, new cars, rental cars.",
    type: "website",
    locale: "en_us",
    url: process.env.NEXTAUTH_URL,
    siteName: process.env.DOMAIN,
  },
};

export default async function PostCarPage() {
  const user = await getServerAuth();
  if (
    user &&
    (Number(user?.points) || 0) < 1 &&
    user?.seller_type?.slug !== "private"
  )
    redirect("/payment");

  return (
    <div className={"container relative"}>
      <h1 className="py-5  text-xl font-[500] sm:text-2xl md:text-3xl">
        Post car form
      </h1>
      <PostCarForm />
    </div>
  );
}
