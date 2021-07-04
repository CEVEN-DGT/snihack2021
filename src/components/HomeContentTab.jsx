import React from "react";

export default function HomeContentTab(props) {
 return (
  <div
   className="home-content-tab-main-container"
   onClick={props.onClick}
   style={{ background: props.background }}
  >
   <div className="home-tab-img-container">
    <img src={props.img} alt={props.title} />
   </div>
   <div className="home-tab-title-container">{props.title}</div>
  </div>
 );
}
