import { baseClass, flex2Class, imgClass } from "./Bio.css";
import meta from "../services/meta";

const Bio = () => {
  return (
    <div className={baseClass}>
      <div>
        <img
          className={imgClass}
          src="https://www.gravatar.com/avatar/9cf0233ff15b51f29e5608cd4a1b905d?s=256"
          width={50}
          height={50}
          alt="Profile picture"
        />
      </div>
      <div className={flex2Class}>
        {meta.author.name && (
          <>
            <strong>{meta.author.name}</strong>. {meta.author.summary || null}
          </>
        )}
      </div>
    </div>
  );
};

export default Bio;
