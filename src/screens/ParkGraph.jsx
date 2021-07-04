import React from "react";
// import { Chart } from "react-charts";
import { ResponsiveLine } from "@nivo/line";
// import data from './data.json'

export default function ParkGraph() {
 //  const data = React.useMemo(
 //   () => [
 //    {
 //     label: "Series 1",
 //     data: [
 //      [0, 1],
 //      [1, 2],
 //      [2, 4],
 //      [3, 2],
 //      [4, 7],
 //     ],
 //    },
 //    {
 //     label: "Series 2",
 //     data: [
 //      [0, 3],
 //      [1, 1],
 //      [2, 5],
 //      [3, 6],
 //      [4, 4],
 //     ],
 //    },
 //   ],
 //   []
 //  );
 //  const axes = React.useMemo(
 //   () => [
 //    { primary: true, type: "linear", position: "bottom" },
 //    { type: "linear", position: "left", stacked: true },
 //   ],
 //   []
 //  );
 //  const series = React.useMemo(() => ({ type: "area" }), []);

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
   <div className="graph-chart-container">
    {/* <Chart data={data} axes={axes} series={series}  /> */}
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
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: "transportation",
      legendOffset: 36,
      legendPosition: "center",
     }}
     axisLeft={{
      orient: "left",
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: "count",
      legendOffset: -40,
      legendPosition: "center",
     }}
     dotSize={10}
     dotColor="inherit:darker(0.3)"
     dotBorderWidth={2}
     dotBorderColor="#ffffff"
     enableDotLabel={true}
     dotLabel="y"
     dotLabelYOffset={-12}
     animate={true}
     motionStiffness={90}
     enableArea={true}
     areaOpacity={0.5}
     motionDamping={15}
    />
   </div>
   <div className="graph-details-container">Details</div>
  </div>
 );
}
