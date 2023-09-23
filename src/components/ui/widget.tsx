"use client";

import useWidget from "@/hooks/useWidget";

type Props = {
  slug: string;
};
export default function Widget({ slug }: Props) {
  const { data: widget } = useWidget(slug);
  return (
    <>
      {widget && (
        <div
          dangerouslySetInnerHTML={{
            __html: widget.data.data[0].attributes.html,
          }}
        />
      )}
    </>
  );
}
