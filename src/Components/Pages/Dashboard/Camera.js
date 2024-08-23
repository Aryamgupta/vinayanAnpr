import React, { useEffect, useRef, useState } from "react";
import zoomImg from "./Images/zoom.png";
import minus from "./Images/minux.png";
import plus from "./Images/plus.png";
import "./dashboards.css";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { AllState } from "Components/Context/Context";

export const Camera = () => {
  const { getRois, roiDatas } = AllState();
  // const [isFullscreen, setIsFullscreen] = useState(false);
  const [zoom, setZoom] = useState(0.5);
  const [imgDimensions, setImgDimensions] = useState({});

  const canvasRef = useRef(null);
  const roiCanvasRef = useRef(null);

  useEffect(() => {
    getRois();
  });

  // const loadCamera = async function () {
  //   try {
  //     const { data } = await axios.get(`http://localhost:5000/video_feed`);
  //     console.log(data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const zoomFunc = async function (zoom) {
    try {
      const body = {
        zoom: zoom,
        tilt: 1,
        pan: 1,
      };

      const { data } = await axios.post(`http://localhost:5001/ptz`, body);
      setZoom(parseFloat(data.zoom));
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  // const toggleFullscreen = () => {
  //   setIsFullscreen(!isFullscreen);
  // };

    useEffect(() => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      // const roiCanvas = roiCanvasRef.current;
      // const roiCtx = roiCanvas.getContext("2d");

      const socket = new WebSocket("ws://192.168.1.16:5001");

      socket.onmessage = (event) => {
        const blob = new Blob([event.data], { type: "image/jpeg" });
        const url = URL.createObjectURL(blob);

        const img = new Image();
        img.onload = () => {
          canvas.width = img.width;
          canvas.height = img.height;
          if (
            img.width !== imgDimensions.width ||
            img.height !== imgDimensions.height
          ) {
            setImgDimensions({ height: img.height, width: img.width });
          }
          //  drawRoIs(roiCtx,roiCanvas)
          ctx.drawImage(img, 0, 0);
          URL.revokeObjectURL(url);
        };
        img.src = url;
      };

      return () => {
        socket.close();
      };

  // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [roiDatas]);

  const drawRoIs = () => {
    // Clear previous RoIs if needed
    const roiCanvas = roiCanvasRef.current;
    roiCanvas.height = 720;
    roiCanvas.width = 1280;
    const roiCtx = roiCanvas.getContext("2d");

    roiCtx.clearRect(0, 0, roiCanvas.width, roiCanvas.height);

    roiDatas.forEach((roi) => {
      const roiData = JSON.parse(roi.roi_json).roi_json;
      roiCtx.strokeStyle = roi.roi_color;
      roiCtx.lineWidth = 2;

      const points = [];
      const coordinates = roiData.coordinates;

      if (coordinates) {
        for (const property in coordinates) {
          const [x, y] = coordinates[property];
          points.push([x, y]);
        }
        roiCtx.beginPath();
        roiCtx.font = "15px Arial";
        roiCtx.fillText(`${roi.roi_name}`, points[0][0], points[0][1]);
        // roiCtx.moveTo(points[0][1], points[0][0]);
        // roiCtx.lineTo(points[0][1]+50, points[0][0]+50);
        roiCtx.stroke();
        if (points.length > 0) {
          roiCtx.moveTo(points[0][0], points[0][1]);
          for (let i = 0; i < points.length; i++) {
            for (let j = 0; j < 2; j++) {
              roiCtx.lineTo(points[i][0], points[i][1]);
            }
          }
          roiCtx.closePath();
          roiCtx.stroke();
        }
      } else {
        console.warn("No coordinates found in roiData:", roiData);
      }
    });
  };

  useEffect(() => {
    // const roiCanvas = roiCanvasRef.current;
    drawRoIs();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roiDatas]);

  return (
    <div className="mainScreen">
      <div></div>
      <div className="canvasContainer">
        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",

            zIndex: 1,
          }}
        ></canvas>
        <canvas
          ref={roiCanvasRef}
          style={{
            position: "absolute",

            zIndex: 2,
            pointerEvents: "none",
          }}
        ></canvas>
      </div>
      <div className="zoomInBtnsDiv">
        <button className="genrateRoiBtn">
          <NavLink to="/roiPart">Generate RoI</NavLink>
        </button>
        <div>
          <button
            onClick={() => {
              if (zoom !== 0) {
                let z = zoom - 0.05;
                zoomFunc(z);
              }
            }}
            disabled={zoom === 0}
          >
            <img src={minus} alt="Zoom Out" />
          </button>
          <label>
            <img src={zoomImg} alt="Zoom" />
            Zoom
          </label>
          <button
            onClick={async () => {
              if (zoom !== 1) {
                let z = zoom + 0.05;
                zoomFunc(z);
              }
            }}
            disabled={zoom === 1}
          >
            <img src={plus} alt="Zoom In" />
          </button>
        </div>
      </div>
    </div>
  );
};
