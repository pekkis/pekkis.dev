import { ComponentProps, FC } from "react";
import NextLink from "next/link";

type Props = ComponentProps<typeof NextLink>;

export const Link: FC<Props> = ({ children, ...rest }) => {
  return (
    <NextLink {...rest} className="underline underline-offset-2">
      {children}
    </NextLink>
  );
};
