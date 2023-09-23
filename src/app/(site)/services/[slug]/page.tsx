import getWidget from "@/actions/server/getWidget";
import getStaticPage from "@/actions/server/getStaticPage";
import { notFound } from "next/navigation";

export const revalidate = 3600;
// export const dynamic = "force-dynamic";
type Props = {
  params: { slug: string };
};
export default async function ServicesPage({ params: { slug } }: Props) {
  const page = await getStaticPage(slug);
  if (!page.data.data.length) return notFound();
  const widget = await getWidget("static-page");

  return (
    <div className="container flex py-3">
      <div
        className="grow"
        dangerouslySetInnerHTML={{
          __html: page.data.data[0]?.attributes.html || "<div/>",
        }}
      />
      {widget.data.data[0]?.attributes.html && (
        <div
          dangerouslySetInnerHTML={{
            __html: widget.data.data[0].attributes.html,
          }}
        />
      )}
    </div>
  );
}
