import React from "react";
import { FaPlay } from "react-icons/fa";

const VideoTitle = ({title,overview}) => {
  return (
    <div className="absolute text-white pl-[8%] sm:pt-[18%] pt-[24%] w-screen aspect-video">
      <h1 className="text-xl sm:text-3xl font-bold">{title}</h1>
      <p className="px-1">{overview.split('.')[0] + '.'}</p>
      <div className="flex gap-4 mt-4">
        <button className="flex items-center gap-3 cursor-pointer px-6 py-2 bg-white text-black text-lg rounded-md">
          Play
          <FaPlay className="mt-1" size={"15px"} />
        </button>
        <button className="cursor-pointer px-6 py-2 text-white bg-netflix text-lg rounded-md">
          Watch more
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
