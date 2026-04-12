import { FC } from "react";
import { baseClass } from "./Footer.css";
import Padder from "./Padder";

const Footer: FC = () => {
  return (
    <footer className={baseClass}>
      <Padder>Valmistettu Vantaalla fermentoimalla</Padder>
    </footer>
  );
};

export default Footer;
