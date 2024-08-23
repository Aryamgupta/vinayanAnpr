import React, { useEffect, useRef, useState } from "react";
import "./roiC.css";
import { NavLink } from "react-router-dom";
import { AllState } from "Components/Context/Context";

const RoiMainComponent = () => {
  const {  getRois } = AllState();
  const canvasRef = useRef(null);
  const drawingCanvasRef = useRef(null); // New canvas for drawing lines
  const containerRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPoint, setStartPoint] = useState(null);
  const [endPoint, setEndPoint] = useState(null);
  const [allLines, setAllLines] = useState([]);
  const [roiName, setRoiName] = useState("");
  const [roiColor, setRoiColor] = useState("#f90000");
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // useEffect(() => {
  //   videoRef.current.src = "http://localhost:5000/video_feed"; // Set the video source to the backend URL
  // }, []);

  useEffect(() => {
    getRois();
  }, []);

  useEffect(() => {
    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize);

    // Clean up event listeners
    return () => {
      window.removeEventListener("resize", updateCanvasSize);
    };
  }, []);

  useEffect(() => {
    if (canvasRef.current && drawingCanvasRef.current) {
      canvasRef.current.width = dimensions.width;
      canvasRef.current.height = dimensions.height;
      drawingCanvasRef.current.width = dimensions.width;
      drawingCanvasRef.current.height = dimensions.height;
    }
  }, [dimensions]);

  const updateCanvasSize = () => {
    if (containerRef.current) {
      const { width, height } = containerRef.current.getBoundingClientRect();
      setDimensions({ width, height });
    }
  };

  const handleMouseDown = (e) => {
    setIsDrawing(true);

    const rect = drawingCanvasRef.current.getBoundingClientRect();

    // Calculate the correct x and y coordinates
    const x =
      (e.clientX - rect.left) * (drawingCanvasRef.current.width / rect.width);
    const y =
      (e.clientY - rect.top) * (drawingCanvasRef.current.height / rect.height);

    console.log(x, y);
    setStartPoint({ x, y });
  };

  const handleMouseMove = (e) => {
    if (!isDrawing) return;

    const rect = drawingCanvasRef.current.getBoundingClientRect();

    // Calculate the correct x and y coordinates
    const x =
      (e.clientX - rect.left) * (drawingCanvasRef.current.width / rect.width);
    const y =
      (e.clientY - rect.top) * (drawingCanvasRef.current.height / rect.height);

    setEndPoint({ x, y });

    const ctx = drawingCanvasRef.current.getContext("2d");
    ctx.clearRect(
      0,
      0,
      drawingCanvasRef.current.width,
      drawingCanvasRef.current.height
    );

    drawLines(); // Redraw all existing lines

    // Draw the current line
    if (startPoint) {
      ctx.beginPath();
      ctx.moveTo(startPoint.x, startPoint.y);
      ctx.lineTo(x, y);
      ctx.strokeStyle = roiColor;
      ctx.lineWidth = 2;
      ctx.stroke();
    }
  };
  const handleMouseUp = () => {
    if (startPoint && endPoint) {
      setAllLines([...allLines, { start: startPoint, end: endPoint }]);
    }
    setIsDrawing(false);
    setStartPoint(null);
    setEndPoint(null);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const socket = new WebSocket("ws://192.168.1.16:5001");

    socket.onmessage = (event) => {
      const blob = new Blob([event.data], { type: "image/jpeg" });
      const url = URL.createObjectURL(blob);

      const img = new Image();
      img.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
        URL.revokeObjectURL(url);
      };
      img.src = url;
    };

    return () => {
      socket.close();
    };
  }, []);

  const drawLines = () => {
    const ctx = drawingCanvasRef.current.getContext("2d");
    ctx.clearRect(
      0,
      0,
      drawingCanvasRef.current.width,
      drawingCanvasRef.current.height
    );
    ctx.strokeStyle = roiColor;
    ctx.lineWidth = 2;

    allLines.forEach(({ start, end }) => {
      ctx.beginPath();
      ctx.moveTo(start.x, start.y);
      ctx.lineTo(end.x, end.y);
      ctx.stroke();
    });
  };

  useEffect(() => {
    drawLines();
  }, [allLines]);

  const sendCoordinatesToBackend = () => {
    let coordinatesObj = {};
    allLines.forEach((obj, index) => {
      // let ind = index.toString();
      coordinatesObj[index] = [Math.round(obj.end.x), Math.round(obj.end.y)];
    });
    let roiJson = {
      points: allLines.length,
      coordinates: coordinatesObj,
    };
    let rr = JSON.stringify({ roi_json: roiJson });
    const payload = {
      roi_name: roiName,
      roi_json: rr,
      roi_color: roiColor,
    };

    fetch(`${process.env.REACT_APP_BASE_URL}/manage_roi/`, {
      method: "POST",
      headers: {
        key: sessionStorage.getItem("admin_key"),
        Admin_key: sessionStorage.getItem("admin_key"),
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": true,
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error("Error:", error));
  };

  const handleRoiNameChange = (event) => {
    setRoiName(event.target.value);
  };

  const handleRoiColorChange = (event) => {
    setRoiColor(event.target.value);
  };

  return (
    <div className="roiMainComponent">
      <div
        ref={containerRef}
        className="roiVideoPart"
        style={{ position: "relative" }}
      >
        <canvas ref={canvasRef} style={{ position: "absolute" }} />
        <canvas
          ref={drawingCanvasRef}
          style={{ position: "absolute" }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        />
      </div>
      <div className="roiSidePanel">
        <div className="roiEntry">
          <label htmlFor="roiName" className="roiNameL">
            RoI Name
          </label>
          <input
            type="text"
            id="roiName"
            className="majorInpFeild"
            value={roiName}
            onChange={handleRoiNameChange}
            placeholder="Enter Roi Name"
          />
        </div>
        <div className="roiEntry">
          <label htmlFor="roiColor" className="roiColorL">
            RoI Color
          </label>
          <input
            type="color"
            id="roiColor"
            className="roiColorI"
            value={roiColor}
            onChange={handleRoiColorChange}
          />
        </div>
        <button className="genrateBtn" onClick={sendCoordinatesToBackend}>
          Generate RoI
        </button>
        <button className="genrateBtn" style={{margin:"10px 0 10px 0px"}}>
          ROI List
        </button>
        {/* <div className="roilist">
          <h2>ROI List</h2>
          <div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <p>Id</p>
              <p>Name</p>
              <p>Color</p>
              <p>Action</p>
            </div>
            {roiDatas.map((roi) => {
              return (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    textAlign: "center",
                  }}
                  key={roi.id}
                >
                  <p>{roi.id}</p>
                  <p>{roi.roi_name}</p>
                  <p>
                    <input value={roi.roi_color} type="color" disabled="true" />
                  </p>
                  <p>
                    <button >
                      <img src={deleteICon} />
                    </button>
                  </p>
                </div>
              );
            })}
          </div>
        </div> */}
        <div className="roiEntry">
          <button className="closeBtn">
            <NavLink to="/dashboard">Close</NavLink>
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoiMainComponent;
