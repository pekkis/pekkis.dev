"use client";

import { FC } from "react";
import ReactCookieConsent from "react-cookie-consent";

const CookieConsent: FC = () => {
  return (
    <ReactCookieConsent
      location="bottom"
      acceptOnScroll={true}
      acceptOnScrollPercentage={25}
      buttonText="No sepä kiva!"
      cookieName="myAwesomeCookieName2"
      style={{ background: "#000", padding: "1rem" }}
      buttonStyle={{ color: "#4e503b", fontSize: "13px" }}
      expires={150}
    >
      Täällä käytetään keksuloita, koska seuraan kävijämääriä ja sivuja joilla
      kävijät käyvät. Jatkamalla käyttöä hyväksyt tämän faktana.
    </ReactCookieConsent>
  );
};

export default CookieConsent;
