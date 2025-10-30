"use client";

import { useCallback } from "react";
import VideoPlayer from "./VideoPlayer";
import { FC, useState } from "react";
import { FaChevronCircleRight, FaChevronCircleLeft } from "react-icons/fa";

import { PreachingType } from "@/services/preachings";

type Props = {
  videos: PreachingType[];
};

const Preachings: FC<Props> = ({ videos }) => {
  const [current, setCurrent] = useState<number>(0);

  const previous = useCallback(() => {
    setCurrent((current) => Math.max(current - 1, 0));
  }, [setCurrent]);
  const next = useCallback(() => {
    setCurrent((current) => Math.min(current + 1, videos.length - 1));
  }, [setCurrent, videos]);

  const video = videos.at(current);

  if (!video) {
    return null;
  }

  const hasMore = current + 1 < videos.length;
  const hasLess = current > 0;
  return (
    <>
      <VideoPlayer videoId={video.videoId} timestamp={video.timestamp} />
      <div className="mt-2 mb-8 w-full flex justify-between items-center">
        <div className="self-start text-4xl">
          <FaChevronCircleLeft
            title="Edellinen"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              previous();
            }}
            className={
              hasLess
                ? "opacity-100 cursor-pointer"
                : "opacity-50 cursor-not-allowed"
            }
          />
        </div>
        <div className="mx-2">{video.title}</div>
        <div className="self-start text-4xl">
          <FaChevronCircleRight
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              next();
            }}
            title="Seuraava"
            className={
              hasMore
                ? "opacity-100 cursor-pointer"
                : "opacity-50 cursor-not-allowed"
            }
            role="button"
          />
        </div>
      </div>
    </>
  );
};

export default Preachings;
