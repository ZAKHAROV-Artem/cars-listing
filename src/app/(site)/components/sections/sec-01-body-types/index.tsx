import getBodyTypes from "@/actions/server/getBodyTypes";
import Image from "next/image";
import Link from "next/link";

export default async function Sec01BodyTypes() {
  const bodyTypes = await getBodyTypes();
  return (
    <div className="container grid grid-cols-3 gap-1 md:grid-cols-6">
      {bodyTypes.data.data.map((bodyType) => (
        <Link
          href={`/cars/search?bodyType=${bodyType.attributes.slug}`}
          className="grid cursor-pointer place-items-center gap-y-2  p-5 duration-200 hover:bg-gray-100 dark:hover:bg-paper-dark"
          key={bodyType.attributes.slug}
        >
          <Image
            src={bodyType.attributes.image.data.attributes.url}
            alt={bodyType.attributes.type}
            width={250}
            height={112}
          />
          <div className="text-sm xs:text-md sm:text-xl ">
            {bodyType.attributes.type}
          </div>
        </Link>
      ))}
    </div>
  );
}
