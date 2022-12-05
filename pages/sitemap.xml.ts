import { gql } from "graphql-request";
import { graphQLClient } from "../services/graphql";
import { blogPostUrl } from "../services/url";
import { BlogPostType } from "../types";

type SitemapEntry = {
  loc: string;
};

const staticPages = ["/", "/blogi"];

function generateSiteMap(entries: SitemapEntry[]) {
  const absolutified = entries.map((e) => {
    return {
      ...e,
      loc: `${process.env.SITE_URL}${e.loc}`
    };
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     ${absolutified
       .map((entry) => {
         return `
       <url>
         <loc>${entry.loc}</loc>
         <changefreq>daily</changefreq>
         <priority>0.7</priority>
       </url>
     `;
       })
       .join("")}
   </urlset>
 `;
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }) {
  const query = gql`
    query SitemapStuff {
      blogPostCollection(limit: 150, where: { visible: true }) {
        items {
          date
          slug
        }
      }
    }
  `;

  const ret = await graphQLClient.request(query);
  const posts: BlogPostType[] = ret.blogPostCollection.items;

  const postEntries = posts.map((p) => {
    return {
      loc: blogPostUrl(p)
    };
  });

  const staticPageEntries = staticPages.map((loc) => {
    return {
      loc
    };
  });

  const entries: SitemapEntry[] = [...staticPageEntries, ...postEntries];

  // We generate the XML sitemap with the posts data
  const sitemap = generateSiteMap(entries);

  res.setHeader("Content-Type", "text/xml");
  // we send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {}
  };
}

export default SiteMap;
