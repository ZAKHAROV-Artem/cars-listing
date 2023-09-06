import { getServerAuth } from "@/lib/getServerAuth";
import PostCarForm from "./components/post-car-form";

export default async function PostCarPage() {

  return (
    <div className="container">
      <h1 className="py-5  text-xl font-[500] sm:text-2xl md:text-3xl">
        Post car form
      </h1>
      <PostCarForm />
    </div>
  );
}
