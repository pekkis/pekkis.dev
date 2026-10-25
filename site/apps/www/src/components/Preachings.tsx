"use client";

import { useCallback, useSyncExternalStore } from "react";
import VideoPlayer from "./VideoPlayer";
import { nth } from "ramda";
import { FC, useState } from "react";
import { FaChevronCircleRight, FaChevronCircleLeft } from "react-icons/fa";
import {
  baseClass,
  browserClass,
  clickableClass,
  nonClickableClass,
  titleClass
} from "./Preachings.css";
import { PreachingType } from "@/services/preachings";

type Props = {
  videos: PreachingType[];
};

// false on the server and during hydration, true afterwards: the player renders only in the browser.
const subscribe = () => () => {};
const useIsHydrated = () =>
  useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );

const Preachings: FC<Props> = ({ videos }) => {
  const isHydrated = useIsHydrated();
  const [current, setCurrent] = useState<number>(0);

  const previous = useCallback(() => {
    setCurrent((index) => Math.max(index - 1, 0));
  }, [setCurrent]);
  const next = useCallback(() => {
    setCurrent((index) => Math.min(index + 1, videos.length - 1));
  }, [setCurrent, videos]);

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
    <>
      <VideoPlayer videoId={video.videoId} timestamp={video.timestamp} />
      <div className={baseClass}>
        <div className={browserClass}>
          <FaChevronCircleLeft
            title="Edellinen"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              previous();
            }}
            className={hasLess ? clickableClass : nonClickableClass}
          />
        </div>
        <div className={titleClass}>{video.title}</div>
        <div className={browserClass}>
          <FaChevronCircleRight
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              next();
            }}
            title="Seuraava"
            className={hasMore ? clickableClass : nonClickableClass}
          />
        </div>
      </div>
    </>
  );
};

export default Preachings;
