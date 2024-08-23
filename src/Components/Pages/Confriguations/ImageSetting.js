import * as axios from "axios";
import React, { useEffect, useState } from "react";
import { AllState } from "../../Context/Context";

const ImageSetting = () => {
  const {  generalANPRSetting, setGeneralANPRSetting,postGenSetting } = AllState();
  const [editable, setEditable] = useState(false);

  return (
    <div className="CameraMainDiv">
      <div>
        <label className="majorLabel">Image Save Type</label>
        <input
          className="majorInpFeild"
          placeholder="Enter Image Save Type"
          disabled={!editable}
          value={generalANPRSetting.image_save_type}
          type="number"
          style={{maxWidth:"300px"}}
          onChange={(e) => {
            let newGeneralANPRSetting = {...generalANPRSetting,image_save_type:e.target.value}
            setGeneralANPRSetting(newGeneralANPRSetting)
          }}
        />
        <label className="majorLabel" style={{marginTop:"30px"}}>Image Quality</label>
        <input
          className="majorInpFeild"
          placeholder="Enter Image Quality"
          disabled={!editable}
          value={generalANPRSetting.image_quality}
          type="number"
          style={{maxWidth:"300px"}}
          onChange={(e) => {
            let newGeneralANPRSetting = {...generalANPRSetting,image_quality:e.target.value}
            setGeneralANPRSetting(newGeneralANPRSetting)
          }}
        />
      </div>

      <div className="editCont">
        <button
          onClick={(e) => {
            if (editable) {
              postGenSetting()
              setEditable(false);
            } else {
              setEditable(true);
            }
          }}
          className="majorEditBtn"
        >
          {editable ? "Save" : "Edit"}
        </button>
      </div>
    </div>
  );
};

export default ImageSetting;
