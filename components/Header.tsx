"use client";

import Link from "next/link";
import { FC } from "react";
import {
  baseClass,
  headerClass,
  headerLinkClass,
  activeLinkClass
} from "./Header.css";
import cx from "clsx";
import { usePathname } from "next/navigation";

type Props = {};

const Header: FC<Props> = () => {
  const pathname = usePathname();

  return (
    <header className={baseClass}>
      <nav className={headerClass}>
        <Link legacyBehavior href="/">
          <a
            className={cx(headerLinkClass, {
              [activeLinkClass]: pathname === "/"
            })}
          >
            pekkis.eu
          </a>
        </Link>{" "}
        |{" "}
        <Link legacyBehavior href="/blogi">
          <a
            className={cx(headerLinkClass, {
              [activeLinkClass]: pathname?.startsWith("/blogi")
            })}
          >
            blogi
          </a>
        </Link>
      </nav>
    </header>
  );
};

export default Header;
