import { AllState } from "Components/Context/Context";
import React from "react";
import demoCar from "../../../../Images/demoCar.jpg";
import deleteIcon from "./Images/delete.svg";
import locationIcon from "./Images/location.svg";
import serverIcon from "./Images/server.svg";
import demoOcr from "../../../../Images/demoOcr.jpg";

const GridItem = ({ e }) => {
  const { setTimeString, vehCategoryObj, setSingleView, recordData,capitalizeFirstLetter,deleteRecord,overlay, setOverlay } =
    AllState();


  

  return (
    <>
      <div className="mainGridItem" key={e.id} onClick={()=>{setOverlay(e)}} >
        <div className="gridTop">
          <div>
            <button>
              <img src={locationIcon} />
            </button>
            <button>
              <img src={serverIcon} />
            </button>
          </div>
          <div>
            {e.id}
          </div>
          <div>
            <button onClick={()=>{deleteRecord(e.id)}}>
              <img src={deleteIcon} />
            </button>
          </div>
        </div>
        <div className="gridMiddle">
          <span className="overLaysContainer">
            <p>{e.type}</p>
            <p>{capitalizeFirstLetter(e.category)}</p>
          </span>
          <img src={demoCar} />
          {/* <img src={`${process.env.REACT_APP_BASE_URL}/images/${e.image_path}/${e.vehicle_image}`} /> */}


            <img className="gridOcrNumber" src={demoOcr} />
            {/* <img className="gridOcrNumber" src={`${process.env.REACT_APP_BASE_URL}/images/${e.image_path}/${e.number_plate_image}`} /> */}
          
        </div>
        <div className="gridBottom">
          <div>
            <p>OCR</p>
            <p>{e.vehicle_registration_number}</p>
          </div>
          <div>
            <p>Date & Time</p>
            <p>{setTimeString(e.created_datetime)}</p>
          </div>
          <div>
            <p>ROI Name</p>
            <p>{e.roi_name}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default GridItem;
