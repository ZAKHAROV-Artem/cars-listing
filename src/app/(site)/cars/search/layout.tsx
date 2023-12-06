import type { Metadata } from "next";
import { headers } from "next/headers";

export async function generateMetadata(): Promise<Metadata> {
  // read route params
  const headersList = headers();
  const url = headersList.get("x-url");
  const queryString = url?.slice(url.indexOf("?"));
  const urlParams = new URLSearchParams(queryString);
  const str = `${
    urlParams.get("category") ? urlParams.get("category") + " " : ""
  }${urlParams.get("bodyType") ? urlParams.get("bodyType") + " " : ""}${
    urlParams.get("color") ? urlParams.get("color") + " " : ""
  }${urlParams.get("fuel") ? urlParams.get("fuel") + " " : ""}${
    urlParams.get("transmission") ? urlParams.get("transmission") + " " : ""
  }${urlParams.get("brand") ? urlParams.get("brand") + " " : ""}${
    urlParams.get("model") ? urlParams.get("model") + " " : ""
  }cars in Ethiopia`;
  return {
    title: str,
    keywords: [
      `${urlParams.get("category") ? urlParams.get("category") + ", " : ""}${
        urlParams.get("bodyType") ? urlParams.get("bodyType") + ", " : ""
      }${urlParams.get("color") ? urlParams.get("color") + ", " : ""}${
        urlParams.get("fuel") ? urlParams.get("fuel") + ", " : ""
      }${
        urlParams.get("transmission")
          ? urlParams.get("transmission") + ", "
          : ""
      }${urlParams.get("brand") ? urlParams.get("brand") + ", " : ""}${
        urlParams.get("model") ? urlParams.get("model") + ", " : ""
      }cars in Ethiopia`,
    ],
    description: str,
  };
}
export default async function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
