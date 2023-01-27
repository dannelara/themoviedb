import { GlobalStateContext } from "global/GlobalState";
import React, { useState } from "react";
import "./Styles.css";
interface RangeSliderProps {
  minVal: number;
  maxVal: number;
}

export const RangeSlider: React.FC<RangeSliderProps> = ({ minVal, maxVal }) => {
  const { rangeval, setRangeval } = React.useContext(GlobalStateContext);

  return (
    <div className="slide_container">
      <span>IMDB score</span>

      <div className="flex_center">
        <input
          type="range"
          min={minVal}
          max={maxVal}
          defaultValue={5}
          step={1}
          onChange={(event) => setRangeval(parseInt(event.target.value))}
          className="slider"
          id="myRange"
        />

        <span>{rangeval}</span>
      </div>
    </div>
  );
};
