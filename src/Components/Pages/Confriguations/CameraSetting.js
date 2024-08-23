import React, {  useState } from "react";
import { AllState } from "../../Context/Context";

const CameraSetting = () => {
  const { generalANPRSetting, setGeneralANPRSetting,postGenSetting } = AllState();
  const [editable, setEditable] = useState(false);

  return (
    <div className="CameraMainDiv">
      <div>
        <label className="majorLabel">Camera RSTP URL</label>
        <input
          className="majorInpFeild"
          placeholder="Enter Url"
          disabled={!editable}
          value={generalANPRSetting.camera_url}
          onChange={(e) => {
            let newGeneralANPRSetting = {...generalANPRSetting,camera_url:e.target.value}
            setGeneralANPRSetting(newGeneralANPRSetting)
          }}
        />
        <label className="majorLabel" style={{marginTop:"30px"}}>Camera SubStream URL</label>
        <input
          className="majorInpFeild"
          placeholder="Enter SubStream Url"
          disabled={!editable}
          value={generalANPRSetting.sub_stream_url}
          onChange={(e) => {
            let newGeneralANPRSetting = {...generalANPRSetting,sub_stream_url:e.target.value}
            setGeneralANPRSetting(newGeneralANPRSetting)
          }}
        />
      </div>
      <div>
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

export default CameraSetting;
