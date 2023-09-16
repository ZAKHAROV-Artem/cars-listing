import { getServerAuth } from "@/lib/getServerAuth";
import AccountRoutes from "./components/account-routes";
export const dynamic = "force-dynamic";
export default async function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getServerAuth();
  return (
    <div className=" mx-5 max-w-3xl py-10 md:mx-auto">
      <h1 className="text-xl md:text-3xl">Account</h1>
      <div className="mt-5">
        <span className="font-bold">
          {user?.data.name || user?.data.username}
        </span>
        {` · ${user?.data.email} · ${user?.data.location}`}
      </div>
      <AccountRoutes />
      <div className="mt-2">{children}</div>
    </div>
  );
}
