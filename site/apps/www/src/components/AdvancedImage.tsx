import { FC } from "react";
import imgproxy from "@/services/imgproxy";

type ImageConfig = {
  width: number[];
  aspectRatio?: number;
  fit?: string;
  focus?: string;
  quality?: number;
};

type SingularImageConfig = {
  width: number;
  aspectRatio?: number;
  fit?: string;
  focus?: string;
  quality?: number;
};

const urlParamsFromConfig = (config: SingularImageConfig) => {
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
  config: ImageConfig;
  loading?: "lazy" | "eager";
  fetchPriority?: "auto" | "high" | "low";
};

const AdvancedImage: FC<Props> = ({
  data,
  alt,
  config,
  loading = "lazy",
  fetchPriority = "auto"
}) => {
  const { width, ...rest } = config;

  const images = width
    .toSorted((a, b) => a - b)
    .map((w) => {
      return {
        width: w,
        ...rest
      };
    })
    .map((data) => {
      return { data, builder: urlParamsFromConfig(data) };
    });

  const srcsets = images
    .map((image) => {
      const url = image.builder.generateUrl(
        `${process.env.DIRECTUS_ENDPOINT}${data.url}`
      );

      return `${url} ${image.data.width}w`;
    })
    .join(", ");

  const imageUrl = images[0].builder.generateUrl(
    `${process.env.DIRECTUS_ENDPOINT}${data.url}`
  );

  return (
    <picture>
      <source srcSet={srcsets} />

      <img
        className="w-full max-w-full block aspect-video"
        fetchPriority={fetchPriority}
        loading={loading}
        src={imageUrl}
        title={data.title}
        alt={alt}
      />
    </picture>
  );
};

export default AdvancedImage;
