import React from "react";

export const GifOverlay = ({ imageSrc, setGifOverLaySrc }) => {
  window.addEventListener("click", (e) => {
    if(e.target.classList === "givOverLay"){
        setGifOverLaySrc(null);
    }
  });
  return (
    <div className="givOverLay">
      <img alt="imae" src={imageSrc} />
    </div>
  );
};
