import { Link } from "gatsby";
import * as React from "react";
import { base, header, headerLink } from "./Header.css";

type Props = {};

const Header: React.FC<Props> = () => {
  return (
    <header className={base}>
      <h1 className={header}>
        <Link className={headerLink} to="/">
          pekkis.eu
        </Link>
      </h1>
    </header>
  );
};

export default Header;
