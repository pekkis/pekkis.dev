import { FC, ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const StrikethroughMark: FC<Props> = ({ children }) => {
  return <s>{children}</s>;
};

export default StrikethroughMark;
