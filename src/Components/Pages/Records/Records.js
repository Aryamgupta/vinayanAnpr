import React, { useEffect, useState } from "react";
import { Table } from "./Table/Table";
import { Grid } from "./Grid/Grid";
import exportIcon from "./Icons/exportIcon.png";
import fillterIcon from "./Icons/fillterIcon.png";
import refreshIcon from "./Icons/refreshIcon.png";
import gridV from "./Icons/gridV.png";
import listV from "./Icons/listV.png";
import page1 from "./Icons/pagination1.png";
import page2 from "./Icons/pagination2.png";
import * as axios from "axios";
import { GifOverlay } from "./GifOverlay";
import { SingleShow } from "../SingelDataShow/SingleShow";
import { Filter } from "./Filter/Filter";
import { AllState } from "../../Context/Context";

const Records = () => {
  
  const {
    setTimeString,
    vehCategoryObj,
    singleView,
    setSingleView,
    setLoading,
    fetchAllRecords,
    recordData,
    currentPage, setCurrentPage,totalPage,setFilters
  } = AllState();

  const [gridView, setGridView] = useState(true);
  const [isfilter, setIsfilter] = useState(false);
  const [pagination, setPagination] = useState(1);

  const exportFunc = function (e) {
    console.log(e);
  };


 
  useEffect(() => {
    fetchAllRecords();
  }, [currentPage]);

 
  useEffect(() => {
    fetchAllRecords();
  }, []);
  

  return (
    <>
      {!singleView ? (
        <div className="recordsMainDiv">
          <div className="recordNav">
            <div className="recordNavLeftPart">
              {/* <div
                onClick={(e) => {
                  setGridView(!gridView);
                }}
                style={{
                  transition: "all 0.5s ease",
                }}
              >
                {gridView ? <img src={listV} /> : <img src={gridV} />}
              </div> */}
              <button
                onClick={(e) => {
                  console.log(isfilter);
                  setIsfilter(true);
                }}
              >
                <img src={fillterIcon} />
                Filters
              </button>
              
              {/* <button
                onClick={(e) => {
                  exportFunc(e);
                }}
              >
                Export
                <img src={exportIcon} />
              </button> */}
            </div>
            <div className="recordNavRightPart">
              <div className="paginationDiv">
                <button
                  onClick={(e) => {
                    if(currentPage == 1){
                      return ;
                    }
                    setCurrentPage(currentPage-1);
                  }}
                  disabled={currentPage== 1}
                >
                  <img src={page1} />
                </button>
                <p className="selectedp">{currentPage}</p>
                <p>/</p>
                <p>{totalPage}</p>
                <button
                  onClick={(e) => {
                    if(currentPage == totalPage){
                      return;
                    }
                    setCurrentPage(currentPage+1);
                  }}
                  disabled={currentPage == totalPage}
                >
                  <img src={page2} />
                </button>
              </div>
              <button onClick={()=>{fetchAllRecords()}}>
                {" "}
                <img src={refreshIcon} /> Refresh
              </button>
            </div>
          </div>
          {!gridView ? <Table /> : <Grid />}
        </div>
      ) : (
        <SingleShow id={singleView} />
      )}
      {isfilter && <Filter setIsfilter={setIsfilter} />}
    </>
  );
};

export default Records;
