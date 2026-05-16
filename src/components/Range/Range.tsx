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
  const [minSelectorValue, setMinSelectorValue] = useState<number>(min ?? 0);
  const [maxSelectorValue, setMaxSelectorValue] = useState<number>(max ?? 100);
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
      let minPosition;
      let maxPosition;
      let sliderPosition;
      let selectorPosition;
      let selectorToUpdate;
      let positionToUpdate;
      // TODO: This as an atomized function?
      if (currentSelector.current === RangeSelector.MIN) {
        // Assigning refs to update
        selectorToUpdate = minSelector;
        positionToUpdate = minSelectorPosition;
        // Max and min positions
        // TODO: This should take into account each selector positioning
        minPosition = 0;
        maxPosition =
          slider.current.clientWidth - minSelector.current.clientWidth;

        // Calculating selector positioning based on slider
        sliderPosition = e.clientX - slider.current.offsetLeft;
        selectorPosition = sliderPosition - minSelector.current.clientWidth / 2;
      } else if (currentSelector.current === RangeSelector.MAX) {
        // Assigning refs to update
        selectorToUpdate = maxSelector;
        positionToUpdate = maxSelectorPosition;
        // Max and min positions
        // TODO: This should take into account each selector positioning
        minPosition =
          -slider.current.clientWidth + maxSelector.current.clientWidth;
        maxPosition = 0;

        sliderPosition = e.clientX - slider.current.clientWidth;
        selectorPosition = sliderPosition - maxSelector.current.clientWidth * 2;
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
    if (!currentSelector.current || !slider.current) {
      console.error(
        "onEndDragging - currentSelector or slider is undefined/null",
      );
      return;
    }
    if (currentSelector.current === RangeSelector.MIN && minSelector.current) {
      // Calculating percentage slided
      const minPercentage =
        minSelectorPosition.current /
        (slider.current.clientWidth - minSelector.current.clientWidth);
      // For min & max (exercise 1)
      // TODO: This
      if (min && max) {
        const minValue = Math.round(max * minPercentage * 100) / 100;
        setMinSelectorValue(minValue);
      } else {
        // For array of values (exercise 2)
      }
    } else if (
      currentSelector.current === RangeSelector.MAX &&
      maxSelector.current
    ) {
      const maxPercentage =
        maxSelectorPosition.current /
        (slider.current.clientWidth - maxSelector.current.clientWidth);
      // For min & max (exercise 1)
      if (min && max) {
        const maxValue = Math.round(max * (1 + maxPercentage) * 100) / 100;
        setMaxSelectorValue(maxValue);
      } else {
        // For array of values (exercise 2)
      }
    }
    currentSelector.current = null;
    setDragging(false);
  };

  return (
    <div className="range">
      {/* Min value label */}
      <span className="range__label">{minSelectorValue ?? min}</span>
      {/* Slider */}
      <div
        className="range__slider-wrapper"
        onMouseMove={onMoveSlider}
        ref={slider}
      >
        <div className="range__slider">
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
      </div>
      {/* Max value label */}
      <span className="range__label">{maxSelectorValue ?? max}</span>
    </div>
  );
}

export default Range;
