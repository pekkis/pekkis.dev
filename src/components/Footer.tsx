import * as React from "react";
import { baseClass } from "./Footer.css";
import Padder from "./Padder";

type Props = {};

const Footer: React.FC<Props> = () => {
  return (
    <footer className={baseClass}>
      <Padder>
        Copyright &copy; {new Date().getFullYear()} Mikko "Pekkis" Forsström.
      </Padder>
    </footer>
  );
};

export default Footer;
