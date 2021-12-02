import * as React from "react";
import { baseClass } from "./Footer.css";

type Props = {};

const Footer: React.FC<Props> = () => {
  return (
    <footer className={baseClass}>
      Copyright &copy; {new Date().getFullYear()} Mikko "Pekkis" Forsström.
    </footer>
  );
};

export default Footer;
