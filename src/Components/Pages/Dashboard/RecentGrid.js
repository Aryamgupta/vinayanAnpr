import React from 'react'
import demoCar from "../../../Images/demoCar.png";
import demoOcr from"../../../Images/demoOcr.png";
import { AllState } from 'Components/Context/Context';

const RecentGrid = ({data}) => {
  const {setTimeString} =  AllState()
  // console.log(data)
    
  return (
    <>
      <div className="mainGridItem" key="er">
      
        <div className="gridMiddle">
          <img src={demoCar} />
          {/* <img src={`${process.env.REACT_APP_BASE_URL}/images/${data.base_path}/${data.veh_image_name}`} /> */}
            <img className="gridROcrNumber" src={demoOcr} />
            {/* <img className="gridOcrNumber" src={`${process.env.REACT_APP_BASE_URL}/images/${data.base_path}/${data.np_image_name}`} /> */}
          
        </div>
        <div className="gridBottom">
          <div>
            <p>OCR</p>
            <p>{data.vehicle_registration_number}</p>
          </div>
          <div>
            <p>Date & Time</p>
            <p>{setTimeString(new Date())}</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default RecentGrid
