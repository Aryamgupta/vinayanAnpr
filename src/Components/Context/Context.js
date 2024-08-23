import axios from "axios";
import React, { createContext, useContext, useState } from "react";

const AllContext = createContext();
// direction,
// category,
// minSpeed,
// maxSpeed,
// startDate,
// endDate,
// type,
// ocr
const AllProvider = ({ children }) => {
  const apiMainUrl = "http://127.0.0.1:8001";
  const [singleView, setSingleView] = useState(null);
  const [loading, setLoading] = useState(false);
  const [recordData, setRecordData] = useState([]);
  const [recentRecord, setRecentRecord] = useState([]);
  const [crouselZoom, setCrouselZoom] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(10);
  const [filters, setFilters] = useState({});
  

  const [recentRecords, setRecentRecords] = useState([]);

  const [generalANPRSetting, setGeneralANPRSetting] = useState({});

  const [overlay, setOverlay] = useState(null);

  const [roiDatas, setRoiDatas] = useState([]);

  const setTimeString = function (datee) {
    datee = new Date(datee);
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const monthAbbreviation = months[datee.getMonth()];

    // Get the day, year, and hours
    const day = datee.getDate();
    const year = datee.getFullYear();
    let hours = datee.getHours();
    const minutes = datee.getMinutes();

    // Convert hours to 12-hour format and determine AM/PM
    const amPm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;

    // Format the time with leading zero for minutes if needed
    const formattedTime = `${hours}:${minutes < 10 ? "0" : ""}${minutes}`;

    // Create the final formatted date string
    const formattedDate = `${monthAbbreviation} ${day}, ${year} | ${formattedTime} ${amPm}`;

    return formattedDate;
  };

  const fetchRecentRecords = async function () {
    try {
      const eventSource = new EventSource("http://localhost:5000/stream");

      // Event listener for 'publish' events
      eventSource.addEventListener("publish", (event) => {
        try {
          const parsedData = JSON.parse(event.data);
          onPublish(parsedData);
        } catch (error) {
          console.log("Failed to parse 'publish' SSE data", error);
        }
      });

      // Event listener for general messages (if any)
      eventSource.onmessage = (event) => {
        try {
        //   const parsedData = JSON.parse(event.data);
          // console.log(par)
        } catch (error) {
          console.log("Failed to parse general SSE data", error);
        }
      };

      eventSource.onerror = (event) => {
        console.log("Error occurred with SSE connection");
        console.error("SSE error:", event);
      };
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };

  // Function to handle 'publish' events
  function onPublish(data) {
    let d = data.data;
    let newRecentRecords = [d, ...recentRecords];
    // console.log(newRecentRecords);
    setRecentRecords(newRecentRecords);
  }
  


  // function to get the anpr genral settings
  const getAnprGenSetting = async function () {
    try {
      if (!sessionStorage.getItem("admin_key")) {
        return;
      }

      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/general_setting/`,
        {
          method: "GET",
          headers: {
            key: sessionStorage.getItem("admin_key"),
            Admin_key: sessionStorage.getItem("admin_key"),
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": true,
          },
        }
      );
      console.log(response);
      if (!response.ok) {
        // Handle HTTP errors
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const { data } = await response.json();
      console.log(data);

      setGeneralANPRSetting(data.general_setting);
    } catch (error) {
      console.log({ "Error Occurred": error });
    }
  };



  // function to change the anpr general settings
  const postGenSetting = async function () {
    try {
      const body = { ...generalANPRSetting, cam_updated: 1 };

      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/general_setting/`,
        {
          method: "POST",
          headers: {
            key: sessionStorage.getItem("admin_key"),
            Admin_key: sessionStorage.getItem("admin_key"),
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );

      if (response.status === 201) {
        await getAnprGenSetting();
      }

      // const data = await response.json();
    } catch (error) {
      console.log({ "Error Occurred": error });
    }
  };


  

  const vehCategoryObj = {
    car: "Car",
    truck: "Truck",
    bus: "Bus",
    mgv: "MGV",
    twowheeler: "Two Wheeler",
    auto: "Auto",
  };

  // api call for all records
  const fetchAllRecords = async function () {
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("current_page", currentPage);
      formData.append("page_size", 12);
      filters.startDate && formData.append("start_date", filters.startDate);
      filters.endDate && formData.append("end_date", filters.endDate);
      filters.ocr &&
        formData.append(
          "vehicle_registration_number",
          filters.ocr.toUpperCase()
        );
      filters.fromTime &&
        formData.append("from_time", `${filters.fromTime}:00`);
      filters.toTime && formData.append("to_time", `${filters.toTime}:00`);

      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/get_vehicle_detect_data_pagewise/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            key: sessionStorage.getItem("admin_key"),
          },
        }
      );

      console.log(response.data.data);
      setRecordData(response.data.data);
      setTotalPage(Math.ceil(response.data.counts[0].total_count / 12));
    } catch (error) {
      console.log({ "Error Occured": error });
    }
    setLoading(false);
  };



  // api call for all recent records
  const fetchAllRecentRecord = async function () {
    try {
      const eventSource = new EventSource(
        `https://59c8-2405-201-4032-4043-233f-2f45-211e-b955.ngrok-free.app/stream/`
      );

      eventSource.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log(data);
      };

      eventSource.onerror = (err) => {
        console.error("EventSource failed:", err);
        eventSource.close();
      };
    } catch (error) {
      console.log({ "Error Occured": error });
    }
  };

  

  // 
  function capitalizeFirstLetter(word) {
    if (!word) return word; // Handle empty input
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  }


  // fucntion to delete the records from the data
  const deleteRecord = async function (id) {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/delete_captured_data/`,
        { id },
        {
          headers: {
            "Content-Type": "application/json",
            key: sessionStorage.getItem("admin_key"),
          },
        }
      );
      console.log(response)
      await fetchAllRecords();
    } catch (error) {
      console.log({ "Error Occured": error });
    }
  };


  // function to get the ROI data
  const getRois = async function () {
    try {
      if (!sessionStorage.getItem("admin_key")) {
        return;
      }
  
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/manage_roi/`,
        {
          method: "GET",
          headers: {
            key: sessionStorage.getItem("admin_key"),
            Admin_key: sessionStorage.getItem("admin_key"),
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": true,
          },
        }
      );
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const {data} = await response.json(); // Parse the response as JSON
      setRoiDatas(data);
  
    } catch (error) {
      console.log({ "Error Occurred": error });
    }
  };




  // function to post the new ROI into the
  const postRois = async function () {
    try {
      if (!sessionStorage.getItem("admin_key")) {
        return;
      }
  
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/manage_roi/`,
        {
          method: "POST",
          headers: {
            key: sessionStorage.getItem("admin_key"),
            Admin_key: sessionStorage.getItem("admin_key"),
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": true,
          },
          // body: JSON.stringify(body),
        }
      );
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const {data} = await response.json();
      console.log(data);
  
    } catch (error) {
      console.log({ "Error Occurred": error });
    }
  };
  

  return (
    <AllContext.Provider
      value={{
        setTimeString,
        vehCategoryObj,
        singleView,
        setSingleView,
        loading,
        setLoading,
        recordData,
        setRecordData,
        fetchAllRecords,
        fetchAllRecentRecord,
        recentRecord,
        setRecentRecord,
        apiMainUrl,
        crouselZoom,
        setCrouselZoom,
        currentPage,
        setCurrentPage,
        totalPage,
        setTotalPage,
        filters,
        setFilters,
        capitalizeFirstLetter,
        deleteRecord,
        getAnprGenSetting,
        generalANPRSetting,
        setGeneralANPRSetting,
        postGenSetting,
        fetchRecentRecords,
        recentRecords,
        setRecentRecords,
        overlay,
        setOverlay,
        roiDatas, setRoiDatas,
        getRois,
        postRois
      }}
    >
      {children}
    </AllContext.Provider>
  );
};

export const AllState = () => {
  return useContext(AllContext);
};

export default AllProvider;
