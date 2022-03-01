import React, { useContext } from "react";
import { ColorContext } from "./ColorContext";

export default function ColorSelect() {
  const { color, updateColor } = useContext(ColorContext);
  return (
    <>
      <h2 style={{ color }}>Chọn màu</h2>
      <div className="color-select">
        <div className="orange" onClick={() => updateColor("orange")}></div>
        <div className="green" onClick={() => updateColor("green")}></div>
        <div className="purple" onClick={() => updateColor("purple")}></div>
      </div>
    </>
  );
}
