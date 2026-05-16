"use client";

// Dependencies
import { useEffect, useRef, useState } from "react";

// Types
import { RangeProps, RangeSelector } from "./types";

// Styles
// TODO: USE TAILWIND!!!!
import "./style.css";

function Range({ min, max }: RangeProps): React.ReactNode {
  // State
  const [minSelectorValue, setMinSelectorValue] = useState<number>(0);
  const [maxSelectorValue, setMaxSelectorValue] = useState<number>(100);
  const [isDragging, setDragging] = useState<boolean>(false);
  const minSelector = useRef<HTMLDivElement>(null);
  const maxSelector = useRef<HTMLDivElement>(null);
  const slider = useRef<HTMLDivElement>(null);
  const currentSelector = useRef<RangeSelector | null>(null);
  const minSelectorPosition = useRef<number>(0);
  const maxSelectorPosition = useRef<number>(0);

  useEffect(() => {
    // TODO: Loader? Check with SSR
    console.log(min, max);
  }, []);

  // Handlers
  const onMoveSlider = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ): void => {
    if (!isDragging || !slider.current) {
      return;
    }
    if (minSelector.current && maxSelector.current && currentSelector.current) {
      // Min and max values
      // TODO: This should take into account each selector positioning
      let minPosition;
      let maxPosition;
      let sliderPosition;
      let selectorPosition;
      let selectorToUpdate;
      let positionToUpdate;
      if (currentSelector.current === RangeSelector.MIN) {
        // Assigning refs to update
        selectorToUpdate = minSelector;
        positionToUpdate = minSelectorPosition;
        // Max and min positions
        minPosition = 0;
        maxPosition =
          slider.current.clientWidth - minSelector.current.clientWidth;

        // Calculating selector positioning based on slider
        sliderPosition = e.clientX - slider.current.offsetLeft;
        selectorPosition =
          sliderPosition - minSelector.current.clientWidth / 1.5;
      } else if (currentSelector.current === RangeSelector.MAX) {
        // Assigning refs to update
        selectorToUpdate = maxSelector;
        positionToUpdate = maxSelectorPosition;
        // Max and min positions
        minPosition =
          -slider.current.clientWidth + maxSelector.current.clientWidth;
        maxPosition = 0 + maxSelector.current.clientWidth / 2;

        sliderPosition = e.clientX - slider.current.clientWidth;
        selectorPosition =
          sliderPosition - maxSelector.current.clientWidth / 1.5;
      } else {
        console.error("currentSelector value is null or undefined");
        return;
      }

      if (selectorPosition >= minPosition && selectorPosition <= maxPosition) {
        // Translating the slider
        positionToUpdate.current = selectorPosition;
        selectorToUpdate.current.style.transform = `translate3d(${selectorPosition}px, 0, 0)`;
      }
    }
  };

  const onStartDragging = (selectorType: RangeSelector): void => {
    currentSelector.current = selectorType;
    setDragging(true);
  };

  const onEndDragging = (): void => {
    currentSelector.current = null;
    setDragging(false);
  };

  // const onSelectorValueChange = (
  //   selector: RangeSelector,
  //   value: number,
  // ): void => {
  //   if (selector === RangeSelector.MIN) {
  //     setMinSelectorValue(value);
  //   } else if (selector === RangeSelector.MAX) {
  //     setMaxSelectorValue(value);
  //   } else {
  //     console.error("Invalid selector");
  //   }
  // };

  return (
    <div className="range">
      {/* Min value label */}
      <span className="range__label">{min ?? 0}</span>
      {/* Slider */}
      <div className="range__slider" onMouseMove={onMoveSlider} ref={slider}>
        {/* Selector min */}
        <div
          className="range__selector selector-min"
          ref={minSelector}
          onMouseDown={() => onStartDragging(RangeSelector.MIN)}
          onMouseUp={onEndDragging}
        />
        {/* Selector max */}
        <div
          className="range__selector selector-max"
          ref={maxSelector}
          onMouseDown={() => onStartDragging(RangeSelector.MAX)}
          onMouseUp={onEndDragging}
        />
      </div>
      {/* Max value label */}
      <span className="range__label">{max ?? 0}</span>
    </div>
  );
}

export default Range;
