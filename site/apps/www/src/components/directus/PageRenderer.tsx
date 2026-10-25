import HeadlinesPageBlockRenderer from "@/components/directus/page-blocks/HeadlinesPageBlock";
import PreachingsPageBlockRenderer from "@/components/directus/page-blocks/PreachingsPageBlock";
import WysiwygPageBlockRenderer from "@/components/directus/page-blocks/WysiwygPageBlock";
import MainHeading from "@/components/MainHeading";
import { getPage } from "@/services/pages";
import { FC } from "react";

type Props = {
  slug: string;
};

const PageRenderer: FC<Props> = async ({ slug }) => {
  const page = await getPage(slug);

  return (
    <>
      <MainHeading>{page.title}</MainHeading>

      {page.blocks.map((block) => {
        switch (block.collection) {
          case "block_wysiwyg":
            return <WysiwygPageBlockRenderer block={block} key={block.sort} />;
          case "block_preachings":
            return (
              <PreachingsPageBlockRenderer block={block} key={block.sort} />
            );
          case "block_headlines":
            return (
              <HeadlinesPageBlockRenderer block={block} key={block.sort} />
            );

          default:
            // @ts-expect-error this will still stay here.
            return <div key={block.sort}>unknown page block</div>;
        }
      })}
    </>
  );
};

export default PageRenderer;
