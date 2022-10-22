import Link from "next/link";
import { base, header, headerLink } from "./Header.css";

type Props = {};

const Header: React.FC<Props> = () => {
  return (
    <header className={base}>
      <h1 className={header}>
        <Link href="/">
          <a className={headerLink}>pekkis.eu</a>
        </Link>
      </h1>
    </header>
  );
};

export default Header;
