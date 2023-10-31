import EditSellerDialog from "@/app/(site)/user/account/admin/components/edit-seller-dialog";
import { getServerAuth } from "@/lib/getServerAuth";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";
export default async function AccountAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getServerAuth();
  if (user?.role.type !== "admin") return notFound();
  return (
    <>
      {children} <EditSellerDialog />
    </>
  );
}
