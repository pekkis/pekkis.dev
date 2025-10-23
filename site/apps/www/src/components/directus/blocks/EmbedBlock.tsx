import VideoPlayer from "@/components/VideoPlayer";
import { EmbedBlock } from "@/services/blogposts";
import { FC } from "react";

type Props = {
  block: EmbedBlock;
};

const EmbedBlockRenderer: FC<Props> = ({ block }) => {
  if (block.data.service === "youtube") {
    return <VideoPlayer videoId={block.data.source} />;
  }

  return <div>{JSON.stringify(block)}</div>;
};

export default EmbedBlockRenderer;
