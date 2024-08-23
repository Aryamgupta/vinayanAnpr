import React from "react";
import { AllState } from "../../../Context/Context";
import GridItem from "./GridItem";


export const Grid = () => {

  const {setTimeString, vehCategoryObj ,setSingleView,recordData } = AllState();

  return (
    <div className="mainGridDiv">
      {/* <GridItem />
      <GridItem />
      <GridItem />
      <GridItem />
      <GridItem />
      <GridItem /> */}
      
      {recordData.map((e) => {
        return (
          <GridItem e={e}/>
        );
      })}
    </div>
  );
};
