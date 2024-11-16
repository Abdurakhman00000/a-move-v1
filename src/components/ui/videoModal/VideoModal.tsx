import React from "react";
import scss from "./VideoModal.module.scss"; // создайте соответствующий файл стилей
import { useVideoModalStore } from "@/store/useVideoModalStore";

const VideoModal = () => {
  const { isOpen, videoKey, closeModal } = useVideoModalStore();

  if (!isOpen || !videoKey) return null;

  return (
    <div className={scss.modalBackdrop} onClick={closeModal}>
      <div className={scss.modalContent} onClick={(e) => e.stopPropagation()}>
        <iframe className={scss.videoFrame}
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${videoKey}`}
          title="Video"
          frameBorder="0"
          allowFullScreen
        ></iframe>
        <button className={scss.closeButton} onClick={closeModal}>
          Close
        </button>
      </div>
    </div>
  );
};

export default VideoModal;
