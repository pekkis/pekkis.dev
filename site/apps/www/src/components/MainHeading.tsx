import { ComponentProps, FC } from "react";

const MainHeading: FC<ComponentProps<"h1">> = ({ children, ...rest }) => {
  return (
    <h1 {...rest} className="text-4xl mt-8 mb-4 font-semibold">
      {children}
    </h1>
  );
};

export default MainHeading;
