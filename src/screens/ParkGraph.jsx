import React from "react";
import { ResponsiveLine } from "@nivo/line";

export default function ParkGraph() {
 const data = [
  {
   id: "japan",
   color: "red",
   data: [
    {
     x: "0",
     y: 151,
    },
    {
     x: "30",
     y: 106,
    },
    {
     x: "60",
     y: 44,
    },
    {
     x: "90",
     y: 264,
    },
    {
     x: "120",
     y: 275,
    },
    {
     x: "150",
     y: 34,
    },
    {
     x: "180",
     y: 211,
    },
    {
     x: "210",
     y: 288,
    },
   ],
  },
 ];
 return (
  <div className="signup-main-container graph-main-container">
   <button className="home-logout-btn">Checkout</button>
   <div className="graph-chart-container">
    <ResponsiveLine
     data={data}
     margin={{
      top: 50,
      right: 50,
      bottom: 50,
      left: 50,
     }}
     xScale={{
      type: "point",
     }}
     yScale={{
      type: "linear",
      stacked: true,
      min: "auto",
      max: "auto",
     }}
     minY="auto"
     maxY="auto"
     stacked={true}
     curve="cardinal"
     axisBottom={{
      orient: "bottom",
      tickSize: 0,
      tickPadding: 25,
      tickRotation: 0,
     }}
     axisLeft={{
      orient: "left",
      tickSize: 0,
      tickPadding: 25,
      tickRotation: 0,
      legendOffset: -200,
     }}
     dotSize={10}
     dotBorderWidth={2}
     enableDotLabel={true}
     animate={true}
     enableArea={true}
     areaOpacity={0.3}
     motionDamping={15}
     enableGridX={false}
     enableGridY={false}
     colors="#062e00"
    />
   </div>
   <div className="graph-details-container">
    <div>
     <h3>
      <span>{(234566).toLocaleString()}</span>
      <p>Elevation Gain (m)</p>
     </h3>
    </div>
    <div>
     <h3>
      <span>826</span>
      <p>Max Elevation (m)</p>
     </h3>
    </div>
   </div>
  </div>
 );
}
