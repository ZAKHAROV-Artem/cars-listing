import { getServerAuth } from "@/lib/getServerAuth";
import { notFound } from "next/navigation";

export default async function BalanceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getServerAuth();

  if (user?.seller_type?.slug === "private") return notFound();
  return <>{children}</>;
}
