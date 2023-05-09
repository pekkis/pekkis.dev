import { FC } from "react";
import ReactPlayer from "react-player";
import { containerClass, innerClass } from "./VideoPlayer.css";

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
