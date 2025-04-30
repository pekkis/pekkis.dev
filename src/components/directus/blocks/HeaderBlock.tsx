import MainHeading from "@/components/MainHeading";
import SubHeading from "@/components/SubHeading";
import { HeaderBlock } from "@/services/blogposts";
import { FC } from "react";

type Props = {
  block: HeaderBlock;
};

const HeaderBlockRenderer: FC<Props> = ({ block }) => {
  const Component = block.data.level === 1 ? MainHeading : SubHeading;

  return <Component>{block.data.text}</Component>;
};

export default HeaderBlockRenderer;
