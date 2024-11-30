"use client";

import React, { useState } from "react";
import ModalVideo from "react-modal-video";
import "@/node_modules/react-modal-video/css/modal-video.css";

interface VideoPopupProps {
  another?: boolean;
}

const VideoPopup: React.FC<VideoPopupProps> = ({ another }) => {
  const [isOpen, setOpen] = useState(false);
  return (
    <>
      <a onClick={() => setOpen(true)} className="btn-video">
        {!another ? (
          <span className="icon icon-play2" />
        ) : (
          <span className="icon icon-play" />
        )}
      </a>
      <ModalVideo
        channel="youtube"
        isOpen={isOpen}
        videoId="vfhzo499OeA"
        onClose={() => setOpen(false)}
      />
    </>
  );
};

export default VideoPopup;
