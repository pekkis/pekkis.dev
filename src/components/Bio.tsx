/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import { baseClass, flex2Class } from "./Bio.css";

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      site {
        siteMetadata {
          author {
            name
            summary
          }
          social {
            twitter
          }
        }
      }
    }
  `);

  // Set these values by editing "siteMetadata" in gatsby-config.js
  const author = data.site.siteMetadata?.author;
  const social = data.site.siteMetadata?.social;

  return (
    <div className={baseClass}>
      <div>
        <StaticImage
          layout="fixed"
          formats={["auto", "webp", "avif"]}
          src="https://www.gravatar.com/avatar/9cf0233ff15b51f29e5608cd4a1b905d?s=256"
          width={50}
          height={50}
          quality={95}
          alt="Profile picture"
        />
      </div>
      <div className={flex2Class}>
        {author?.name && (
          <>
            <strong>{author.name}</strong>. {author?.summary || null}
            {` `}
            <a href={`https://twitter.com/${social?.twitter || ``}`}>
              Stalkkaa twitterissä.
            </a>
          </>
        )}
      </div>
    </div>
  );
};

export default Bio;