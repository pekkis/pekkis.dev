import Link from "next/link";
import { base, header, headerLink } from "./Header.css";

type Props = {};

const Header: React.FC<Props> = () => {
  return (
    <header className={base}>
      <nav className={header}>
        <Link href="/">
          <a className={headerLink}>pekkis.eu</a>
        </Link>
      </nav>
    </header>
  );
};

export default Header;
