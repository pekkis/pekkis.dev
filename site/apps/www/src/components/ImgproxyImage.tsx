import { FC } from "react";
import { containerClass, imageClass } from "./ImgproxyImage.css";
import imgproxy from "@/services/imgproxy";

type ContentfulConfig = {
  width?: number;
  aspectRatio?: number;
  fit?: string;
  focus?: string;
  quality?: number;
};

const urlParamsFromConfig = (config: ContentfulConfig) => {
  const builder = imgproxy.builder();

  if (config.width) {
    builder.width(config.width);

    if (config.aspectRatio) {
      const h = Math.round(config.width / config.aspectRatio);
      builder.height(h);
    }
  }

  if (config.fit) {
    builder.resizingType(config.fit);
  }

  /*
  if (config.focus) {


    urlParams.set("f", config.focus);
  }
  */

  if (config.quality) {
    builder.quality(config.quality);
  }

  return builder;
};

type Props = {
  data: {
    title: string;
    url: string;
  };
  alt?: string;
  config?: ContentfulConfig;
  loading?: "lazy" | "eager";
};

const ImgproxyImage: FC<Props> = ({
  data,
  alt,
  config = {},
  loading = "lazy"
}) => {
  const builder = urlParamsFromConfig(config);

  const imageUrl = builder.generateUrl(
    `${process.env.DIRECTUS_ENDPOINT}${data.url}`
  );

  return (
    <picture className={containerClass}>
      <img
        className={imageClass}
        loading={loading}
        src={imageUrl}
        title={data.title}
        alt={alt}
      />
    </picture>
  );
};

export default ImgproxyImage;
