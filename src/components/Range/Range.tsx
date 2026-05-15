"use client";

// Dependencies
import { useRef, useState } from "react";

// Types
import { RangeProps, RangeSelector } from "./types";

// Styles
// TODO: SaSS or CSS modules
import "./style.css";

function Range({}: RangeProps): React.ReactNode {
  // State
  const [minSelectorValue, setMinSelectorValue] = useState<number>(0);
  const [maxSelectorValue, setMaxSelectorValue] = useState<number>(100);
  const minSelector = useRef<HTMLDivElement>(null);
  const maxSelector = useRef<HTMLDivElement>(null);

  // Handlers
  const onDragSelector: React.DragEventHandler<HTMLDivElement> = (
    e: React.DragEvent<HTMLDivElement>,
  ): void => {
    console.log("Dragging selector", e.currentTarget);
  };

  const onSelectorValueChange = (
    selector: RangeSelector,
    value: number,
  ): void => {
    if (selector === RangeSelector.MIN) {
      setMinSelectorValue(value);
    } else if (selector === RangeSelector.MAX) {
      setMaxSelectorValue(value);
    } else {
      console.error("Invalid selector");
    }
  };

  return (
    <div className="range">
      {/* Min value label */}
      <span className="range__label">Min value</span>
      {/* Slider */}
      <div className="range__slider">
        {/* Selector min */}
        <div
          className="range__selector selector-min"
          draggable={true}
          onDrag={onDragSelector}
          ref={minSelector}
        />
        {/* Selector max */}
        <div
          className="range__selector selector-max"
          draggable={true}
          ref={maxSelector}
          // onDrag={onDragSelector}
        />
      </div>
      {/* Max value label */}
      <span className="range__label">Max value</span>
    </div>
  );
}

export default Range;
