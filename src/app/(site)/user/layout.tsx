import { getServerAuth } from "@/lib/getServerAuth";
import { redirect } from "next/navigation";

export default async function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getServerAuth();
  if (!user) redirect("/");
  return <>{children}</>;
}
