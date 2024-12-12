import Container from "./Container";

import { root } from "./Layout.css";

import Header from "./Header";
import Footer from "./Footer";
import CookieConsent from "./CookieConsent";
import { FC, ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const Layout: FC<Props> = ({ children }) => {
  return (
    <>
      <CookieConsent />
      <Header />
      <Container>
        <div className={root}>
          <main>{children}</main>
          <Footer />
        </div>
      </Container>
    </>
  );
};

export default Layout;
