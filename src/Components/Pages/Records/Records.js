import React, { useEffect, useState } from "react";
import fillterIcon from "./Icons/fillterIcon.png";
import refreshIcon from "./Icons/refreshIcon.png";
import page1 from "./Icons/pagination1.png";
import page2 from "./Icons/pagination2.png";
import { Filter } from "./Filter/Filter";
import { AllState } from "../../Context/Context";

const Records = () => {
  
  const {
    singleView,
    fetchAllRecords,
    currentPage, setCurrentPage,totalPage
  } = AllState();

  // const [gridView, setGridView] = useState(true);
  const [isfilter, setIsfilter] = useState(false);
  // const [pagination, setPagination] = useState(1);

  // const exportFunc = function (e) {
  //   console.log(e);
  // };


 
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
                {gridView ? <img alt="imae" src={listV} /> : <img alt="imae" src={gridV} />}
              </div> */}
              <button
                onClick={(e) => {
                  console.log(isfilter);
                  setIsfilter(true);
                }}
              >
                <img alt="imae" src={fillterIcon} />
                Filters
              </button>
              
              {/* <button
                onClick={(e) => {
                  exportFunc(e);
                }}
              >
                Export
                <img alt="imae" src={exportIcon} />
              </button> */}
            </div>
            <div className="recordNavRightPart">
              <div className="paginationDiv">
                <button
                  onClick={(e) => {
                    if(currentPage === 1){
                      return ;
                    }
                    setCurrentPage(currentPage-1);
                  }}
                  disabled={currentPage=== 1}
                >
                  <img alt="imae" src={page1} />
                </button>
                <p className="selectedp">{currentPage}</p>
                <p>/</p>
                <p>{totalPage}</p>
                <button
                  onClick={(e) => {
                    if(currentPage === totalPage){
                      return;
                    }
                    setCurrentPage(currentPage+1);
                  }}
                  disabled={currentPage === totalPage}
                >
                  <img alt="imae" src={page2} />
                </button>
              </div>
              <button onClick={()=>{fetchAllRecords()}}>
                {" "}
                <img alt="imae" src={refreshIcon} /> Refresh
              </button>
            </div>
          </div>
          {/* {!gridView ? <Table /> : <Grid />} */}
        </div>
      ) : (
       <div></div>
      )}
      {isfilter && <Filter setIsfilter={setIsfilter} />}
    </>
  );
};

export default Records;
