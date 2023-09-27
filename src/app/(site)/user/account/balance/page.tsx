"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import useCurrentUser from "@/hooks/useCurrentUser";
import dayjs from "dayjs";
import Link from "next/link";

export default function AccountBalancePage() {
  const { data: user } = useCurrentUser();

  return (
    <div>
      <div className="flex justify-between">
        <div>Account balance :</div>
        <div> {user?.points} cars</div>
      </div>
      <Separator className="my-2" />
      <div className="flex justify-between">
        <div>Expiration date :</div>
        <div> {dayjs(user?.pointsExpirationDate).format("DD / MM / YYYY")}</div>
      </div>
      <Separator className="my-2" />
      <div className="flex justify-between">
        <div>Today :</div>
        <div> {dayjs().format("DD / MM / YYYY")}</div>
      </div>
      <Link href="/payment">
        <Button className="mt-5">Buy more tokens</Button>
      </Link>
    </div>
  );
}
