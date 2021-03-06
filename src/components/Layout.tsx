import * as React from "react";
import Container from "./Container";

import { root } from "./Layout.css";

import Header from "./Header";
import Footer from "./Footer";
import CookieConsent from "./CookieConsent";

const Layout = ({ location, title, children }) => {
  return (
    <>
      <CookieConsent />
      <Container>
        <div className={root}>
          <Header />
          <main>{children}</main>
          <Footer />
        </div>
      </Container>
    </>
  );
};

export default Layout;
