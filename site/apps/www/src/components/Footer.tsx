import { FC } from "react";
import { baseClass } from "./Footer.css";
import Padder from "./Padder";

const Footer: FC = () => {
  return (
    <footer className={baseClass}>
      <Padder>
        Valmistettu Vantaalla fermentoimalla. Copyright &copy;{" "}
        {/* oxlint-disable-next-line react/purity -- a server component, re-rendered by ISR: the year stays current */}
        {new Date().getFullYear()} Mikko &quot;Pekkis&quot; Forsström.
      </Padder>
    </footer>
  );
};

export default Footer;
