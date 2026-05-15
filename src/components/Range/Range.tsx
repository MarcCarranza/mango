"use client";

// Dependencies
import { useEffect, useRef, useState } from "react";

// Types
import { RangeProps, RangeSelector } from "./types";

// Styles
// TODO: SaSS or CSS modules
import "./style.css";

function Range({ min, max }: RangeProps): React.ReactNode {
  // State
  const [minSelectorValue, setMinSelectorValue] = useState<number>(0);
  const [maxSelectorValue, setMaxSelectorValue] = useState<number>(100);
  const [isDragging, setDragging] = useState<boolean>(false);
  const minSelector = useRef<HTMLDivElement>(null);
  const maxSelector = useRef<HTMLDivElement>(null);
  const startingPoint = useRef<number>(0);

  useEffect(() => {
    console.log(min, max);
  }, []);

  // Handlers
  const onMoveSlider = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ): void => {
    if (!isDragging) {
      return;
    }
    if (minSelector.current) {
      // TODO: Translate3d based on slider positioning? Still bugged
      // let translateX;
      // console.log("Starting", startingPoint.current, "Slider", e.clientX);
      // if (startingPoint.current === e.clientX) {
      //   console.log("SAME");
      // } else {
      //   translateX = e.clientX - startingPoint.current;
      // }
      // if (translateX > 0) {
      //   minSelector.current.style.transform = `translate3d(${translateX}px, 0, 0)`;
      // }
    }
  };

  const onStartDragging = (): void => {
    if (minSelector.current) {
      // startingPoint.current =
      //   Math.floor(minSelector.current.getBoundingClientRect().x) +
      //   Math.floor(minSelector.current.getBoundingClientRect().width / 2);
    }
    setDragging(true);
  };

  const onEndDragging = (): void => {
    setDragging(false);
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
      <div className="range__slider" onMouseMove={onMoveSlider}>
        {/* Selector min */}
        <div
          className="range__selector selector-min"
          ref={minSelector}
          onMouseDown={onStartDragging}
          onMouseUp={onEndDragging}
        />
        {/* Selector max */}
        <div className="range__selector selector-max" ref={maxSelector} />
      </div>
      {/* Max value label */}
      <span className="range__label">Max value</span>
    </div>
  );
}

export default Range;
