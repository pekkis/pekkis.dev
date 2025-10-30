import { FC } from "react";

const DidNotAgeWellWarning: FC = () => {
  return (
    <div className="bg-red-700 text-white p-8 my-8 rounded-lg">
      <strong>Varoitus!</strong> Tämä kirjoitus ei kestänyt aikaa hyvin.
      Suhtaudu siihen varauksella. Pekkis reflektoi tilannetta ja palaa
      aiheeseen uuden kritiikin ja etenkin itsekritiikin valmistuttua.
    </div>
  );
};

export default DidNotAgeWellWarning;
