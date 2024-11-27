"use client";

import { useState } from "react";
import ReactSlider from "react-slider";

interface RangeSliderProps {
  title?: string;
}

const RangeSlider: React.FC<RangeSliderProps> = ({ title }) => {
  const [value, setValue] = useState<[number, number]>([17000, 24000]);

  return (
    <div className="group-form">
      <ReactSlider
        className="horizontal-slider"
        min={0}
        max={50000}
        value={value}
        onChange={(newValue) => setValue(newValue as [number, number])}
        thumbClassName="example-thumb"
        trackClassName="example-track"
      />
      <div className="group-range-title mt-2">
        <label className="d-flex justify-content-between mb-0">
          <span>{value[0]}$</span>
          <span>{value[1]}$</span>
        </label>
      </div>
    </div>
  );
};

export default RangeSlider;
