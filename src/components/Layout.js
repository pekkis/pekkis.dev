import * as React from "react";
import { Link } from "gatsby";
import Container from "./Container";

import { root } from "./Layout.css.ts";
import { themeClass } from "../theme.css";
import Header from "./Header";

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`;
  const isRootPath = location.pathname === rootPath;

  return (
    <Container>
      <div className={root} data-is-root-path={isRootPath}>
        <Header title={title} isRootPath={rootPath} />
        <main>{children}</main>
        <footer>© {new Date().getFullYear()} Mikko Forsström.</footer>
      </div>
    </Container>
  );
};

export default Layout;
