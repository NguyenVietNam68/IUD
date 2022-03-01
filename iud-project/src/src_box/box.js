import React from "react";

export default function BoxSquare(props) {
  console.log("props: ", props);
  return <div className={props.colorbox} style={props.style} />;
}
