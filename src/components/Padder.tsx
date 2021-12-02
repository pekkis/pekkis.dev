import * as React from "react";
import { FC } from "react";
import { baseClass } from "./Padder.css";

const Padder: FC = ({ children }) => {
  return <div className={baseClass}>{children}</div>;
};

export default Padder;
