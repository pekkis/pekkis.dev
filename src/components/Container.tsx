import * as React from "react";
import { FC } from "react";
import { base } from "./Container.css";

const Container: FC = ({ children }) => {
  return <div className={base}>{children}</div>;
};

export default Container;
