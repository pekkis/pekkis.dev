import Preachings from "@/components/Preachings";
import SubHeading from "@/components/SubHeading";
import { PreachingsPageBlock } from "@/services/pages";
import { FC } from "react";

type Props = {
  block: PreachingsPageBlock;
};

const PreachingsPageBlockRenderer: FC<Props> = ({ block }) => {
  const preachings = block.item.preachings.map((p) => {
    return p.Preachings_id;
  });

  console.log("PREACHINGS", preachings);

  return (
    <>
      <SubHeading>{block.item.title}</SubHeading>

      <Preachings videos={preachings} />
    </>
  );
};

export default PreachingsPageBlockRenderer;
