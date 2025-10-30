import { FC, ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const Container: FC<Props> = ({ children }) => {
  return <div className="my-4 mx-auto max-w-4xl">{children}</div>;
};

export default Container;
