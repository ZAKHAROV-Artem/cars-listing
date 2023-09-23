import { getServerAuth } from "@/lib/getServerAuth";
import { redirect } from "next/navigation";
import EditCarForm from "./components/edit-car-form";
import getCar from "@/actions/server/getCar";

type Props = {
  params: { id: string };
};
export const revalidate = 0;
export default async function EditCarPage({ params }: Props) {
  const user = await getServerAuth();
  if (!user || !params.id) redirect("/");
  const cacheKey = Date.now().toString();

  // Append the cache key as a query parameter
  const car = await getCar(params.id);
  return (
    <div className={"container relative"}>
      <h1 className="py-5  text-xl font-[500] sm:text-2xl md:text-3xl">
        Edit car form
      </h1>
      <EditCarForm car={car} />
    </div>
  );
}
