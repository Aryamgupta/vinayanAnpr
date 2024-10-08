import React, { useEffect } from "react";
import { Camera } from "./Camera";
import { AllState } from "../../Context/Context";
import RecentGrid from "./RecentGrid";

const Dashboard = () => {
  const { fetchAllRecords, recordData } = AllState();

  // const [recentRecords, setRecentRecords] = useState([]);

  // const onPublish = (data) => {
  //   let d = data.data;

  //   setRecentRecords((prevRecords) => {
  //     const newRecentRecords = [d, ...prevRecords];
  //     return newRecentRecords;
  //   });
  // };

  // const fetchRecentRecords = async () => {
  //   try {
  //     const eventSource = new EventSource("https://my-node-server-enfzduml4-aryam-guptas-projects.vercel.app/api");

  //     eventSource.addEventListener("publish", (event) => {
  //       try {
  //         const parsedData = JSON.parse(event.data);
  //         onPublish(parsedData);
  //       } catch (error) {
  //         console.log("Failed to parse 'publish' SSE data", error);
  //       }
  //     });

  //     eventSource.onmessage = (event) => {
  //       try {
  //         const parsedData = JSON.parse(event.data);
  //         console.log("General message:", parsedData);
  //       } catch (error) {
  //         console.log("Failed to parse general SSE data", error);
  //       }
  //     };

  //     eventSource.onerror = (event) => {
  //       // console.log("Error occurred with SSE connection");
  //       // console.error("SSE error:", event);
  //     };
  //   } catch (error) {
  //     console.error("Error occurred:", error);
  //   }
  // };

  useEffect(() => {
    // fetchRecentRecords();
    fetchAllRecords();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="mainDashboard">
        <Camera />
        <div className="sliderMain">
          {recordData &&
            recordData.map((e) => {
              return <RecentGrid data={e} />;
            })}

          {/* <GridItem />
            <GridItem />
            <GridItem />
            <GridItem />
            <GridItem />
            <GridItem />
            <GridItem /> */}
          {/* {recentRecord.length !== 0 &&
              recentRecord.map((data) => {
                return (
                  <div className="sliderCard" onClick={()=>{
                    setSingleView(data.rid)
                  }}>
                    <img src={data.plot_image} />
                    <p>
                      <img src={ocrIcon} />
                      {data.ocr}
                    </p>
                    <p>
                      <img src={speedIcon} />
                      {data.speed} KM/Hr
                    </p>
                  </div>
                );
              })} */}
        </div>
      </div>
      {/* {!singleView ? (
        
      ) : (
        <SingleShow id={singleView} setSingleView={setSingleView} />
      )} */}
    </>
  );
};

export default Dashboard;
