import { getServerAuth } from "@/lib/getServerAuth";
import UserCarList from "./components/user-car-list";

export default async function AccountCarlistPage() {
  const user = await getServerAuth();
  return <UserCarList userId={String(user?.data.id)} />;
}
