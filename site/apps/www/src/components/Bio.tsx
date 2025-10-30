/* eslint-disable @next/next/no-img-element */

import { siteMetadata } from "../services/meta";

const Bio = () => {
  return (
    <div className="m-0 mb-8 flex gap-8">
      <div className="w-12 shrink-0">
        <img
          className="rounded-full w-12"
          src="https://www.gravatar.com/avatar/9cf0233ff15b51f29e5608cd4a1b905d?s=256"
          alt="Pekkiksen avatar"
        />
      </div>
      <div className="self-center">
        {siteMetadata.author.name && (
          <>
            <strong>{siteMetadata.author.name}</strong>.{" "}
            {siteMetadata.author.summary || null}
          </>
        )}
      </div>
    </div>
  );
};

export default Bio;
