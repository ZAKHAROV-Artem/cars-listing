import getStaticPage from "@/actions/get/getStaticPage";
import getWidget from "@/actions/get/getWidget";
import { notFound } from "next/navigation";
import Script from "next/script";
export const revalidate = 3600;
// export const dynamic = "force-dynamic";
type Props = {
  params: { slug: string };
};
export default async function Resources({ params: { slug } }: Props) {
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
        style={page.data.data[0].attributes.css}
      />
      {widget.data.data[0]?.attributes.html && (
        <div
          dangerouslySetInnerHTML={{
            __html: widget.data.data[0].attributes.html,
          }}
        />
      )}
      <Script
        id={slug}
        dangerouslySetInnerHTML={{
          __html: page.data.data[0].attributes.js,
        }}
      />
    </div>
  );
}
