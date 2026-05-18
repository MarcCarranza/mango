"use client";

// Dependencies
import { ChangeEvent, useEffect, useRef, useState } from "react";

// Utils
import { getMinPositioning, getMaxPositioning } from "@utils";

// Types
import { RangeProps, RangeSelector } from "./types";

// Styles
// TODO: USE TAILWIND!!!!
import "./style.css";

// TODO: Standarize slider/selector positioning

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
    // EXERCISE 1
    if (!isDragging || !slider.current) {
      return;
    }
    if (minSelector.current && maxSelector.current && currentSelector.current) {
      // Min and max values
      let minPosition;
      let maxPosition;
      let selectorPosition;
      let selectorToUpdate;
      let positionToUpdate;

      if (currentSelector.current === RangeSelector.MIN) {
        // Assigning refs to update
        selectorToUpdate = minSelector;
        positionToUpdate = minSelectorPosition;
        // Positioning values (max, min, slider and selector)
        const positionValues = getMinPositioning({
          sliderRef: slider,
          minSelectorRef: minSelector,
          clientX: e.clientX,
          maxSelectorPosition,
        });

        minPosition = positionValues.minPosition;
        maxPosition = positionValues.maxPosition;
        selectorPosition = positionValues.selectorPosition;
      } else if (currentSelector.current === RangeSelector.MAX) {
        // Assigning refs to update
        selectorToUpdate = maxSelector;
        positionToUpdate = maxSelectorPosition;
        // Max and min positions
        const positionValues = getMaxPositioning({
          sliderRef: slider,
          maxSelectorRef: maxSelector,
          clientX: e.clientX,
          minSelectorPosition,
        });

        minPosition = positionValues.minPosition;
        maxPosition = positionValues.maxPosition;
        selectorPosition = positionValues.selectorPosition;
      } else {
        console.error("currentSelector value is null or undefined");
        return;
      }

      // Checking min and max values before translation
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
    // TODO: This inside onMoveSlider?
    // TODO: This into utils
    if (currentSelector.current === RangeSelector.MIN && minSelector.current) {
      // Calculating percentage slided
      const minPercentage =
        minSelectorPosition.current /
        (slider.current.clientWidth - minSelector.current.clientWidth);
      // For min & max (exercise 1)
      if (min && max) {
        const minValue = Math.round(max * minPercentage * 100) / 100;
        setMinSelectorValue(minValue);
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
      }
    }
    currentSelector.current = null;
    setDragging(false);
  };

  const onChangeMinInput = (
    e: ChangeEvent<HTMLInputElement, HTMLInputElement>,
  ) => {
    if (!min || !max || !minSelector.current || !slider.current) {
      console.error("No min, max, selector ref or slider ref");
      return;
    }
    // TODO: Let null value?
    const value = parseFloat(e.currentTarget.value);
    if (value >= min && value < maxSelectorValue) {
      const sliderWidth =
        slider.current.clientWidth -
        slider.current.offsetLeft +
        minSelector.current.clientWidth;
      const minUpdatedPosition = (value / max) * sliderWidth;
      minSelector.current.style.transform = `translate3d(${minUpdatedPosition}px, 0, 0)`;
      setMinSelectorValue(value);
    }
  };

  const onChangeMaxInput = (
    e: ChangeEvent<HTMLInputElement, HTMLInputElement>,
  ) => {
    if (!min || !max || !maxSelector.current || !slider.current) {
      console.error("No min, max, selector ref or slider ref");
      return;
    }
    // TODO: Let null value?
    const value = parseFloat(e.currentTarget.value);
    if (value > minSelectorValue && value <= max) {
      // TODO: This as a constant
      const sliderWidth =
        slider.current.clientWidth -
        slider.current.offsetLeft +
        maxSelector.current.clientWidth;
      const maxUpdatedPosition = (value / max) * sliderWidth - sliderWidth;
      maxSelector.current.style.transform = `translate3d(${maxUpdatedPosition}px, 0, 0)`;
      setMaxSelectorValue(value);
    }
  };

  return (
    <div className="range">
      {/* Min value label */}
      {typeof min === "number" ? (
        <input
          type="number"
          className="range__input"
          value={minSelectorValue}
          onChange={onChangeMinInput}
          step="0.01"
        />
      ) : (
        <span className="range__label">{minSelectorValue}</span>
      )}

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
      {typeof min === "number" ? (
        <input
          className="range__input"
          type="number"
          value={maxSelectorValue}
          onChange={onChangeMaxInput}
          step="0.01"
        />
      ) : (
        <span className="range__label">{maxSelectorValue}</span>
      )}
    </div>
  );
}

export default Range;
