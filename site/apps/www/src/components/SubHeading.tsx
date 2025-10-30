import { FC, ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const SubHeading: FC<Props> = ({ children }) => {
  return <h2 className="mt-8 mb-4 text-2xl font-semibold">{children}</h2>;
};

export default SubHeading;
