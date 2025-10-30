"use client";

import { FC } from "react";

import dynamic from "next/dynamic";

const ReactPlayer = dynamic(() => import("react-player"), {
  ssr: false,
  loading: () => {
    return <div>laddare...</div>;
  }
});

type Props = {
  videoId: string;
  timestamp?: string;
};

const VideoPlayer: FC<Props> = ({ videoId, timestamp }) => {
  const videoUrl = !timestamp
    ? `https://www.youtube.com/watch?v=${videoId}`
    : `https://www.youtube.com/watch?v=${videoId}&t=${timestamp}`;

  return (
    <div className="relative w-full aspect-video">
      <div className="absolute top-0 bottom-0 left-0 right-0">
        <ReactPlayer controls width="100%" height="100%" src={videoUrl} />
      </div>
    </div>
  );
};

export default VideoPlayer;
