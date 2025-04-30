import ImgproxyImage from "@/components/ImgproxyImage";
import { ImageBlock } from "@/services/blogposts";
import { getFile } from "@/services/directus";
import { FC } from "react";
import { rootClass, descClass } from "./ImageBlock.css";

type Props = {
  block: ImageBlock;
};

const ImageBlockRenderer: FC<Props> = async ({ block }) => {
  const file = await getFile(block.data.file.fileId);

  return (
    <div className={rootClass}>
      <ImgproxyImage
        alt={file.description || undefined}
        data={block.data.file}
        config={{
          width: 1024,
          aspectRatio: 16 / 9,
          fit: "fill-down"
        }}
      />
      {block.data.caption && <p className={descClass}>{block.data.caption}</p>}
    </div>
  );
};

export default ImageBlockRenderer;
