import React, { useEffect, useState } from "react";
import calender from "./Icons/calender.png";
import ocrIcon from "./Icons/ocrFilter.png";
import { AllState } from "../../../Context/Context";

export const Filter = ({ setIsfilter }) => {
  const { filters, setFilters, fetchAllRecords } =
    AllState();

  const [startDate, setStartDate] = useState(filters.startDate);
  const [endDate, setEndDate] = useState(filters.endDate);
  const [ocr, setOcr] = useState(filters.ocr);
  const [fromTime, setFromTime] = useState(filters.fromTime);
  const [toTime, setToTime] = useState(filters.toTime);

  const resetFilter = async function (e) {
    
    setFilters({});

    console.log(filters)
    await fetchAllRecords();

    setIsfilter(false)
   
  };

  useEffect(() => {
    setFilters({
      startDate,
      endDate,
      fromTime,
      toTime,
      ocr,
    });
  }, [startDate, endDate, fromTime, toTime, ocr]);

  window.addEventListener("click", function (e) {
    if (e.target.classList.contains("filterMainDiv")) {
      setIsfilter(false);
    }
  });

  const applyFilter = async function () {
    await fetchAllRecords();
    setIsfilter(false);
  };

  return (
    <div className="filterMainDiv">
      <div className="filterMains">
        <div
          className="vehFullFilterDiv"
          style={{
            display: "flex",
            flexDirection: "row-reverse",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <label>
            <img src={ocrIcon} alt="OCR Icon" /> OCR
          </label>
          <input
            className="majorInpFeild"
            placeholder="Enter OCR"
            value={ocr}
            onChange={(e) => {
              setOcr(e.target.value);
            }}
          />
        </div>
        <div className="vehMidFilterDiv">
          <label>
            <img src={calender} alt="Start Date" /> Start Date
          </label>
          <input
            type="date"
            className="majorInpFeild"
            value={startDate}
            onChange={(e) => {
              setStartDate(e.target.value);
            }}
          />
        </div>
        <div className="vehMidFilterDiv">
          <label>
            <img src={calender} alt="End Date" /> Start Date
          </label>
          <input
            type="date"
            className="majorInpFeild"
            value={endDate}
            onChange={(e) => {
              setEndDate(e.target.value);
            }}
          />
        </div>
        <div className="vehMidFilterDiv">
          <label>
            <img src={calender} alt="From Time" /> From Time
          </label>
          <input
            type="time"
            className="majorInpFeild"
            value={fromTime}
            onChange={(e) => {
              setFromTime(e.target.value);
            }}
          />
        </div>
        <div className="vehMidFilterDiv">
          <label>
            <img src={calender} alt="To Time" /> To Time
          </label>
          <input
            type="time"
            className="majorInpFeild"
            value={toTime}
            onChange={(e) => {
              setToTime(e.target.value);
            }}
          />
        </div>
        <div
          className="vehMidFilterDiv"
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
          }}
        >
          <button onClick={applyFilter}>Apply Filter</button>
          <button
            className="resetFilterBtn"
            onClick={(e) => {
              resetFilter(true);
            }}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};
