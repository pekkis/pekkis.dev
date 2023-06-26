import { FC } from "react";
import * as styles from "./DidNotAgeWellWarning.css";

const DidNotAgeWellWarning: FC = () => {
  return (
    <div className={styles.alert}>
      <strong>Varoitus!</strong> Tämä kirjoitus ei kestänyt aikaa hyvin.
      Suhtaudu siihen varauksella. Pekkis reflektoi tilannetta ja palaa
      aiheeseen uuden kritiikin ja etenkin itsekritiikin valmistuttua.
    </div>
  );
};

export default DidNotAgeWellWarning;
