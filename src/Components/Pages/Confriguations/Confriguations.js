import React, {  useEffect, useState } from "react";
import CameraSetting from "./CameraSetting";
import ImageSetting from "./ImageSetting";
import VehicleSetting from "./VehicleSetting";
import { AllState } from "../../Context/Context";

const Confriguations = () => {
  const {
    setLoading,
    getAnprGenSetting,
  } = AllState();
  const [settingTab, setSettingTab] = useState("Camera");

  useEffect(() => {
    getAnprGenSetting();
  }, []);

  const settingTabFunc = function (e) {
    setSettingTab(e.target.innerText);
    const allBtns = e.target.parentElement.childNodes;
    allBtns.forEach((e) => {
      e.classList.remove("confrigutaionActiveBtn");
    });
    e.target.classList.add("confrigutaionActiveBtn");
  };

  return (
    <div className="mainConfriguraution">
      <div className="sideTabs">
        <div
          onClick={(e) => settingTabFunc(e)}
          className="confrigutaionActiveBtn"
        >
          Camera
        </div>
        <div onClick={(e) => settingTabFunc(e)}>Image</div>
        <div onClick={(e) => settingTabFunc(e)}>Vehicle</div>
      </div>
      <div className="mainContentOfTabs">
        {settingTab === "Camera" && <CameraSetting setLoading={setLoading} />}
        {settingTab === "Image" && <ImageSetting setLoading={setLoading} />}
        {settingTab === "Vehicle" && <VehicleSetting setLoading={setLoading} />}
      </div>
    </div>
  );
};

export default Confriguations;
