import { FC } from "react";
import Padder from "./Padder";

const Footer: FC = () => {
  return (
    <footer className="mt-16 mb-4 text-center">
      <Padder>
        Copyright &copy; {new Date().getFullYear()} Mikko &quot;Pekkis&quot;
        Forsström.
      </Padder>
    </footer>
  );
};

export default Footer;
