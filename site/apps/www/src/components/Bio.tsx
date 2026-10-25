import { siteMetadata } from "../services/meta";
import { baseClass, flex2Class, imgClass } from "./Bio.css";

const Bio = () => {
  return (
    <div className={baseClass}>
      <div>
        {/* oxlint-disable-next-line nextjs/no-img-element -- a 50px external avatar; next/image would only proxy it */}
        <img
          className={imgClass}
          src="https://www.gravatar.com/avatar/9cf0233ff15b51f29e5608cd4a1b905d?s=256"
          width={50}
          height={50}
          alt="Pekkiksen avatar"
        />
      </div>
      <div className={flex2Class}>
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
