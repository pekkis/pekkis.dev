import { useCallback, useEffect } from "react";
import VideoPlayer from "./VideoPlayer";
import { nth } from "ramda";
import { FC, useState } from "react";
import { FaChevronCircleRight, FaChevronCircleLeft } from "react-icons/fa";
import { VideoType } from "../types";
import {
  baseClass,
  browserClass,
  clickableClass,
  nonClickableClass,
  titleClass
} from "./Preachings.css";

const NormalVideo = ({ video, videos, setCurrent, hasLess, hasMore }) => {
  return (
    <>
      <VideoPlayer videoId={video.videoId} />
      <div className={baseClass}>
        <div className={browserClass}>
          <FaChevronCircleLeft
            title="Edellinen"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              setCurrent((current) => Math.max(current - 1, 0));
            }}
            className={hasLess ? clickableClass : nonClickableClass}
          />
        </div>
        <div className={titleClass}>
          {video.title}
          {video.nsfw === false && <span>[NSFW]</span>}
        </div>
        <div className={browserClass}>
          <FaChevronCircleRight
            onClick={(e) => {
              console.log("hip hei?");
              e.stopPropagation();
              e.preventDefault();
              setCurrent((current) => Math.min(current + 1, videos.length - 1));
            }}
            title="Seuraava"
            className={hasMore ? clickableClass : nonClickableClass}
          />
        </div>
      </div>
    </>
  );
};

type Props = {
  videos: VideoType[];
};

const Preachings: FC<Props> = ({ videos }) => {
  const [isHydrated, setIsHydrated] = useState<boolean>(false);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const setVideoIndex = useCallback(
    (index) => {
      setCurrent(index);
    },
    [setCurrent]
  );

  if (!isHydrated) {
    return null;
  }

  const video = nth(current, videos);

  if (!video) {
    return null;
  }

  const hasMore = current + 1 < videos.length;
  const hasLess = current > 0;
  return (
    <NormalVideo
      video={video}
      videos={videos}
      hasMore={hasMore}
      hasLess={hasLess}
      setCurrent={setVideoIndex}
    />
  );
};

export default Preachings;
