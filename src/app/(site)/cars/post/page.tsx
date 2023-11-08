import { getServerAuth } from "@/lib/getServerAuth";
import PostCarForm from "./components/post-car-form";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";
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