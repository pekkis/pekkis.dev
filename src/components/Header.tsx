import { Link } from "gatsby";
import * as React from "react";
import { base, header } from "./Header.css";

type Props = {
  title: string;
};

const Header: React.FC<Props> = ({ title }) => {
  return (
    <header className={base}>
      <h1 className={header}>
        <Link to="/">Pekkis.EU (WIP!)</Link>
      </h1>
    </header>
  );
};

export default Header;
