import React, {  useState } from "react";
import { AllState } from "../../Context/Context";

const VehicleSetting = ({ setLoading }) => {
  const { generalANPRSetting, setGeneralANPRSetting,postGenSetting } = AllState();
  const [editable, setEditable] = useState(false)

  return (
    <div className="CameraMainDiv" style={{ width: "100%" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            margin: "0 200px 0 0",
          }}
        >
          <label className="majorLabel">OCR Minimumm Length</label>
          <input
            className="majorInpFeild"
            placeholder="Enter OCR Minimumm Length"
            disabled={!editable}
            value={generalANPRSetting.vehicle_number_min_length}
            onChange={(e) => {
              let newGeneralANPRSetting = {...generalANPRSetting,vehicle_number_min_length:e.target.value}
              setGeneralANPRSetting(newGeneralANPRSetting)
            }}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label className="majorLabel">OCR Maximum Length</label>
          <input
            className="majorInpFeild"
            placeholder="Enter OCR Maximum Length"
            disabled={!editable}
            value={generalANPRSetting.vehicle_number_max_length}
            onChange={(e) => {
              let newGeneralANPRSetting = {...generalANPRSetting,vehicle_number_max_length:e.target.value}
              setGeneralANPRSetting(newGeneralANPRSetting)
            }}
          />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems:"center",
          width: "100%",
          margin: "30px 0 0 0",
        }}
      >
        <label className="majorLabel" style={{marginRight:"20px"}}>Discard Duplicate</label>
        <select
          className="majorInpFeild"
          value={generalANPRSetting.discard_duplicate}
          onChange={(e) => {
            let newGeneralANPRSetting = {...generalANPRSetting,discard_duplicate:e.target.value}
            setGeneralANPRSetting(newGeneralANPRSetting)
          }}
          disabled={!editable}
          style={{padding:"0 20px",width:"250px"}}
        >
          <option className="majorInpFeild" value={0}>
            Excat Match
          </option>
          <option value={1}>Last 4 Characters</option>
          <option value={2}>Last 5 Characters</option>
        </select>
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

export default VehicleSetting;
