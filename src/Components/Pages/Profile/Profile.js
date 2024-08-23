import React, { useEffect, useState } from "react";
import { AllState } from "../../Context/Context";

const Profile = () => {
  const { generalANPRSetting, setGeneralANPRSetting,postGenSetting } = AllState();
  const [editable, setEditable] = useState(false);

  useEffect(() => {
    // fetchProfileInfo();
  }, []);

  return (
    <div className="profileMainComponent">
      <div className="profileInpCont">
        <label>Device Name</label>
        <input
          type="text"
          disabled={!editable}
          value={generalANPRSetting.device_name}
          onChange={(e) => {
            let newGeneralANPRSetting = { ...generalANPRSetting, device_name: e.target.value };
            setGeneralANPRSetting(newGeneralANPRSetting);
          }}
          placeholder="Enter Device Name"
          className=""
        />
      </div>
      <div className="profileInpCont">
        <label>Site Name</label>
        <input
          type="text"
          disabled={!editable}
          value={generalANPRSetting.site_name}
          onChange={(e) => {
            let newGeneralANPRSetting = { ...generalANPRSetting, site_name: e.target.value };
            setGeneralANPRSetting(newGeneralANPRSetting);
          }}
          placeholder="Enter Site Name"
          className=""
        />
      </div>
      <div className="profileInpCont">
        <label>Location</label>
        <input
          type="text"
          disabled={!editable}
          value={generalANPRSetting.location}
          onChange={(e) => {
            let newGeneralANPRSetting = { ...generalANPRSetting, location: e.target.value };
            setGeneralANPRSetting(newGeneralANPRSetting);
          }}
          placeholder="Enter Location"
          className=""
        />
      </div>

      <div className="profileBtnCont">
        <button
          className="majorEditBtn"
          onClick={(e) => {
            if (editable) {
              postGenSetting()
              setEditable(false);
            } else {
              setEditable(true);
            }
          }}
        >
          {!editable ? "Edit" : "Save"}
        </button>
      </div>
    </div>
  );
};

export default Profile;
