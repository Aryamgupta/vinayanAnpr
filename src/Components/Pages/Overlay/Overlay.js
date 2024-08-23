import React, { useEffect } from 'react';
import { AllState } from "Components/Context/Context";
import { Carousel } from "react-responsive-carousel";
import demoCar from "../../../Images/demoCar.jpg";
import demoOrc from "../../../Images/demoOcr.jpg";
import ImageWithBoundingBox from "./ImageWithBoundingBox"; // Assuming the ImageWithBoundingBox component is in the same directory

const Overlay = () => {
  const { overlay, setOverlay } = AllState();

  // Close overlay when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (e.target.classList.contains("filterMainDiv")) {
        setOverlay(null);
      }
    };

    window.addEventListener("click", handleClickOutside);
    
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [setOverlay]);

  const vehImageUrl = demoCar; // Replace with the actual image URL if it's dynamic
  const npBBox = overlay?.np_bbox.replace(/[[\]]/g, ''); // Assuming np_bbox is a string like "378, 651, 74, 25"

  return (
    <div className="filterMainDiv">
      <div className="recordOverlayMain">
        <Carousel
          autoPlay={true}
          showThumbs={false}
          swipeable={true}
          showArrows={true}
          className="crouselStyle"
          infiniteLoop={false}
          interval={5000}
        >
          <div className="crouselDiv">
            <h2>Vehicle Image</h2>
            {npBBox && (
              <ImageWithBoundingBox imageUrl={vehImageUrl} coordinatesString={npBBox} />
            )}
            {!npBBox && <img alt="imae" src={vehImageUrl}/>}
          </div>
          <div className="crouselDiv">
            <h2>Number Plate Image</h2>
            
            <img alt="imae" src={demoOrc} className='overLayNumberPlate'  />
          </div>
        </Carousel>
      </div>
    </div>
  );
};

export default Overlay;
