"use client";

import Link from "next/link";
import { FC } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/services/cn";

const Header: FC = () => {
  const pathname = usePathname();

  return (
    <header className="m-0 p-4 bg-black sticky top-0 shadow-lg/30 text-white">
      <nav className="text-base">
        <Link
          href="/"
          className={cn("text-white", {
            ["font-bold"]: pathname === "/"
          })}
        >
          pekkis.eu
        </Link>{" "}
        |{" "}
        <Link
          href="/blogi"
          className={cn("text-white", {
            ["font-bold"]: pathname?.startsWith("/blogi")
          })}
        >
          blogi
        </Link>
      </nav>
    </header>
  );
};

export default Header;
