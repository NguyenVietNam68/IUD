import React, { useState } from "react";
export const ColorContext = React.createContext();

export default function ColorProducer(props) {
  const [color, setColor] = useState("orange");
  const updateColor = (newColor) => {
    setColor(newColor);
  };

  return (
    <ColorContext.Provider value={{ color, updateColor }}>
      {props.children}
    </ColorContext.Provider>
  );
}
