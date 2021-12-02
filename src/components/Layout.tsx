import * as React from "react";
import Container from "./Container";

import { root } from "./Layout.css";

import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ location, title, children }) => {
  return (
    <Container>
      <div className={root}>
        <Header />
        <main>{children}</main>
        <Footer />
      </div>
    </Container>
  );
};

export default Layout;
