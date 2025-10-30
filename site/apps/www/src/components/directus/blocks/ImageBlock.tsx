import ImgproxyImage from "@/components/ImgproxyImage";
import { ImageBlock } from "@/services/blogposts";
import { getFile } from "@/services/directus";
import { FC } from "react";

type Props = {
  block: ImageBlock;
};

const ImageBlockRenderer: FC<Props> = async ({ block }) => {
  const file = await getFile(block.data.file.fileId);

  return (
    <div className="my-4 mx-0">
      <ImgproxyImage
        alt={file.description || undefined}
        data={block.data.file}
        config={{
          width: 1024,
          aspectRatio: 16 / 9,
          fit: "fill-down"
        }}
      />
      {block.data.caption && (
        <p className="text-xs m-0 mt-2">{block.data.caption}</p>
      )}
    </div>
  );
};

export default ImageBlockRenderer;
