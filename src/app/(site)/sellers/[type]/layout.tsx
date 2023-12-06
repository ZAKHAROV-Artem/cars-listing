import type { Metadata } from "next";
import { headers } from "next/headers";
type Props = {
  params: { type: string };
};
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // read route params
  return {
    title: `${
      params.type.charAt(0).toUpperCase() + params.type.slice(1)
    } sellers in Ethiopia`,
  };
}
export default async function SellerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
