import { FC, ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const Paragraph: FC<Props> = ({ children }) => {
  return <p className="my-4">{children}</p>;
};
