import Container from "./Container";

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
        <main>{children}</main>
        <Footer />
      </Container>
    </>
  );
};

export default Layout;
