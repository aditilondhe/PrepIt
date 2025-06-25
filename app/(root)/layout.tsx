import { Button } from "@/components/ui/button";
import { isAuthenticated, signOut } from "@/lib/actions/auth.actions";

import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

const Rootlayout = async ({ children }: { children: ReactNode }) => {
  const isUserAuthenticated = await isAuthenticated();

  if (!isUserAuthenticated) {
    redirect("/sign-in");
  }
  return (
    <div className="root-layout">
      <nav className=" flex items-center justify-between w-full">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="logo" width={45} height={38} />
          <h2 className="text-primary-100">PrepIt</h2>
        </Link>
        <form action={signOut}>
          <Button type="submit" className="btn-secondary">
            Logout
          </Button>
        </form>
      </nav>
      {children}
    </div>
  );
};

export default Rootlayout;
