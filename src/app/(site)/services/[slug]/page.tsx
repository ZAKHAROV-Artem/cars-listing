import getStaticPage from "@/actions/server/getStaticPage";
import { notFound } from "next/navigation";

// export const revalidate = 3600;
export const dynamic = "force-dynamic";
type Props = {
  params: { slug: string };
};
export default async function ServicesPage({ params: { slug } }: Props) {
  const page = await getStaticPage(slug);
  if (!page) notFound();
  return (
    <div
      dangerouslySetInnerHTML={{ __html: page.data.data[0].attributes.html }}
    />
  );
}
