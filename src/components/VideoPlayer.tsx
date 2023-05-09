"use client";

import { FC } from "react";

import { containerClass, innerClass } from "./VideoPlayer.css";
import dynamic from "next/dynamic";

const ReactPlayer = dynamic(() => import("react-player"), {
  ssr: false,
  loading: () => {
    return <div>laddare...</div>;
  }
});

type Props = {
  videoId: string;
};

const VideoPlayer: FC<Props> = ({ videoId }) => {
  return (
    <div className={containerClass}>
      <div className={innerClass}>
        <ReactPlayer
          controls
          width="100%"
          height="100%"
          url={`https://www.youtube.com/watch?v=${videoId}`}
        />
      </div>
    </div>
  );
};

export default VideoPlayer;
