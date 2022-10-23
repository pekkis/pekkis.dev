import Link from "next/link";
import { useRouter } from "next/router";
import { FC } from "react";
import {
  baseClass,
  headerClass,
  headerLinkClass,
  activeLinkClass
} from "./Header.css";
import cx from "clsx";

type Props = {};

const Header: FC<Props> = () => {
  const router = useRouter();

  return (
    <header className={baseClass}>
      <nav className={headerClass}>
        <Link href="/">
          <a
            className={cx(headerLinkClass, {
              [activeLinkClass]: router.pathname === "/"
            })}
          >
            pekkis.eu
          </a>
        </Link>{" "}
        |{" "}
        <Link href="/blogi">
          <a
            className={cx(headerLinkClass, {
              [activeLinkClass]: router.pathname.startsWith("/blogi")
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
