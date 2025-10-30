import { ComponentProps, FC } from "react";

type Props = ComponentProps<"a">;

export const Anchor: FC<Props> = ({ children, ...rest }) => {
  return (
    <a {...rest} className="underline underline-offset-2">
      {children}
    </a>
  );
};
